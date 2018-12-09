console.log('PostgreSQL GET Function');
var pg = require("pg");
exports.handler = function(event, context,callback) {
    console.log('Received event : ' + JSON.stringify(event) + ' at ' + new Date());
    let userData=JSON.parse(event.body);
    let name= userData["name"];
    let mail = userData["email"];
    let password = userData["password"];
    console.log(name,mail,password);


    let conn = ({
        host: 'characterdb.c4mkdpklb4rf.us-east-2.rds.amazonaws.com',
        port: 5432,
        user: 'virrius',
        password: 'yaalz2027',
        database: 'CharacterDB'
    });
    let callbackMessage="";
    let client = new pg.Client(conn);
    let err=false;
    client.connect((err) => {
        if (err) {
            console.error('Error connecting to pg server' + err.stack);

            callback(null, {
                statusCode: '200',
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    'Access-Control-Allow-Methods': 'POST'
                },
                body: 'Ошибка соединения с базой данных '
            });
        } else {
            console.log('Connection established with pg db server');
            let user= client.query("SELECT name FROM users WHERE name=\'"+name+"\' or mail= \'"+mail+"\';");
            console.log(user);
            if(!(user.length===0))
            {
                callback(null, {
                    statusCode: '200',
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                        'Access-Control-Allow-Methods': 'POST'
                    },
                    body: "Пользователь с таким именем или почтой уже существует"
                });
            }
            else
                {
                client.query("INSERT INTO users(name,mail,password) VALUES(\'" + name + "\',\'" + mail + "\',\'" + password + "\');",

                    function () {

                        client.end(function (err) {


                            callback(null, {
                                statusCode: '200',
                                "headers": {
                                    "Access-Control-Allow-Origin": "*",
                                    'Access-Control-Allow-Methods': 'POST'
                                },
                                body: "succesa"
                            });
                        });
                    });
                }
            }
    });

    console.log('Ending lambda at ' + new Date());


};
