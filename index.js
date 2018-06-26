var express = require('express');
const { Pool, Client } = require('pg');
var bodyParser = require('body-parser');
var app = express();
var portNum = (process.env.PORT || 5000);
var server = app.listen(portNum, function(){
    console.log("Node app is running : " + server.address().port);
});
const dbString = process.env.DATABASE_URL || 'postgres://wwvmqitberppny:fb1d47127c354467af570e4f8ca1deeb5afc1de00d2c351adf0eef9353abdbf2@ec2-54-235-206-118.compute-1.amazonaws.com:5432/d3v4hi2elopkqf';
//var dbString = process.env.DATABASE_URL;

const client = new Client({
  user: 'wwvmqitberppny',
  password: 'fb1d47127c354467af570e4f8ca1deeb5afc1de00d2c351adf0eef9353abdbf2',
  host: 'ec2-54-235-206-118.compute-1.amazonaws.com',
  database: 'd3v4hi2elopkqf',
  port: 5432,
  ssl: true
});
client.connect();

/*
 * ExpressJS View Templates
 */
app.set('views', __dirname + '/app/views');
// templateNameで拡張子が省略された場合のデフォルト拡張子
app.set('view engine', 'ejs');
//静的
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



/*
 * Jobs Landing Page
 */
client.query('SELECT * FROM salesforce.HerokuConnectTest__c order by salesforce.HerokuConnectTest__c.createddate desc limit 2', (err,res)=>{
    console.log("_________________ ")
    console.log(res.rows[0])
    console.log(res.rows[1])
    console.log("_________________ ")
});

app.get('/',function (req, res){
    var query = 'SELECT * FROM salesforce.HerokuConnectTest__c order by salesforce.HerokuConnectTest__c.createddate desc limit 2';
    var result = [];
    client.query(query, function(err, result){
        console.log("Jobs Query Result Count: " + result.rows);

        // レンダリング実行
        res.render('index', {connectResults: result.rows});
    });
});