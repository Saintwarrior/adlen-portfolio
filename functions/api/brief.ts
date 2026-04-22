interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
}

type PagesFunction<E = unknown> = (ctx: {
  request: Request;
  env: E;
}) => Promise<Response> | Response;

interface BriefPayload {
  name?: unknown;
  contact?: unknown;
  message?: unknown;
  budget?: unknown;
  service?: unknown;
}

const MAX_LEN = 2000;

function clean(v: unknown): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, MAX_LEN);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  const { request, env } = ctx;

  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return new Response(JSON.stringify({ error: "Server misconfigured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: BriefPayload;
  try {
    body = (await request.json()) as BriefPayload;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const name = clean(body.name);
  const contact = clean(body.contact);
  const message = clean(body.message);
  const budget = clean(body.budget);
  const service = clean(body.service);

  if (!name || !contact || !message) {
    return new Response(
      JSON.stringify({ error: "name, contact and message are required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const text =
    `<b>Новый бриф ADLEN</b>\n\n` +
    `<b>Имя:</b> ${escapeHtml(name)}\n` +
    `<b>Контакт:</b> ${escapeHtml(contact)}\n` +
    `<b>Формат:</b> ${escapeHtml(service) || "—"}\n` +
    `<b>Бюджет:</b> ${escapeHtml(budget) || "—"}\n\n` +
    `<b>О проекте:</b>\n${escapeHtml(message)}`;

  const tgRes = await fetch(
    `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    }
  );

  if (!tgRes.ok) {
    const detail = await tgRes.text().catch(() => "");
    console.error("telegram error", tgRes.status, detail);
    return new Response(JSON.stringify({ error: "Telegram API failed" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
