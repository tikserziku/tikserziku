<div align="center">

# Building AI Agent Swarms

### 8 parallel agents • distributed memory • $0 infrastructure • Day 24

[![A2A SaaS](https://img.shields.io/badge/A2A_Agent-SaaS-d97706?style=for-the-badge)](https://github.com/tikserziku/a2a-agent-saas)
[![Speedup](https://img.shields.io/badge/speedup-3.3x-brightgreen?style=for-the-badge)]()
[![Ideas](https://img.shields.io/badge/ideas_shipped-45-blue?style=for-the-badge)]()
[![Bot](https://img.shields.io/badge/Try_Bot-Telegram-0088cc?style=for-the-badge)](https://t.me/VisaginasGPT_bot)

**[Portfolio](https://tikserziku.github.io/tikserziku/)** · **[Try the Bot](https://t.me/VisaginasGPT_bot)** · **[Web Demo](https://platform.92-5-72-169.nip.io)**

</div>

---

## What I'm Building

**A2A Agent SaaS** — a platform where customers get their own AI agent swarm running on a lightweight cloud VM.

8 specialized agents work in parallel, create real Google Docs/Sheets/Slides, remember context via distributed memory, and execute code safely. All on free-tier infrastructure.

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

## Agent Roster

| Agent | Model | What It Does |
|-------|-------|-------------|
| 🔍 Researcher | Kimi K2 (Groq) | Facts, documentation, deep research |
| 💻 Coder | Qwen3 32B (Groq) | Code generation + auto-execution |
| ✍️ Writer | Llama 4 Scout (Groq) | Content, emails, reports |
| 📊 Analyst | GPT-OSS 120B (Groq) | Data analysis + auto-execution |
| 🧠 Thinker | Kimi K2.5 (NVIDIA) | Complex reasoning |
| 🎨 Creator | Gemini Flash (Google) | Image generation |
| 🌐 Web Search | Compound (Groq) | Real-time web research |
| 🛡️ Guardian | Llama Guard (Groq) | Safety filter on all outputs |

## Key Achievements (45 Ideas Shipped)

- **Parallel Agent Swarm** — 8 agents, 3.3x speedup, PARL methodology
- **Google Workspace Integration** — Docs, Sheets, Slides, Gmail, Calendar via OAuth
- **Distributed Memory** — SQLite+FTS5 knowledge graph synced across 3 VMs
- **Smart Intent Router** — LLM-based function calling, no keyword matching
- **Code Execution Sandbox** — Rust-based Monty with security gates
- **Document Quality Gate** — QA scoring (0-100), auto-fix before file creation
- **Knowledge Library** — Modular JSON rules, bots learn automatically
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
 Groq   Groq   Groq   Groq  Gemini  Groq
(free)  (free) (free) (free) (free) (free)
   │                              │
   └──── Google Workspace ────────┘
   │                              │
   └──── 🧠 Distributed Memory ──┘
         3 VMs • 65 entities • synced
```

## Infrastructure

| VM | Role | Services |
|----|------|----------|
| Oracle | CTO Hub, coordination | 32 services |
| Kimi | Customer reference (etalon) | 9 services |
| GCP | DevOps, development | 5 services |

All running on cloud free tiers. Total monthly cost: **$0**.

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **AI Models** | Kimi K2, Qwen3, Llama 4, GPT-OSS, Gemini, Kimi K2.5 |
| **Protocols** | Google A2A (JSON-RPC), MCP |
| **Backend** | Python (Flask), Node.js |
| **Storage** | SQLite + FTS5, Google Drive |
| **APIs** | Google Workspace (Docs, Sheets, Slides, Gmail, Calendar) |
| **Infra** | Oracle Cloud, Google Cloud, Fly.io, Caddy |
| **Bot** | Telegram Bot API, python-telegram-bot |

## Try It

<div align="center">

### 🤖 [@VisaginasGPT_bot](https://t.me/VisaginasGPT_bot)
*8 agents working for you in Telegram*

### 🌐 [Web Platform](https://platform.92-5-72-169.nip.io)
*Demo with subscription flow*

</div>

## What I Learned

> *"8 cheap models in parallel beat 1 expensive model serial."*

Built this from zero coding experience in 24 days. Key insights:

- **Coordination > raw power** — orchestration is the product
- **Constraints breed architecture** — 1 GB RAM forced smart design that scales
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
