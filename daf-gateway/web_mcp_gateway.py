#!/usr/bin/env python3
"""
Lorenzo Light MCP Gateway (Simple version)
"""
from fastapi import FastAPI
from docstoolkit.rag import ask
import uvicorn

app = FastAPI(title="Lorenzo Light MCP Gateway")

@app.post("/api/ask")
async def ask_query(query: str, mode: str = "hybrid"):
    result = ask(query, method=mode, top_k=10)
    return {"answer": result.answer}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8081)