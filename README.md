# artificial-hot

## Objetivo

Consulta a API do reddit diariamente para recolher os posts, e permitir que esses sejam filtrados de acordo com os parametros passados.

## URL API

https://artificial-hot.herokuapp.com

## Documentação

- [Documentação](https://artificial-hot.herokuapp.com/api-docs/)

### Docker

Caso não possua o docker instalado na sua maquina, faça a instalação do mesmo em -> [docker](https://www.docker.com/get-started)

Após instalado o docker e o docker-compose, execute os seguintes comandos:

1. docker build .
2. docker-compose up -d

OBS: Não esqueça de configurar o .env

### Testes

Para rodar os testes é necessário estar com o docker rodando ou com uma instancia do postgres local:

Para realizar o teste local:
- yarn test-local

Para realizar os testes com o docker:
- yarn test-docker