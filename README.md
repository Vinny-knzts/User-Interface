# Projeto User-Interface

## Rodando o projeto localmente

Requisitos : Node.js, Instância MySQL

1 - Instale as depêndecias do client e do server utilizando o comando 'npm install'

2 - Configure as variáveis de ambiente:

    server/.env => seguindo o modelo .env.example

    client/src/services/baseURL.js => defina o endpoint base da api

3 - Rode as migrations ultilizando o comando 'npx sequelize-cli db:migrate'

4 - Inicie o cliente e o server utilizando o comando 'npm start'
