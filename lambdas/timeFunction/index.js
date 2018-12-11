console.log('PostgreSQL GET Function');
var pg = require("pg");
exports.handler = function(event, context,callback) {
    console.log('Received event : ' + JSON.stringify(event) + ' at ' + new Date());
    let userData=JSON.parse(event.body);
    let charName=userData["charName"];
    let userName=userData["userName"];
    console.log(charName,userName);


    let conn = ({
        host: 'characterdb.c4mkdpklb4rf.us-east-2.rds.amazonaws.com',
        port: 5432,
        user: 'virrius',
        password: 'yaalz2027',
        database: 'CharacterDB'
    });

    let client = new pg.Client(conn);
    let charjson="";
    client.connect((err) => {
        if (err) {
            console.error('Error connecting to pg server' + err.stack);
            client.end(function (err) {
                callback(null, {
                    statusCode: '200',
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                        'Access-Control -Allow-Methods': 'POST'
                    },
                    body: 'Ошибка соединения с базой данных '
                });
            });
        }
        else {

            console.log('Connection established with pg db server');
            console.log("SELECT charname, race, gender, chardescription,backstory, hindrances  FROM characters WHERE charname=\'"+charName+"\' and owner=\'"+userName+"\';");
            client.query("SELECT charname, race, gender, chardescription,backstory, hindrances  FROM characters WHERE charname=\'"+charName+"\' and owner=\'"+userName+"\';",
                (err, characters)=>{

                    charjson=`{attributes: ${JSON.stringify(characters.rows)}}`;
                    console.log("SELECT * FROM characteristics WHERE id IN (SELECT characteristics FROM characters WHERE charname=\'"+charName+"\' and owner=\'"+userName+"\');");
                    client.query("SELECT * FROM characteristics WHERE id IN (SELECT characteristics FROM characters WHERE charname=\'"+charName+"\' and owner=\'"+userName+"\');",
                        (err,characteristics)=>{

                            charjson+=`{skills: ${JSON.stringify(characteristics.rows)}}`;

                            console.log("SELECT * FROM skills WHERE id IN (SELECT skills FROM characters WHERE charname=\'"+charName+"\' and owner=\'"+userName+"\');");
                            client.query("SELECT * FROM skills WHERE id IN (SELECT skills FROM characters WHERE charname=\'"+charName+"\' and owner=\'"+userName+"\');",
                                (err,skills)=>{

                                    charjson+=`{skills: ${JSON.stringify(skills.rows)}}`;
                                    client.end(function (err) {
                                        callback(null, {
                                            statusCode: '200',
                                            "headers": {
                                                "Access-Control-Allow-Origin": "*",
                                                'Access-Control-Allow-Methods': 'POST'
                                            },
                                            body: charjson                                                              });
                                    });
                                }
                            )
                        }
                    )
                });


        }});


    console.log('Ending lambda at ' + new Date());


};