const http = require("http");
const server = http.createServer((req, res) => {
    res.writeHead(200); res.end("Simple-" + Date.now());
});
server.listen(process.env.PORT || 3000);
