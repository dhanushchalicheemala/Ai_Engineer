export type TaskTag = "learn" | "build" | "review" | "project" | "rest";

export interface Task {
  tag: TaskTag;
  text: string;
}

export interface Day {
  name: string;
  tasks: Task[];
}

export interface Week {
  id: string;
  phase: number;
  badge: string;
  label: string;
  title: string;
  days: Day[];
}

export const WEEKS: Week[] = [
  {
    id: "w0", phase: 0, badge: "badge-launch", label: "Week 0", title: "Launchpad — fundamentals",
    days: [
      { name: "Day 1", tasks: [
        { tag: "learn", text: "Watch Karpathy \"Deep Dive into LLMs like ChatGPT\" (3h31m) — full watch, no skipping" },
        { tag: "review", text: "Set up uv, VS Code, install extensions: Ruff, Pylance, GitLens, Continue.dev" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "learn", text: "Read Real Python asyncio walkthrough — write 3 async scripts with aiohttp" },
        { tag: "learn", text: "Pydantic V2 docs — build 5 Pydantic models (nested, validators, serialization)" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "learn", text: "3Blue1Brown: Neural Networks + Transformers + Attention (all 3 videos, ~2hrs)" },
        { tag: "review", text: "Explore OpenAI Tokenizer + bbycroft.net 3D LLM visualizer interactively" },
      ]},
      { name: "Day 4", tasks: [
        { tag: "learn", text: "MIT Missing Semester: Shell + Git (2 lectures) — practice branching, PRs, conventional commits" },
        { tag: "learn", text: "MDN HTTP reference — understand REST methods, status codes, headers, JSON" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "build", text: "Start CLI Weather App project: uv setup, async API calls, Pydantic response models" },
        { tag: "build", text: "Add error handling, retry logic, environment variables, .env file management" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "build", text: "Complete CLI app: structured logging (loguru), git history with conventional commits, README" },
        { tag: "review", text: "Python type hints refresher — annotate entire project with mypy checks passing" },
      ]},
      { name: "Day 7", tasks: [
        { tag: "rest", text: "Rest or catch-up day — review Week 0 notes, fill gaps, push project to GitHub" },
      ]},
    ],
  },
  {
    id: "w1", phase: 1, badge: "badge-m1", label: "Week 1", title: "LLM APIs deep dive",
    days: [
      { name: "Day 1", tasks: [
        { tag: "learn", text: "DeepLearning.AI \"ChatGPT Prompt Engineering for Developers\" — complete course (free, ~2hrs)" },
        { tag: "learn", text: "Read OpenAI Cookbook: streaming, function calling, structured outputs examples" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "build", text: "OpenAI: implement streaming chat, function calling with 3 tools, structured outputs via instructor" },
        { tag: "learn", text: "Anthropic Cookbook: tool use patterns — implement same 3 tools on Claude API" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "build", text: "Gemini API: function calling, structured outputs — make all 3 providers do same task" },
        { tag: "learn", text: "Read: Anthropic \"Introducing Advanced Tool Use\" blog + OpenAI \"Introducing Structured Outputs\" announcement" },
      ]},
      { name: "Day 4", tasks: [
        { tag: "build", text: "Build unified provider wrapper class: common interface, model routing, error normalization" },
        { tag: "build", text: "Add streaming SSE handler, retry with exponential backoff, request/response logging" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "build", text: "Add cost tracking: token counting per provider, cost calculator per model, usage dashboard" },
        { tag: "build", text: "Implement Pydantic output schemas — same schema works across all 3 providers" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "build", text: "Polish project: tests with pytest, README with architecture diagram, push to GitHub" },
        { tag: "review", text: "Read official docs: OpenAI Function Calling + Anthropic Tool Use + Gemini Function Calling" },
      ]},
      { name: "Day 7", tasks: [
        { tag: "rest", text: "Review week — try all 3 APIs for a task you care about, note differences in quality/cost" },
      ]},
    ],
  },
  {
    id: "w2", phase: 1, badge: "badge-m1", label: "Week 2", title: "Prompt engineering at scale + DSPy",
    days: [
      { name: "Day 1", tasks: [
        { tag: "learn", text: "Coursera \"Prompt Engineering for ChatGPT\" — complete modules 1-3 (free audit)" },
        { tag: "learn", text: "OpenAI Prompt Engineering Guide — read all patterns: few-shot, chain-of-thought, role prompting" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "learn", text: "DSPy docs — understand Predict, ChainOfThought, ReAct modules (dspy.ai getting started)" },
        { tag: "build", text: "Build first DSPy program: dspy.Predict for classification, compare to hand-written prompts" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "build", text: "Upgrade to dspy.ChainOfThought — observe reasoning traces, analyze where it helps" },
        { tag: "learn", text: "DSPy 0-to-1 guide repo — study examples, understand optimizer contracts" },
      ]},
      { name: "Day 4", tasks: [
        { tag: "build", text: "Collect 50-100 labeled examples for your classifier, format as dspy.Example objects" },
        { tag: "build", text: "Run dspy.MIPROv2 optimizer — let DSPy auto-write prompts, compare vs your hand-crafted versions" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "build", text: "Benchmark: run both prompts on 100 test cases, measure accuracy/cost/latency per prompt version" },
        { tag: "build", text: "Build prompt versioning system: store prompts in JSON, A/B test framework, metrics logging" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "build", text: "Finalize classifier: deploy as FastAPI endpoint, structured output, documentation" },
        { tag: "review", text: "Anthropic prompt engineering docs — read extended thinking, prompt chaining patterns" },
      ]},
      { name: "Day 7", tasks: [
        { tag: "rest", text: "Rest or catch-up — explore DSPy examples repo, note any patterns useful for your future work" },
      ]},
    ],
  },
  {
    id: "w3", phase: 1, badge: "badge-m1", label: "Week 3", title: "RAG systems — embeddings, vector DBs",
    days: [
      { name: "Day 1", tasks: [
        { tag: "learn", text: "DeepLearning.AI \"Retrieval Augmented Generation (RAG)\" — complete all 5 modules (free)" },
        { tag: "learn", text: "Read Pinecone \"Choosing an Embedding Model\" + check MTEB Leaderboard for top models 2025" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "build", text: "Set up Qdrant (Docker) and pgvector (local Postgres) — index same 500 documents in both" },
        { tag: "learn", text: "DeepLearning.AI \"Building Applications with Vector Databases\" — complete course" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "build", text: "Implement chunking strategies: fixed-size, sentence-aware, semantic — compare retrieval quality" },
        { tag: "build", text: "Test 2 embedding models (e.g. text-embedding-3-small vs Qwen3-Embedding) — measure recall@10" },
      ]},
      { name: "Day 4", tasks: [
        { tag: "build", text: "Implement BM25 keyword search alongside vector search — set up hybrid retrieval pipeline" },
        { tag: "build", text: "Add cross-encoder reranking (sentence-transformers) — measure MRR improvement with/without" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "build", text: "Build Q&A FastAPI endpoint: document upload → chunk → embed → store → query → rerank → answer" },
        { tag: "build", text: "Add source citation, confidence scoring, fallback when context is insufficient" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "build", text: "Test with diverse documents: PDF, markdown, code — handle different formats cleanly" },
        { tag: "review", text: "LlamaIndex docs — understand connectors, query engines, compare to your raw implementation" },
      ]},
      { name: "Day 7", tasks: [
        { tag: "rest", text: "Review week — document your chunking strategy decisions, which worked best and why" },
      ]},
    ],
  },
  {
    id: "w4", phase: 1, badge: "badge-m1", label: "Week 4", title: "Advanced RAG + Evaluation",
    days: [
      { name: "Day 1", tasks: [
        { tag: "learn", text: "Read Anthropic \"Contextual Retrieval\" blog post fully — understand the 67% failure reduction claim" },
        { tag: "build", text: "Implement Contextual Retrieval: add Claude-generated context prefix to each chunk before embedding" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "learn", text: "RAGAS docs — understand faithfulness, answer relevancy, context precision/recall metrics" },
        { tag: "build", text: "Install RAGAS, generate 50-example synthetic test dataset, run baseline evaluation on your RAG" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "learn", text: "DeepEval docs — set up pytest-style eval suite, configure G-Eval and hallucination metrics" },
        { tag: "build", text: "Run DeepEval on your RAG — compare scores to RAGAS, investigate where they disagree" },
      ]},
      { name: "Day 4", tasks: [
        { tag: "build", text: "Implement Reciprocal Rank Fusion for hybrid search combination — measure recall improvement" },
        { tag: "build", text: "Add LLM-as-Judge evaluator: use Claude/GPT-4 to score relevance, faithfulness on 100 queries" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "build", text: "Build eval dashboard: track faithfulness, relevancy, context recall per config — visualize tradeoffs" },
        { tag: "build", text: "Run ablation study: compare 8 RAG configurations (2 chunk sizes × 2 embeddings × with/without rerank)" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "build", text: "Target <5% retrieval failure rate — tune system until you hit it, document what moved the needle" },
        { tag: "review", text: "Confident AI blog \"G-Eval\" + \"LLM-as-Judge\" articles — deepen understanding of eval methodology" },
      ]},
      { name: "Day 7", tasks: [
        { tag: "rest", text: "Rest — Month 1 complete. Write a short reflection: what surprised you, what was harder than expected" },
      ]},
    ],
  },
  {
    id: "w5", phase: 2, badge: "badge-m2", label: "Week 5", title: "Agent architectures — ReAct, LangGraph",
    days: [
      { name: "Day 1", tasks: [
        { tag: "learn", text: "DeepLearning.AI \"Agentic AI with Andrew Ng\" — all 4 agentic patterns: Reflection, Tool Use, Planning, Multi-agent" },
        { tag: "learn", text: "Read \"Building Production-Ready AI Agents with LangGraph: Complete 2025 Guide\" — Versalence blog" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "build", text: "Build ReAct agent from scratch (no framework): thought-action-observation loop in ~100 lines Python" },
        { tag: "learn", text: "LangChain Academy \"Introduction to LangGraph\" — complete all modules (free)" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "build", text: "freeCodeCamp LangGraph Full Course — code along: build stateful agent with memory + tool use" },
        { tag: "build", text: "Rebuild your ReAct agent in LangGraph — compare code length, debuggability, state management" },
      ]},
      { name: "Day 4", tasks: [
        { tag: "learn", text: "DeepLearning.AI \"AI Agents in LangGraph\" — complete course, focus on persistence and checkpointing" },
        { tag: "build", text: "Add human-in-the-loop to your agent: interrupt nodes, user approval before sensitive actions" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "build", text: "Build Research Agent: web search tool + document scraper + structured report output" },
        { tag: "build", text: "Add session memory with LangGraph checkpointer — agent remembers across conversation turns" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "build", text: "Deploy Research Agent as FastAPI app with streaming SSE output, conversation history endpoint" },
        { tag: "review", text: "Read LangGraph releases — understand latest features, LangGraph Platform for production deployment" },
      ]},
      { name: "Day 7", tasks: [
        { tag: "rest", text: "Rest or catch-up — explore Anthropic MCP documentation, understand why it matters for agents" },
      ]},
    ],
  },
  {
    id: "w6", phase: 2, badge: "badge-m2", label: "Week 6", title: "Multi-agent systems — CrewAI, AutoGen",
    days: [
      { name: "Day 1", tasks: [
        { tag: "learn", text: "DeepLearning.AI \"Multi AI Agent Systems with crewAI\" — complete all modules (taught by CrewAI founder)" },
        { tag: "learn", text: "DataCamp \"CrewAI vs LangGraph vs AutoGen\" comparison article — understand when to use each" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "build", text: "Build first CrewAI crew: define 3 agents with roles/goals/backstory, assign tasks, run sequential process" },
        { tag: "learn", text: "DeepLearning.AI \"A2A: The Agent2Agent Protocol\" — understand Google's agent communication standard" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "build", text: "Content Research Crew: Research Agent (Serper/Tavily) + Writer Agent + Editor Agent" },
        { tag: "build", text: "Add process flow: hierarchical process with manager agent delegating to specialist agents" },
      ]},
      { name: "Day 4", tasks: [
        { tag: "build", text: "Add human-in-the-loop: pause before publish, show draft to human, incorporate feedback" },
        { tag: "build", text: "Implement crew memory: short-term (within task) + long-term (Mem0 for cross-crew memory)" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "build", text: "Deploy crew as FastAPI app: POST endpoint triggers crew, WebSocket streams progress updates" },
        { tag: "learn", text: "AutoGen docs — understand the shift to Microsoft Agent Framework, study architecture differences" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "build", text: "Add error handling: agent retry on failure, fallback strategies, crew execution timeout limits" },
        { tag: "review", text: "Review your multi-agent project end-to-end — write architecture doc with decision rationale" },
      ]},
      { name: "Day 7", tasks: [
        { tag: "rest", text: "Rest — multi-agent systems can get complex fast. Consolidate mental model before moving on" },
      ]},
    ],
  },
  {
    id: "w7", phase: 2, badge: "badge-m2", label: "Week 7", title: "Production LLM apps with FastAPI",
    days: [
      { name: "Day 1", tasks: [
        { tag: "learn", text: "FastAPI official docs: advanced features — background tasks, middleware, dependencies, lifespan events" },
        { tag: "learn", text: "DEV Community \"FastAPI LLM Master Series Episode 1\" — read and replicate the patterns" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "build", text: "Build production FastAPI app: singleton LLM client at startup (lifespan), connection pooling" },
        { tag: "build", text: "Implement SSE streaming endpoint for LLM responses — test with multiple concurrent clients" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "learn", text: "Redis docs: LangCache semantic caching — understand vector similarity threshold, TTL strategies" },
        { tag: "build", text: "Add Redis semantic caching: embed queries, check cache before API call, measure cache hit rates" },
      ]},
      { name: "Day 4", tasks: [
        { tag: "build", text: "Implement per-user rate limiting with Redis: sliding window algorithm, 429 responses with Retry-After" },
        { tag: "build", text: "Structured JSON logging with correlation IDs — every request gets unique trace ID through entire stack" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "build", text: "Add multi-model routing: simple queries → GPT-4o-mini, complex → GPT-4o, fallback chain on errors" },
        { tag: "build", text: "Prometheus metrics endpoint: request count, latency p50/p95/p99, token usage, cache hit rate" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "build", text: "Dockerize: multi-stage Dockerfile + Gunicorn + Uvicorn workers + docker-compose with Redis" },
        { tag: "review", text: "Redis \"LLMOps Guide 2026\" article — compare your implementation vs their recommended patterns" },
      ]},
      { name: "Day 7", tasks: [
        { tag: "rest", text: "Rest — load test your API with locust or k6. Watch it break. Then fix the bottleneck." },
      ]},
    ],
  },
  {
    id: "w8", phase: 2, badge: "badge-m2", label: "Week 8", title: "Databases for AI apps",
    days: [
      { name: "Day 1", tasks: [
        { tag: "learn", text: "Supabase AI & Vectors docs — pgvector integration, embedding storage, similarity search functions" },
        { tag: "build", text: "Set up Supabase project, enable pgvector, create embeddings table, insert 1000 documents" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "build", text: "HNSW vs IVFFlat index comparison: create both, benchmark QPS and recall on same queries" },
        { tag: "learn", text: "Neon blog \"Building Intelligent Search with AI Embeddings\" — read and try their approach" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "build", text: "Build full RAG app on Supabase/Neon: document upload → chunk → embed → store → query pipeline" },
        { tag: "build", text: "Add Redis semantic caching layer on top — measure cost savings at various cache hit rates" },
      ]},
      { name: "Day 4", tasks: [
        { tag: "build", text: "PostgreSQL best practices: connection pooling with pgBouncer, query optimization, EXPLAIN ANALYZE" },
        { tag: "learn", text: "Medium \"Why AI Startups Choose PostgreSQL\" — understand the Supabase vs Neon vs raw Postgres tradeoffs" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "build", text: "Add authentication layer: JWT tokens, per-user data isolation, RLS (Row Level Security) in Supabase" },
        { tag: "build", text: "Build full-stack test: React/Next.js frontend → FastAPI → Supabase + Redis — end to end working" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "build", text: "Add monitoring: track query latency, index performance, cache metrics in a simple dashboard" },
        { tag: "review", text: "Review entire Month 2 — you now have agents, production APIs, and databases. Document what you built." },
      ]},
      { name: "Day 7", tasks: [
        { tag: "rest", text: "Rest — Month 2 complete. You can now build and ship real AI apps. Take stock of how far you've come." },
      ]},
    ],
  },
  {
    id: "w9", phase: 3, badge: "badge-m3", label: "Week 9", title: "Frontend for AI apps — Next.js + Vercel AI SDK",
    days: [
      { name: "Day 1", tasks: [
        { tag: "learn", text: "Vercel Academy \"Builders Guide to the AI SDK\" — complete the full course (generateText, streamText, useChat)" },
        { tag: "build", text: "Create Next.js App Router project, install AI SDK v6, build basic chat UI with useChat hook" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "build", text: "Add streaming: watch tokens arrive in real-time, add loading states, error boundaries, retry UI" },
        { tag: "learn", text: "Study vercel/chatbot repo: understand the full production template architecture" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "build", text: "Multi-provider support: add provider selector (OpenAI / Anthropic / Gemini) using AI Gateway" },
        { tag: "build", text: "Tool calling in UI: implement web search tool, show tool execution status in the chat interface" },
      ]},
      { name: "Day 4", tasks: [
        { tag: "build", text: "Message persistence: save conversation history to Supabase (from Week 8), load on page return" },
        { tag: "build", text: "Authentication: add NextAuth.js, protect routes, per-user conversation isolation" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "build", text: "AI SDK v6 features: add ToolLoopAgent abstraction, MCP tool integration, DevTools for debugging" },
        { tag: "build", text: "Responsive design: mobile-first layout, auto-scroll, copy message, regenerate response" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "build", text: "Deploy to Vercel: environment variables, edge runtime for streaming, preview deployments" },
        { tag: "review", text: "Vercel Blog \"AI SDK 6\" article — make sure you're using the latest patterns" },
      ]},
      { name: "Day 7", tasks: [
        { tag: "rest", text: "Rest — share your deployed chat app. Show someone. Get feedback on the UX." },
      ]},
    ],
  },
  {
    id: "w10", phase: 3, badge: "badge-m3", label: "Week 10", title: "Docker and containerization",
    days: [
      { name: "Day 1", tasks: [
        { tag: "learn", text: "TechWorld with Nana \"Docker Tutorial for Beginners FULL COURSE\" (3 hours) — code along entirely" },
        { tag: "build", text: "Docker 101 Tutorial — run all exercises, understand layers, caching, volumes, networks" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "learn", text: "Neptune.ai \"Best Practices When Working With Docker for ML\" — read and apply to your projects" },
        { tag: "build", text: "Multi-stage Dockerfile for FastAPI: builder stage (install deps) → runtime stage (copy only needed files)" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "build", text: "Optimize image size: python:3.11 (1GB+) → python:3.11-slim → distroless (~150MB). Measure each." },
        { tag: "build", text: "Non-root user, health checks, resource limits (--cpus, --memory) — security best practices" },
      ]},
      { name: "Day 4", tasks: [
        { tag: "build", text: "docker-compose.yml: FastAPI + PostgreSQL + Redis + Nginx reverse proxy — full local stack" },
        { tag: "build", text: "Environment-specific configs: .env.dev vs .env.prod, Docker secrets for sensitive values" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "build", text: "GPU support: NVIDIA Container Toolkit setup, verify CUDA available inside container, run vLLM" },
        { tag: "build", text: "Image scanning: run Trivy on your image, fix critical/high CVEs found" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "build", text: "Push to GitHub Container Registry (GHCR): tag, push, pull in fresh environment — verify it works" },
        { tag: "review", text: "Fireship \"Docker in 100 Seconds\" + \"Learn Docker in 7 Easy Steps\" — quick conceptual review" },
      ]},
      { name: "Day 7", tasks: [
        { tag: "rest", text: "Rest — containerize one of your Week 1-8 projects. Everything should run with docker-compose up." },
      ]},
    ],
  },
  {
    id: "w11", phase: 3, badge: "badge-m3", label: "Week 11", title: "Cloud deployment — AWS, GCP, Azure",
    days: [
      { name: "Day 1", tasks: [
        { tag: "learn", text: "Google Codelabs \"Deploy FastAPI chatbot to Cloud Run using Gemini\" — follow step by step" },
        { tag: "build", text: "Deploy your FastAPI app from Week 7 to Cloud Run: Dockerfile → build → push → deploy" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "build", text: "Cloud Run production config: min/max instances, CPU/memory limits, concurrency, secrets via Secret Manager" },
        { tag: "build", text: "Set up Cloud Run service with custom domain, HTTPS certificate, Cloud Armor WAF" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "learn", text: "AWS docs: Lambda container images + API Gateway — understand the serverless model" },
        { tag: "build", text: "Deploy same app to AWS Lambda (container image): package, push to ECR, create function + API Gateway" },
      ]},
      { name: "Day 4", tasks: [
        { tag: "build", text: "Infrastructure-as-Code: write Terraform for your Cloud Run deployment — parameterized, reusable" },
        { tag: "build", text: "GitHub Actions deployment pipeline: push to main → build Docker image → deploy to Cloud Run" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "build", text: "Load testing: use k6 to hit your Cloud Run deployment with 100 concurrent users — watch auto-scaling" },
        { tag: "review", text: "Read AWS Generative AI Application Builder docs — understand enterprise AI deployment patterns" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "build", text: "Cost comparison: run 1000 requests on Cloud Run vs Lambda — document cost per request each" },
        { tag: "review", text: "Azure ML docs overview — understand Azure OpenAI Service, how enterprise Azure AI is structured" },
      ]},
      { name: "Day 7", tasks: [
        { tag: "rest", text: "Rest — you now have apps running in production on real cloud infrastructure. That's significant." },
      ]},
    ],
  },
  {
    id: "w12", phase: 3, badge: "badge-m3", label: "Week 12", title: "CI/CD for AI — GitHub Actions + automated evals",
    days: [
      { name: "Day 1", tasks: [
        { tag: "learn", text: "DataCamp \"CI/CD for ML\" tutorial — read fully + Made With ML \"CI/CD for Machine Learning\"" },
        { tag: "build", text: "Create .github/workflows/ci.yml: lint (ruff) + type check (mypy) + unit tests (pytest) on every PR" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "learn", text: "DeepEval docs: pytest-style LLM tests — hallucination, answer relevancy, contextual recall metrics" },
        { tag: "build", text: "Write 10 DeepEval test cases for your RAG system — set pass/fail thresholds, integrate into CI" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "learn", text: "CML docs — understand how to post ML metrics as PR comments with charts and tables" },
        { tag: "build", text: "Add CML to CI: train a small model, post loss curve and metrics as comment on every PR" },
      ]},
      { name: "Day 4", tasks: [
        { tag: "build", text: "DVC setup: version your datasets and model artifacts — commit data changes get tracked like code" },
        { tag: "build", text: "Full pipeline: data change → DVC repro → CML metrics → DeepEval tests → deploy if all pass" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "build", text: "CD pipeline: merge to main → Docker build → push to GHCR → deploy to Cloud Run via gcloud CLI" },
        { tag: "build", text: "Staging environment: PRs deploy to staging URL, production only on main merge" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "build", text: "Rollback strategy: keep last 3 Cloud Run revisions, add rollback job to GitHub Actions" },
        { tag: "review", text: "Langfuse \"LLM Testing: A Practical Guide\" — ensure your eval pipeline covers the key failure modes" },
      ]},
      { name: "Day 7", tasks: [
        { tag: "rest", text: "Rest — Month 3 complete. You can now build, deploy, and maintain AI applications end-to-end." },
      ]},
    ],
  },
  {
    id: "w13", phase: 4, badge: "badge-m4", label: "Week 13", title: "Fine-tuning fundamentals",
    days: [
      { name: "Day 1", tasks: [
        { tag: "learn", text: "DeepLearning.AI \"Finetuning Large Language Models\" by Sharon Zhou — complete course (free)" },
        { tag: "learn", text: "Sebastian Raschka \"Finetuning Large Language Models\" article — read carefully, take notes" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "learn", text: "IBM \"RAG vs Fine-Tuning vs Prompt Engineering\" + Monte Carlo \"RAG vs Fine Tuning\" — read both" },
        { tag: "build", text: "Same task 3 ways: pick customer support classification — implement with prompt engineering first" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "build", text: "Implement same task with RAG: build small knowledge base of support docs, measure accuracy" },
        { tag: "learn", text: "Lilian Weng \"Thinking about High-Quality Human Data\" — understand what makes good training data" },
      ]},
      { name: "Day 4", tasks: [
        { tag: "build", text: "Dataset preparation: collect/curate 500 examples for fine-tuning, clean, deduplicate, split 80/10/10" },
        { tag: "learn", text: "Hugging Face PEFT docs: understand LoRA math — rank decomposition, why it works, when it fails" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "build", text: "Fine-tune GPT-4o-mini via OpenAI API on your dataset — measure accuracy vs prompt engineering" },
        { tag: "build", text: "Document results: accuracy, latency, cost per 1000 requests for all 3 approaches — make decision framework" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "learn", text: "DeepLearning.AI \"Fine-tuning and RL for LLMs: Intro to Post-Training\" — complete course" },
        { tag: "review", text: "Read: when does fine-tuning fail? Common mistakes, overfitting signs, data quality issues" },
      ]},
      { name: "Day 7", tasks: [
        { tag: "rest", text: "Rest — fine-tuning mindset shift: it's about the data, not the training. Internalize that." },
      ]},
    ],
  },
  {
    id: "w14", phase: 4, badge: "badge-m4", label: "Week 14", title: "LoRA and QLoRA fine-tuning with Unsloth",
    days: [
      { name: "Day 1", tasks: [
        { tag: "learn", text: "Unsloth docs: LoRA hyperparameters guide — understand rank, alpha, target modules, why QLoRA works" },
        { tag: "learn", text: "Neptune.ai \"Fine-Tuning Llama 3 with LoRA\" — read and prepare your Colab environment" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "build", text: "Google Colab (free T4 GPU): install Unsloth, load Llama 3.1 8B in 4-bit QLoRA" },
        { tag: "build", text: "Fine-tune on instruction dataset (Alpaca or custom): monitor loss curve, watch for overfitting signs" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "build", text: "Hyperparameter experiments: try rank 8 vs 16 vs 32, alpha 16 vs 32 — log results systematically" },
        { tag: "build", text: "Export to GGUF format, install Ollama locally, run fine-tuned model — test qualitatively" },
      ]},
      { name: "Day 4", tasks: [
        { tag: "build", text: "Systematic evaluation: 100 prompt test set, compare base Llama vs your fine-tuned version on each" },
        { tag: "learn", text: "Hugging Face TRL docs: understand DPO (preference tuning) — when fine-tuning for style/alignment" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "build", text: "Fine-tune with DPO: collect 50 preference pairs (chosen vs rejected), run DPO training on Unsloth" },
        { tag: "build", text: "Upload fine-tuned model to HuggingFace Hub — write model card with training details and evals" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "learn", text: "NVIDIA Blog \"How to Fine-Tune LLMs on RTX GPUs With Unsloth\" — understand memory math" },
        { tag: "review", text: "Axolotl docs — understand multi-GPU fine-tuning setup for when you need more than one GPU" },
      ]},
      { name: "Day 7", tasks: [
        { tag: "rest", text: "Rest — you've fine-tuned a real LLM. Most AI engineers haven't done this. It matters." },
      ]},
    ],
  },
  {
    id: "w15", phase: 4, badge: "badge-m4", label: "Week 15", title: "Training at scale — GPU infrastructure",
    days: [
      { name: "Day 1", tasks: [
        { tag: "learn", text: "Modal docs + blog \"Best frameworks for fine-tuning LLMs in 2025\" — understand serverless GPU model" },
        { tag: "build", text: "Set up Modal account (free $30/mo), deploy simple GPU function — verify H100 access works" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "learn", text: "Hugging Face Accelerate docs — understand FSDP vs DDP vs DeepSpeed ZeRO, when to use each" },
        { tag: "build", text: "Convert your Unsloth script to Accelerate — test multi-GPU simulation with 2 T4s on RunPod" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "build", text: "Modal training job: run same fine-tuning job on Modal with 1× A100 — measure time vs Colab T4" },
        { tag: "build", text: "RunPod setup: spin up spot instance, run training, save checkpoint to network storage, terminate" },
      ]},
      { name: "Day 4", tasks: [
        { tag: "learn", text: "DeepSpeed ZeRO docs: understand ZeRO-1, ZeRO-2, ZeRO-3 memory savings — run ZeRO-2 example" },
        { tag: "build", text: "Together AI managed fine-tuning: submit a job via their API, compare to Modal — cost and control tradeoff" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "build", text: "Cost comparison spreadsheet: same training job on Colab/RunPod/Modal/Together AI — cost + time matrix" },
        { tag: "build", text: "Checkpoint management: save every N steps, resume from checkpoint, understand why this matters" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "learn", text: "RunPod \"GPU Requirements for LLM Fine-Tuning\" guide — memorize the VRAM math for different model sizes" },
        { tag: "review", text: "Stanford RCPedia \"Fine-Tuning Open Source Models\" — real-world production fine-tuning patterns" },
      ]},
      { name: "Day 7", tasks: [
        { tag: "rest", text: "Rest — GPU infrastructure knowledge is a significant career differentiator. You now have it." },
      ]},
    ],
  },
  {
    id: "w16", phase: 4, badge: "badge-m4", label: "Week 16", title: "Model evaluation, safety, and guardrails",
    days: [
      { name: "Day 1", tasks: [
        { tag: "learn", text: "Stanford HELM docs — run HELM on your fine-tuned model: accuracy, calibration, robustness, toxicity" },
        { tag: "learn", text: "Evidently AI \"10 LLM Safety and Bias Benchmarks\" — understand the benchmark landscape" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "learn", text: "Lilian Weng \"Extrinsic Hallucinations in LLMs\" — read fully, understand types and mitigations" },
        { tag: "build", text: "NVIDIA NeMo Guardrails: set up input rails (topic filtering), output rails (fact checking), dialog flows" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "build", text: "Guardrails AI: add PII detection/redaction to your FastAPI app — test with fake SSNs, emails, phones" },
        { tag: "build", text: "Red teaming: create 50-question adversarial dataset (jailbreaks, prompt injections, toxic requests)" },
      ]},
      { name: "Day 4", tasks: [
        { tag: "build", text: "Run your red teaming dataset against your app — document how each guardrail performs, false positive rate" },
        { tag: "learn", text: "Guardrails Index (Feb 2025) — benchmark of 24 guardrails, understand precision/recall tradeoffs" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "build", text: "Build safety scorecard: hallucination rate, PII leakage rate, adversarial robustness, guardrail latency overhead" },
        { tag: "build", text: "Integrate DeepEval safety metrics into your CI/CD from Week 12 — safety gates on every deployment" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "learn", text: "DeepLearning.AI \"Reinforcement Fine-Tuning LLMs with GRPO\" — understand RLHF/GRPO for alignment" },
        { tag: "review", text: "Review Month 4 entirely — you now understand the full model customization stack" },
      ]},
      { name: "Day 7", tasks: [
        { tag: "rest", text: "Rest — Month 4 complete. Fine-tuning, safety, evaluation. These are senior AI engineer skills." },
      ]},
    ],
  },
  {
    id: "w17", phase: 5, badge: "badge-m5", label: "Week 17", title: "Model serving — vLLM, Triton, BentoML",
    days: [
      { name: "Day 1", tasks: [
        { tag: "learn", text: "vLLM blog \"2024 Retrospective and 2025 Vision\" + The New Stack \"Introduction to vLLM\" — read both" },
        { tag: "build", text: "Install vLLM (Docker), serve Llama 3.1 8B — verify OpenAI-compatible API with curl requests" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "learn", text: "NVIDIA \"Mastering LLM Techniques: Inference Optimization\" — understand PagedAttention, continuous batching" },
        { tag: "build", text: "vLLM quantization: run same model at FP16, INT8 (bitsandbytes), FP8 — benchmark quality vs speed tradeoff" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "build", text: "Benchmarking: use vLLM benchmark_serving.py — measure throughput (tokens/sec) at 1, 10, 50 concurrent requests" },
        { tag: "build", text: "vLLM tensor parallelism: split model across 2 GPUs on RunPod — verify latency improvement" },
      ]},
      { name: "Day 4", tasks: [
        { tag: "learn", text: "BentoML docs — understand Service, Runner, deployment YAML format, Bentos as deployment units" },
        { tag: "build", text: "Package your vLLM endpoint as a BentoML Service — add input validation, output post-processing" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "build", text: "Prometheus metrics: request rate, TTFT (time to first token), e2e latency, GPU utilization" },
        { tag: "build", text: "Grafana dashboard: create panels for all 4 metrics — set up alerting rules for latency/error thresholds" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "learn", text: "Modal \"How to Deploy vLLM\" blog — compare their approach to your self-hosted setup" },
        { tag: "review", text: "Triton Inference Server overview — understand when Triton is better than vLLM (multi-model, non-LLM)" },
      ]},
      { name: "Day 7", tasks: [
        { tag: "rest", text: "Rest — serving models at scale is a specialist skill. You now understand the full inference stack." },
      ]},
    ],
  },
  {
    id: "w18", phase: 5, badge: "badge-m5", label: "Week 18", title: "Observability — Langfuse, LangSmith, Braintrust",
    days: [
      { name: "Day 1", tasks: [
        { tag: "learn", text: "LangChain Academy \"Introduction to Agent Observability & Evaluations\" — complete course" },
        { tag: "build", text: "Self-host Langfuse with Docker Compose: postgres + langfuse containers, configure env vars, test UI" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "build", text: "Instrument Week 7 FastAPI app with Langfuse SDK: trace every LLM call, log inputs/outputs/latency" },
        { tag: "build", text: "Add token usage tracking: cost per request, cumulative daily/monthly cost — make it visible in UI" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "build", text: "Instrument RAG pipeline: trace each component (retrieval, reranking, generation) as separate spans" },
        { tag: "build", text: "Identify bottleneck: which component takes longest? Which costs most? Fix the worst offender." },
      ]},
      { name: "Day 4", tasks: [
        { tag: "build", text: "LLM-as-Judge in Langfuse: add automated evaluators scoring quality, faithfulness, relevancy on each trace" },
        { tag: "learn", text: "Braintrust \"7 Best AI Observability Platforms\" + OpenTelemetry blog \"AI Agent Observability (Feb 2026)\"" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "build", text: "Grafana dashboard: pull Langfuse metrics, visualize cost/quality trends over time, add alerting" },
        { tag: "build", text: "Set up LangSmith for comparison: instrument same app, compare UX and features vs Langfuse" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "build", text: "OpenLLMetry/Traceloop: instrument with OTel-native SDK, verify traces in Langfuse (OTel compatible)" },
        { tag: "review", text: "Review: document your observability setup — what metrics matter, what thresholds you set, why" },
      ]},
      { name: "Day 7", tasks: [
        { tag: "rest", text: "Rest — observability is what separates \"it works on my machine\" from production engineering." },
      ]},
    ],
  },
  {
    id: "w19", phase: 5, badge: "badge-m5", label: "Week 19", title: "Vector databases at scale — production optimization",
    days: [
      { name: "Day 1", tasks: [
        { tag: "learn", text: "Firecrawl \"Best Vector Databases in 2025\" + Xenoss \"Pinecone vs Qdrant vs Weaviate\" — read both comparisons" },
        { tag: "learn", text: "TigerData \"Pgvector vs Qdrant (50M vector benchmarks)\" — understand the performance numbers" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "build", text: "Qdrant production setup (Docker): create collection with HNSW, insert 100K vectors, benchmark QPS" },
        { tag: "build", text: "Enable scalar quantization: measure 4× memory reduction, 2.8× speed improvement on your dataset" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "build", text: "On-disk storage in Qdrant: mmap vectors (for large datasets), measure latency vs in-memory" },
        { tag: "build", text: "Payload filtering: add metadata to vectors (user_id, doc_type, date), filter at query time efficiently" },
      ]},
      { name: "Day 4", tasks: [
        { tag: "build", text: "Multi-tenancy: implement per-user vector isolation using Qdrant named collections or payload filtering" },
        { tag: "build", text: "VectorDBBench: run standardized benchmark comparing your Qdrant vs pgvector setup on same 100K dataset" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "build", text: "Pinecone serverless: migrate same dataset, compare: managed vs self-hosted cost at 100K and 1M vectors" },
        { tag: "build", text: "Build migration script: Qdrant → Pinecone and back — so you're never locked in to one provider" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "build", text: "Index update strategies: batch vs real-time, soft delete vs hard delete, reindexing without downtime" },
        { tag: "review", text: "Document your vector DB decision framework: when to use each, cost thresholds, scale breakpoints" },
      ]},
      { name: "Day 7", tasks: [
        { tag: "rest", text: "Rest — you now understand vector databases at a level most engineers never reach" },
      ]},
    ],
  },
  {
    id: "w20", phase: 5, badge: "badge-m5", label: "Week 20", title: "Security for AI apps — OWASP LLM Top 10",
    days: [
      { name: "Day 1", tasks: [
        { tag: "learn", text: "OWASP Top 10 for LLMs PDF (2025) — read all 10 risks with examples, focus on LLM01 prompt injection" },
        { tag: "learn", text: "Simon Willison Prompt Injection Series — read at least 10 posts, understand the \"Lethal Trifecta\"" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "learn", text: "Simon Willison \"Prompt injection and jailbreaking are not the same thing\" — critical distinction" },
        { tag: "build", text: "Test your own apps for prompt injection: try 20 different injection attacks, document which succeed" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "build", text: "Promptfoo red teaming: configure promptfooconfig.yaml, run OWASP LLM Top 10 test suite against your API" },
        { tag: "build", text: "Implement input sanitization: regex PII detection + spaCy NER for names/emails/phones — measure precision" },
      ]},
      { name: "Day 4", tasks: [
        { tag: "build", text: "LLM Guard integration: add prompt injection classifier + output toxicity filter to your FastAPI middleware" },
        { tag: "build", text: "Lakera Guard API: compare to LLM Guard on your adversarial dataset — false positive vs detection rate" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "build", text: "OWASP LLM06 (Excessive Agency): audit your agents — do they have minimum necessary permissions?" },
        { tag: "build", text: "Security monitoring: add security event logging to Langfuse — flag injection attempts, unusual patterns" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "build", text: "Write security review doc for your most complex project: threat model, mitigations, residual risks" },
        { tag: "review", text: "Review OWASP Prompt Injection Prevention Cheat Sheet — implement any mitigations you missed" },
      ]},
      { name: "Day 7", tasks: [
        { tag: "rest", text: "Rest — Month 5 complete. You can now build, serve, observe, and secure AI systems at scale." },
      ]},
    ],
  },
  {
    id: "w21", phase: 6, badge: "badge-m6", label: "Week 21", title: "Multimodal AI — vision, audio, image",
    days: [
      { name: "Day 1", tasks: [
        { tag: "learn", text: "DeepLearning.AI \"Building Multimodal Search and RAG\" — complete course" },
        { tag: "learn", text: "GetStream \"GPT-4o Vision Guide\" + Anthropic Claude Vision docs — understand multimodal API patterns" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "build", text: "Image understanding: feed 20 diverse images (diagrams, charts, photos, screenshots) to GPT-4V + Claude Vision" },
        { tag: "build", text: "Build image-aware RAG: embed images with CLIP, store in Qdrant, retrieve by text query → return images" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "build", text: "Document processing pipeline: PDF → extract images + text → multimodal extraction → structured JSON" },
        { tag: "learn", text: "IBM Coursera \"Build Multimodal Generative AI Applications\" — complete relevant modules" },
      ]},
      { name: "Day 4", tasks: [
        { tag: "build", text: "Whisper audio transcription: transcribe 10 audio files, chunk transcript, embed and index for search" },
        { tag: "build", text: "Meeting intelligence prototype: audio file → Whisper → LLM summary → action items → calendar event" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "build", text: "Choose your multimodal capstone direction: Document Analyzer / Visual Search / Meeting Assistant / Invoice Processor" },
        { tag: "build", text: "Build v1 of chosen project: core pipeline working end-to-end, even if rough" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "build", text: "Add streaming, error handling, and a basic UI to your multimodal project" },
        { tag: "review", text: "MIT OCW \"How to AI (Almost) Anything\" — skim relevant modules for your chosen direction" },
      ]},
      { name: "Day 7", tasks: [
        { tag: "rest", text: "Rest — multimodal AI opens up enormous new categories of applications. You now have the basics." },
      ]},
    ],
  },
  {
    id: "w22", phase: 6, badge: "badge-m6", label: "Week 22", title: "Advanced agents — memory, Composio, E2B",
    days: [
      { name: "Day 1", tasks: [
        { tag: "learn", text: "The New Stack \"Memory for AI Agents: A New Paradigm of Context Engineering\" + arXiv Mem0 paper" },
        { tag: "build", text: "Integrate Mem0 into a LangGraph agent: add cross-session memory, verify it persists across restarts" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "learn", text: "E2B docs: understand sandboxed code execution — why it matters for agent security" },
        { tag: "build", text: "E2B integration: agent writes Python code → E2B executes in sandbox → returns output to agent" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "learn", text: "Composio docs: 1000+ integrations — connect GitHub, Gmail, Calendar, Slack to your agent" },
        { tag: "build", text: "Build agent with Composio: connects to GitHub (list issues, create PRs), Gmail (read/send emails)" },
      ]},
      { name: "Day 4", tasks: [
        { tag: "build", text: "Long-Running Research Agent: web browse → Mem0 memory → E2B code execution → GitHub integration → report" },
        { tag: "build", text: "Add streaming progress updates: WebSocket broadcasts each agent step to a React frontend in real-time" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "build", text: "Error recovery: agent self-corrects on tool failures, retries with different approach, asks human if stuck" },
        { tag: "build", text: "Session management: pause/resume long-running agents, serialize state to Redis, restore on reconnect" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "build", text: "Deploy agent system: Cloud Run for orchestrator, separate container for E2B sandboxes, Redis for state" },
        { tag: "review", text: "AWS \"AgentCore Long-Term Memory Deep Dive\" — compare their approach to your Mem0 implementation" },
      ]},
      { name: "Day 7", tasks: [
        { tag: "rest", text: "Rest — week before capstone. Rest. You're building something real next week." },
      ]},
    ],
  },
  {
    id: "w23", phase: 6, badge: "badge-m6", label: "Week 23", title: "Capstone Project 1 — Full Production AI SaaS",
    days: [
      { name: "Day 1", tasks: [
        { tag: "project", text: "Define your capstone: pick one option (Meeting Intel / Document SaaS / Data Analyst / Code Review)" },
        { tag: "project", text: "Architecture design doc: data flow diagram, tech stack decisions, API contracts, database schema" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "project", text: "Backend foundation: FastAPI app skeleton, database setup, auth (NextAuth/Supabase Auth), CI/CD pipeline ready" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "project", text: "Core AI pipeline: the main AI feature working end-to-end (transcript → insights, doc → extraction, etc.)" },
      ]},
      { name: "Day 4", tasks: [
        { tag: "project", text: "Frontend: Next.js UI with streaming, file upload, results display — usable by a real person today" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "project", text: "Observability + security: Langfuse tracing, Guardrails AI, rate limiting, error monitoring" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "project", text: "Deploy to Cloud Run: staging URL working, custom domain, all env vars in Secret Manager" },
      ]},
      { name: "Day 7", tasks: [
        { tag: "project", text: "Polish + demo: README with architecture diagram, Loom walkthrough video, GitHub repo public" },
      ]},
    ],
  },
  {
    id: "w24", phase: 6, badge: "badge-m6", label: "Week 24", title: "Capstone Project 2 — Infrastructure + Frontier",
    days: [
      { name: "Day 1", tasks: [
        { tag: "project", text: "Capstone 2: pick infrastructure project (Multi-Model Gateway / Agent Monitor / RAG Pipeline Builder)" },
        { tag: "project", text: "Design and stub out: API design, data models, key algorithms — get architecture decision record written" },
      ]},
      { name: "Day 2", tasks: [
        { tag: "project", text: "Core implementation: the main technical challenge of your infrastructure project working" },
      ]},
      { name: "Day 3", tasks: [
        { tag: "project", text: "Complete implementation: all features working, tested, documented" },
      ]},
      { name: "Day 4", tasks: [
        { tag: "learn", text: "Frontier reading: UK AISI Frontier AI Trends Report + Google 2025 Research Breakthroughs" },
        { tag: "learn", text: "Lilian Weng \"Why We Think\" (May 2025) + Sebastian Raschka \"State of LLMs 2025\" — read both" },
      ]},
      { name: "Day 5", tasks: [
        { tag: "project", text: "Deploy Capstone 2: public GitHub repo, live demo URL, architecture diagram, blog post draft" },
      ]},
      { name: "Day 6", tasks: [
        { tag: "project", text: "Portfolio review: both capstone READMEs polished, LinkedIn updated, GitHub profile page updated" },
        { tag: "review", text: "roadmap.sh/ai-engineer — compare your skills to the full AI engineer roadmap. Note any gaps." },
      ]},
      { name: "Day 7", tasks: [
        { tag: "rest", text: "6 months complete. You are now a production AI engineer. The work continues — but from a completely different level." },
      ]},
    ],
  },
];
