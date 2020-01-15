# Overview
A API do backend é um recurso Node.js-based para comunicar com o DevRadar. Você pode usa-la para acessar data e definir certas propriedades para usuários.  
Esta foi criada para servir à 10ª Semana da Omnistack desenvolvida pela Rocketseat.  
O Backend foi desenvolvido pensando-se no conceito DRY (Don't Repeat Yourself) e arquitetura MVC.

# Models: Devs
Este é o Model de Usuários (No caso da Omnistack, os Devs)  

## Estrutura
```js
{
  "_id": "<UID Aleatório>",
  "github": "<User do GitHub>",
  "name": "<Nome do usuário>",
  "bio": "<Descrição>",
  "avatar_url": "<GitHub's Avatar URL>",
  "techs": [ "<Vetor>", "<de>", "<Tecnologias>" ],
  "location": {
    "coordinates": [
      <Longitude>,
      <Latitude>
    ]
  },
  "__v": <Qnt. de updates>
}
```
# Controllers
Aqui estão listados os controles da API do DevRadar, seus métodos, parâmetros e estrutura.

## Devs
Os Devs são os usuários do programa.

| Método       | Estrutura           | Ação                                  | Parâmetros          | Retorno       |
| ------------ | ------------------- | ------------------------------------- | ------------------- | ------------- |
| ![GET][1]    | `/api/devs`         | Lista todos os usuários cadastrados   | **Nenhum**          | JSON/Usuários |
| ![POST][2]   | `/api/devs`         | Cadastra um usuário no banco de dados | JSON/git,techs,geo  | JSON/Usuário  |
| ![GET][3]    | `/api/devs/:github` | Obtem os dados de um único usuário    | Rota/User do Github | JSON/Usuário  |
| ![PUT][4]    | `/api/devs/:github` | Edita dados do usuário                | Rota + JSON/campos  | JSON/Qnt,ok   |
| ![DELETE][5] | `/api/devs/:github` | Deleta um usuário                     | Rota                | 200 OK        |

## Search
Este controlador serve para listar usuários porém em modo de pesquisa.  
Com este módulo é possível procurar por usuários em um raio de **10km** e com techs específicas.

| Método       | Estrutura     | Ação              | Parâmetros                     | Retorno       |
| ------------ | ------------- | ----------------- | ------------------------------ | ------------- |
| ![GET][6]    | `/api/search` | Pesquisa usuários | Query/techs,latitude,longitude | JSON/Usuários |


# Exemplos
## Index
```http
GET /api/devs HTTP/1.1
```
<details>
<summary><code>HTTP/1.1 200 OK</code></summary>

```json
{
    "devs": [
        {
            "techs": [
                "Java",
                "ReactJS",
                "Node.js"
            ],
            "_id": "5e1dedc2ba895700505a1b5a",
            "github": "MateusAquino",
            "name": "Mateus",
            "avatar_url": "https://avatars1.githubusercontent.com/u/16140783?v=4",
            "bio": "I'm a Student and a Java enthusiast. Started programming around 10 years old.",
            "location": {
                "coordinates": [
                    -45.8870291,
                    -23.2480525
                ],
                "_id": "5e1dedc2ba895700505a1b5b",
                "type": "Point"
            },
            "__v": 0
        },
        ...
    ]
}
```
</details>

------------------------------------------------------------------------------------------------------------------------

## Create
```http
POST /api/devs HTTP/1.1
```
<details>
<summary><code>HTTP/1.1 200 OK</code></summary>

```json
{
    "techs": [
        "Java",
        "ReactJS",
        "Node.js"
    ],
    "_id": "5e1dedc2ba895700505a1b5a",
    "github": "MateusAquino",
    "name": "Mateus",
    "avatar_url": "https://avatars1.githubusercontent.com/u/16140783?v=4",
    "bio": "I'm a Student and a Java enthusiast. Started programming around 10 years old.",
    "location": {
        "coordinates": [
            -45.8870291,
            -23.2480525
        ],
        "_id": "5e1dedc2ba895700505a1b5b",
        "type": "Point"
    },
    "__v": 0
}
```
</details>

------------------------------------------------------------------------------------------------------------------------

## Read
```http
GET /api/devs/MateusAquino HTTP/1.1
```
<details>
<summary><code>HTTP/1.1 200 OK</code></summary>

```json
{
    "techs": [
        "Java",
        "ReactJS",
        "Node.js"
    ],
    "_id": "5e1dedc2ba895700505a1b5a",
    "github": "MateusAquino",
    "name": "Mateus",
    "avatar_url": "https://avatars1.githubusercontent.com/u/16140783?v=4",
    "bio": "I'm a Student and a Java enthusiast. Started programming around 10 years old.",
    "location": {
        "coordinates": [
            -45.8870291,
            -23.2480525
        ],
        "_id": "5e1dedc2ba895700505a1b5b",
        "type": "Point"
    },
    "__v": 0
}
```
</details>

------------------------------------------------------------------------------------------------------------------------

## Update
```http
PUT /api/devs/MateusAquino HTTP/1.1

{
  "techs": "Java, React, Node.js, CSS",
  "github": "este_campo_nao_deve_fazer_nenhuma_alteracao_no_user"
}
```
<details>
<summary><code>HTTP/1.1 200 OK</code></summary>

```json
{
    "modifiedCount": 1,
    "ok": 1
}
```
</details>


------------------------------------------------------------------------------------------------------------------------

## Delete
```http
DELETE /api/devs/MateusAquino HTTP/1.1
```
<details>
<summary><code>HTTP/1.1 200 OK</code></summary></details>



------------------------------------------------------------------------------------------------------------------------

## Search
```http
GET /api/search?techs=ReactJS,Node.JS&latitude=-23.2480525&longitude=-45.8870291 HTTP/1.1
```
<details>
<summary><code>HTTP/1.1 200 OK</code></summary>

```json
{
    "devs": [
        {
            "techs": [
                "Java",
                "React",
                "Node.js"
            ],
            "_id": "5e1dca792f10d12e3490a9f2",
            "github": "MateusAquino",
            "name": "Mateus",
            "avatar_url": "https://avatars1.githubusercontent.com/u/16140783?v=4",
            "bio": "I'm a Student and a Java enthusiast. Started programming around 10 years old.",
            "location": {
                "coordinates": [
                    -45.8870291,
                    -23.2480525
                ],
                "_id": "5e1dca792f10d12e3490a9f3",
                "type": "Point"
            },
            "__v": 0
        },
        ...
    ]
}
```
</details>

[1]: #index
[2]: #create
[3]: #read
[4]: #update
[5]: #delete
[6]: #search-1
