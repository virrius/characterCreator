console.log('PostgreSQL GET Function');
var pg = require("pg");
exports.handler = function(event, context,callback) {
    console.log('Received event : ' + JSON.stringify(event) + ' at ' + new Date());
    let data = event.body.split("&");
   let obj={};
    for(let key in data)
    {
        console.log(data[key]);
        obj[data[key].split("=")[0]] = data[key].split("=")[1];
    }

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
        }
        else {
            console.log('Connection established with pg db server');
            let SQL1="SELECT column_name FROM information_schema.columns WHERE table_name ='characteristics';";
            console.log(SQL1);
            client.query("SELECT column_name FROM information_schema.columns WHERE table_name ='characteristics';",
                (err, characteristics)=> {
                    client.end(function (err) {
                        callback(null, {
                            statusCode: '200',
                            "headers": {
                                "Access-Control-Allow-Origin": "*",
                                'Access-Control-Allow-Methods': 'POST'
                            },
                            body: characteristics.rows
                        });
                    })
                })
            }





    });


    console.log('Ending lambda at ' + new Date());


};
