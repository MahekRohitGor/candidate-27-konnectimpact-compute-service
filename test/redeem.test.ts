import { handleRedeem } from "../src/handlers/redeem";

describe("POST /redeem", () => {
  let mockEnv: any;

  beforeEach(() => {
    mockEnv = {
      INVITES: {
        get: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
      },
    };
  });

  it("should redeem token and add credits", async () => {
    mockEnv.INVITES.get.mockImplementation((key: string) => {
      if (key === "valid_token") return Promise.resolve("device123");
      if (key === "wallet_device123") return Promise.resolve("200");
    });

    const req = new Request("http://localhost/redeem", {
      method: "POST",
      body: JSON.stringify({
        token: "valid_token",
        deviceId: "device123",
      }),
    });

    const res = await handleRedeem(req, mockEnv);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.credits).toBe(300);
    expect(mockEnv.INVITES.put).toHaveBeenCalledWith("wallet_device123", "300");
    expect(mockEnv.INVITES.delete).toHaveBeenCalledWith("valid_token");
  });

  it("should return 400 if token is missing", async () => {
    const req = new Request("http://localhost/redeem", {
      method: "POST",
      body: JSON.stringify({ deviceId: "device123" }),
    });

    const res = await handleRedeem(req, mockEnv);
    expect(res.status).toBe(400);
  });

  it("should return 400 if token is invalid", async () => {
    mockEnv.INVITES.get.mockResolvedValue(null); // simulate missing token

    const req = new Request("http://localhost/redeem", {
      method: "POST",
      body: JSON.stringify({
        token: "fake_token",
        deviceId: "device123",
      }),
    });

    const res = await handleRedeem(req, mockEnv);
    expect(res.status).toBe(400);
  });

  it("should return 403 if token belongs to another device", async () => {
    mockEnv.INVITES.get.mockResolvedValue("device999"); // token for someone else

    const req = new Request("http://localhost/redeem", {
      method: "POST",
      body: JSON.stringify({
        token: "valid_token",
        deviceId: "device123",
      }),
    });

    const res = await handleRedeem(req, mockEnv);
    expect(res.status).toBe(403);
  });
});