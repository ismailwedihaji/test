<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="demo.GuessBean" %>

<!DOCTYPE html>
<html>
<head>
    <title>Guessing Game</title>
</head>
<body>
    <h1>Welcome to the Guessing Game!</h1>
    <h2>Your session ID is: ${JSESSIONID}</h2>
    <c:if test="${not empty feedback}">
        <p>${feedback}</p>
    </c:if>  
        
    <form action="guessGame" method="get">
        <label for="guess">Enter your guess:</label>      
        <input type="text" name="guess" id="guess" />
        <input type="submit" value="Submit" />
    </form> 
</body>
</html>
