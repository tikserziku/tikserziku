# VISAGINAS360 — Business Plan v1.0
## MCP Infrastructure-as-a-Service
### February 2026 | Confidential

---

## 1. Executive Summary

Visaginas360 — платформа для AI-управления облачной инфраструктурой через чат-интерфейс на телефоне. Пользователь описывает что хочет на естественном языке → AI выполняет через открытый протокол MCP на виртуальной машине клиента.

**Ключевые метрики:**
- Инфраструктура: Oracle VM, 43+ сервисов, работает
- MCP Tools: 40+ инструментов
- AI: Gemini (бесплатно), Groq (бесплатно), Claude (платно)
- Цена: $19/мес (VM) + $0-20/мес (AI)
- Протокол: MCP (открытый стандарт, Linux Foundation)

---

## 2. Двухуровневая модель

### Tier 1: FREE (Gemini + MCP)
- AI: Google Gemini 2.5 Flash (250 запросов/день, бесплатно)
- Подключение: Android приложение (Kotlin MCP Client)
- Авторизация: Google Sign-In
- Цена клиенту: $19/мес (только VM)
- Наши расходы на AI: $0

### Tier 2: PRO (Claude + MCP + Skills)
- AI: Claude Opus/Sonnet через Claude Pro ($20/мес)
- Подключение: Claude.ai нативный MCP коннектор
- Бонус: 100+ готовых Skills (проверенные инструкции)
- Цена клиенту: $39/мес ($19 VM + $20 Claude)
- Возможности: код-сканирование, параллельные задачи, стратегический анализ, 200K контекст

---

## 3. Техническая архитектура

| Слой | Технология | Роль | Статус |
|------|-----------|------|--------|
| Android App | Kotlin + MCP SDK | MCP Client + UI | К разработке |
| AI Brain (Free) | Gemini Flash API | NLP + Tool Calling | Готово |
| AI Brain (Pro) | Claude Pro + MCP | Продвинутый AI | Готово |
| MCP Server | Python FastMCP | Tool Provider | Работает (40+ tools) |
| VM | Oracle Cloud | Compute + Services | Работает (43 сервиса) |
| Reverse Proxy | Caddy (auto-TLS) | HTTPS + Routing | Работает |
| Auth Layer | Token-based | Изоляция клиентов | К разработке |

### Data Flow (Free tier):
1. Юзер открывает приложение → пишет "покажи статус сервисов"
2. App → Gemini Flash API (с описанием MCP tools)
3. Gemini решает вызвать `vm_list_services`
4. App → MCP Server (HTTPS) → выполняет команду
5. Результат → Gemini форматирует → юзер видит красивый ответ

---

## 4. Бизнес-модель

| Продукт | Цена | Что получает клиент | Маржа |
|---------|------|---------------------|-------|
| VM Basic | $19/мес | VM + MCP + Free AI | 74% |
| VM + Skills | $29/мес | VM + MCP + 100 Skills | 83% |
| Setup Fee | $49 разово | Настройка + онбординг | 90%+ |
| Custom Skills | $99-299 | Кастомные AI-воркфлоу | 80%+ |

### Рост:
- Месяц 1-3: 5-10 клиентов, MRR $95-190
- Месяц 4-6: 20-30 клиентов, MRR $380-570
- Месяц 7-12: 50-100 клиентов, MRR $950-1900
- Год 2: 200-500 клиентов, ARR $45K-114K

---

## 5. Skills Pack (100+ AI навыков)

| Категория | Кол-во | Примеры |
|-----------|--------|---------|
| DevOps | 20+ | Мониторинг, авто-рестарт, логи, бэкапы, деплой |
| Разработка | 15+ | Код-ревью, баг-finder, тесты, API, БД |
| Коммуникации | 15+ | Email cleanup, Gmail, Telegram, нотификации |
| Документы | 10+ | Отчёты, DOCX/PPTX/PDF, графики |
| Автоматизация | 15+ | Cron, webhooks, воркфлоу, скрапинг |
| Безопасность | 10+ | Аудит, файрвол, SSL, уязвимости, секреты |
| Бизнес | 15+ | Аналитика, CRM, инвойсы, дашборды |

---

## 6. Безопасность

- Транспорт: HTTPS (TLS 1.3, авто через Caddy)
- Аутентификация: Per-client bearer tokens в Android Keystore
- Изоляция: Каждый клиент — отдельный MCP сервер
- AI ключи: На устройстве клиента, не проходят через нас
- Аудит: Все MCP вызовы логируются
- Безопаснее чем Telegram боты (нет третьей стороны в цепочке)

---

## 7. Roadmap

| Фаза | Сроки | Что | Статус |
|------|-------|-----|--------|
| Phase 0 | Done | MCP Hub, 43 сервиса, портфолио, бот | ✅ COMPLETE |
| Phase 1 | Week 1-2 | Бизнес-план, архитектура, Skills docs | 🔄 IN PROGRESS |
| Phase 2 | Week 3-4 | Android app MVP (Kotlin + MCP + Gemini) | 📋 PLANNED |
| Phase 3 | Month 2 | Auth система, стандартизация MCP, онбординг | 📋 PLANNED |
| Phase 4 | Month 2-3 | 100 Skills, Claude Pro guide, маркетинг | 📋 PLANNED |
| Phase 5 | Month 3-4 | Google Play Store, бета (10-20 юзеров) | 📋 PLANNED |
| Phase 6 | Month 4-6 | Публичный запуск, платежи, клиентский дашборд | 📋 PLANNED |

---

## 8. Почему сейчас

1. **MCP стал стандартом**: Claude, ChatGPT, Gemini поддерживают MCP
2. **Бесплатные AI API**: Gemini 250 req/day, Groq 1000 req/day — хватает для продакшна
3. **AI-native инфра**: Рынок переходит от GUI к "скажи AI что хочешь"

---

*Visaginas360 | t.me/my_Visaginas360 | tikserziku.github.io/tikserziku*
