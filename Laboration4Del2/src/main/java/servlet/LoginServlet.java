package servlet;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import Db.UserDAO;
import model.User;

import java.io.IOException;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

 protected void doPost(HttpServletRequest request, HttpServletResponse response)
         throws ServletException, IOException {
     
     String username = request.getParameter("username");
     String password = request.getParameter("password");

     User user = UserDAO.authenticate(username, password);
     if (user != null) {
         HttpSession session = request.getSession();
         session.setAttribute("currentUser", user);
         response.sendRedirect("dashboard.jsp");
     } else {
         request.setAttribute("errorMessage", "Invalid username or password");
         request.getRequestDispatcher("/login.jsp").forward(request, response);
     }
 }

 protected void doGet(HttpServletRequest request, HttpServletResponse response)
         throws ServletException, IOException {
     request.getRequestDispatcher("/login.jsp").forward(request, response);
 }
}





//package servlet;
//
//import java.util.Scanner;
//import Db.UserDAO;
//import model.User;
//
//public class LoginServlets {
//
//    public static void main(String[] args) {
//        Scanner scanner = new Scanner(System.in);
//
//        System.out.println("Console Login");
//        System.out.print("Enter username: ");
//        String username = scanner.nextLine();
//        System.out.print("Enter password: ");
//        String password = scanner.nextLine();
//        User user = UserDAO.authenticate(username, password);
//        
//
//        // Simulate user authentication (replace with your authentication logic)
//        if (user != null) {
//            System.out.println("Login successful!");
//        } else {
//            System.out.println("Login failed. Invalid username or password.");
//        }
//        System.out.println("user name is "+user.getUsername());
//        System.out.println("user pass is " + user.getPassword());
//        scanner.close();
//    }
//
//}

