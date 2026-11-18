import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

test.describe("Fluxo E2E: Autenticação, Validação & Dashboard — OrçaDemo @e2e", () => {
  test("CT-01: deve preencher automaticamente as credenciais pelo atalho de demonstração", async ({
    page,
  }) => {
    const login = new LoginPage(page);

    await login.acessar();
    await login.usarAtalhoCredenciaisDemo();

    await expect(login.emailInput).toHaveValue("admin@admin.com");
    await expect(login.passwordInput).toHaveValue("admin123");
  });

  test("CT-02: deve rejeitar credenciais inválidas exibindo feedback amigável traduzido", async ({
    page,
  }) => {
    const login = new LoginPage(page);

    await login.acessar();
    await login.autenticar("usuario.invalido@orcademo.com", "senhaErrada123");

    await expect(page.getByText("E-mail ou senha incorretos.")).toBeVisible();
    await expect(page).not.toHaveURL(/\/dashboard/);
  });

  test("CT-03: deve realizar login com credenciais de demonstração e redirecionar ao Dashboard", async ({
    page,
  }) => {
    const login = new LoginPage(page);

    await login.acessar();
    await login.usarAtalhoCredenciaisDemo();
    await login.submitBtn.click();

    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 });
  });
});
