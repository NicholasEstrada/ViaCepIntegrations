# ViaCep Integrations

Este projeto consiste em um sistema web simples que permite consultar um endereço através do CEP, armazenar registros e exibir os registros armazenados. A consulta do endereço é realizada via JavaScript através da API disponibilizada pelo [ViaCep](https://viacep.com.br/).

## Funcionalidades

- Consultar endereço por CEP.
- Armazenar registros de endereços.
- Exibir registros armazenados em uma tabela.
- Ordenar registros por cidade, bairro, estado, CEP e logradouro.

## Como Usar

1. Abra o arquivo `index.html` em um navegador web.
2. Insira um CEP válido no campo de busca e clique em "Consultar".
3. O resultado da consulta será exibido, e o registro será armazenado.
4. Os registros armazenados serão exibidos em uma tabela com opções de ordenação.

## Estrutura do Projeto

- `index.html`: Página principal do sistema.
- `assets/script.js`: Código JavaScript para interação com a API, manipulação dos registros e ordenação.
- `assets/style.css`: Folha de estilo para estilização da interface.
- `logic/save.php`: Script PHP para salvar registros no servidor.
- `logic/carregar.php`: Script PHP para carregar registros salvos.

## Pré-requisitos

- Servidor web local (por exemplo, XAMPP) para executar scripts PHP.

## Autor

Nicholas Estrada
