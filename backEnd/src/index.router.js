import userRouter from "./modules/user/user.router.js";
import authRouter from "./modules/auth/auth.router.js"
import { globalErrorHandling } from "./utils/errorHandeling.js";
import cors from 'cors'
const bootstrap = (app, express) => {
  app.use(cors())
  app.use(express.json());
  app.use("/user", userRouter);
  app.use("/auth", authRouter);
  app.use(globalErrorHandling)
};
export default bootstrap;
