# desafio-konsi
# Observações

* Para melhorar a perfomance eu utilizei as integrações ao invés de fazer um crawler com SPA, que seria bem mais complexo e díficil de adicionar perfomance, para fins de testes identifiquei que estava demorando pelo menos 3 segundos para fazer todo o carregamento da página com o crawler de SPA.

* Ainda é possível adicionar mais perfomance adicionando um camada de cache com um Redis por exemplo.

* A aplicação foi dockerizada por questões de portabilidade e garantia de funcionamento e também por poder ser utilizado algum serviço de orquestração de container um Kubernetes, por exemplo. Para fins de escalabilidade.
# Como rodar o projeto

* Para rodar o projeto localmente execute os passos abaixo:

    * Para instalar as dependências: **npm i**
    * Para rodar os testes: **npm run test:integration**
    * Definir as envs de porta e o token da API
    * Para rodar o projeto: **npm run start**

* Para rodar o projeto via container:

    * Bastar rodar o comando: **npm build**
    * Bastar subir o container: **start:container**
