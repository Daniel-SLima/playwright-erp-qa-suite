import { Locator, Page, expect } from "@playwright/test";

export interface NovoOrcamentoInput {
  clienteIndex?: number;
  produtoIndex?: number;
  quantidade: number;
  descontoPercentual: number;
}

export class OrcamentoPage {
  readonly clienteSelect: Locator;
  readonly produtoSelect: Locator;
  readonly quantidadeInput: Locator;
  readonly descontoInput: Locator;
  readonly gerarOrcamentoBtn: Locator;
  readonly exportarExcelBtn: Locator;

  constructor(private readonly page: Page) {
    this.clienteSelect = page.locator("#client-select");
    this.produtoSelect = page.locator("#product-select");
    this.quantidadeInput = page.locator("#qty-input");
    this.descontoInput = page.locator("#discount-input");
    this.gerarOrcamentoBtn = page.getByRole("button", {
      name: /Gerar Orçamento/i,
    });
    this.exportarExcelBtn = page.getByRole("button", {
      name: /Exportar Excel/i,
    });
  }

  async preencherECriar(dados: NovoOrcamentoInput) {
    if (dados.clienteIndex !== undefined) {
      await this.clienteSelect.selectOption(String(dados.clienteIndex));
    }
    if (dados.produtoIndex !== undefined) {
      await this.produtoSelect.selectOption(String(dados.produtoIndex));
    }
    await this.quantidadeInput.fill(String(dados.quantidade));
    await this.descontoInput.fill(String(dados.descontoPercentual));
    await this.gerarOrcamentoBtn.click();
  }

  async validarFeedbackContem(texto: string) {
    await expect(this.page.getByText(texto)).toBeVisible();
  }

  async filtrarPorStatus(status: "Todos" | "Em Análise" | "Aprovado" | "Em Produção") {
    await this.page.getByLabel("Filtrar por status").selectOption(status);
  }

  async exportarCsv() {
    const downloadPromise = this.page.waitForEvent("download");
    await this.exportarExcelBtn.click();
    return downloadPromise;
  }
}
