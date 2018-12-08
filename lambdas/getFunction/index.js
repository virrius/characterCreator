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
    let pool = new pg.Pool(conn);
    pool.connect(function (err, client, done) {

        if (err) {
            console.error('Error connecting to pg server' + err.stack);
            callback(err);
        } else {
            console.log('Connection established with pg db server');

            client.query("INSERT INTO users(Name,Email,Password) VALUES('virrius', 'virrius@ro.ru', 'qwerty')");
            if (err) {
                console.error('Error executing query on pg db' + err.stack);
                callback(err);
            }
        }
        client.release();
        pool.end();
        callback(null, {
            statusCode: '200',
            "headers": {
                "Access-Control-Allow-Origin": "*"
            }
        });
        console.log('Ending lambda at ' + new Date());

    });
};