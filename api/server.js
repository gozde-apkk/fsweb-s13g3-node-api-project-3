const express = require('express');
const useRouter = require("./users/users-router");

const server = express();

// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın
server.use(express.json());

// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir
server.use("/api/users",useRouter);
server.get('/', (req, res) => {
  res.send(`server running on ${port}`);
});

module.exports = server;
