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
                        'Access-Control -Allow-Methods': 'POST'
                    },
                    body: 'Ошибка соединения с базой данных '
                });
            });
        }
        else {
            if(obj['oldCharName']!=='undefined') {
                let SQL = "DELETE FROM characters WHERE charname='" + obj['oldCharName'] + "' RETURNING characteristics,skills;";
                console.log(SQL);
                try {
                    client.query("BEGIN; DELETE FROM characters WHERE charname='" + obj['oldCharName'] + "' RETURNING characteristics,skills; COMMIT;",
                        (err, ids) => {
                            console.log(ids.rows);

                            client.query(" DELETE FROM characteristics WHERE id='" + ids.rows[0]['characteristics'] + "'; COMMIT;");
                            client.query(" DELETE FROM skills WHERE id='" + ids.rows[1]['skills'] + "'; COMMIT;");


                        });

                } catch (e) {
                    client.query("ROLLBACK;");
                    console.log(e);
                }
            }
            console.log("Im here!");
            var characteristicsID;
            var skillsID;
            let userName=obj['userName'];
            console.log('Connection established with pg db server');
            let SQL1 = "SELECT column_name FROM information_schema.columns WHERE table_name ='characteristics';";
            console.log(SQL1);
            client.query("SELECT column_name FROM information_schema.columns WHERE table_name ='characteristics';",
                (err, characteristics) => {
                    let SQLcolumns="";
                    let SQLvalues="";
                    console.log(characteristics.rows);
                    characteristics.rows.forEach(function (item, i, arr) {
                        let column=item['column_name'];
                        if(obj[column]!==undefined)
                        {
                            SQLcolumns += column + ", ";
                            SQLvalues+="'"+obj[column]+"', ";
                        }
                    });
                    SQLcolumns=SQLcolumns.slice(0,-2);
                    SQLvalues=SQLvalues.slice(0,-2);
                    console.log("ERROR?",SQLcolumns);
                    console.log(SQLcolumns, SQLvalues);
                    let SQL2="INSERT INTO characteristics("+SQLcolumns+") VALUES("+SQLvalues+") RETURNING id;";
                    console.log(SQL2);
                    client.query("INSERT INTO characteristics("+SQLcolumns+") VALUES("+SQLvalues+") RETURNING id;",
                        (err, id)=>
                        {
                            characteristicsID=id.rows[0]['id'];
                            console.log(characteristicsID);
                            let SQL11 = "SELECT column_name FROM information_schema.columns WHERE table_name ='skills';";
                            console.log(SQL11);
                            client.query("SELECT column_name FROM information_schema.columns WHERE table_name ='skills';",
                                (err, skills) => {
                                    let SQLcolumns="";
                                    let SQLvalues="";
                                    skills.rows.forEach(function (item, i, arr) {
                                        let column=item['column_name'];
                                        if(obj[column]!==undefined)
                                        {
                                            SQLcolumns += column + ", ";
                                            SQLvalues+="'"+obj[column]+"', ";
                                        }
                                    });
                                    SQLcolumns=SQLcolumns.slice(0,-2);
                                    SQLvalues=SQLvalues.slice(0,-2);
                                    console.log(SQLcolumns, SQLvalues);
                                    let SQL22="INSERT INTO skills("+SQLcolumns+") VALUES("+SQLvalues+") RETURNING id;";
                                    console.log(SQL22);
                                    client.query("INSERT INTO skills("+SQLcolumns+") VALUES("+SQLvalues+") RETURNING id;",
                                        (err, id)=>
                                        {
                                            skillsID=id.rows[0]['id'];
                                            console.log(skillsID, characteristicsID);
                                            let SQL111="SELECT column_name FROM information_schema.columns WHERE table_name ='characters';"
                                            console.log(SQL111);
                                            client.query("SELECT column_name FROM information_schema.columns WHERE table_name ='characters';",
                                                (err, attributes) => {
                                                    let SQLcolumns="";
                                                    let SQLvalues="";
                                                    attributes.rows.forEach(function (item, i, arr) {
                                                        let column=item['column_name'];
                                                        if(obj[column]!==undefined)
                                                        {
                                                            SQLcolumns += column + ", ";
                                                            SQLvalues+="'"+obj[column]+"', ";
                                                        }
                                                    });
                                                    SQLcolumns+="owner, "+"characteristics, "+"skills";
                                                    SQLvalues+="'"+userName+"', '"+characteristicsID.toString()+"', '"+skillsID.toString()+"'";
                                                    console.log(SQLcolumns, SQLvalues);
                                                    let SQL22="INSERT INTO characters("+SQLcolumns+") VALUES("+SQLvalues+")";
                                                    console.log(SQL22);
                                                    client.query("INSERT INTO characters("+SQLcolumns+") VALUES("+SQLvalues+") RETURNING id;",
                                                        (err,res)=>
                                                        {

                                                            client.end(function (err) {
                                                                callback(null, {
                                                                    statusCode: '200',
                                                                    "headers": {
                                                                        "Access-Control-Allow-Origin": "*",
                                                                        'Access-Control-Allow-Methods': 'POST'
                                                                    },
                                                                    body: "success"                                                                });
                                                            });
                                                        }
                                                    )

                                                })
                                        }
                                    )

                                });


                        }
                    )

                });

        }


    });


    console.log('Ending lambda at ' + new Date());


};
