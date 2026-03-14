# AuthFlow

Sistema de autenticacao front-end completo, desenvolvido com HTML5, CSS3 e JavaScript puro (Vanilla JS), usando LocalStorage para persistencia de dados e sessao.

Projeto pronto para hospedagem estatica no GitHub Pages, sem backend e sem frameworks.

## Sumario

1. Visao geral
2. Funcionalidades
3. Tecnologias
4. Estrutura do projeto
5. Como executar localmente
6. Como publicar no GitHub Pages
7. Fluxo de uso
8. Regras e validacoes
9. Persistencia com LocalStorage
10. Responsividade e UX
11. Melhorias futuras
12. Licenca

## Visao geral

O AuthFlow simula um sistema real de autenticacao no front-end:

- Cadastro de usuarios
- Login com validacao
- Dashboard protegida
- Sessao persistente
- Logout seguro
- Tema Light/Dark com preferencia salva

Tudo ocorre no navegador com LocalStorage, ideal para estudos, demos e portfolio.

## Funcionalidades

### Cadastro

- Campos: nome, email, senha e confirmar senha
- Validacoes de formulario em tempo real
- Bloqueio de cadastro com email ja existente
- Feedback visual por campo (erro/sucesso)
- Botao com estado de loading

### Login

- Validacao de email e senha
- Verificacao de usuario no LocalStorage
- Mensagens amigaveis em caso de erro
- Redirecionamento automatico para dashboard quando autenticado

### Dashboard

- Mensagem personalizada: Welcome, [nome]
- Botao de logout
- Botao para voltar ao login
- Protecao de rota (acesso apenas com sessao ativa)

### Experiencia de usuario

- Interface moderna com card central
- Inputs com estados visuais
- Mostrar/ocultar senha
- Animacoes e transicoes suaves
- Layout responsivo para desktop, tablet e celular
- Dark mode com persistencia no LocalStorage

## Tecnologias

- HTML5
- CSS3
- JavaScript (Vanilla)
- LocalStorage API

## Estrutura do projeto

```text
authflow/
|-- index.html
|-- register.html
|-- dashboard.html
|-- css/
|   `-- style.css
|-- js/
|   |-- auth.js
|   |-- login.js
|   `-- register.js
`-- assets/
    `-- images/
```

## Como executar localmente

Como e um projeto estatico, basta abrir os arquivos HTML no navegador.

Opcao simples:

1. Entre na pasta authflow.
2. Abra o arquivo index.html no navegador.

Opcao recomendada (servidor local):

1. Use a extensao Live Server no VS Code.
2. Execute o projeto pela pagina index.html.

## Como publicar no GitHub Pages

Se o repositorio usar a pasta raiz como origem do Pages, voce tem duas opcoes:

1. Publicar a partir da branch main e pasta / (root), mantendo authflow como subpasta.
2. Publicar a partir da branch main e pasta /authflow (quando configuracao suportar pastas customizadas no seu fluxo).

Fluxo comum:

1. Envie o codigo para o GitHub.
2. Va em Settings > Pages.
3. Em Build and deployment, selecione Deploy from a branch.
4. Escolha a branch main.
5. Salve e aguarde a URL publica.

## Fluxo de uso

1. Usuario cria conta em register.html.
2. Dados sao salvos no LocalStorage.
3. Usuario faz login em index.html.
4. Se credenciais forem validas, a sessao e criada.
5. Usuario acessa dashboard.html.
6. Ao clicar em logout, a sessao e removida.

## Regras e validacoes

### Cadastro

- Nome obrigatorio
- Email em formato valido
- Senha com minimo de 6 caracteres
- Confirmacao de senha obrigatoriamente igual
- Email nao pode estar duplicado

### Login

- Email deve existir
- Senha deve corresponder ao cadastro

## Persistencia com LocalStorage

### Chaves utilizadas

- users: lista de usuarios cadastrados
- loggedUser: email do usuario autenticado
- themePreference: tema escolhido (light ou dark)

### Formato de users

```json
[
  {
    "name": "Nome do usuario",
    "email": "email@email.com",
    "password": "senha"
  }
]
```

## Responsividade e UX

- Estrutura com layout flexivel para diferentes resolucoes
- Botoes com feedback de hover e loading
- Estados de erro e sucesso de forma clara
- Transicoes para navegacao mais fluida

## Melhorias futuras

- Criptografia de senha no front-end para demonstracao didatica
- Recuperacao de senha simulada
- Internacionalizacao (pt-BR/en)
- Testes automatizados de validacao

## Licenca

Uso livre para fins de estudo e portfolio.
