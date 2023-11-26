<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<html>
<head>
    <title>Login</title>
</head>
<body>
    <form action="login" method="post">
        Username: <input type="text" name="username" required />
        Password: <input type="password" name="password" required />
        <input type="submit" value="Login" />
    </form>
    
    <c:if test="${not empty errorMessage}">
        <p>${errorMessage}</p>
    </c:if>
</body>
</html>
