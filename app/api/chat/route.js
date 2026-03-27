import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  try {
    const { messages, systemPrompt } = await req.json();
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages,
    });
    return Response.json({ content: response.content[0].text });
  } catch (err) {
    return Response.json({ content: "Taqdeer is unavailable right now. Try again shortly!" }, { status: 500 });
  }
}

