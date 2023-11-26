package demo;


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

          // Create a simple query statement
          Statement stmt = conn.createStatement();
          ResultSet rs = stmt.executeQuery("SELECT 1 FROM SYSIBM.SYSDUMMY1");

          // Process the result if necessary
          if (rs.next()) {
              System.out.println("Query executed successfully: " + rs.getInt(1));
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
