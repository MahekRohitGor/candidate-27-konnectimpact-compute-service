import { Env } from "../types/env";

export async function handleInvite(request: Request, env: Env): Promise<Response> {
  try {
    const body = await request.json();
    const { deviceId } = (body as { deviceId?: string });

    if (!deviceId) {
      return new Response("Missing deviceId", { status: 400 });
    }

    const token = crypto.randomUUID();

    // TTL = 7 days = 604800 seconds
    await env.INVITES.put(token, deviceId, {
      expirationTtl: 604800,
    });

    return Response.json({ token });
  } catch (err) {
    return new Response("Invalid JSON or server error", { status: 500 });
  }
}