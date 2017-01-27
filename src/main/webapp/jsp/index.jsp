<h1>welcome to index.jsp</h1>
<head>
</head>
<body>
	<%
		for (String s : response.getHeaderNames()) {
	%>
	<h1>
		<%=s%></h1>
	<%
		}
	%>
</body>