console.log('PostgreSQL GET Function');
var pg = require("pg");
exports.exports.handler= (event, context,callback) =>{
    console.log('Received event : ' + JSON.stringify(event) + ' at ' + new Date());
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

            client.query("INSERT INTO users(name,mail,password) VALUES('virrius','vir@ro.ru','qwerty');");
            callback(null, {
                statusCode: '200',
                "headers": {
                    "Access-Control-Allow-Origin": "*"
                },
                body: "AAAAAAAAA"
            });
        }
    });

    console.log('Ending lambda at ' + new Date());


};