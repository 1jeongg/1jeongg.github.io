---
layout: post
title:  "쿠키~🍪"
author: 1jeongg
categories: [ Java, Spring, Kakao-Tech-Campus ]
summary: Cookie의 동작방식과 생성/삭제/변경 방법과 실습 코드를 정리했습니다.
tags:
published : false
---

> 해당 내용은 카카오 테크 캠퍼스의 1단계 1주차 강의를 들으며 작성한 내용입니다.
> 
> [참고자료](https://github.com/castello/spring_basic/blob/main/ch2/)


## 쿠키란?



> **이름과 값의 쌍으로 구성된 작은 정보** (아스키 문자만 가능)
> 
> 
> 서버에서 생성 후 전송, 브라우저에 저장. 유효기간 이후 자동 삭제
> 
> 서버에서 요청시 domain, path가 일치하는 경우에만 자동 전송
> 

### 동작방식



![Untitled](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F4f34f70d-4dca-4fbb-8b0a-bfd56293f883%2FUntitled.png?table=block&id=82996467-cb8a-4877-8f2a-ff2e36d8314a&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=1060&userId=&cache=v2)

1. **클라이언트 → 서버** : 로그인 요청
2. **서버:** 클라이언트의 로그인 요청 **유효성 확인**, 응답 header에 `set-cookieL user=chrisjune` 추가하여 응답
3. **클라이언트**: 이후 서버에 요청할 때 **쿠키를 자동으로 요청헤더에 추가**하여 요청

### 쿠키, 세션, JWT(토큰) 차이점



**쿠키**

> 서버가 우리에 관한 것을 기억하기 위해 우리의 브라우저에 데이터를 넣을 수 있는 시스템
서버와 클라이언트 사이의 매개체
> 
> ↔ **로컬에 저장, 탈취와 변조가 가능, 브라우저를 종료해도 파일로 남아있음, 상대적으로 빠**


![Untitled](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6bcf0b67-4486-4358-ab31-7e5494afe2d9%2FUntitled.png?table=block&id=111a0701-a38f-43af-9468-67276f01546c&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=2000&userId=&cache=v2)

![Untitled](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa44a0126-08b9-4c9b-aad8-df131f279d14%2FUntitled.png?table=block&id=638887f7-c2ef-4c94-9a75-d056cb77704e&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=2000&userId=&cache=v2)

**세션**

> 클라이언트와 서버 간 연결이 활성화된 상태로,
> 
> 쿠키와 마찬가지로 로그인과 같은 사용자 인증을 할때 주로 사용
> 
> **↔ 로컬과 서버에 저장,** 브라우저 **종료시** 세션을 삭제, 상대적으로 안전
> 

![Untitled](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F30002f7f-d3ed-4ec9-a87b-8cc421c4a078%2FUntitled.png?table=block&id=64b22112-744e-4ea8-9ffa-a8cf40866937&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=2000&userId=&cache=v2)

![Untitled](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F24232e2f-20de-4226-85f2-56d81d060a7c%2FUntitled.png?table=block&id=44789306-43b2-4e18-9b80-74b77aea2f6e&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=2000&userId=&cache=v2)

**JWT**

> 쿠키&세션 방식과 마찬가지로 서버로부터 받아서 요청할 때마다 같이 보내줘야함 
서버에게 보여줘야 하는 신분증 같은 거
> 

![Untitled](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8cdadb88-0dd3-4cd4-9ae7-e09a4dea394c%2FUntitled.png?table=block&id=db8265ee-d5cb-4ea8-b9e6-22b2b897104c&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=2000&userId=&cache=v2)

![Untitled](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc3ca122d-e5d4-4aa1-962c-5873eb63f2ed%2FUntitled.png?table=block&id=5bd761f1-be38-46e5-a347-4dd931cde41a&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=2000&userId=&cache=v2)

> 📌 **용어 정리**
> 
> - **쿠키** = 서버와 클라이언트 간 매개체
> - **세션** = 쿠키랑 비슷. 대신 서버 쪽에 정보를 저장
> - **토큰** = 서버에게 보여줘야하며, 서버가 기억하는 이상하고 무지 긴 string ~ like 신분증
> - **JWT** = 정보를 갖고 있는 토큰. DB 없이 검증 가능


### 쿠키 생성



```java
Cookie cookie = new Cookie("id", "asdf"); // 쿠키 생성
cookie.setMaxAge(60*60*24); // 유효기간 설정(초)
response.addCookie(cookie); // 응답에 쿠키 추가
```

![응답 헤더](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F29404417-8044-4d1d-87f8-36b122646dae%2FUntitled.png?table=block&id=d98dba4f-e568-4a9a-8b79-5fd306cca999&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=1460&userId=&cache=v2)

응답 헤더

### 쿠키의 삭제 변경


```java
Cookie cookie = new Cookie("id", ""); 
cookie.setMaxAge(0); // 유효기간 0으로
response.addCookie(cookie); // 응답에 쿠키 추가
```

```java
Cookie cookie = new Cookie("id", ""); 
cookie.setValud(URLEncoder.encode("남궁성));
cookie.setDomain("www.fastcampus.co.kr");
cookie.setPath("/ch2");
cookie.setMaxAge(60*60*24*7);
response.addCookie(cookie); // 응답에 쿠키 추가
```

### 쿠키 읽어오기



```java
Cookie[] cookies = request.getCookies();
for (Cookie cookie: cookies) {
	String name = cookie.getname();
	String value = cookie.getValue();
	System.out.printf("[Cookie] name = %s, value=%s\n", name, value);
}
```

### 쿠키 실습



> 로그인 정보 저장하기 (아이디기억)
> 

```java
package com.fastcampus.ch2;

import java.net.URLEncoder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/login")
public class LoginController {
	@GetMapping("/login")
	public String loginForm() {
		return "loginForm";
	}
	@PostMapping("/login")
	public String login(String id, String pwd, boolean rememberId, HttpServletResponse response) throws Exception {
		System.out.println("id="+id);
		System.out.println("pwd="+pwd);
		System.out.println("rememberId="+rememberId);
		// 1. id와 pwd을 확인
		if (!loginCheck(id, pwd)) {
			// 2-1. 일치하지 않으면 loginForm으로 이동
			String msg = URLEncoder.encode("id 또는 pwd가 일치하지 않습니다.", "utf-8");
			return "redirect:/login/login?msg=" + msg;		
		}
		// 2-2. id와 pwd 일치하면
		if (rememberId) {
			//			1. 쿠키 생성
			Cookie cookie = new Cookie("id", id);
			//		2. 응답에 저장
			response.addCookie(cookie);
		} else {
			Cookie cookie = new Cookie("id", id);
			cookie.setMaxAge(0);
			response.addCookie(cookie);
		}
		
		
		//		3. 홈으로 이동
		return "redirect:/";
	}
	private boolean loginCheck(String id, String pwd) {
		// TODO Auto-generated method stub
		return "asdf".equals(id) && "1234".equals(pwd);
	}
}
```

```java
<input type="text" name="id" value = ${cookie.id.value}" placeholder="이메일 입력" autofocus>
<input type="password" name="pwd" placeholder="비밀번호">
<button>로그인</button>
<div>
    <label><input type="checkbox" name="rememberId" ${empty cookie.id.value ? "": "checked"}> 아이디 기억</label> |
    <a href="">비밀번호 찾기</a> |
    <a href="">회원가입</a>
</div>
```


![아이디기억 체크 X - 쿠키 삭제](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0073c5c0-e6c7-40c3-b672-b9c221a2e58b%2FUntitled.png?table=block&id=c69af23e-c173-4052-abb2-0917e19ad8bc&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=2000&userId=&cache=v2)

아이디기억 체크 X - 쿠키 삭제

![아이디 기억 체크 → 쿠키 생성 (id = asdf)](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F1c3afd50-85fd-44a2-98c8-a0663d9b47c9%2FUntitled.png?table=block&id=50737ff5-56b4-4815-9a92-6ae94730c8ac&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=2000&userId=&cache=v2)

아이디 기억 체크 → 쿠키 생성 (id = asdf)
