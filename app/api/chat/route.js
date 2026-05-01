
export async function POST(req) {
  const { messages, model } = await req.json();

  const groqModel = model === "gemini-2.5-pro" ? "llama-3.3-70b-versatile" : "llama-3.1-8b-instant";

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions",    {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
            model: groqModel,
            messages: messages.map((m) => ({
                role: m.role === "assistant" ? "assistant" : "user",
                content: m.content,
            })),
            stream: true,
        }),
    });


    if (!response.ok) {
        const error = await response.text();
        return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(response.body, {
        headers: { "Content-Type": "text/event-stream" },
    });
}