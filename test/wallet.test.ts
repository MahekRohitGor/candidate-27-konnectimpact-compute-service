import { handleWallet } from "../src/handlers/wallet";

describe("GET /wallet", () => {
  let mockEnv: any;

  beforeEach(() => {
    mockEnv = {
      INVITES: {
        get: jest.fn(),
      },
    };
  });

  it("returns credits for valid deviceId", async () => {
    mockEnv.INVITES.get.mockResolvedValue("200");

    const req = new Request("http://localhost/wallet?deviceId=device123");

    const res = await handleWallet(req, mockEnv);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.credits).toBe(200);
    expect(mockEnv.INVITES.get).toHaveBeenCalledWith("wallet_device123");
  });

  it("returns 0 if wallet does not exist", async () => {
    mockEnv.INVITES.get.mockResolvedValue(null); // No wallet yet

    const req = new Request("http://localhost/wallet?deviceId=device999");

    const res = await handleWallet(req, mockEnv);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.credits).toBe(0);
  });

  it("returns 400 if deviceId is missing", async () => {
    const req = new Request("http://localhost/wallet");

    const res = await handleWallet(req, mockEnv);
    expect(res.status).toBe(400);
  });
});
