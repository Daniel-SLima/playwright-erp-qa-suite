# Bug Report Modelo — Padrão Corporativo ERP & Web

- **ID:** `BUG-ERP-418`
- **Título:** Divergência no arredondamento de ISS em lote na validação de NFS-e (Módulo Serviços)
- **Severidade:** Alta
- **Prioridade:** P1 — Bloqueante de Homologação
- **Responsável pelo Reporte:** Daniel Santana Lima (QA)
- **Ambiente:** Homologação ERP Web `v4.18.2` | PostgreSQL 15 | Google Chrome 131

---

## Passos para Reprodução
1. Acessar o módulo **Serviços > Faturamento em Lote** no ambiente de homologação.
2. Selecionar 3 ordens de serviço com alíquota de ISS de `2,5%` e valores unitários com dízima após multiplicação.
3. Clicar em **"Calcular Totais e Gerar Prévia Fiscal"**.
4. Comparar o somatório dos itens individuais no banco SQL com o valor consolidado no rodapé da tela e no XML gerado.

---

## Comportamento Esperado
O cálculo de ISS deve respeitar o arredondamento **ABNT NBR 5891** por item antes da totalização do lote, resultando em `R$ 142,38` tanto na interface quanto no XML fiscal.

## Comportamento Atual
O back-end realiza o truncamento/arredondamento apenas na etapa final de soma, retornando `R$ 142,36` (diferença de `R$ 0,02`) e provocando rejeição na validação do lote XML.

---

## Evidência Técnica & Consulta SQL de Apoio
```sql
SELECT
  lote_id,
  SUM(ROUND(valor_servico * aliquota_iss, 2)) AS iss_por_item_esperado,
  ROUND(SUM(valor_servico * aliquota_iss), 2) AS iss_consolidado_atual
FROM fiscal.ordem_servico_itens
WHERE lote_id = 4182
GROUP BY lote_id;
```
