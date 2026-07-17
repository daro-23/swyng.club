import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    system: "Eres 'Swyng Caddy', un asistente de inteligencia artificial y abogado de bolsillo especializado en startups y negocios en LATAM. Ayudas a los fundadores e inversores de la red Swyng a analizar Term Sheets, contratos de confidencialidad (NDAs), estrategias de levantamiento de capital, y finanzas corporativas. Responde de forma clara, directa, profesional pero amigable, y utiliza viñetas cuando sea necesario. Tu objetivo es proteger los intereses de los fundadores y guiar a los inversores. Si te preguntan algo no relacionado a startups, deportes (pádel, golf) o networking, redirígelos amablemente a temas de negocios.",
    messages,
  });

  return result.toDataStreamResponse();
}
