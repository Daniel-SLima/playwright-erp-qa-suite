import { test, expect } from "@playwright/test";

test.describe("Testes de Disponibilidade HTTP & Ativos — OrçaDemo @api", () => {
  test("CT-04: aplicação principal responde HTTP 200 com HTML válido", async ({
    request,
  }) => {
    const response = await request.get("/");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("text/html");

    const html = await response.text();
    expect(html).toContain("OrçaDemo");
  });

  test("CT-05: rota de API protegida /api/vendedores responde sem erro 500", async ({
    request,
  }) => {
    const response = await request.get("/api/vendedores");
    expect(response.status()).toBeLessThan(500);
  });
});
