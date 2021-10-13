const http = require('http');
const server = http.createServer((req, res) => {
  res.end('This ends the createServer');
});

const port = process.env.PORT || 3000;
server.listen(port);

