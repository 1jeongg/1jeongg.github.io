---
layout: post
title:  "세션(Session)"
author: 1jeongg
categories: [ Java, Spring, Kakao-Tech-Campus ]
summary: 세션의 생성과정과 메서드, 실습 내용을 정리했습니다.
tags: 
---

> 해당 내용은 카카오 테크 캠퍼스의 1단계 1주차 강의를 들으며 작성한 내용입니다.
> 
> [참고자료](https://github.com/castello/spring_basic/blob/main/ch2/)


## 세션 - 이론


### 01. 세션이란?


> 서로 관련된 요청들을 하나로 묶은 것 - 쿠키를 이용
브라우저마다 개별 저장소(session 객체)를 서버에서 제공
> 
> A collection of related **HTTP transaction**s made by **one browser** to one server
> 

![Untitled](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fbfa2b3f6-e393-4933-951a-60384427ab79%2FUntitled.png?table=block&id=873426f6-0e9f-43d5-9c64-81c2d1c8f871&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=2000&userId=&cache=v2)

### 02. 세션의 생성과정


- 응답헤더에 `세션 ID(Set-Cookie: JESSIONID=23DA…`) 담아서 브라우저에 보냄
- 브라우저에 쿠키를 저장하고 서버에 요청할때마다 쿠키를 담아서 보냄

### 03. 세션 객체 얻기



```java
// request 객체로부터 session 객체를 얻어오는 메서드
HttpSession session = request.getSession() // 요청 헤더의 JSESSIONID와 일치하는 세션 반환
session.setAttribute("id", "asdf") // 저장
```

### 04. 세션과 관련된 메서드



| method | 설명 |
|:---:|:---:|
| String getId() | 세션의 ID 반환 |
| long getLastAccessedTime() | 세션 내에서 최근 요청을 받은 시간 반환 |
| boolean isNew() | 새로 생성된 세션인지를 반환
request.getSession()호출 후 사용 |
| void invalidate() | 세션 객체 제거(저장된 객체도 함께) |
| void setMaxInactiveInterval(int interval) | 지정된 시간(초)후에 세션을 종료(예약 종료) |
| int getMaxInactiveInterval() | 예약된 세션 종료 시간 반환 |

| 속성 관련 메서드 | 설명 |
|:---:|:---:|
| void setAttribute(String name, Object value) | 지정된 값(value)을 지정된 속성 이름(name)으로 저장 |
| Object getAttribute(String name) | 지정된 이름으로 저장된 속성의 값 반환 |
| void removeAttribute(String name) | 지정된 이름의 속성 삭제 |
| Enumeration getAttributeNames() | 기본 객체에 저장된 모든 속성의 이름 반환 |

### 05. 세션의 종료

> **종료 → 새로운 세션 ID 발급됨(새로운 세션 객체 생성)**

**수동 종료**

```java
HttpSession session = request.getSession();
session.invalidate(); // 세션 즉시 종료
session.setMaxInactiveInterval(30*60); //예약 종료(30분 후)
```

**자동 종료 - web.xml**

```java
<session-config>
	<session-timeout>30</session-timeout>
</session-config>
```

### 06. 쿠키 vs 세션


> 🍪 **쿠키**
> 
> - 브라우저에 저장
> - 서버 부담 X
> - 보안에 불리
> - 서버 다중화에 유리


> 🌐 **세션**
> 
> - 서버에 저장
> - 서버 부담 O
> - 보안에 유리
> - 서버 다중화에 불리

> 사용자가 쿠키를 허용 안 했을 가능성이 있으므로
> 
> 처음엔 Url 뒤에 붙여주고 응답 헤더에도 set cookie에도 담아줌
>
> 쿠키가 허용됐으면 다음부터는 Url 뒤에 없어짐


## 세션(Session) - 실습

### **01. 게시판 이용시, 미로그인이면 로그인 화면으로 이동**

![Untitled](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F915efa1c-f768-48e0-814d-37e8a3434920%2FUntitled.png?table=block&id=38d23633-e66e-463a-9778-4ca5d551bfbb&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=2000&userId=&cache=v2)

1-1. [boardController.java](http://boardController.java) 생성 → 로그인 유무에 따른 처리

```java
@Controller
@RequestMapping("/board")
public class boardController {
	@GetMapping("/list")
	public String list(HttpServletRequest request) {
		if (!loginCheck(request))
			return "redirect:/login/login"; // 로그인 안했으면 로그인 화면으로 이동
		return "boardList"; // 로그인 했으면 게시판으로 이동
		
	}

	private boolean loginCheck(HttpServletRequest request) {
		// 1. 세션을 얻어서
		HttpSession session = request.getSession();
		// 2. 세션에 id가 있는지 확인, 있으면 true로
		return session.getAttribute("id") != null;
	}
}
```

1-2. [loginController.java](http://loginController.java) 에서 로그아웃, 세션에 id 저장하기

```java
@Controller
@RequestMapping("/login")
public class LoginController {
	...
	@GetMapping("/logout")
	public String logout(HttpSession session) {
		//1. 세션 종료
		session.invalidate();
		// 2. 홈으로 이동
		return "redirect:/";
	}
	@PostMapping("/login")
	public String login(String id, String pwd, boolean rememberId, 
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		...
		// 2-2. id와 pwd 일치하면
		// 세션 객체 얻어오기
		HttpSession session = request.getSession();
		// 세션 객체에 id 저장
		session.setAttribute("id", id);
		...
		//		3. 홈으로 이동
		return "redirect:/";
	}
  ...
}
```

1-3. 로그인 유무에 따른 메뉴 및 url 변경 - index.java

```java
<c:set var="loginOutLink" value = "${sessionScope.id==null ? '/login/login' : '/login/logout'}"/>
<c:set var="loginOut" value = "${sessionScope.id==null ? 'Login' : 'Logout'}"/>
```

```java
<li><a href="<c:url value='${loginOutLink}'/>">${loginOut}</a></li>
```

### **02. 로그인 후, 게시판으로 이동**



![Untitled](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8d91ec33-364f-4433-bcd4-c4b89f2cd689%2FUntitled.png?table=block&id=10ecea60-567a-47cc-bcf2-71d7096a8565&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=1220&userId=&cache=v2)

2-1. PerformFilter에서 어디서 어디로 보냈는지 확인

```java
HttpServletRequest req = (HttpServletRequest)request;
String referer = req.getHeader("referer");
String method = req.getMethod();

// 어디서 어디로 보냈는지 알 수 있음
System.out.print("["+referer+"] ->"+ method + "[" + req.getRequestURI()+"]");
```

```java
[http://localhost:8080/ch2/] ->GET[/ch2/login/login] 소요시간=4ms
[http://localhost:8080/ch2/] ->GET[/ch2/] 소요시간=3ms
...
```

2-2. boardController.java에서 이 정보를 loginForm.jsp에 보냄(GET)으로 
loginForm.jsp에서 hidden input으로 만들어서 LoginController.java으로 보냄
boardList.jsp로 가도록 해줌!!

```java
@GetMapping("/list")
	public String list(HttpServletRequest request) {
		if (!loginCheck(request))
			return "redirect:/login/login?toURL=" + request.getRequestURL(); // 로그인 안했으면 로그인 화면으로 이동
		return "boardList"; // 로그인 했으면 게시판으로 이동
		
	}
```

```java
<input type="hidden" name="toURL" value = "${param.toURL}">
```

```java
http://localhost:8080/ch2/login/login?toURL=http://localhost:8080/ch2/board/list
```

```java
@PostMapping("/login")
	public String login(String id, String pwd, String toURL, boolean rememberId, 
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		...
		//		3. 홈, 또는 게시판으로 이동
		toURL = (toURL==null || toURL.equals("")) ? "/" : toURL;
		return "redirect:" + toURL;
	}
```

### 03. **세션을 시작할까? 에 대한 정보: session = “true” or session = “false”?**



> 세션은 서버에 부담을 많이 주기 때문에 최대한 짧아야 한다.
> 
> session = true → 세션 없을때 새로 생성, session=false → 세션 없을때 새로 생성 X


![Untitled](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F43bf817a-9807-489f-8190-8cf3abd4805c%2FUntitled.png?table=block&id=bfaa23ca-3197-4c49-b6e7-4107d018d387&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=2000&userId=&cache=v2)

3-1. index.jsp에서 session=false 추가
    
```java
<%@ page session = "false" %>
```


> ⛔ **주의!!**
> 
> `session = false`일때 `sessionScope`와 `pageContext.session` 사용 불가
> `sessionScope.id`를 `pageContext.request.getSession(false).getAttribute(”id”)`로 변경해야 함
> 
> getSession(true)는 session이 없는 경우 session을 새로 생성하기 때문에 session이 없어도 새로 생성하지 않도록 `getSession(false)` 사용
> 


→ 로그인 페이지(loginForm)까지는 세션 생성 안됨

→ board누르면 세션 생성됨



> 📌 **(참고)**
> 
> `@CookieValue("id") String cookieId` 사용해서 쿠키 정보 읽어올 수 있당
