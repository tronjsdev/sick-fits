const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });
const createServer = require("./create-server");

const db = require("./db");

const server = createServer();
server.express.use(cookieParser());

// session middleware
/*server.express.use(
  session({
    name: "sid",
    secret: `some-random-secret-here`,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      //maxAge: 1000 * 60 * 60 * 30
    }
  })
);*/

server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  ({ port }) => {
    console.log(`Server is now running on port http://localhost:${port}`);
  }
);
