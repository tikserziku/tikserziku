<div align="center">

# Building AI Agent Swarms

### 8 parallel agents • distributed memory • 3.3x speedup • Day 24

[![A2A SaaS](https://img.shields.io/badge/A2A_Agent-SaaS-d97706?style=for-the-badge)](https://github.com/tikserziku/a2a-agent-saas)
[![Speedup](https://img.shields.io/badge/speedup-3.3x-brightgreen?style=for-the-badge)]()
[![Ideas](https://img.shields.io/badge/ideas_shipped-45-blue?style=for-the-badge)]()
[![Bot](https://img.shields.io/badge/Try_Bot-Telegram-0088cc?style=for-the-badge)](https://t.me/VisaginasGPT_bot)

**[Portfolio](https://tikserziku.github.io/tikserziku/)** · **[Try the Bot](https://t.me/VisaginasGPT_bot)**

</div>

---

## What I'm Building

**A2A Agent SaaS** — a platform where customers get their own AI agent swarm running on a dedicated cloud VM.

8 specialized agents work in parallel, create real Google Docs/Sheets/Slides, remember context via distributed memory, and execute code safely.

```
User: "Research AI trends and write a report"

Orchestrator decomposes → 4 agents run in parallel:
  🔍 Researcher → finds data           (12s)
  📊 Analyst   → evaluates trends      (10s)
  ✍️ Writer    → drafts report          (8s)
  🎨 Creator   → generates charts      (15s)

Sequential: 45s → Parallel: 15s → Speedup: 3.0x
Result: Real Google Doc with formatted tables + exported .docx
```

## The Swarm

8 AI agents, each specialized for a different task type. The orchestrator decomposes complex requests and runs agents in parallel using the PARL methodology (inspired by Kimi K2.5 research).

| Agent | Specialization |
|-------|----------------|
| 🔍 Researcher | Facts, documentation, deep research |
| 💻 Coder | Code generation + safe auto-execution |
| ✍️ Writer | Content, emails, reports |
| 📊 Analyst | Data analysis + safe auto-execution |
| 🧠 Thinker | Complex reasoning and planning |
| 🎨 Creator | Image generation |
| 🌐 Web Search | Real-time web research |
| 🛡️ Guardian | Safety filter on all outputs |

## Key Achievements (45 Ideas Shipped)

- **Parallel Agent Swarm** — 8 agents, 3.3x speedup on complex tasks
- **Google Workspace Integration** — Docs, Sheets, Slides, Gmail, Calendar via OAuth
- **Distributed Memory** — Knowledge graph synced across multiple VMs
- **Smart Intent Router** — LLM-based function calling, no keyword matching
- **Code Execution Sandbox** — Secure sandbox with safety gates
- **Document Quality Gate** — QA scoring (0-100), auto-fix before file creation
- **Knowledge Library** — Modular rules, bots learn automatically
- **Real Google Docs Tables** — Native API tables, not markdown text
- **Self-Healing Infrastructure** — Watchdog services, cross-VM monitoring
- **Anti-Hallucination Sanitizer** — Catches fake URLs, meta-text, phantom files

## Architecture

```
┌─────────────────────────────────────────────────┐
│           SWARM ORCHESTRATOR                    │
│  Task → Decompose → Parallel → QA → Synthesize  │
├──────┬──────┬──────┬──────┬──────┬──────────────┤
│ 🔍   │ 💻   │ ✍️   │ 📊   │ 🎨   │ 🛡️           │
│Rsch  │Code  │Write │Anal  │Image │Guard         │
└──┬───┴──┬───┴──┬───┴──┬───┴──┬───┴──┬───────────┘
   ↕      ↕      ↕      ↕      ↕      ↕
   AI API endpoints (high-speed inference)
   │                              │
   └──── Google Workspace ────────┘
   │                              │
   └──── 🧠 Distributed Memory ──┘
         Multi-VM knowledge graph
```

Multi-cloud infrastructure with self-healing and cross-VM monitoring.

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **AI/ML** | 8 specialized models, multi-provider |
| **Protocols** | Google A2A (JSON-RPC), MCP |
| **Backend** | Python, Node.js |
| **Storage** | SQLite + FTS5, Google Drive |
| **APIs** | Google Workspace (Docs, Sheets, Slides, Gmail, Calendar) |
| **Bot** | Telegram Bot API |

## Try It

<div align="center">

### 🤖 [@VisaginasGPT_bot](https://t.me/VisaginasGPT_bot)
*8 agents working for you in Telegram*

</div>

## What I Learned

> *"8 specialized models in parallel beat 1 premium model serial."*

Built this from zero coding experience in 24 days. Key insights:

- **Coordination > raw power** — orchestration is the product
- **Constraints breed architecture** — resource limits forced smart design that scales
- **Ship daily, reflect weekly** — 45 ideas in 24 days
- **Memory changes everything** — agents without memory are colleagues with amnesia
- **The swarm is the moat** — single-agent chatbots are commodity, parallel swarms are rare

## Looking For

Open to conversations about AI engineering roles, collaboration, or investment.

**Email:** sergej.drus@gmail.com · **Telegram:** [@my_Visaginas360](https://t.me/my_Visaginas360)

---

<div align="center">

*Building in public from Lithuania · Day 24 · 45 ideas shipped*

</div>
