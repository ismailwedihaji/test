package demo;
//
//import java.io.IOException;
//import java.io.PrintWriter;
//
//import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
///**
// * Servlet implementation class DemoServlet
// */
//@WebServlet("/DemoServlet")
//public class DemoServlet extends HttpServlet {
//	private static final long serialVersionUID = 1L;
//       
//    /**
//     * @see HttpServlet#HttpServlet()
//     */
//    public DemoServlet() {
//        super();
//        // TODO Auto-generated constructor stub
//    }
//
//	/**
//	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
//	 */
//	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		// TODO Auto-generated method stub
//		response.getWriter().append("Served at: ").append(request.getContextPath());
//		PrintWriter pr = response.getWriter();
//		pr.println("<h1>hello");
//	}
//
//	/**
//	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
//	 */
//	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		// TODO Auto-generated method stub
//		doGet(request, response);
//	}
//
//}



import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/guessGame")
public class GuessGameServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session = request.getSession();
        GuessBean guessBean = (GuessBean) session.getAttribute("guessBean");

        if (guessBean == null) {
            guessBean = new GuessBean();
            session.setAttribute("guessBean", guessBean);
        }

        String guess = request.getParameter("guess");
        String feedback = "";
        if (guess != null && !guess.trim().isEmpty()) {
            try {
                feedback = guessBean.handleGuess(Integer.parseInt(guess));
            } catch (NumberFormatException e) {
                feedback = "Please enter a valid integer guess.";
            }
        }

        String sessionId = session.getId();
        request.setAttribute("JSESSIONID", sessionId);

        request.setAttribute("feedback", feedback);
        RequestDispatcher dispatcher = request.getRequestDispatcher("/guessGame.jsp");
        dispatcher.forward(request, response);
    }
}
