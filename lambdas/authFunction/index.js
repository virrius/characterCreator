console.log('PostgreSQL GET Function');
var pg = require("pg");
exports.handler = function(event, context,callback) {
    console.log('Received event : ' + JSON.stringify(event) + ' at ' + new Date());
    console.log(event.body['agility']);
    console.log(event.body.split('&'));
    console.log(name,mail,password);


    let conn = ({
        host: 'characterdb.c4mkdpklb4rf.us-east-2.rds.amazonaws.com',
        port: 5432,
        user: 'virrius',
        password: 'yaalz2027',
        database: 'CharacterDB'
    });
    let client = new pg.Client(conn);
    let err=false;
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
            console.log("SELECT name FROM users WHERE name=\'"+name+"\' or mail= \'"+mail+"\';");
            client.query("SELECT name FROM users WHERE name=\'"+name+"\' or mail= \'"+mail+"\';",
                (err, users)=>{
                    console.log(users);
                    console.log(users.rows);
                    console.log(users.rows.length);
                    if(!(users.rows.length===0))
                    {
                        client.end(function (err) {
                            callback(null, {
                                statusCode: '200',
                                "headers": {
                                    "Access-Control-Allow-Origin": "*",
                                    'Access-Control-Allow-Methods': 'POST'
                                },
                                body: "Пользователь с таким именем или почтой уже существует"
                            });
                        });
                    }
                    else
                    {
                        console.log("next query");
                        client.query("INSERT INTO users(name,mail,password) VALUES(\'" + name + "\',\'" + mail + "\',\'" + password + "\');",
                            function () {

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
                            });
                    }
                })


            }
    });

    console.log('Ending lambda at ' + new Date());


};
