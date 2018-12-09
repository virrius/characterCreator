console.log('PostgreSQL GET Function');
var pg = require("pg");
exports.handler = function(event, context,callback) {
    console.log('Received event : ' + JSON.stringify(event) + ' at ' + new Date());
    let userData=JSON.parse(event.data);

    let name= userData.name;
    let mail = userData.email;
    let password = userData.password;
    let conn = ({
        host: 'characterdb.c4mkdpklb4rf.us-east-2.rds.amazonaws.com',
        port: 5432,
        user: 'virrius',
        password: 'yaalz2027',
        database: 'CharacterDB'
    });
    var client = new pg.Client(conn);
    let err=false;
    client.connect((err) => {
        if (err) {
            console.error('Error connecting to pg server' + err.stack);
            callback(err);
        } else {
            console.log('Connection established with pg db server');


            console.log("INSERT INTO users(name,mail,password) VALUES("+name+","+mail+","+password+");");
            client.query("INSERT INTO users(name,mail,password) VALUES("+name+","+mail+","+password+");",

                function() {

                    client.end(function (err) {


                        callback(null, {
                            statusCode: '200',
                            "headers": {
                                "Access-Control-Allow-Origin": "*",
                                'Access-Control-Allow-Methods': 'POST'
                            },
                            body: "added"
                        });
                    });
                });
            console.log("after callback");
        }
    });

    console.log('Ending lambda at ' + new Date());


};