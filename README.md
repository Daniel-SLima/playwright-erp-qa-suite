# Playwright ERP & SaaS QA Automation Suite

[![Playwright QA Suite CI](https://github.com/Daniel-SLima/playwright-erp-qa-suite/actions/workflows/playwright-ci.yml/badge.svg)](https://github.com/Daniel-SLima/playwright-erp-qa-suite/actions/workflows/playwright-ci.yml)
![Playwright](https://img.shields.io/badge/Playwright-E2E_%26_API-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)

Suíte profissional de automação de testes **End-to-End (E2E)** e **API Testing** desenvolvida com **Playwright**, **TypeScript**, **Page Object Model (POM)** e especificações em **BDD / Gherkin (PT-BR)**, validando diretamente a aplicação real de demonstração **[OrçaDemo](https://gerador-orcamentos-demo.vercel.app)**.

> Projeto desenvolvido por **Daniel Santana Lima** ([LinkedIn @DanielLimaQA](https://www.linkedin.com/in/daniellimaqa)) para demonstrar práticas reais de Qualidade de Software aplicadas a sistemas ERP e SaaS comerciais.

---

## Principais Recursos

- **Execução Real em CI/CD (`.github/workflows/`):** A cada push, o GitHub Actions executa os testes E2E e de API contra o ambiente online do [OrçaDemo](https://gerador-orcamentos-demo.vercel.app) e gera o artefato do `playwright-report`.
- **Especificação BDD/Gherkin (`features/`):** Cenários legíveis pelo negócio cobrindo autenticação, emissão de orçamentos, aprovação de produção, exportação CSV e controle de acesso RBAC.
- **Page Object Model (`pages/`):** Encapsulamento limpo de seletores e ações (`LoginPage`, `OrcamentoPage`) reduzindo duplicação e facilitando manutenção.
- **Documentação QA (`docs/`):** Plano de Testes completo (`TEST_PLAN.md`) e exemplo corporativo de Bug Report com evidência SQL (`BUG_REPORT_EXAMPLE.md`).

---

## Estrutura do Projeto

```text
playwright-erp-qa-suite/
├── .github/workflows/playwright-ci.yml
├── docs/
│   ├── BUG_REPORT_EXAMPLE.md
│   └── TEST_PLAN.md
├── features/
│   ├── autenticacao-rbac.feature
│   └── orcamento-comercial.feature
├── pages/
│   ├── LoginPage.ts
│   └── OrcamentoPage.ts
├── tests/
│   ├── api/health-and-quotes.spec.ts
│   └── e2e/orcamento.spec.ts
├── package.json
└── playwright.config.ts
```

---

## Como Executar Localmente

```bash
npm install
npx playwright install chromium

# Rodar toda a suíte contra o OrçaDemo online
npm test

# Rodar com interface visual do Playwright
npm run test:ui
```
