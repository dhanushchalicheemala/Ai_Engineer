// Comprehensive resource URL database for the AI Engineer timetable
// Maps keyword patterns to their official URLs

interface ResourceEntry {
  keywords: string[];
  url: string;
}

const RESOURCE_DB: ResourceEntry[] = [
  // Week 0 - Karpathy
  { keywords: ["Deep Dive into LLMs like ChatGPT", "Karpathy \"Deep Dive"], url: "https://www.youtube.com/watch?v=7xTGNNLPyMI" },
  { keywords: ["Neural Networks: Zero to Hero", "Zero to Hero"], url: "https://karpathy.ai/zero-to-hero.html" },
  // Week 0 - Python tooling
  { keywords: ["Real Python asyncio walkthrough", "Real Python asyncio"], url: "https://realpython.com/async-io-python/" },
  { keywords: ["Pydantic V2 docs", "Pydantic V2"], url: "https://docs.pydantic.dev/latest/" },
  { keywords: ["uv, VS Code", "uv setup"], url: "https://docs.astral.sh/uv/" },
  // Week 0 - 3B1B
  { keywords: ["3Blue1Brown: Neural Networks"], url: "https://www.3blue1brown.com/lessons/neural-networks" },
  { keywords: ["3Blue1Brown"], url: "https://www.3blue1brown.com" },
  { keywords: ["Transformers + Attention", "Transformers, the tech"], url: "https://www.3blue1brown.com/lessons/gpt" },
  // Week 0 - Tools
  { keywords: ["OpenAI Tokenizer"], url: "https://platform.openai.com/tokenizer" },
  { keywords: ["bbycroft.net 3D LLM visualizer", "bbycroft.net"], url: "https://bbycroft.net/llm" },
  { keywords: ["MIT Missing Semester"], url: "https://missing.csail.mit.edu/" },
  { keywords: ["Conventional Commits"], url: "https://www.conventionalcommits.org/" },
  { keywords: ["MDN HTTP reference"], url: "https://developer.mozilla.org/en-US/docs/Web/HTTP" },
  // Month 1 - Courses
  { keywords: ["DeepLearning.AI \"ChatGPT Prompt Engineering for Developers\"", "ChatGPT Prompt Engineering for Developers"], url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/" },
  { keywords: ["DeepLearning.AI \"Retrieval Augmented Generation (RAG)\"", "Retrieval Augmented Generation (RAG)\" — complete"], url: "https://www.deeplearning.ai/courses/retrieval-augmented-generation-rag/" },
  { keywords: ["DeepLearning.AI \"Building Applications with Vector Databases\"", "Building Applications with Vector Databases"], url: "https://www.deeplearning.ai/short-courses/building-applications-vector-databases/" },
  { keywords: ["DeepLearning.AI \"Agentic AI with Andrew Ng\"", "Agentic AI with Andrew Ng"], url: "https://www.deeplearning.ai/courses/agentic-ai/" },
  { keywords: ["DeepLearning.AI \"AI Agents in LangGraph\"", "AI Agents in LangGraph"], url: "https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/" },
  { keywords: ["DeepLearning.AI \"Multi AI Agent Systems with crewAI\"", "Multi AI Agent Systems with crewAI"], url: "https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/" },
  { keywords: ["DeepLearning.AI \"A2A: The Agent2Agent Protocol\"", "A2A: The Agent2Agent Protocol"], url: "https://www.deeplearning.ai/short-courses/a2a-the-agent2agent-protocol/" },
  { keywords: ["DeepLearning.AI \"Finetuning Large Language Models\"", "Finetuning Large Language Models\" by Sharon Zhou"], url: "https://www.deeplearning.ai/short-courses/finetuning-large-language-models/" },
  { keywords: ["DeepLearning.AI \"Fine-tuning and RL for LLMs", "Fine-tuning and RL for LLMs"], url: "https://www.deeplearning.ai/courses/fine-tuning-and-reinforcement-learning-for-llms-intro-to-post-training/" },
  { keywords: ["DeepLearning.AI \"Reinforcement Fine-Tuning LLMs with GRPO\"", "Reinforcement Fine-Tuning LLMs with GRPO"], url: "https://www.deeplearning.ai/short-courses/reinforcement-fine-tuning-llms-grpo/" },
  { keywords: ["DeepLearning.AI \"Building Multimodal Search and RAG\"", "Building Multimodal Search and RAG"], url: "https://www.deeplearning.ai/short-courses/building-multimodal-search-and-rag/" },
  { keywords: ["DeepLearning.AI \"Long-Term Agentic Memory with LangGraph\""], url: "https://www.deeplearning.ai/short-courses/long-term-agentic-memory-with-langgraph/" },
  // Month 1 - APIs & tools
  { keywords: ["OpenAI Cookbook"], url: "https://github.com/openai/openai-cookbook" },
  { keywords: ["Anthropic Cookbook"], url: "https://github.com/anthropics/anthropic-cookbook" },
  { keywords: ["Anthropic \"Introducing Advanced Tool Use\"", "Anthropic \"Advanced Tool Use\""], url: "https://www.anthropic.com/engineering/advanced-tool-use" },
  { keywords: ["OpenAI \"Introducing Structured Outputs\"", "OpenAI \"Structured Outputs\""], url: "https://openai.com/index/introducing-structured-outputs-in-the-api/" },
  { keywords: ["OpenAI Function Calling"], url: "https://platform.openai.com/docs/guides/function-calling" },
  { keywords: ["Anthropic Tool Use"], url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview" },
  { keywords: ["Gemini Function Calling", "Gemini API: function calling"], url: "https://ai.google.dev/gemini-api/docs/function-calling" },
  { keywords: ["Coursera \"Prompt Engineering for ChatGPT\"", "Prompt Engineering for ChatGPT"], url: "https://www.coursera.org/learn/prompt-engineering" },
  { keywords: ["OpenAI Prompt Engineering Guide"], url: "https://platform.openai.com/docs/guides/prompt-engineering" },
  // DSPy
  { keywords: ["DSPy docs", "DSPy 0-to-1 guide", "dspy.ai", "DSPy examples repo", "DSPy program"], url: "https://dspy.ai/" },
  { keywords: ["dspy.MIPROv2", "dspy.Predict", "dspy.ChainOfThought"], url: "https://dspy.ai/" },
  // RAG / Vector DBs
  { keywords: ["Pinecone \"Choosing an Embedding Model\"", "Pinecone embedding"], url: "https://www.pinecone.io/learn/series/rag/embedding-models-rundown/" },
  { keywords: ["MTEB Leaderboard"], url: "https://huggingface.co/spaces/mteb/leaderboard" },
  { keywords: ["LlamaIndex docs", "LlamaIndex"], url: "https://docs.llamaindex.ai/" },
  { keywords: ["RAGAS docs", "Install RAGAS", "RAGAS"], url: "https://docs.ragas.io/en/stable/" },
  { keywords: ["DeepEval docs", "DeepEval"], url: "https://deepeval.com/docs/getting-started" },
  { keywords: ["Anthropic \"Contextual Retrieval\""], url: "https://www.anthropic.com/news/contextual-retrieval" },
  { keywords: ["Confident AI blog \"G-Eval\"", "G-Eval"], url: "https://www.confident-ai.com/blog/g-eval-the-definitive-guide" },
  { keywords: ["LLM-as-Judge", "LLM-as-a-Judge"], url: "https://www.confident-ai.com/blog/why-llm-as-a-judge-is-the-best-llm-evaluation-method" },
  // Month 2 - Agents
  { keywords: ["LangChain Academy \"Introduction to LangGraph\"", "Introduction to LangGraph"], url: "https://academy.langchain.com/courses/intro-to-langgraph" },
  { keywords: ["freeCodeCamp LangGraph Full Course", "freeCodeCamp LangGraph"], url: "https://www.freecodecamp.org/news/learn-langgraph-and-build-conversational-ai-with-python/" },
  { keywords: ["LangGraph releases", "LangGraph Platform", "LangGraph checkpointer"], url: "https://github.com/langchain-ai/langgraph" },
  { keywords: ["Anthropic MCP documentation", "Anthropic MCP"], url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use/mcp" },
  { keywords: ["DataCamp \"CrewAI vs LangGraph vs AutoGen\""], url: "https://www.datacamp.com/tutorial/crewai-vs-langgraph-vs-autogen" },
  { keywords: ["AutoGen docs", "Microsoft Agent Framework"], url: "https://github.com/microsoft/autogen" },
  // Month 2 - Production
  { keywords: ["FastAPI official docs", "FastAPI"], url: "https://fastapi.tiangolo.com/" },
  { keywords: ["DEV Community \"FastAPI LLM Master Series\"", "FastAPI LLM Master Series"], url: "https://dev.to/julescosta/fastapi-llm-master-series-episode-1-building-your-first-llm-ready-api-from-scratch-13m2" },
  { keywords: ["Redis docs: LangCache", "Redis semantic caching", "Redis \"LLMOps Guide", "Redis LangCache"], url: "https://redis.io/docs/latest/develop/ai/" },
  { keywords: ["Supabase AI & Vectors docs", "Supabase project", "Supabase/Neon"], url: "https://supabase.com/docs/guides/ai" },
  { keywords: ["Neon blog \"Building Intelligent Search\"", "Neon blog"], url: "https://neon.com/guides/ai-embeddings-postgres-search" },
  // Month 3 - Frontend
  { keywords: ["Vercel Academy \"Builders Guide to the AI SDK\"", "Vercel Academy"], url: "https://vercel.com/academy/ai-sdk" },
  { keywords: ["vercel/chatbot repo", "Vercel Chatbot Template"], url: "https://github.com/vercel/chatbot" },
  { keywords: ["Vercel Blog \"AI SDK 6\""], url: "https://vercel.com/blog/ai-sdk-6" },
  // Month 3 - Docker
  { keywords: ["TechWorld with Nana \"Docker Tutorial"], url: "https://youtube.com/watch?v=3c-iBn73dDE" },
  { keywords: ["Fireship \"Docker in 100 Seconds\""], url: "https://youtu.be/Gjnup-PuquQ" },
  { keywords: ["Fireship \"Learn Docker in 7 Easy Steps\""], url: "https://youtu.be/gAkwW2tuIqE" },
  { keywords: ["Neptune.ai \"Best Practices When Working With Docker"], url: "https://neptune.ai/blog/best-practices-docker-for-machine-learning" },
  // Month 3 - Cloud
  { keywords: ["Google Codelabs \"Deploy FastAPI chatbot to Cloud Run"], url: "https://codelabs.developers.google.com/codelabs/cloud-run/how-to-deploy-fastapi-chat-app-gemini" },
  { keywords: ["AWS Generative AI Application Builder", "AWS Generative AI Application Builder docs"], url: "https://aws.amazon.com/solutions/implementations/generative-ai-application-builder-on-aws/" },
  // Month 3 - CI/CD
  { keywords: ["DataCamp \"CI/CD for ML\""], url: "https://www.datacamp.com/tutorial/ci-cd-for-machine-learning" },
  { keywords: ["Made With ML \"CI/CD for Machine Learning\""], url: "https://madewithml.com/courses/mlops/cicd/" },
  { keywords: ["CML docs", "CML to CI"], url: "https://cml.dev/" },
  { keywords: ["DVC setup", "DVC"], url: "https://dvc.org/" },
  { keywords: ["Langfuse \"LLM Testing"], url: "https://langfuse.com/blog/2025-10-21-testing-llm-applications" },
  { keywords: ["GitHub Actions deployment pipeline", "GitHub Actions"], url: "https://docs.github.com/en/actions" },
  // Month 4 - Fine-tuning
  { keywords: ["Sebastian Raschka \"Finetuning Large Language Models\""], url: "https://magazine.sebastianraschka.com/p/finetuning-large-language-models" },
  { keywords: ["Sebastian Raschka \"State of LLMs 2025\"", "Sebastian Raschka"], url: "https://magazine.sebastianraschka.com/p/state-of-llms-2025" },
  { keywords: ["IBM \"RAG vs Fine-Tuning vs Prompt Engineering\""], url: "https://www.ibm.com/think/topics/rag-vs-fine-tuning-vs-prompt-engineering" },
  { keywords: ["Lilian Weng \"Thinking about High-Quality Human Data\""], url: "https://lilianweng.github.io/posts/2024-02-05-human-data-quality/" },
  { keywords: ["Lilian Weng \"Extrinsic Hallucinations"], url: "https://lilianweng.github.io/posts/2024-07-07-hallucination/" },
  { keywords: ["Lilian Weng \"Why We Think\""], url: "https://lilianweng.github.io/posts/2025-05-01-thinking/" },
  { keywords: ["Hugging Face PEFT docs", "Hugging Face PEFT"], url: "https://huggingface.co/docs/peft" },
  { keywords: ["Hugging Face TRL docs", "Hugging Face TRL"], url: "https://huggingface.co/docs/trl" },
  { keywords: ["HuggingFace Hub", "HuggingFace Hub"], url: "https://huggingface.co/" },
  // Month 4 - Unsloth
  { keywords: ["Unsloth docs: LoRA hyperparameters", "Unsloth docs"], url: "https://docs.unsloth.ai/" },
  { keywords: ["Neptune.ai \"Fine-Tuning Llama 3 with LoRA\""], url: "https://neptune.ai/blog/fine-tuning-llama-3-with-lora" },
  { keywords: ["NVIDIA Blog \"How to Fine-Tune LLMs on RTX GPUs With Unsloth\""], url: "https://blogs.nvidia.com/blog/rtx-ai-garage-fine-tuning-unsloth-dgx-spark/" },
  { keywords: ["Axolotl docs"], url: "https://github.com/axolotl-ai-cloud/axolotl" },
  // Month 4 - GPU Infra
  { keywords: ["Modal docs + blog", "Modal account", "Modal training job", "Modal \"How to Deploy vLLM\""], url: "https://modal.com/products/training" },
  { keywords: ["Hugging Face Accelerate docs", "Hugging Face Accelerate"], url: "https://huggingface.co/docs/accelerate" },
  { keywords: ["RunPod setup", "RunPod \"GPU Requirements", "RunPod"], url: "https://www.runpod.io/blog/llm-fine-tuning-gpu-guide" },
  { keywords: ["DeepSpeed ZeRO docs", "DeepSpeed"], url: "https://www.deepspeed.ai/" },
  { keywords: ["Together AI managed fine-tuning", "Together AI"], url: "https://www.together.ai/" },
  { keywords: ["Stanford RCPedia \"Fine-Tuning Open Source Models\""], url: "https://rcpedia.stanford.edu/blog/2025/11/07/fine-tuning-open-source-models/" },
  // Month 4 - Evaluation & Safety
  { keywords: ["Stanford HELM docs", "Stanford HELM"], url: "https://crfm.stanford.edu/helm/latest/" },
  { keywords: ["Evidently AI \"10 LLM Safety"], url: "https://www.evidentlyai.com/blog/llm-safety-bias-benchmarks" },
  { keywords: ["NVIDIA NeMo Guardrails", "NeMo Guardrails"], url: "https://github.com/NVIDIA-NeMo/Guardrails" },
  { keywords: ["Guardrails AI: add PII", "Guardrails AI"], url: "https://github.com/guardrails-ai/guardrails" },
  { keywords: ["Guardrails Index (Feb 2025)"], url: "https://index.guardrailsai.com" },
  // Month 5 - Serving
  { keywords: ["vLLM blog \"2024 Retrospective"], url: "https://blog.vllm.ai/2025/01/10/vllm-2024-wrapped-2025-vision.html" },
  { keywords: ["The New Stack \"Introduction to vLLM\""], url: "https://thenewstack.io/introduction-to-vllm-a-high-performance-llm-serving-engine/" },
  { keywords: ["vLLM benchmark_serving", "Install vLLM", "vLLM quantization", "vLLM tensor parallelism"], url: "https://docs.vllm.ai/" },
  { keywords: ["BentoML docs", "BentoML Service"], url: "https://docs.bentoml.com/" },
  { keywords: ["NVIDIA \"Mastering LLM Techniques: Inference Optimization\""], url: "https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization/" },
  { keywords: ["Triton Inference Server overview", "Triton Inference Server"], url: "https://github.com/triton-inference-server/server" },
  // Month 5 - Observability
  { keywords: ["LangChain Academy \"Introduction to Agent Observability"], url: "https://academy.langchain.com/courses/intro-to-langsmith" },
  { keywords: ["Langfuse with Docker Compose", "Langfuse SDK", "Langfuse"], url: "https://langfuse.com/docs/observability/overview" },
  { keywords: ["LangSmith for comparison", "LangSmith"], url: "https://www.langchain.com/langsmith/observability" },
  { keywords: ["Braintrust \"7 Best AI Observability", "Braintrust"], url: "https://www.braintrust.dev" },
  { keywords: ["OpenLLMetry/Traceloop", "OpenLLMetry"], url: "https://github.com/traceloop/openllmetry" },
  { keywords: ["OpenTelemetry blog \"AI Agent Observability"], url: "https://opentelemetry.io/blog/2025/ai-agent-observability/" },
  // Month 5 - Vector DBs at Scale
  { keywords: ["Firecrawl \"Best Vector Databases in 2025\""], url: "https://www.firecrawl.dev/blog/best-vector-databases" },
  { keywords: ["Xenoss \"Pinecone vs Qdrant vs Weaviate\""], url: "https://xenoss.io/blog/vector-database-comparison-pinecone-qdrant-weaviate" },
  { keywords: ["TigerData \"Pgvector vs Qdrant"], url: "https://www.tigerdata.com/blog/pgvector-vs-qdrant" },
  { keywords: ["VectorDBBench"], url: "https://github.com/zilliztech/VectorDBBench" },
  { keywords: ["Pinecone serverless"], url: "https://docs.pinecone.io/" },
  { keywords: ["Qdrant production setup", "Qdrant docs", "Qdrant"], url: "https://qdrant.tech/documentation/" },
  // Month 5 - Security
  { keywords: ["OWASP Top 10 for LLMs PDF", "OWASP Top 10 for LLMs"], url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/assets/PDF/OWASP-Top-10-for-LLMs-v2025.pdf" },
  { keywords: ["Simon Willison Prompt Injection Series", "Simon Willison \"Prompt injection"], url: "https://simonwillison.net/series/prompt-injection/" },
  { keywords: ["OWASP LLM Top 10 test suite", "OWASP Prompt Injection Prevention"], url: "https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html" },
  { keywords: ["Promptfoo red teaming", "Promptfoo"], url: "https://www.promptfoo.dev/docs/red-team/owasp-llm-top-10/" },
  { keywords: ["Lakera Guard API", "Lakera Guard"], url: "https://www.lakera.ai/" },
  // Month 6 - Multimodal
  { keywords: ["GetStream \"GPT-4o Vision Guide\""], url: "https://getstream.io/blog/gpt-4o-vision-guide/" },
  { keywords: ["Anthropic Claude Vision docs", "Anthropic Claude Vision"], url: "https://platform.claude.com/docs/en/build-with-claude/vision" },
  { keywords: ["OpenAI Vision API"], url: "https://platform.openai.com/docs/guides/vision" },
  { keywords: ["IBM Coursera \"Build Multimodal Generative AI Applications\""], url: "https://www.coursera.org/learn/build-multimodal-generative-ai-applications" },
  { keywords: ["MIT OCW \"How to AI (Almost) Anything\""], url: "https://ocw.mit.edu/courses/mas-s60-how-to-ai-almost-anything-spring-2025/" },
  // Month 6 - Advanced Agents
  { keywords: ["The New Stack \"Memory for AI Agents"], url: "https://thenewstack.io/memory-for-ai-agents-a-new-paradigm-of-context-engineering/" },
  { keywords: ["arXiv Mem0 paper", "Mem0 into a LangGraph", "Mem0"], url: "https://arxiv.org/pdf/2504.19413" },
  { keywords: ["E2B docs: understand sandboxed", "E2B integration", "E2B"], url: "https://e2b.dev/docs" },
  { keywords: ["Composio docs: 1000+ integrations", "Composio docs", "Composio"], url: "https://composio.dev/" },
  { keywords: ["AWS \"AgentCore Long-Term Memory Deep Dive\""], url: "https://aws.amazon.com/blogs/machine-learning/building-smarter-ai-agents-agentcore-long-term-memory-deep-dive/" },
  // Capstone / Frontier
  { keywords: ["UK AISI Frontier AI Trends Report"], url: "https://www.aisi.gov.uk/frontier-ai-trends-report" },
  { keywords: ["Google 2025 Research Breakthroughs"], url: "https://blog.google/innovation-and-ai/products/2025-research-breakthroughs/" },
  { keywords: ["roadmap.sh/ai-engineer"], url: "https://roadmap.sh/ai-engineer" },
];

export interface TextSegment {
  text: string;
  url?: string;
}

export function parseTaskText(text: string): TextSegment[] {
  type MatchInfo = { start: number; end: number; url: string };
  const matches: MatchInfo[] = [];

  for (const entry of RESOURCE_DB) {
    for (const keyword of entry.keywords) {
      const lower = text.toLowerCase();
      const kw = keyword.toLowerCase();
      let idx = lower.indexOf(kw);
      while (idx !== -1) {
        // Only add if not already covered by an existing match
        const alreadyCovered = matches.some(
          (m) => m.start <= idx && m.end >= idx + keyword.length
        );
        if (!alreadyCovered) {
          matches.push({ start: idx, end: idx + keyword.length, url: entry.url });
        }
        idx = lower.indexOf(kw, idx + 1);
      }
    }
  }

  // Sort by start; prefer longer matches at same position
  matches.sort((a, b) =>
    a.start !== b.start ? a.start - b.start : (b.end - b.start) - (a.end - a.start)
  );

  // Remove overlaps (keep first/longer)
  const clean: MatchInfo[] = [];
  let lastEnd = 0;
  for (const m of matches) {
    if (m.start >= lastEnd) {
      clean.push(m);
      lastEnd = m.end;
    }
  }

  // Build segments
  const segments: TextSegment[] = [];
  let pos = 0;
  for (const m of clean) {
    if (pos < m.start) segments.push({ text: text.slice(pos, m.start) });
    segments.push({ text: text.slice(m.start, m.end), url: m.url });
    pos = m.end;
  }
  if (pos < text.length) segments.push({ text: text.slice(pos) });

  return segments.length > 0 ? segments : [{ text }];
}
