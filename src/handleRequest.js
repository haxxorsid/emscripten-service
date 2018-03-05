function notAllowed(res) {
  res.writeHead(503);
  res.end();
}

function showError(res, err) {
  res.writeHead(501);
  res.end(`<pre>${err.toString()}</pre>`);
}

function readFormData(request, callback) {
  var body = '';

  request.on('data', function (data) {
    body += data;
    if (body.length > 1e6)
      request.connection.destroy();
  });

  request.on('end', function () {
    try {
      callback(null, JSON.parse(body));
    } catch (ex) {
      callback(ex);
    }
  });
}

module.exports = function handleRequest(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');

  if (req.method == "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url == "/emcc") {
    if (req.method != "POST") return notAllowed(res);
    readFormData(req, (err, post) => {
      if (err) return showError(res, err);
      require('./emcc')(post.code, post.c, post.options, (err, result) => {
        if (err) return showError(res, err);
        res.setHeader('Content-type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify(result));
      });
    });
    return;
  }

  res.writeHead(404);
  res.end();
};
