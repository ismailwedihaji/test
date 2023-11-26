package servlet;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class Main {
    public static void main(String[] args) {
        // Replace with your Derby database details
        String dbUrl = "jdbc:derby://localhost:1527/test";
        String user = "stene";
        String password = "slask";

        try {
            // Attempt to connect to the database
            Connection conn = DriverManager.getConnection(dbUrl, user, password);
            System.out.println("Connected to database!");

            // Create a query statement to select the "ID" column where username is 'beda@kth.se'
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT ID FROM users WHERE USERNAME = 'beda@kth.se'");

            // Process the result
            if (rs.next()) {
                int id = rs.getInt("ID");
                System.out.println("ID: " + id);
            } else {
                System.out.println("User not found.");
            }

            // Close the resources
            rs.close();
            stmt.close();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}




//package servlet;
//
//import java.io.IOException;
//import java.io.PrintWriter;
//import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.sql.Connection;
//import java.sql.DriverManager;
//import java.sql.ResultSet;
//import java.sql.Statement;
//@WebServlet("/loginn")
//public class Main extends HttpServlet {
//
//    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        response.setContentType("text/html");
//        PrintWriter out = response.getWriter();
//
//        String dbUrl = "jdbc:derby://localhost:1527/test"; // Replace with your DB details
//        String user = "stene"; // DB username
//        String password = "slask"; // DB password
//
//        try {
//            Connection conn = DriverManager.getConnection(dbUrl, user, password);
//            out.println("<h1>Connected to database!</h1>");
//
//            Statement stmt = conn.createStatement();
//            ResultSet rs = stmt.executeQuery("SELECT 1 FROM SYSIBM.SYSDUMMY1");
//
//            if (rs.next()) {
//                out.println("<h2>Query executed successfully: " + rs.getInt(1) + "</h2>");
//            }
//
//            rs.close();
//            stmt.close();
//            conn.close();
//        } catch (Exception e) {
//            e.printStackTrace(out);
//        }
//    }
//}
//
