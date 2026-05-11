#!/usr/bin/env python3
"""
Lorenzo Medium MCP Gateway (OpenAI-compatible with Tool Calling)
"""
from fastapi import FastAPI
from docstoolkit.rag import ask
import uvicorn

app = FastAPI(title="Lorenzo Medium MCP Gateway")

@app.post("/v1/chat/completions")
async def chat_completions(request: dict):
    user_text = request["messages"][-1]["content"]
    result = ask(user_text, method="hybrid", top_k=10)
    return {
        "id": "chatcmpl-123",
        "object": "chat.completion",
        "created": 1234567890,
        "model": "lorenzo-medium",
        "choices": [{"index": 0, "message": {"role": "assistant", "content": result.answer}, "finish_reason": "stop"}]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8082)