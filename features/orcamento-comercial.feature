# language: pt
Funcionalidade: Emissão, Cálculo e Aprovação de Orçamentos Comerciais
  Como um Consultor Comercial ou Gestor autenticado
  Quero emitir orçamentos com cálculo automático de descontos e conversão para Ordem de Produção
  Para garantir integridade financeira, rastreabilidade e exportação fiel em PDF/Excel

  Contexto:
    Dado que estou autenticado no módulo Comercial do sistema
    E os produtos do catálogo estão sincronizados com a base SQL

  @e2e @regressao @regras-de-negocio
  Cenário: Criar orçamento válido e validar cálculo líquido com desconto comercial
    Quando seleciono o cliente "Indústria Baiana de Componentes Ltda"
    E seleciono o produto "Painel de Controle Industrial" com quantidade 10
    E aplico o desconto autorizado de 5%
    Então o valor líquido exibido deve ser "R$ 11.875,00"
    Quando confirmo a criação do orçamento
    Então o registro deve aparecer na listagem com status "Em Análise"

  @e2e @producao
  Cenário: Aprovar orçamento como Administrador e gerar Ordem de Produção
    Dado que alterno para o perfil "Administrador"
    Quando aprovo o orçamento "ORC-2026-043"
    E solicito a geração da Ordem de Produção
    Então o status do orçamento deve mudar para "Em Produção"
    E o documento de impressão PDF deve listar os dados do cliente e o total líquido

  @exportacao
  Cenário: Exportar relatório de orçamentos filtrados em formato Excel (.CSV)
    Quando filtro os orçamentos pelo status "Em Produção"
    E aciono o botão "Exportar Excel (.CSV)"
    Então o navegador deve baixar um arquivo CSV válido com codificação UTF-8 BOM
