# BoardMatch API

## Sumário

* [Status Codes](#status-codes)
* [Responses](#responses)
* [/api/email-list](#apiemail-list)

## Status Codes

Os status de respostas possíveis para esta API são:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |

## Responses

A API sempre retorna JSON

Os endpoints terão sempre um dos seguintes atributos em sua
response:

```javascript
{
  ...
  "message": String
}
```

```javascript
{
  "error": String
}
```

O atributo `message` estará presente caso uma request seja concluída com sucesso, e ausente caso contrário.

O atributo `error` estará presente caso uma request não seja devidamente concluída, retornando o devido erro.

Além disso, os endpoints podem retornar outros atributos específicos daquele endpoint, mas sempre
serão retornados juntamente destes dois atributos.

## Endpoints:

### /api/email-list

#### Salvar um email na email list do BoardMatch

```http
POST /api/email-list
```

Request body:

```javascript
{
  "email": String
}
```

Exemplo:

```javascript
{
  "email": "exemplo@gmail.com"
}
```

Response:

```javascript
{
  "message": String
}
```