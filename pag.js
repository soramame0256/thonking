http = require('http'),
    fs = require('fs'),
    qs = require('querystring');

http.createServer(function (req, res) {
    var someFile = "index.html";

    if (req.method === 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            var poststr = JSON.stringify(qs.parse(body));
            fs.readFile(someFile, 'utf8', function (err, data) {
                if (err) return console.log(err);
                var processed = data.replace(/var data = {[^}]*};/g, 'var data = ' + poststr + ';');
                fs.writeFile(someFile, processed, 'utf8', function (err) {
                    if (err) return console.log(err);
                    res.write("{status: 'ok'}");
                    res.end();
                });
            });
        });
    } else {
        fs.readFile(someFile, 'utf8', function (err, data) {
            res.write(data);
            res.end();
        });
    }
}).listen(4128);
//program from https://qiita.com/hashrock/items/c03415c005d826537d4a
