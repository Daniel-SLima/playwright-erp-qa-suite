# language: pt
Funcionalidade: Controle de Acesso Baseado em Perfis (RBAC) e Alçada Comercial
  Como Administrador de Segurança e Negócio
  Quero restringir criação, descontos e aprovação de produção por perfil de usuário
  Para evitar descontos não autorizados e alterações indevidas em rotinas críticas

  @seguranca @rbac @e2e
  Cenário: Bloquear desconto acima da alçada para Consultor Comercial
    Dado que estou operando com o perfil "Consultor Comercial"
    Quando tento gerar um orçamento com 25% de desconto
    Então o sistema deve impedir o envio
    E deve exibir a mensagem "Alçada máxima excedida: O perfil \"Consultor Comercial\" permite no máximo 10% de desconto."

  @seguranca @rbac @e2e
  Cenário: Restringir criação de novos orçamentos para o perfil Gestor de Produção
    Dado que estou operando com o perfil "Gestor de Produção"
    Quando tento submeter o formulário de criação de orçamento
    Então a operação deve ser bloqueada com feedback de acesso negado (RBAC)
    E nenhuma nova linha deve ser inserida na listagem de orçamentos
