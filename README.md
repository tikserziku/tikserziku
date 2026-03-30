<div align="center">

# Building AI Agent Infrastructure

### 44 skills • 21 agents • MCP protocol • 30+ days autonomous • Day 120+

[![MindSwarm](https://img.shields.io/badge/MindSwarm-Platform-d97706?style=for-the-badge)](https://mindswarm.dev)
[![MCP](https://img.shields.io/badge/MCP-6_Connectors-8b5cf6?style=for-the-badge)]()
[![Speedup](https://img.shields.io/badge/speedup-3.3x-brightgreen?style=for-the-badge)]()
[![Autonomous](https://img.shields.io/badge/autonomous-30+_days-10b981?style=for-the-badge)]()
[![Bot](https://img.shields.io/badge/Try_Bot-Telegram-0088cc?style=for-the-badge)](https://t.me/VisaginasGPT_bot)

**[Website](https://mindswarm.dev)** · **[Learn](https://mindswarm.dev/learn)** · **[Pricing](https://mindswarm.dev/pricing)** · **[Telegram](https://t.me/sergejdrus)**

</div>

---

> **Note:** Core infrastructure, orchestration engine, and SaaS platform repositories are **private** to protect proprietary architecture and trade secrets. Public repos contain demos and open-source components. For technical deep-dives or code review, please [reach out directly](https://t.me/sergejdrus).

---

## What I'm Building

**MindSwarm** — a multi-agent AI platform where Claude, Gemini & Codex work as a coordinated team. Not one chatbot — an AI workforce with orchestration, persistent memory, voice control, and 15+ service integrations.

44 skills running across 4 cloud VMs. 6 MCP connectors giving AI direct control over infrastructure. 30+ days of autonomous operation with zero human intervention.

```
User (Telegram/Voice): "Research AI trends and write a report"

Orchestrator decomposes → 8 agents run in parallel:
  🔍 Researcher → finds data + citations    (12s)
  📊 Analyst   → evaluates trends           (10s)
  ✍️  Writer    → drafts report              (8s)
  🎨 Creator   → generates charts           (15s)
  🧠 Thinker   → verifies reasoning         (10s)
  🌐 Web       → real-time data             (8s)
  💻 Coder     → code examples              (12s)
  🛡️ Guardian  → safety check               (2s)

Sequential: 77s → Parallel: 15s → Speedup: 5.1x
Result: Formatted Google Doc in your Drive. With sources.
```

## Voice Agent — Talk to Your AI

Hands-free AI control via Gemini Live voice streaming. Speak naturally, get things done.

```
🎤 You: "Check my emails and summarize what's important"
🔊 AI:  "You have 3 important emails. First, from Google Cloud..."

🎤 You: "Deploy the latest version to production"
🔊 AI:  "Deploying now... Done. All health checks passing."
```

- **Gemini 3.1 Flash Live** — real-time voice streaming
- **Bidirectional** — AI speaks back, not just text
- **PC control** — execute commands, manage files, deploy services
- **Persistent memory** — remembers context across conversations

## MCP Protocol — AI Controls Infrastructure

The breakthrough: Claude AI in the browser controls real cloud infrastructure through **MCP (Model Context Protocol)**. No SSH. No dashboards. Natural language only.

| MCP Connector | Tools | What It Does |
|---------------|-------|-------------|
| Cloud Control | 40+ | VM management, service lifecycle, deployments |
| Gmail | 7 | Search, read, send — AI handles communication |
| BigQuery | 5 | SQL analytics on operational data |
| Firestore | 14 | Real-time document database for agent state |
| Vertex AI Search | 2 | Semantic search across knowledge base |
| Web Scraping | 2 | Headless Chrome for real-time data |

## The Swarm — 21 Parallel Agents

| Agent | Role | Agent | Role |
|-------|------|-------|------|
| 🔍 Researcher | Deep search + citations | 🧠 Thinker | Complex reasoning |
| 💻 Coder | Code + safe execution | 🎨 Creator | Image generation |
| ✍️ Writer | Content + formatting | 🌐 Web Search | Real-time data |
| 📊 Analyst | Data + execution | 🛡️ Guardian | Safety filter |

8 core agents + 13 specialized workers coordinated via Telegram bots.

## Key Achievements (120+ Days)

- **Voice Agent** — Gemini Live hands-free voice control with bidirectional streaming
- **MCP Protocol** — 6 live connectors, 70+ tools, AI manages infrastructure from browser
- **30+ Days Autonomous** — Watchdog v3: 7,500+ monitoring cycles, zero manual restarts
- **21-Agent Parallel Swarm** — 3.3x speedup using PARL methodology
- **44 Skills** — deploy, code review, browser automation, security scan, and more
- **Telegram Integration** — 24/7 AI assistant via multiple bots
- **Google Cloud MCP** — BigQuery, Firestore, Vertex AI Search via Managed MCP
- **Claude-to-Claude Communication** — Browser AI delegates to server AI via MCP
- **Distributed Memory** — Cross-region knowledge graph with permanent context
- **Google Workspace Integration** — Docs, Sheets, Slides, Gmail, Calendar via OAuth
- **Self-Healing Infrastructure** — 35+ services across 4 cloud VMs
- **Learning Platform** — 12 hands-on challenges teaching AI agent development
- **Security Hardened** — 70+ rule scanner, OWASP Top 10, automated on every edit

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│              MCP ORCHESTRATOR (Claude Opus)               │
│  Browser/Voice/Telegram → MCP → Cloud Infrastructure     │
├───────┬───────┬───────┬───────┬───────┬───────┬──────────┤
│ 🔍    │ 💻    │ ✍️    │ 📊    │ 🧠    │ 🎨    │ 🛡️       │
│Rsch   │Code   │Write  │Anal   │Think  │Image  │Guard     │
└──┬────┴──┬────┴──┬────┴──┬────┴──┬────┴──┬────┴──┬───────┘
   ↕       ↕       ↕       ↕       ↕       ↕       ↕
┌──────────────────────────────────────────────────────────┐
│              INFRASTRUCTURE (4 Cloud VMs)                 │
│  Oracle │ GCP × 2 │ Kimi │ Windows Dev PC                │
│  Watchdog v3 │ Self-healing │ Telegram bots               │
├──────────────────────────────────────────────────────────┤
│              INTEGRATIONS                                │
│  Google Workspace │ Cloudflare │ RAG │ Voice │ Memory     │
└──────────────────────────────────────────────────────────┘
```

## Timeline

| Date | Milestone |
|------|-----------|
| **Mar 2026** | Voice Agent v6, 44 skills, Gemini Live streaming |
| **Feb 2026** | 30+ days autonomous, Claude-to-Claude via MCP |
| **Jan 2026** | 21-agent parallel swarm, distributed memory |
| **Dec 2025** | Google Workspace integration, self-healing v3 |

## What I Learned

> *"We didn't build an app powered by AI. We built AI that runs the infrastructure — and it hasn't needed a human in 30 days."*

- **Coordination > raw power** — 21 agents in parallel beat 1 premium model
- **MCP changes everything** — AI managing infrastructure from a browser tab
- **Voice is the future** — talking to your AI is faster than typing
- **Self-healing is non-negotiable** — 7,500 watchdog cycles, zero manual restarts
- **Memory makes agents a team** — without it, they're colleagues with amnesia
- **Ship daily, reflect weekly** — 120+ features in 120+ days

## Open to Opportunities

Looking for: AI engineering roles, technical co-founder partnerships, investment conversations.

**Website:** [mindswarm.dev](https://mindswarm.dev) · **Telegram:** [@sergejdrus](https://t.me/sergejdrus) · **Email:** sergej.drus@gmail.com

---

<div align="center">

*Solo founder building from Lithuania · Day 120+ · 44 skills · 4 VMs · 30+ days autonomous*

</div>
