var express = require('express'); // requisita a biblioteca para a criacao dos serviços web.
var pg = require("pg");


var sw = express(); // iniciliaza uma variavel chamada app que possitilitará a criação dos serviços e rotas.


sw.use(express.json());//padrao de mensagens em json.


sw.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    next();
});


const config = {
    host: 'localhost',
    user: 'postgres',
    database: 'db_cs_2024',
    password: 'postgres',
    port: 5432
};


//definia conexao com o banco de dados.
const postgres = new pg.Pool(config);


//definicao do primeiro serviço web.
sw.get('/', (req, res) => {
    res.send('Hello, world! meu primeiro teste.  #####');
})


sw.get('/teste', (req, res) => {
    res.status(201).send('meu teste');
})


sw.get('/listendereco', function (req, res, next) {

    postgres.connect(function (err, client, done) {


        if (err) {


            console.log("Nao conseguiu acessar o  BD " + err);
            res.status(400).send('{' + err + '}');
        } else {


            var q = 'select * from tb_endereco';

            client.query(q, function (err, result) {
                done(); // closing the connection;
                if (err) {
                    console.log('retornou 400 no listendereco');
                    console.log(err);

                    res.status(400).send('{' + err + '}');
                } else {


                    //console.log('retornou 201 no /listendereco');
                    res.status(201).send(result.rows);
                }
            });
        }
    });
});

sw.get('/listpatentes', function (req, res, next) {

    postgres.connect(function (err, client, done) {

        if (err) {
            console.log("Não conseguiu acessar o BD " + err);
            res.status(400).send('{' + err + '}');
        } else {

            var q = 'select * from tb_patente';

            client.query(q, function (err, result) {
                done(); // Fechando a conexão
                if (err) {
                    console.log('Retornou 400 no /listpatentes');
                    console.log(err);

                    res.status(400).send('{' + err + '}');
                } else {

                    res.status(201).send(result.rows);
                }
            });
        }
    });
});

sw.get('/listjogadores', function (req, res, next) {

    postgres.connect(function (err, client, done) {

        if (err) {
            console.log("Não conseguiu acessar o BD " + err);
            res.status(400).send('{' + err + '}');
        } else {

            var q = 'select * from tb_jogador';

            client.query(q, function (err, result) {
                done(); // Fechando a conexão
                if (err) {
                    console.log('Retornou 400 no /listjogadores');
                    console.log(err);

                    res.status(400).send('{' + err + '}');
                } else {

                    res.status(201).send(result.rows);
                }
            });
        }
    });
});





sw.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});
