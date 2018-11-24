console.log('PostgreSQL GET Function');
var pg = require("pg");
exports.handler = function(event, context) {
    var conn = ({
        host: 'characterdb.c4mkdpklb4rf.us-east-2.rds.amazonaws.com',
        port: 5432,
        user: 'virrius',
        password: 'yaalz2027',
        database: 'characterdb'
    });
    var client = new pg.Client(conn);
    client.connect();
//var id = event.id;
    console.log('Connected to PostgreSQL database');

    context.succeed("yep");

};