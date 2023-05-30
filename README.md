# Indicai API

## Indicação de lugares

Rotas GET e POST

### Criar indicação [POST /api/indicacao]
+ Attributes (object)
    + image (string, required)       
    + endereco (string, required)      //rua + bairro + cidade   
    + descricao (string, required)
    + categoria (string, required)

+ Request (application/json)

+ Body 

        {
            "image": "urlImagem.com/18443171347",
            "endereco": "Rua do Riachuelo, Boa vista, Recife",
            "descricao": "Belo lugar para tirar fotos, próximo ao shopping boa vista",
            "categoria": "Fotos de ruas" 
        }

            
### Buscar todos [GET /api/indicacao]

* Response 200 (application/json)

       { 
            "localizacao": {
                "type": "Point",
                "coordinates": [
                    -7.8490756,
                    -34.8638913
                ]
            },
            "_id": "~ id ~ ",
            "image": "urlImagem.com/18443171347",
            "endereco": "Nova Cruz, Igarassu",
            "descricao": "Praia exuberante addressizada no coração histórico do Brasil.",
            "categoria": "Natureza",
            "__v": 0 
        }

### Filtrar por pesquisa [GET /api/search?item=NomeDaPesquisa]
* Parameters
    * item - Busca a string informada nos campos: endereco, descricao e categoria.

* Exemplo /api/search?item=rec

* Response 200 (application/json)

* Body 
        
        {
            { 
                "localizacao": {
                    "type": "Point",
                    "coordinates": [
                        -7.8490756,
                        -34.8638913
                    ]
                },
                "_id": "~ id ~ ",
                "image": "urlImagem.com/18443171347",
                "endereco": "Recife",
                "descricao": "bla bla bla",
                "categoria": "Pores do sol",
                "__v": 0 
            },
            { 
                "localizacao": {
                    "type": "Point",
                    "coordinates": [
                        -7.8490756,
                        -34.8638913
                    ]
                },
                "_id": "~ id ~ ",
                "image": "urlImagem.com/18443171347",
                "endereco": "Nova Cruz, Recife",
                "descricao": "Praia exuberante addressizada no coração histórico do Brasil.",
                "categoria": "Natureza",
                "__v": 0 
            },
            { 
                "localizacao": {
                    "type": "Point",
                    "coordinates": [
                        -7.8490756,
                        -34.8638913
                    ]
                },
                "_id": "~ id ~ ",
                "image": "urlImagem.com/18443171347",
                "endereco": "Boa viagem",
                "descricao": "Praia exuberante no Recife.",
                "categoria": "Natureza",
                "__v": 0 
            }
        }



### Filtrar por proximidade [GET /api/near?longitude=-7.8490756&latitude=-34.8638913]
* Parameters
    * longitude 
    * latitude 
        - busca todas as indicações de lugares num raio de 10km

* Response 200 (application/json)

* Body 
                
        {
            { 
                "localizacao": {
                    "type": "Point",
                    "coordinates": [
                        -7.8490756,
                        -34.8638913
                    ]
                },
                "_id": "~ id ~ ",
                "image": "urlImagem.com/18443171347",
                "endereco": "Recife",
                "descricao": "bla bla bla",
                "categoria": "Pores do sol",
                "__v": 0 
            },
            { 
                "localizacao": {
                    "type": "Point",
                    "coordinates": [
                        -7.8490756,
                        -34.8638913
                    ]
                },
                "_id": "~ id ~ ",
                "image": "urlImagem.com/18443171347",
                "endereco": "Nova Cruz, Recife",
                "descricao": "Praia exuberante addressizada no coração histórico do Brasil.",
                "categoria": "Natureza",
                "__v": 0 
            },
            { 
                "localizacao": {
                    "type": "Point",
                    "coordinates": [
                        -7.8490756,
                        -34.8638913
                    ]
                },
                "_id": "~ id ~ ",
                "image": "urlImagem.com/18443171347",
                "endereco": "Boa viagem",
                "descricao": "Praia exuberante no Recife.",
                "categoria": "Natureza",
                "__v": 0 
            }
        }

### Filtrar por categoria [GET /api/categorias?items=Alimentacao,Natureza]
* Parameters
    * items - Busca todas as categorias informadas em items. (O nome tem que ser igual ao que está salvo no banco de dados).

* Response 200 (application/json)

* Body 
                
        {
            { 
                "localizacao": {
                    "type": "Point",
                    "coordinates": [
                        -7.8490756,
                        -34.8638913
                    ]
                },
                "_id": "~ id ~ ",
                "image": "urlImagem.com/18443171347",
                "endereco": "Recife",
                "descricao": "Restaurante no Centro do Recife",
                "categoria": "Alimentacao",
                "__v": 0 
            },
            { 
                "localizacao": {
                    "type": "Point",
                    "coordinates": [
                        -7.8490756,
                        -34.8638913
                    ]
                },
                "_id": "~ id ~ ",
                "image": "urlImagem.com/18443171347",
                "endereco": "Nova Cruz, Recife",
                "descricao": "Praia exuberante addressizada no coração histórico do Brasil.",
                "categoria": "Natureza",
                "__v": 0 
            },
            { 
                "localizacao": {
                    "type": "Point",
                    "coordinates": [
                        -7.8490756,
                        -34.8638913
                    ]
                },
                "_id": "~ id ~ ",
                "image": "urlImagem.com/18443171347",
                "endereco": "Boa viagem",
                "descricao": "Praia exuberante no Recife.",
                "categoria": "Natureza",
                "__v": 0 
            }
        }

## Users

Rotas GET e POST

### Criar usuario [POST /api/user/createUser]

+ Attributes (object)
    + name (string, required)       
    + email (string, required, unique, primary)
    + password (string, required)

+ Request (application/json)

+ Body 

        {
            "name": "Arthur",
            "email": "arthurlindo@gmail.com",
            "password": "mandao123",
        }

* Response 201 (application/json)

* Body

        {
            "msg": "Usuário criado com sucesso"
        }

### Login usuario [POST /api/user/login]

+ Request (application/json)

+ Body 

        {
            "name": "Arthur",
            "password": "mandao123"
        }

* Response 200 (application/json)

* Body

        {
            "name" : "Arthur"
        }