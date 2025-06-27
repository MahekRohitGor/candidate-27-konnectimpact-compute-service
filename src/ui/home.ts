export function getHomePage(): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>KonnectImpact Worker</title>
      <style>
        body { font-family: Arial; padding: 20px; max-width: 600px; margin: auto; }
        h1 { color: #2f855a; }
        input, button { padding: 8px; margin: 5px 0; width: 100%; }
        .section { margin-bottom: 30px; border-bottom: 1px solid #ccc; padding-bottom: 20px; }
        button { background-color: #2f855a; color: white; border: none; cursor: pointer; }
        button:hover { background-color: #276749; }
      </style>
    </head>
    <body>
      <h1>KonnectImpact</h1>

      <div class="section">
        <h2>Invite</h2>
        <input id="inviteDevice" placeholder="Device ID" />
        <button onclick="invite()">Send Invite</button>
        <pre id="inviteResult"></pre>
      </div>

      <div class="section">
        <h2>Redeem</h2>
        <input id="redeemDevice" placeholder="Device ID" />
        <input id="redeemToken" placeholder="Token" />
        <button onclick="redeem()">Redeem Token</button>
        <pre id="redeemResult"></pre>
      </div>

      <div class="section">
        <h2>Wallet</h2>
        <input id="walletDevice" placeholder="Device ID" />
        <button onclick="wallet()">Check Wallet</button>
        <pre id="walletResult"></pre>
      </div>

      <script>
        async function invite() {
          const deviceId = document.getElementById("inviteDevice").value;
          const res = await fetch("/invite", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ deviceId }),
          });
          const data = await res.json();
          document.getElementById("inviteResult").textContent = JSON.stringify(data, null, 2);
        }

        async function redeem() {
          const deviceId = document.getElementById("redeemDevice").value;
          const token = document.getElementById("redeemToken").value;
          const res = await fetch("/redeem", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ deviceId, token }),
          });
          const data = await res.json();
          document.getElementById("redeemResult").textContent = JSON.stringify(data, null, 2);
        }

        async function wallet() {
          const deviceId = document.getElementById("walletDevice").value;
          const res = await fetch("/wallet?deviceId=" + deviceId);
          const data = await res.json();
          document.getElementById("walletResult").textContent = JSON.stringify(data, null, 2);
        }
      </script>
    </body>
    </html>
  `;
}