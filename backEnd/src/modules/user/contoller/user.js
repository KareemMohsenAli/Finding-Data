import { pool } from "../../../../DB/connection.js";

export const updateUser = async (req, res, next) => {
  try {
    const { username, email } = req.body; // Assuming you get the updated username and email from the request body
    // Check if the user exists in the database
    const findUserQuery = "SELECT * FROM users WHERE id = ?";
    pool.query(findUserQuery, [req.user.id], async (err, result) => {
      if (err) {
        console.error("Error finding user:", err);
        return next(new Error("Error finding user", { cause: 500 }));
      }
      if (result.length === 0) {
        return next(new Error("User not found", { cause: 404 }));
      }
      // User found, proceed with updating the information
      const updateUserQuery =
        "UPDATE users SET username = ?, email = ? WHERE id = ?";
      pool.query(
        updateUserQuery,
        [username, email, req.user.id],
        (err, updateResult) => {
          if (err) {
            console.error("Error updating user:", err);
            return next(new Error("Error updating user", { cause: 500 }));
          }

          if (updateResult.affectedRows === 0) {
            return next(new Error("User update failed", { cause: 500 }));
          }

          return res.status(200).json({ message: "User updated successfully" });
        }
      );
    });
  } catch (error) {
    res.json(error);
  }
};

export const logout = async (req, res, next) => {
  console.log(req.user);
  try {
    if (req.user.isOnline === 1) {
      const isLoggedOut = "UPDATE users SET isOnline = ? where id=?";

      pool.query(isLoggedOut, [false, req.user.id], (err, result) => {
        if (err) {
          console.error("Error updating user status:", err);
          return next(new Error("Error updating user status", { cause: 500 }));
        }

        if (result.affectedRows === 0) {
          return next(
            new Error(
              "You're not allowed to logout. Please try again to login."
            )
          );
        }

        return res.json({ message: "Done logging out!" });
      });
    } else {
      return next(
        new Error("you're not allowed to logout, please try again to login ")
      );
    }
  } catch (error) {
    res.json(error);
  }
};

export const searchByIPAndName = (req, res, next) => {
  // Append the '%' wildcard to the search query for partial matches
  const searchKey = req.query.searchKey;
  const likeSearchQuery = `%${searchKey}%`;
  // SQL query to search across all three tables using UNION
  const test2 = `
  SELECT id, ip_address, name, allowed_ports, connected_with, private_ip, public_ip, notes, allowed_services, added_by_user_id, NULL AS month,NULL AS incident_id,NULL AS date
  FROM servers
  WHERE ip_address LIKE ? OR name LIKE ?
  
  UNION ALL
  
  SELECT blocked_Ip_id, ip_address, NULL AS name, NULL AS allowed_ports, NULL AS connected_with, NULL AS private_ip, NULL AS public_ip, notes, NULL AS allowed_services, added_by_user_id, NULL AS month,incident_id, date
  FROM blocked_ip
  WHERE ip_address LIKE ?
  
  UNION ALL
  
  SELECT id, ip_address,NULL AS name, NULL AS allowed_ports, NULL AS connected_with, NULL AS private_ip, NULL AS public_ip, NULL AS notes, NULL AS allowed_services, added_by_user_id, month,NULL AS incident_id,NULL AS date
  FROM iocs
  WHERE ip_address LIKE ?
  
  LIMIT 0, 25;
    `;

  pool.query(
    test2,
    [likeSearchQuery, likeSearchQuery, likeSearchQuery, likeSearchQuery], // Corrected the number of placeholders
    (err, results) => {
      if (err) {
        console.log(results);
        return next(new Error("query field", { cause: 500 }));
      }

      // Process the results
      return res.status(200).json({ results });
    }
  );
};
