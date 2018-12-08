console.log('PostgreSQL GET Function');
var pg = require("pg");
exports.handler = function(event, context) {
    console.log('Received event : ' + JSON.stringify(event) + ' at ' + new Date());
    let conn = ({
        host: 'characterdb.c4mkdpklb4rf.us-east-2.rds.amazonaws.com',
        port: 5432,
        user: 'virrius',
        password: 'yaalz2027',
        database: 'characterdb'
    });
    var client = new pg.Client(conn);
    client.connect();
    context.succeed("yep");
    let err=false;
    if (err) {
        console.error('Error connecting to pg server' + err.stack);
        callback(err);
    } else {
        console.log('Connection established with pg db server');

        client.query("INSERT INTO users(Name,Email,Password) VALUES('virrius', 'virrius@ro.ru', 'qwerty')");

    }

    console.log('Ending lambda at ' + new Date());


};