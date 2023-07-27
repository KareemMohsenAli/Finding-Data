import jwt from "jsonwebtoken";
import { pool } from "../../DB/connection.js";

export const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    // console.log(authorization)
    if (!authorization) {
      return next(new Error(" authorization is required"), { cause: 400 });
    }
    const decoded = jwt.verify(authorization, "kareem");
    // console.log(decoded)
    if (!decoded?.userId) {
      return next(new Error(" inValid Account"));
    }
    const findUser = "select * from users where id=?";
    pool.query(findUser, [decoded.userId], (err, result) => {
      if (result.length === 0) {
        return next(new Error(" not registered user"));
      }

      req.user = result[0];
      return next();
    });
  } catch (error) {
    res.json(error);
  }
};
