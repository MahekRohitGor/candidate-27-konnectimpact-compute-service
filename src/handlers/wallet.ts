import { Env } from "../types/env";

export async function handleWallet(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const deviceId = url.searchParams.get("deviceId");

  if (!deviceId) {
    return new Response("Missing deviceId", { status: 400 });
  }

  const walletKey = `wallet_${deviceId}`;
  const credits = await env.INVITES.get(walletKey);

  return Response.json({
    credits: parseInt(credits || "0", 10),
  });
}