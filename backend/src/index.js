require("dotenv").config({ path: "variables.env" });
const createServer = require("./create-server");

const db = require("./db");

const server = createServer();

// TODO: use express middleware to handle cookies (JWT)
// TODO: use express middleware to populate current user

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    }
  },
  options => {
    console.log(
      `Server is now running on port http://localhost:${options.port}`
    );
  }
);
