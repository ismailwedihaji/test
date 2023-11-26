package Db;


import java.sql.*;

import model.User;
import servlet.DatabaseUtil;


public class UserDAO {

    public static User authenticate(String username, String password) {
        User user = null;

        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE username = ? AND password = ?")) {

            stmt.setString(1, username);
            stmt.setString(2, password);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    user = new User(rs.getInt("id"), rs.getString("username"), rs.getString("password"));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace(); // For educational purposes. Use proper logging in production.
        }
        return user;
    }
}
