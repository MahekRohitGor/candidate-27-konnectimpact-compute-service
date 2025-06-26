import { Env } from "../types/env";

export async function handleRedeem(request: Request, env: Env): Promise<Response> {
  try {
    const { token, deviceId } = await request.json() as { token: string; deviceId: string };

    if (!token || !deviceId) {
      return new Response("Missing token or deviceId", { status: 400 });
    }

    // Step 1: Validate token exists and is for this device
    const storedDeviceId = await env.INVITES.get(token);
    if (!storedDeviceId) {
      return new Response("Token expired or invalid", { status: 400 });
    }

    if (storedDeviceId !== deviceId) {
      return new Response("Token does not match this device", { status: 403 });
    }

    // Step 2: Fetch current credits and add 100
    const walletKey = `wallet_${deviceId}`;
    const current = await env.INVITES.get(walletKey);
    const currentCredits = parseInt(current || "0", 10);
    const newCredits = currentCredits + 100;

    await env.INVITES.put(walletKey, newCredits.toString());

    // Step 3: Delete token so it can't be reused
    await env.INVITES.delete(token);

    return Response.json({ credits: newCredits });
  } catch (err) {
    return new Response("Invalid JSON or server error", { status: 500 });
  }
}