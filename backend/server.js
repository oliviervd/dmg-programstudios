const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const port = 5001;

server.use(bodyParser.json());
server.use(
    bodyParser.urlencoded({
        extended:true,
    })
)

server.get('/', (req, res) => res.send({info: 'Hello World'}));
server.listen(port, () => console.log(`Example backend server listening on port ${port}!`));