# Plano de Testes — Módulo Comercial, Orçamentos & RBAC

**Autor:** Daniel Santana Lima (Analista de Testes / QA)  
**Objetivo:** Garantir a confiabilidade funcional, segurança de acesso por perfis (RBAC) e integridade de cálculos e exportações (PDF / Excel) antes da liberação em produção.

---

## 1. Escopo dos Testes

### Em Escopo
- Validação de regras de negócio de cálculo comercial (`subtotal`, desconto por alçada e valor líquido).
- Controle de acesso baseado em perfil (`Administrador`, `Consultor Comercial`, `Gestor de Produção`).
- Fluxo de transição de estados: `Em Análise` → `Aprovado` → `Em Produção`.
- Exportação de relatórios em formato CSV compatível com Microsoft Excel (UTF-8 BOM) e prévia de impressão PDF.
- Verificação de disponibilidade HTTP das rotas da aplicação e ativos em PDF.

### Fora de Escopo (Nesta Fase)
- Integração com gateway real de emissão de NF-e/NFS-e em produção.
- Testes de carga de longa duração (Soak Test > 4h).

---

## 2. Estratégia & Pirâmide de Testes

| Camada | Ferramenta | Responsabilidade |
| :--- | :--- | :--- |
| Especificação (BDD) | Gherkin (`.feature`) | Alinhar critérios de aceite entre negócio, Dev e QA |
| E2E Web | Playwright + POM (TypeScript) | Simular jornadas reais no Chromium Desktop e Mobile |
| API & Contratos | Playwright `APIRequestContext` | Garantir HTTP 200 nos endpoints e integridade dos PDFs |
| Regressão & Evidências | Trace Viewer + Screenshots | Capturar evidências automáticas em caso de falha |

---

## 3. Critérios de Entrada e Saída (Release Gate)
- **Entrada:** Build compilado sem erros de TypeScript (`tsc --noEmit`) e ambiente de homologação acessível.
- **Saída:** 100% dos cenários críticos (`@e2e` e `@rbac`) aprovados no pipeline CI sem defeitos de severidade Bloqueante/Alta em aberto.
