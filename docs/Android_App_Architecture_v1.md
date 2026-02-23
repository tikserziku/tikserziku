# Visaginas360 Android App — Architecture Document v1.0
## February 2026

---

## 1. Overview

Native Android приложение для AI-управления VM через MCP протокол.
Чат-интерфейс где пользователь пишет команды на естественном языке,
AI (Gemini/Groq) интерпретирует их и вызывает MCP tools на сервере.

---

## 2. Tech Stack

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Language | Kotlin | 2.0+ | Native Android |
| UI Framework | Jetpack Compose | latest | Material Design 3 |
| MCP Client | kotlin-sdk | latest | `io.modelcontextprotocol:kotlin-sdk` |
| HTTP Client | Ktor | 3.x | Bundled with MCP SDK |
| AI (Free) | Gemini Flash API | 2.5 | `com.google.ai.client.generativeai` |
| AI (Fallback) | Groq API | - | REST calls via Ktor |
| Auth | Google Sign-In | latest | OAuth2 + GCP API key |
| Security | Android Keystore | - | Token/key storage |
| DI | Koin or Hilt | - | Dependency injection |
| Persistence | Room | latest | Chat history, settings |
| Min SDK | 26 (Android 8.0) | - | ~95% device coverage |

---

## 3. App Architecture (Clean Architecture)

```
┌─────────────────────────────────────────┐
│              UI Layer                    │
│  ┌─────────┐  ┌──────────┐  ┌────────┐ │
│  │ ChatScreen│ │SettingsScreen│ │StatusScreen│ │
│  └────┬────┘  └────┬─────┘  └───┬────┘ │
│       │            │             │       │
│  ┌────┴────────────┴─────────────┴────┐ │
│  │          ViewModels                 │ │
│  │  ChatViewModel, SettingsViewModel   │ │
│  └─────────────┬───────────────────────┘ │
├────────────────┼─────────────────────────┤
│           Domain Layer                   │
│  ┌─────────────┴───────────────────────┐ │
│  │         Use Cases                    │ │
│  │  SendMessage, ListTools, GetStatus   │ │
│  └─────────────┬───────────────────────┘ │
│  ┌─────────────┴───────────────────────┐ │
│  │         Repositories (interfaces)    │ │
│  └─────────────┬───────────────────────┘ │
├────────────────┼─────────────────────────┤
│            Data Layer                    │
│  ┌─────────┐  ┌──────────┐  ┌────────┐ │
│  │MCP Client│ │  AI Client │ │  Room DB │ │
│  │(Kotlin SDK)│ │(Gemini/Groq)│ │(History)│ │
│  └────┬────┘  └────┬─────┘  └───┬────┘ │
│       │            │             │       │
│       ▼            ▼             ▼       │
│  MCP Server    Gemini API    Local SQLite │
│  (HTTPS)       (HTTPS)                   │
└─────────────────────────────────────────┘
```

---

## 4. Core Flow: User Message → AI → MCP → Response

```
User types: "покажи статус сервисов"
        │
        ▼
┌─ ChatViewModel ──────────────────────────┐
│ 1. Save message to Room DB               │
│ 2. Get available MCP tools list           │
│ 3. Build prompt with tools as functions   │
│ 4. Send to AI (Gemini/Groq)              │
└──────────────┬───────────────────────────┘
               │
               ▼
┌─ AI Engine (Gemini Flash) ───────────────┐
│ Receives: user message + tool schemas     │
│ Decides: call vm_list_services()          │
│ Returns: function_call response           │
└──────────────┬───────────────────────────┘
               │
               ▼
┌─ MCP Client ─────────────────────────────┐
│ 1. Connect to MCP server (HTTPS)          │
│ 2. Call tool: vm_list_services            │
│ 3. Receive JSON result                    │
│ 4. Return to AI for formatting            │
└──────────────┬───────────────────────────┘
               │
               ▼
┌─ AI Engine (second call) ────────────────┐
│ Receives: tool result JSON                │
│ Returns: human-readable formatted text    │
│ "Все 43 сервиса работают: grok-brain ✅..."│
└──────────────┬───────────────────────────┘
               │
               ▼
┌─ ChatViewModel ──────────────────────────┐
│ 1. Save AI response to Room DB            │
│ 2. Update UI state                        │
│ 3. Display formatted response             │
└──────────────────────────────────────────┘
```

---

## 5. Project Structure

```
app/
├── src/main/java/com/visaginas360/app/
│   ├── App.kt                          # Application class
│   ├── MainActivity.kt                 # Single activity
│   │
│   ├── di/                             # Dependency injection
│   │   └── AppModule.kt
│   │
│   ├── data/                           # Data layer
│   │   ├── mcp/
│   │   │   ├── McpClientManager.kt     # MCP connection management
│   │   │   └── McpToolExecutor.kt      # Tool call execution
│   │   ├── ai/
│   │   │   ├── AiEngine.kt            # Interface
│   │   │   ├── GeminiEngine.kt         # Gemini implementation
│   │   │   └── GroqEngine.kt           # Groq fallback
│   │   ├── auth/
│   │   │   ├── GoogleAuthManager.kt    # Google Sign-In
│   │   │   └── TokenManager.kt         # Secure token storage
│   │   ├── db/
│   │   │   ├── AppDatabase.kt          # Room database
│   │   │   ├── ChatMessage.kt          # Entity
│   │   │   └── ChatDao.kt             # DAO
│   │   └── repository/
│   │       ├── ChatRepository.kt       # Chat history
│   │       └── SettingsRepository.kt   # App settings
│   │
│   ├── domain/                         # Business logic
│   │   ├── model/
│   │   │   ├── Message.kt              # Domain model
│   │   │   ├── McpTool.kt             # Tool definition
│   │   │   └── ServerConfig.kt         # MCP server config
│   │   └── usecase/
│   │       ├── SendMessageUseCase.kt   # Core chat flow
│   │       ├── ConnectServerUseCase.kt # MCP connection
│   │       └── GetToolsUseCase.kt      # List available tools
│   │
│   └── ui/                             # Presentation
│       ├── theme/
│       │   ├── Theme.kt               # Material 3 theme
│       │   └── Colors.kt
│       ├── chat/
│       │   ├── ChatScreen.kt          # Main chat UI
│       │   ├── ChatViewModel.kt
│       │   ├── MessageBubble.kt       # Message component
│       │   └── ToolCallCard.kt        # MCP tool visualization
│       ├── settings/
│       │   ├── SettingsScreen.kt
│       │   └── SettingsViewModel.kt
│       ├── status/
│       │   ├── StatusScreen.kt        # Server status dashboard
│       │   └── StatusViewModel.kt
│       └── navigation/
│           └── NavGraph.kt
│
├── src/main/res/
│   ├── values/strings.xml
│   └── drawable/                       # Icons
│
└── build.gradle.kts                    # Dependencies
```

---

## 6. Key Components Detail

### 6.1 McpClientManager.kt
```kotlin
// Core MCP connection using official Kotlin SDK
class McpClientManager {
    private var client: Client? = null
    private var transport: StreamableHttpClientTransport? = null

    suspend fun connect(serverUrl: String, authToken: String) {
        val httpClient = HttpClient {
            install(SSE)
            defaultRequest {
                header("Authorization", "Bearer $authToken")
            }
        }
        transport = StreamableHttpClientTransport(
            client = httpClient,
            url = serverUrl  // e.g. "https://mcp.visaginas360.com/mcp"
        )
        client = Client(
            clientInfo = Implementation(
                name = "visaginas360-android",
                version = "1.0.0"
            )
        )
        client?.connect(transport!!)
    }

    suspend fun listTools(): List<Tool> {
        return client?.listTools()?.tools ?: emptyList()
    }

    suspend fun callTool(name: String, arguments: Map<String, Any>): String {
        val result = client?.callTool(name, arguments)
        return result?.content?.joinToString("\n") { it.text ?: "" } ?: ""
    }

    suspend fun disconnect() {
        client?.close()
    }
}
```

### 6.2 GeminiEngine.kt
```kotlin
// Gemini Flash as AI brain with function calling
class GeminiEngine(private val apiKey: String) : AiEngine {

    private val model = GenerativeModel(
        modelName = "gemini-2.5-flash",
        apiKey = apiKey,
        tools = listOf(/* MCP tools converted to Gemini function declarations */)
    )

    override suspend fun processMessage(
        userMessage: String,
        availableTools: List<McpTool>,
        conversationHistory: List<Message>
    ): AiResponse {
        // 1. Convert MCP tools to Gemini function declarations
        val functions = availableTools.map { it.toGeminiFunction() }

        // 2. Send message with function calling enabled
        val response = model.generateContent(
            content { text(userMessage) }
        )

        // 3. Check if AI wants to call a function
        return when {
            response.functionCalls.isNotEmpty() -> {
                AiResponse.ToolCall(
                    toolName = response.functionCalls.first().name,
                    arguments = response.functionCalls.first().args
                )
            }
            else -> AiResponse.Text(response.text ?: "")
        }
    }
}
```

### 6.3 SendMessageUseCase.kt
```kotlin
// Orchestrates the full message flow
class SendMessageUseCase(
    private val mcpClient: McpClientManager,
    private val aiEngine: AiEngine,
    private val chatRepo: ChatRepository
) {
    suspend fun execute(userMessage: String): Flow<ChatState> = flow {
        emit(ChatState.Thinking)

        // 1. Get available tools
        val tools = mcpClient.listTools()

        // 2. Ask AI what to do
        val aiResponse = aiEngine.processMessage(userMessage, tools)

        when (aiResponse) {
            is AiResponse.ToolCall -> {
                emit(ChatState.ExecutingTool(aiResponse.toolName))

                // 3. Execute MCP tool
                val result = mcpClient.callTool(
                    aiResponse.toolName,
                    aiResponse.arguments
                )

                // 4. Send result back to AI for formatting
                val formatted = aiEngine.formatResult(result)
                emit(ChatState.Response(formatted))
            }
            is AiResponse.Text -> {
                emit(ChatState.Response(aiResponse.text))
            }
        }
    }
}
```

---

## 7. Security Architecture

| Aspect | Implementation |
|--------|---------------|
| MCP Auth | Bearer token per client, stored in Android Keystore |
| API Keys | Gemini key from Google Sign-In, encrypted at rest |
| Transport | HTTPS (TLS 1.3) for all MCP and AI API calls |
| Token Refresh | Auto-refresh with exponential backoff |
| Certificate Pinning | Pin to Caddy's TLS cert on VM |
| Biometric Lock | Optional biometric auth to unlock app |
| Data at Rest | Room DB encrypted with SQLCipher |

---

## 8. UI Screens

### 8.1 Chat Screen (Main)
- Material 3 chat interface
- Message bubbles (user blue, AI white)
- Tool execution cards (show which MCP tool is running)
- Typing indicator while AI thinks
- Quick action buttons (status, restart, logs)

### 8.2 Settings Screen
- MCP Server URL configuration
- AI Engine selection (Gemini / Groq / Custom)
- Auth token management
- Theme (light/dark/system)
- Language (RU/EN/LT)

### 8.3 Status Dashboard
- Server health overview
- Service list with status indicators
- Quick restart buttons
- Resource usage (CPU, RAM, disk)

---

## 9. Build & Deploy

### 9.1 Dependencies (build.gradle.kts)
```kotlin
dependencies {
    // MCP
    implementation("io.modelcontextprotocol:kotlin-sdk:latest")
    implementation("io.ktor:ktor-client-cio:3.x")

    // AI
    implementation("com.google.ai.client.generativeai:generativeai:latest")

    // UI
    implementation("androidx.compose.material3:material3:latest")
    implementation("androidx.navigation:navigation-compose:latest")

    // Auth
    implementation("com.google.android.gms:play-services-auth:latest")

    // DB
    implementation("androidx.room:room-runtime:latest")
    implementation("net.zetetic:android-database-sqlcipher:latest")

    // DI
    implementation("io.insert-koin:koin-android:latest")
}
```

### 9.2 Release
- Target: Google Play Store
- Min SDK: 26 (Android 8.0)
- Signing: Android App Bundle (AAB)
- ProGuard: Obfuscate API handling code

---

## 10. Development Timeline

| Week | Focus | Deliverable |
|------|-------|-------------|
| Week 1 | Setup + MCP client | Kotlin project, MCP connection works |
| Week 2 | AI integration | Gemini function calling + MCP tools |
| Week 3 | UI + Chat flow | Full chat interface, message history |
| Week 4 | Polish + Auth | Google Sign-In, settings, error handling |
| Week 5 | Testing + Beta | Internal testing, 5-10 beta users |
| Week 6 | Play Store | Store listing, screenshots, launch |

---

*Visaginas360 Android App Architecture v1.0 — February 2026*
