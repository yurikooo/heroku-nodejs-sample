var express = require('express');
var bodyParser = require('body-parser');
app = express();

// ejsを使用するための設定
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// トップ画面
app.get('/', function(req, res) {
    // index.ejsの拡張子は省略可能
    res.render('index', {title : 'タイトル'});
});

// "/about"でアクセスしてきた時の処理
app.get('/about', function(req, res) {
    res.send('about this page');
});

app.post('/create', function(req, res) {
    console.log(req.body);
    res.send(req.body.name);
});

// 3000ポートで待ち受ける
app.listen(process.env.PORT || 3000);
console.log('server starting...');
