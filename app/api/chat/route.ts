import Anthropic from "@anthropic-ai/sdk";

const BASE_SYSTEM_PROMPT = `You are an expert AI Coach helping Dhanush navigate their 175-day, 6-month AI Engineer learning roadmap. Today's date is {{TODAY_DATE}}.

The roadmap structure:
- Week 0 (w0): Launchpad — Python, async, Pydantic, LLM fundamentals, CLI project
- Month 1 (w1-w4): LLM APIs (OpenAI/Anthropic/Gemini), prompt engineering, DSPy, RAG systems, evaluation
- Month 2 (w5-w8): Agent architectures (ReAct, LangGraph), multi-agent systems (CrewAI), production FastAPI, PostgreSQL/Supabase
- Month 3 (w9-w12): Next.js + Vercel AI SDK frontend, Docker, cloud deployment (GCP Cloud Run, AWS Lambda), CI/CD
- Month 4 (w13-w16): Fine-tuning fundamentals, LoRA/QLoRA with Unsloth, GPU infrastructure (Modal/RunPod), safety & guardrails
- Month 5 (w17-w20): Model serving (vLLM/BentoML), observability (Langfuse/LangSmith), vector DB optimization, OWASP security
- Month 6 (w21-w24): Multimodal AI, advanced agents (Mem0/Composio/E2B), two capstone projects

Week IDs: w0 through w24 (25 weeks total, 175 days). Day indices are 0-based (Day 1 = index 0, Day 7 = index 6).

{{PROGRESS_SECTION}}

CRITICAL: Base your advice on the ACTUAL progress data above, NOT on the calendar date. If Dhanush has not started, guide them to begin at Week 0 Day 1. If they are partway through, focus on their current week. Never assume progress based on how many days have passed since some start date.

You can:
1. Answer any question about AI/ML concepts, tools, or resources in the roadmap
2. Search the web for up-to-date information using the web_search tool (call it multiple times in parallel for thorough research)
3. Modify Dhanush's timetable using the timetable_action tool
4. Suggest changes to the learning plan based on their progress or interests
5. Provide encouragement and guidance

When modifying the timetable:
- Use week IDs like "w0", "w1", ..., "w24"
- Day indices are 0-6 (0=Day 1, 6=Day 7)
- Example: "Mark week 0, day 1 as complete" → action: "mark_complete", week_id: "w0", day_index: 0

Be concise, practical, and encouraging. Use markdown formatting in your responses. When you search the web, synthesize the results clearly.`;

function buildSystemPrompt(progress?: string): string {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const progressSection = progress
    ? `Dhanush's ACTUAL current progress (from the timetable tracker):\n${progress}`
    : "No progress data available — ask Dhanush about their current status before making assumptions.";
  return BASE_SYSTEM_PROMPT
    .replace("{{TODAY_DATE}}", today)
    .replace("{{PROGRESS_SECTION}}", progressSection);
}

const TOOLS: Anthropic.Tool[] = [
  {
    name: "web_search",
    description:
      "Search the web for current information about AI/ML topics, tools, libraries, courses, or anything relevant to the learning roadmap. You can call this multiple times in parallel to research different aspects simultaneously.",
    input_schema: {
      type: "object" as const,
      properties: {
        query: {
          type: "string",
          description: "The search query — be specific for better results",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "timetable_action",
    description:
      "Perform an action on Dhanush's timetable — mark a day complete/incomplete or add a note to a specific day.",
    input_schema: {
      type: "object" as const,
      properties: {
        action: {
          type: "string",
          enum: ["mark_complete", "mark_incomplete", "add_note"],
          description: "The action to perform",
        },
        week_id: {
          type: "string",
          description: "Week ID like 'w0', 'w1', ..., 'w24'",
        },
        day_index: {
          type: "number",
          description: "Day index 0-6 (0=Day 1, 6=Day 7)",
        },
        note: {
          type: "string",
          description: "Note text (required only for add_note action)",
        },
      },
      required: ["action", "week_id", "day_index"],
    },
  },
];

// Derive keyword-style search queries from a natural language objective
function deriveSearchQueries(objective: string): string[] {
  // Use the objective directly plus a shorter keyword form
  const shortened = objective
    .replace(/["""'']/g, "")
    .replace(/\b(the|a|an|and|or|for|of|in|on|at|to|is|are|was|were|how|what|why|when|where|which)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .slice(0, 6)
    .join(" ");
  return [objective, shortened].filter(Boolean);
}

async function performWebSearch(query: string): Promise<string> {
  const key = process.env.PARALLEL_API_KEY;
  if (key) {
    try {
      const res = await fetch("https://api.parallel.ai/v1beta/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": key,
        },
        body: JSON.stringify({
          objective: query,
          search_queries: deriveSearchQueries(query),
          mode: "fast",
          excerpts: { max_chars_per_result: 2000 },
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const results = (data.results ?? [])
          .slice(0, 5)
          .map((r: { title: string; url: string; excerpts?: string[]; publish_date?: string }) => {
            const excerpt = r.excerpts?.join(" ").slice(0, 400) ?? "";
            const date = r.publish_date ? ` (${r.publish_date})` : "";
            return `• **${r.title}**${date}\n  ${excerpt}\n  URL: ${r.url}`;
          })
          .join("\n\n");
        return results || "No results found for this query.";
      }
      const errText = await res.text().catch(() => res.statusText);
      return `Parallel AI search error (${res.status}): ${errText}`;
    } catch (err) {
      return `Parallel AI search failed: ${err instanceof Error ? err.message : String(err)}`;
    }
  }

  // Fallback: DuckDuckGo instant answers (no key required)
  try {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&no_html=1`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (res.ok) {
      const data = await res.json();
      const abstract = data.AbstractText ? `Summary: ${data.AbstractText}\n\n` : "";
      const topics = (data.RelatedTopics ?? [])
        .slice(0, 4)
        .filter((t: { Text?: string }) => t.Text)
        .map((t: { Text: string; FirstURL?: string }) =>
          `• ${t.Text}${t.FirstURL ? `\n  URL: ${t.FirstURL}` : ""}`
        )
        .join("\n\n");
      if (abstract || topics) {
        return `${abstract}${topics}`;
      }
    }
  } catch {
    // fall through
  }

  return `Web search returned no results for: "${query}".`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, progress } = body;

    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    if (!anthropicKey) {
      return new Response(JSON.stringify({ error: "Server API key not configured." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const anthropic = new Anthropic({ apiKey: anthropicKey });
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        const send = (data: object) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        };

        try {
          // Format messages for Claude
          type ClaudeMessage = { role: "user" | "assistant"; content: string | Anthropic.ToolResultBlockParam[] | Anthropic.ContentBlock[] };
          let msgs: ClaudeMessage[] = messages.map((m: { role: string; content: string }) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          }));

          // Agentic loop (handles tool use)
          for (let iter = 0; iter < 8; iter++) {
            const response = await anthropic.messages.create({
              model: "claude-sonnet-4-6",
              max_tokens: 4096,
              system: buildSystemPrompt(progress),
              messages: msgs,
              tools: TOOLS,
            });

            if (response.stop_reason === "end_turn") {
              for (const block of response.content) {
                if (block.type === "text" && block.text) {
                  send({ type: "text", text: block.text });
                }
              }
              break;
            }

            if (response.stop_reason === "tool_use") {
              const toolCalls = response.content.filter((b): b is Anthropic.ToolUseBlock => b.type === "tool_use");

              // Show searching indicator with all parallel queries
              const searchQueries = toolCalls
                .filter((c) => c.name === "web_search")
                .map((c) => (c.input as { query: string }).query);

              if (searchQueries.length > 0) {
                send({ type: "searching", queries: searchQueries });
              }

              // Execute ALL tool calls in parallel
              const toolResults = await Promise.all(
                toolCalls.map(async (call) => {
                  let content = "";

                  if (call.name === "web_search") {
                    const input = call.input as { query: string };
                    content = await performWebSearch(input.query);
                  } else if (call.name === "timetable_action") {
                    const input = call.input as {
                      action: string;
                      week_id: string;
                      day_index: number;
                      note?: string;
                    };
                    send({ type: "timetable_action", action: input });
                    content = JSON.stringify({ success: true, message: `Action ${input.action} applied to ${input.week_id} day ${input.day_index + 1}` });
                  }

                  return {
                    type: "tool_result" as const,
                    tool_use_id: call.id,
                    content,
                  };
                })
              );

              // Update conversation with assistant's tool call + results
              msgs = [
                ...msgs,
                { role: "assistant" as const, content: response.content },
                { role: "user" as const, content: toolResults },
              ];

              continue;
            }

            // Any other stop reason — extract text and break
            for (const block of response.content) {
              if (block.type === "text" && block.text) {
                send({ type: "text", text: block.text });
              }
            }
            break;
          }
        } catch (err: unknown) {
          const errMsg = err instanceof Error ? err.message : String(err);
          send({ type: "error", message: errMsg });
        }

        send({ type: "done" });
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: errMsg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
