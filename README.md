[![Build Status](https://travis-ci.org/mendesiasmin/DreamRich.svg?branch=master)](https://travis-ci.org/mendesiasmin/DreamRich)

# Gerência e Configuração de Software

Iasmin Mendes, 14/0041940

## DreamRich

DreamRich é um software de planejamento financeiro, em desenvolvimento por alunos da UnB em parceiria com a empresa GWX Investimento. O qual usa das tecnologias Django e React para prover os serviço.

A estrutura do software está organizada em dois respositórios, um para a [API](https://github.com/DreamRich/DreamRich) e outro para a parte referente ao [FrontEnd](https://github.com/DreamRich/DreamRichJS). Para a execução deste trabalho foi criado um terceiro repositório chamdo [DreamRichStart](https://github.com/mendesiasmin/DreamRichStart) o qual tinha o objetivo de manter os arquivos de configuração separados dos arquivos tanto da API quanto do FrontEnd, logo parte do histórico de implementação deste projeto encontra-se neste repositório. Mas, para fins de poder construir qualquer uma das duas frentes independentes das outras esta ideia foi abortada, e portanto, os repositórios que prevaleceram com a implementação do código de Gerência e Configuração de Software, foram os sequintes forks do projeto original:

* [Fork da API](https://github.com/mendesiasmin/DreamRich)
* [Fork do FrontEnd](https://github.com/mendesiasmin/DreamRichJS)

### Integração Contínua

A integração contínua foi realizada com o Travis CI somente na parte da api.

[Travis](https://travis-ci.org/mendesiasmin/DreamRich)

### Isolamento de ambiente

Para o isolamento de ambiente utilizou-se o Docker. De forma que cada repositório (api e frontend) possui um DockerFile e um docker-compose.

Para levanatr o ambiente da api, deve-se executar:

1. docker-compose build
1. docker run dreamrich_api python3 manage.py make_db
1. docker run dreamrich_api python3 manage.py load_db
1. docker-compose up

Para o ambiente de frontend, basta:

1. docker-compose build
1. docker-compose up

Comandos úteis:

1. docker run dreamrich_api python3 manage.py reset_db
1. docker run dreamrich_api python3 manage.py load_all

### Automação da Build

Para a build do frontend do projeto, encontra-se disponível as seguintes tarefas a serem executadas:

1. gulp clean:dist
1. gulp sass
1. gulp sass:min
1. gulp server
1. gulp watch
1. NODE_ENV= development gulp build

### Empacotamento

O empacotamento foi realizado somente no frontend, onde encontra-se o arquivo Packcage.json. Caso deseje testar o pacote, pode executar os seguintes passos:

1. Dentro da pasta DreamRichJS execute **npm link**
1. Saia da pasta DreamRichJS, e criei outro projeto npm qualquer, somemente para teste:
  1. mkdir testPackcage
  1. cd testPackcage
  1. npm init
1. Dentro da pasta testPackage execute o comando **npm link dreamrich**
1. Se o pacote tiver sido gerado corretamente, será exibido o link para onde está a referência do pacote no seu computador.
