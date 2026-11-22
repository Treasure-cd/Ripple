import express from "express";
import morgan from "morgan";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import userRouter from "./routes/user.routes.js";
import skillRouter from "./routes/skill.routes.js";
import userSkillRouter from "./routes/user-skill.routes.js";
import discoveryRouter from "./routes/discovery.routes.js"
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./database/auth.js";

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(
  morgan("dev", {
    stream: { write: (message) => logger.info(message.trim()) },
  }),
);

app.all(/^\/api\/auth/, toNodeHandler(auth));
app.use(express.json());
app.get("/", (req, res) => {
  res.json("Root of Ripple's");
});
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/users", userRouter);
app.use("/api/skills", skillRouter);
app.use("/api/users/me/skills", userSkillRouter);
app.use("/api/discover", discoveryRouter)

app.use((req, _res, next) => {
  const error = Object.assign(new Error(`Not Found - ${req.originalUrl}`), {
    statusCode: 404,
  });
  next(error);
});

app.use(errorHandler);

app.listen(5500, () => logger.info("Server running on port 5500"));
