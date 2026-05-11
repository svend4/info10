# Lorenzo Dynamic Activation Fabric (DAF) Gateway

This is a standalone sub-project inside the info10 repository.

**Dynamic Activation Fabric** — a live, OpenAI-compatible web gateway for the Lorenzo knowledge corpus (1719+ MD documents, 1.68M words).

Any AI model can:
- Search the entire corpus
- Download files to its sandbox
- Write changes back to GitHub via token
- Handle voice input with auto-cleaning of dictation errors
- Activate MCP servers and dynamic scripts

## Quick Start

```bash
docker compose up --build
```

Endpoint: `http://localhost:8083/v1/chat/completions`

## Files in this sub-project
- lorenzo_pro_gateway.py — Main production gateway (DAF v3.1)
- web_mcp_gateway.py — Lightweight version
- web_mcp_gateway_medium.py — Medium version with OpenAI tool calling
- Dockerfile & docker-compose.yml — Ready for deployment

All code from the Grok + Lorenzo DAF session has been consolidated here as a self-contained project.