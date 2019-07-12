# schedule

Olá!

Bem vindos ao Schedule, aplicação para agendamento e gerenciamento de consultas, com cadastro de usuários e médicos.

Para executar, espera-se o MySQL com as seguintes configurações:

*"username": "root"*
*"password": "password"*

e uma base de dados nomeada "ae_schedule" previamente criada.

Para alterar essas informações, edite o arquivo *api/config/database.js* enquanto o programa não aceita variáveis de ambiente.

Para execução da API, vá para a pasta **api/** e execute o comando **npm i** para instalar dependências, e, depois da instalação, execute o comando **./node_modules/.bin/sequelize db:migrate**. Após o termino desta execução, execute o comando **npm run server**.
Importante: você deve estar na pasta **api/**!

Para execução do Client, vá para a pasta **client/** e execute o comando **npm i** para instalar dependências, e, depois da instalação, execute o comando **npm start**.
Importante: você deve estar na pasta **client/**!

Deixe os dois terminais rodando!

Qualquer dúvida ou problema, entre em contato no meu e-mail: vmwatanabe@gmail.com