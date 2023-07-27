import bcrypt from "bcrypt";
import { pool } from "../../../../DB/connection.js";
import jwt from "jsonwebtoken";
export const Register = async (req, res, next) => {
  const { username, email, password, isAdmin } = req.body;

  // Check if the email already exists in the database
  const emailExistsQuery = "SELECT id FROM users WHERE email = ?";
  pool.query(emailExistsQuery, [email], async (err, results) => {
    if (err) {
      console.error("Error checking email existence:", err);
      //   return res.status(500).json({ error: "Error checking email existence" });
      return next(new Error("Error checking email existence", { cause: 500 }));
    }

    if (results.length > 0) {
      // Email already exists, send a message indicating it's in use
      return next(new Error("Email already in use", { cause: 409 }));
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUserQuery =
      "INSERT INTO users (username, email, password, isadmin) VALUES (?, ?, ?, ?)";

    pool.query(
      insertUserQuery,
      [username, email, hashedPassword, isAdmin],
      (err, results) => {
        if (err) {
          console.error("Error inserting user:", err);
          return next(new Error("Error inserting user", { cause: 500 }));
        }

        return res
          .status(200)
          .json({ message: "User registered successfully" });
      }
    );
  });
};
export const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if the email exists in the database
  const findUserQuery = "SELECT * FROM users WHERE email = ?";
  pool.query(findUserQuery, [email], async (err, results) => {
    if (err) {
      console.error("Error finding user:", err);
      return next(new Error("Error finding user", { cause: 500 }));
    }

    if (results.length === 0) {
      // User with the provided email not found
      return next(new Error("Invalid email", { cause: 500 }));
    }

    const user = results[0];
    console.log(user);
    // Compare the provided password with the hashed password from the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Password does not match
      return next(new Error("Invalid password", { cause: 401 }));
    }

    const updateIsOnlineQuery = "UPDATE users SET isOnline = true WHERE id = ?";
    pool.query(updateIsOnlineQuery, [user.id], (err, updateResult) => {
      user.isOnline = true;
      const token = jwt.sign(
        { userId: user.id, userName: user.username },
        "kareem",
        { expiresIn: "2h" }
      );

      // You can set a session or generate a token here to maintain the user's login state
      return res.status(200).json({ message: "Done", token });
    });
  });
};
