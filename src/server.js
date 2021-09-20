import express from "express";

const PORT = 4000;

// app 이라는 express application 생성
const app = express();

// express application이 만들어진 후에 관련 코드 작성!

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if (url === "/protected") {
    return res.send("<h1>Not Allowed</h1>");
  }
  console.log("Allowed, you may continue");
  next();
};

// root page에 get request가 들어왔을 때,
// console.log로 아직 응답은 하지 않고 있는 상태
const handleHome = (req, res) => {
  console.log("Somebody visit our page");
  return res.send("DDDD");
};

const handleProtected = (req, res) => {
  return res.send("##Welcome to Private Lounge##");
};

// app.use의 순서에따라 get보다 먼저 위치할때는 모든 route에 대해 항상 실행되고,
// 후에 위치할 경우에는 실행되지 않을 수 있다.
app.use(logger);
app.use(privateMiddleware);
app.get("/", handleHome);
app.get("/protected", handleProtected);

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
