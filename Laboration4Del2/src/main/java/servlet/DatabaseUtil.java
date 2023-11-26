//package servlet;
//
////// package myCode.servlet;
//
////// import java.sql.*;
//
////// public class DatabaseUtil {
//////     private static final String JDBC_DRIVER = "org.apache.derby.jdbc.ClientDriver";
//////     private static final String DB_URL = "jdbc:derby://localhost:1527/test;create=true";
//
// 
//////     private static final String USER = "stene";
//////     private static final String PASS = "slask";
//
//////     public static Connection getConnection() throws SQLException, ClassNotFoundException {
//////         Class.forName(JDBC_DRIVER);
//////         return DriverManager.getConnection(DB_URL, USER, PASS);
//////     }
////// }
//
////package myCode.servlet;
//
////import java.sql.Connection;
////import java.sql.DriverManager;
////import java.sql.SQLException;
//
////public class DatabaseUtil {
////  private static final String DB_URL = "jdbc:derby://localhost:1527/test;create=true";
////  private static final String USER = "stene";
////  private static final String PASS = "slask";
//
////  // Static initializer to load the JDBC driver class
////  static {
////      try {
////          Class.forName("org.apache.derby.jdbc.ClientDriver");
////      } catch (ClassNotFoundException e) {
////          e.printStackTrace();
////      }
////  }
//
////  public static Connection getConnection() throws SQLException {
////      return DriverManager.getConnection(DB_URL, USER, PASS);
////  }
////}
//
////package myCode.servlet;
//
////import java.sql.Connection;
////import java.sql.DriverManager;
////import java.sql.SQLException;
//
////public class DatabaseUtil {
//
////  static {
////      try {
////          // Ensure the driver class is available
////          Class.forName("org.apache.derby.jdbc.ClientDriver");
////      } catch (ClassNotFoundException e) {
////          throw new RuntimeException("Cannot load Derby driver", e);
////      }
////  }
//
////  public static Connection getConnection() throws SQLException {
////      // Update the credentials and URL to match your Derby setup
////      String dbUrl = "jdbc:derby://localhost:1527/test;create=true";
////      String user = "stene";
////      String pass = "slask";
////      return DriverManager.getConnection(dbUrl, user, pass);
////  }
////}
//
//
//
//
//import java.sql.Connection;
//import java.sql.DriverManager;
//import java.sql.SQLException;
//
//public class DatabaseUtil {
// static {
//      try {
//         // Ensure the driver class is available
//         Class.forName("org.apache.derby.jdbc.ClientDriver");
//      } catch (ClassNotFoundException e) {
//          throw new RuntimeException("Cannot load Derby driver", e);
//      }
// }
//
// public static Connection getConnection() throws SQLException {
//     // Make sure these credentials are correct and match your Derby setup
//     String dbUrl = "jdbc:derby://localhost:1527/test;user=stene;password=slask";
//     return DriverManager.getConnection(dbUrl);
// }
//}

package servlet;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseUtil {
    
//    static {
//        try {
//            // Manually load Derby JDBC driver
//            Class.forName("org.apache.derby.jdbc.ClientDriver");
//        } catch (ClassNotFoundException e) {
//            e.printStackTrace();
//            throw new ExceptionInInitializerError(e);
//        }
//    }

    public static Connection getConnection() throws SQLException {
        // Replace with your Derby database details
        String dbUrl = "jdbc:derby://localhost:1527/test";
        String user = "stene";
        String password = "slask";
        return DriverManager.getConnection(dbUrl, user, password);
    }
}
