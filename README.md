# CurrencyConverter

## Instalação

1. Faça o clone dos arquivos neste repositório.
2. Acesse a pasta clonada no seu terminal
3. Execute `ng serve`. Navigate to `http://localhost:4200/`.

## Instalação (Docker)

1. Faça o clone dos arquivos neste repositório.
2. Instale o [Docker](https://docs.docker.com/install/) e o [Docker Compose](https://docs.docker.com/compose/install/).
3. Entre na pasta do projeto no seu terminal e rode o comando docker-compose up -d
4. Acesse a URL <http://localhost:4200/> no navegador e inicie a instalação.
5. Para Conseguir fazer alterações siga instruções a seguir

## Alterações (Docker)

1. Com o container funcionando volte ao terminal e execute o comando `docker container ps` para saber o id do container
2. Com o id do container em mãos execute `docker exec -t -i 112233445566 /bin/bash` onde o número `112233445566` você deve trocar para o id encontrado no passo anterior

## Rodando Testes

Execute `ng test` na pasta clonada no seu terminal.
