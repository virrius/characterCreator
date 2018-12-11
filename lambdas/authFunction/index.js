console.log('PostgreSQL Function');
var pg = require("pg");
exports.handler = function(event, context,callback) {
    console.log('Received event : ' + JSON.stringify(event) + ' at ' + new Date());
    let userData=JSON.parse(event.body);
    let name= userData["name"];
    let password = userData["password"];



    let conn = ({
        host: 'characterdb.c4mkdpklb4rf.us-east-2.rds.amazonaws.com',
        port: 5432,
        user: 'virrius',
        password: 'yaalz2027',
        database: 'CharacterDB'
    });
    let client = new pg.Client(conn);

    client.connect((err) => {
        if (err) {
            console.error('Error connecting to pg server' + err.stack);
            client.end(function (err) {
                callback(null, {
                    statusCode: '200',
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                        'Access-Control-Allow-Methods': 'POST'
                    },
                    body: 'Ошибка соединения с базой данных '
                });
            });
        } else {
            console.log('Connection established with pg db server');
            console.log("SELECT name FROM users WHERE name=\'"+name+"\' and password= \'"+password+"\';");
            client.query("SELECT name FROM users WHERE name=\'"+name+"\' and password= \'"+password+"\';",
                (err, users)=>{
                    if(!(users.rows.length===0))
                    {
                        client.end(function (err) {
                            callback(null, {
                                statusCode: '200',
                                "headers": {
                                    "Access-Control-Allow-Origin": "*",
                                    'Access-Control-Allow-Methods': 'POST'
                                },
                                body: "success"
                            });
                        });
                    }
                    else
                    {
                        client.end(function (err)
                        {
                            callback(null, {
                                statusCode: '200',
                                "headers": {
                                    "Access-Control-Allow-Origin": "*",
                                    'Access-Control-Allow-Methods': 'POST'
                                },
                                body: "Пользователь не найден. Проверьте логин или пароль"
                            });


                        });

                    }
                })


        }
    });

    console.log('Ending lambda at ' + new Date());


};