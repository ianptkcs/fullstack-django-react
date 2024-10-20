# Spotify Rooms

![Badge](https://img.shields.io/badge/license-MIT-blue.svg)
![Django](https://img.shields.io/badge/Django-4.2.5-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-13.4-blue.svg)

## Descrição

**Spotify Rooms** é uma aplicação web desenvolvida com **Django** no backend e **Next.js** no frontend. A aplicação permite que os usuários autentiquem-se, criem e entrem em salas para compartilhar e curtir músicas em grupo, integrando funcionalidades semelhantes às oferecidas pelo Spotify.

## Tabela de Conteúdos

-   [Descrição](#descrição)
-   [Tecnologias Utilizadas](#tecnologias-utilizadas)
-   [Funcionalidades](#funcionalidades)
-   [Instalação](#instalação)
    -   [Pré-requisitos](#pré-requisitos)
    -   [Backend (Django)](#backend-django)
    -   [Frontend (Next.js)](#frontend-nextjs)
-   [Uso](#uso)
-   [Contribuição](#contribuição)
-   [Licença](#licença)
-   [Autores](#autores)
-   [Estado do Projeto](#estado-do-projeto)
-   [Recursos Adicionais](#recursos-adicionais)

## Tecnologias Utilizadas

-   **Backend:**

    -   Python 3.9
    -   Django 4.2
    -   Django REST Framework

-   **Frontend:**

    -   Next.js 13.4
    -   React.js
    -   Tailwind CSS

## Funcionalidades

-   **Autenticação de Usuários:**

    -   Autenticação com a conta do Spotify.

-   **Gerenciamento de Salas:**

    -   Criação de novas salas.
    -   Listagem de salas disponíveis.
    -   Entrada em salas existentes.

-   **Integração com Spotify:**
    -   Reprodução de músicas dentro das salas.

## Instalação

### Pré-requisitos

-   **Backend:**

    -   Python 3.9 ou superior
    -   pip
    -   Virtualenv

-   **Frontend:**
    -   Node.js 14 ou superior
    -   npm ou yarn

### Backend (Django)

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/ianptkcs/spotify-rooms.git
    cd spotify-rooms/backend
    ```

2. **Crie e ative um ambiente virtual:**

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # No Windows: venv\Scripts\activate
    ```

3. **Instale as dependências:**

    ```bash
    pip install -r requirements.txt
    ```

4. **Configure as variáveis de ambiente:**

    - Renomeie o arquivo `.env.example` para `.env` e preencha com as suas configurações.

5. **Aplique as migrações do banco de dados:**

    ```bash
    python manage.py migrate
    ```

6. **Crie um superusuário (opcional):**

    ```bash
    python manage.py createsuperuser
    ```

7. **Inicie o servidor de desenvolvimento:**

    ```bash
    python manage.py runserver
    ```

### Frontend (Next.js)

1. **Navegue para o diretório do frontend:**

    ```bash
    cd ../frontend
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3. **Configure as variáveis de ambiente:**

    - Renomeie o arquivo `.env.example` para `.env` e preencha com as suas configurações.

4. **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    # ou
    yarn dev
    ```

## Uso

1. **Acesse a aplicação:**

    - Backend: `http://localhost:8000/`
    - Frontend: `http://localhost:3000/`

2. **Gerenciar Salas:**

    - Crie novas salas ou entre em salas existentes para compartilhar e curtir músicas com outros usuários.

3. **Integração com Spotify:**

    - Conecte sua conta do Spotify para sincronizar playlists e controlar a reprodução de músicas dentro das salas.

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. **Fork este repositório.**
2. **Crie uma branch para sua feature:**

    ```bash
    git checkout -b minha-feature
    ```

3. **Commit suas alterações:**

    ```bash
    git commit -m "Adiciona nova feature X"
    ```

4. **Push para a branch:**

    ```bash
    git push origin minha-feature
    ```

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## Autores

-   **Ian Patrick** - [ianptkcs](https://github.com/ianptkcs)

## Estado do Projeto

Este projeto está em fase de desenvolvimento. Como estava sendo desenvolvido localmente, seguindo o tutorial [Django-React-Fullstack](https://youtube.com/playlist?list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j&si=xjWXpysf559dcBeR), um problema enfrentado foi o envio/recebimento de cookies e tokens pela API do spotify, pois ela envia somente para conexões seguras (desenvolvimento local é http). Por isso, não houve prosseguimento do projeto, uma vez que os últimos vídeos focariam mais na manipulação e utilização dessa API do que o ensino de novos conceitos. Por isso, o site pode não estar completamente funcional.

Também não houve uma preocupação muito grande na UI do site, pois o foco era na comunicação frontend -> backend -> frontend
