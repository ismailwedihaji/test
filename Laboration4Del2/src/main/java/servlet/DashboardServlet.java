package servlet;



import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Db.QuizDAO;
import model.Quiz;



@WebServlet("/dashboard")
public class DashboardServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        List<Quiz> quizzes;
        try {
            quizzes = QuizDAO.getAllQuizzes();
        
        request.setAttribute("quizzes", quizzes);
        request.getRequestDispatcher("/dashboard.jsp").forward(request, response);
   } catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
    
}
