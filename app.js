var express = require("express"),
    app = express(),
    pg = require("pg"),
    path = require("path");

    app.get('/db', function (request, response) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
       client.query('SELECT * FROM test_table', function(err, result) {
            done();
        if (err)
        { console.error(err); response.send("Error " + err); }
        else
        { response.render('pages/db', {results: result.rows} ); }
        });
    });
});

app.set("port", (process.env.PORT || 5000));

/*
* PG Client connection
*/
pg.defaults.ssl = true;

var dbString = process.env.DATABASE_URL;

var sharedPgClient;

pg.connect(dbString, function(err,client){
    if(err){
        console.error("PG Connection Error")
    }
    console.log("Connected to Postgres");
    sharedPgClient = client;
});

/*
 * ExpressJS View Templates
 */
app.set("views", path.join(__dirname, "./app/views"));
app.set("view engine", "ejs");

/*
 * Jobs Landing Page
 */
app.get("/",function defaultRoute(req, res){
    var query = "SELECT * FROM salesforce.HerokuConnectTest__c";
    var result = [];
    sharedPgClient.query(query, function(err, result){
        console.log("Jobs Query Result Count: " + result.rows.length);
        res.render("index.ejs", {connectResults: result.rows});
    });
});

/*
 * Run Server
 */
var server = app.listen(app.get('port'), function(){
    console.log('Node Connect App Running at http://%s:%s', server.address().address, server.address().port);
}
