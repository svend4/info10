# info10 — Dynamic Activation Fabric (DAF) Gateway и прототипы

Репозиторий содержит прототип веб-шлюза **Dynamic Activation Fabric (DAF)** к корпусу знаний Lorenzo (в документации указано 1719+ Markdown-документов), тестовые файлы в корне и отдельный прототип интернет-магазина цветов в невлитой ветке.

## Структура репозитория (`main`)

```text
.
├── LICENSE                             # Лицензия GNU AGPL v3.0
├── README.md                           # Этот файл
├── SESSION_SUMMARY.md                  # Резюме сессии от 11 мая 2026 (описание DAF)
├── daf-gateway/                        # Самостоятельный подпроект веб-шлюза на FastAPI
│   ├── README.md                       # Документация подпроекта DAF
│   ├── docs/
│   │   └── DAF_FULL_DOCUMENTATION.md   # Подробная документация архитектуры и деплоя
│   ├── lorenzo_pro_gateway.py          # Основной шлюз DAF v3.1 (порт 8083)
│   ├── l orenzo_pro_gateway.py         # Копия файла шлюза с пробелом в имени
│   ├── web_mcp_gateway.py              # Лёгкий вариант шлюза (порт 8081)
│   ├── web_mcp_gateway_medium.py       # Средний вариант (OpenAI-формат, порт 8082)
│   ├── requirements.txt                # Python-зависимости
│   ├── Dockerfile                      # Образ python:3.12-slim для запуска на порту 8083
│   ├── docker-compose.yml              # Связка сервисов redis и gateway
│   └── .env.example                    # Шаблон переменных окружения
└── test/                               # Тестовые текстовые файлы
    ├── hello.txt
    ├── hello1.txt
    └── hello2.txt
```

## Возможности `daf-gateway/`

По исходному коду [`daf-gateway/lorenzo_pro_gateway.py`](daf-gateway/lorenzo_pro_gateway.py) и документации в [`daf-gateway/docs/DAF_FULL_DOCUMENTATION.md`](daf-gateway/docs/DAF_FULL_DOCUMENTATION.md) в шлюзе реализованы:
- `POST /v1/chat/completions` — OpenAI-совместимый эндпоинт с очисткой голосовых запросов (`clean_voice_query`) и обращением к `docstoolkit.rag.ask`;
- `POST /api/git/write` — запись файла в репозиторий и выполнение `git add`, `git commit`, `git push` с использованием `GITHUB_TOKEN`;
- `POST /api/download` — выдача файла из контейнера через `FileResponse`;
- `GET /api/health` — проверка состояния сервиса;
- облегчённые варианты в `web_mcp_gateway.py` (`POST /api/ask`, порт `8081`) и `web_mcp_gateway_medium.py` (`POST /v1/chat/completions`, порт `8082`).

## Проверенный стек и команды запуска

- **Стек `daf-gateway/`**: Python 3.12 (`python:3.12-slim`), FastAPI, Uvicorn (`uvicorn[standard]`), Pydantic, `structlog`, Redis (`redis:7-alpine`), Docker / Docker Compose.
- **Переменные окружения** ([`daf-gateway/.env.example`](daf-gateway/.env.example)): `LORENZO_API_KEY`, `GITHUB_TOKEN`.
- **Запуск через Docker Compose** (из каталога `daf-gateway/`, согласно [`daf-gateway/README.md`](daf-gateway/README.md)):

```bash
cd daf-gateway
docker compose up --build
```

После запуска основной эндпоинт описан как `http://localhost:8083/v1/chat/completions`.

> **Важное замечание по зависимостям:** все три Python-скрипта в `daf-gateway/` импортируют `from docstoolkit.rag import ask`, однако пакет `docstoolkit` не указан в [`daf-gateway/requirements.txt`](daf-gateway/requirements.txt) и отсутствует в репозитории (требуется внешний модуль/окружение Lorenzo). Автоматических тестов в репозитории нет.

## Ветки репозитория и задачи

- `main` — основная ветка с [`SESSION_SUMMARY.md`](SESSION_SUMMARY.md), [`daf-gateway/`](daf-gateway/) и [`test/`](test/).
- `claude/react-todo-task-plan-Nfh4B` — невлитая ветка (без открытого PR), содержащая прототип интернет-магазина цветов в каталоге `flower-shop/`:
  - стек по `flower-shop/package.json`: React `^19.2.0`, React DOM `^19.2.0`, React Router DOM `^7.13.0`, TypeScript `~5.9.3`, Vite `^7.2.4`, ESLint;
  - структура `flower-shop/src/`: страницы `CatalogPage`, `FlowerDetailPage`, `CartPage`, `CheckoutPage`, контекст корзины и каталог данных;
  - команды в `flower-shop/package.json`: `npm run dev`, `npm run build`, `npm run lint`, `npm run preview`.
- `codex/readme-overview-20261118` — открытый черновик PR [#2](https://github.com/svend4/info10/pull/2) с кратким обзором `daf-gateway/` для корневого `README.md`.
- Открытый Issue [#1](https://github.com/svend4/info10/issues/1) — тестовое сообщение о подключении репозитория из сессии Grok + DAF.

## Лицензия

Проект распространяется под лицензией **GNU Affero General Public License v3.0 (AGPL-3.0)** — см. файл [`LICENSE`](LICENSE).
