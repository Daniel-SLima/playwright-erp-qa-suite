import { Locator, Page, expect } from "@playwright/test";

export class LoginPage {
  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly fillDemoBtn: Locator;
  readonly submitBtn: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole("heading", { name: "OrçaDemo" });
    this.emailInput = page.locator("#email");
    this.passwordInput = page.locator("#password");
    this.fillDemoBtn = page.getByRole("button", {
      name: /Preencher credenciais da demo/i,
    });
    this.submitBtn = page.getByRole("button", { name: /^Entrar$/i });
  }

  async acessar() {
    await this.page.goto("/");
    await expect(this.heading).toBeVisible();
  }

  async usarAtalhoCredenciaisDemo() {
    await this.fillDemoBtn.click();
  }

  async autenticar(email: string, senha: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(senha);
    await this.submitBtn.click();
  }
}
