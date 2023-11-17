import express, { NextFunction, Request, Response } from "express";
const app = express();
const port = 3000;

// parsers
app.use(express.json());
app.use(express.text());

// router
const userRouter = express.Router();
const courseRouter = express.Router();
app.use('/api/v1/courses', courseRouter)
app.use('/api/v1/users', userRouter)
userRouter.get(
  "/create-user",
  (req: Request, res: Response) => {
    const user = req.body;
    console.log(user);

    res.send({
        success: true,
        message: "user created successfully",
        data: user,
    })
  }
);

// middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, req.method, req.hostname);
  next();
};

app.get("/", logger, (req: Request, res: Response) => {
  // console.log(req.query.email);
  res.send("Hello developers welcome next level web development!");
});

app.post("/", logger, (req: Request, res: Response) => {
  console.log(req.body);
  res.json({
    message: "successfully send data",
  });
});

export default app;
