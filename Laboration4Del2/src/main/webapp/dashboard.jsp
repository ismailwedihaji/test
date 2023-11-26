<%@ page import="java.util.List" %>
<%@ page import="model.Quiz" %>
<html>
<head>
    <title>Dashboard</title>
</head>
<body>
    <h1>Available Quizzes</h1>
    <ul>
        <c:forEach var="quiz" items="${quizzes}">
            <li><a href="takeQuiz?quizId=${quiz.id}">${quiz.subject}</a></li>
        </c:forEach>
    </ul>
</body>
</html>
