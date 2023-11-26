package Db;


import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import model.Quiz;
import servlet.DatabaseUtil;


public class QuizDAO {

    public static List<Quiz> getAllQuizzes() throws ClassNotFoundException {
        List<Quiz> quizzes = new ArrayList<>();

        try (Connection conn = DatabaseUtil.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM quizzes")) {
            
            while (rs.next()) {
                quizzes.add(new Quiz(rs.getInt("id"), rs.getString("subject")));
            }
        } catch (SQLException e) {
            e.printStackTrace(); // Ideally, use a logger
        }
        return quizzes;
    }
}

