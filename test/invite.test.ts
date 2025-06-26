import { handleInvite } from "../src/handlers/invite";

const mockEnv = {
  INVITES: {
    put: jest.fn(),
  }
};

describe("POST /invite", () => {
  it("returns token when deviceId is given", async () => {
    const mockRequest = new Request("http://localhost/invite", {
      method: "POST",
      body: JSON.stringify({ deviceId: "device123" }),
    });

    const response = await handleInvite(mockRequest, mockEnv as any);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.token).toBeDefined();
    expect(mockEnv.INVITES.put).toHaveBeenCalled();
  });

  it("returns 400 if deviceId is missing", async () => {
    const mockRequest = new Request("http://localhost/invite", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const response = await handleInvite(mockRequest, mockEnv as any);
    expect(response.status).toBe(400);
  });
});
