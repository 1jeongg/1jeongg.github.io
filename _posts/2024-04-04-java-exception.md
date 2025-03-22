---
layout: post
title:  "자바 예외 처리"
author: 1jeongg
categories: [ Java, Spring, Kakao-Tech-Campus ]
summary: 자바 예외 처리와 사용자 정의 예외 클래스와 그 활용을 다룬 내용입니다.
tags:
published : false
---

## **08.예외 처리는 왜 해야 하나? 자바에서 제공되는 클래스들**



### **프로그램에서의 오류**


> 🚨 **컴파일 오류(compile error)**
> 
> - 프로그램 코드 작성 중 발생하는 문법적 오류
> - 최근에는 개발 환경에서 대부분의 컴파일 오류는 detection 됨



> 🚨 **실행 오류(runtime error)**
> 
> - 실행 중인 프로그램이 의도 하지 않은 동작(bug)을 하거나 프로그램이 중지 되는 오류
> - 실행 오류는 비정상 종료가 되는 경우 시스템의 심각한 장애를 발생할 수 있음
> 

### **예외 처리의 중요성**



- 프로그램의 **비정상 종료를 피하여** 시스템이 원활하게 실행되도록 함
- 실행 오류가 발생한 경우 **오류의 과정을 재현하는 것은 현실적으로 힘들다**
- 오류가 발생한 경우 **log**를 남겨서 추후 **log 분석을 통해 그 원인을 파악하여 bug를 수정**하는 것이 중요

### **오류와 예외 클래스**



![Untitled](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F587e03b7-27a3-4179-bdd9-830b5fc378d6%2FUntitled.png?table=block&id=6cfc175c-7c03-4b8a-8bef-3174d123085e&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=1030&userId=&cache=v2)


- **시스템 오류(error)**
    - 가상 머신에서 발생, 프로그래머가 처리 할 수 없는 오류
    - 동적 메모리가 없는 경우, 스택 메모리 오버플로우등
- **예외(Exception)**
    - 프로그램에서 제어 할 수 있는 오류
    - 읽어들이려는 파일이 존재하지 않거나, 네트웍이나 DB연결이 안되는 경우등

### 예외 클래스들


![Untitled](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fbb6b5878-cc6b-4b30-9f7a-db131482a731%2FUntitled.png?table=block&id=ea7416fe-83e8-4d86-9417-0ba1a648d3b9&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=1310&userId=&cache=v2)

## **09. 예외 처리하기와 미루기**


### **try-catch 문**

```java
try {
	예외가 발생할 수 있는 코드 부분
} catch(처리할 예외 타입 e){
	try 블록 안에서 예외가 발생했을 때 예외를 처리하는 부분
}
```

### **try-catch-finally 문**



- finally 블럭에서 파일를 닫거나 네트웍을 닫는 등의 리소스 해제 구현을 함

```java
try {
	fis = new FileInputStream("a.txt");
} catch (FileNotFoundException e) {
	System.out.println(e);
} finally{
	if(fis != null){
		try {
			fis.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	System.out.println("항상 수행 됩니다.");
}
```

### **try-with-resources문**



- 리소스를 사용하는 경우 `close()` 하지 않아도 자동으로 해제 되도록 함
- **리소스를 `try()` 내부**에서 선언해야만 함
- 해당 리소스 클래스가 `AutoCloseable` 인터페이스를 구현 해야 함
- `FileInputStream`의 경우에는 `AutoCloseable`을 구현하고 있음

```java
public class AutoCloseObj implements AutoCloseable{

	@Override
	public void close() throws Exception {
		System.out.println("리소스가 close() 되었습니다");
	}
}
```

```java
public class AutoCloseTest {
	
	public static void main(String[] args) {
		
	    AutoCloseObj obj = new AutoCloseObj();
    	try (obj){
			throw new Exception();
		}catch(Exception e) {
			System.out.println("예외 부분 입니다");
		}
	}
}
```

```java
리소스가 close() 되었습니다
예외 부분 입니다
```

### **예외 처리 미루기**

![gg](http://surl.li/sgboo)


> throws를 이용하면 예외가 발생할 수 있는 부분을 사용하는 문장에서 예외를 처리할 수 있음
> 

```java
public class ThrowsException {

	public Class loadClass(String fileName, String className) 
								throws FileNotFoundException, ClassNotFoundException{
		FileInputStream fis = new FileInputStream(fileName); //FileNotFoundException 발생
		Class c = Class.forName(className);  //ClassNotFoundException 발생
		return c;
	}

	public static void main(String[] args) {

		ThrowsException test = new ThrowsException();
		
		try {
			test.loadClass("a.txt", "java.lang.String");
		
		}catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
}
```

### **하나의 try{}블록에서 예외가 여러개 발생하는 경우**



- Exception 클래스를 활용하여 defualt 처리를 할 때 Exception 블록은 맨 마지막에 위치해야 함

## **10. 사용자 정의 예외 클래스와 그 활용**



### **사용자 정의 예외 클래스 구현하기**



- 기존 예외 클래스중 **가장 유사한 예외 클래스에서 상속** 받아 사용자 정의 예외 클래스를 만든다.
- 기본적으로 **Exception 클래스를 상속**해서 만들 수 있음

### **패스워드에 대한 예외 처리 하기**




> 📢 패스워드를 입력할 때 다음과 같은 경우 오류처리를 합니다.
> 
> 비밀번호는 null일 수 없습니다.
> 
> 비밀번호의 길이는 5이상입니다.
> 
> 비밀번호는 문자로만 이루어져서는 안됩니다.(하나이상의 숫자나 특수문자를 포함)



```java
public class PasswordException extends IllegalArgumentException{
	
	public PasswordException(String message) {
		super(message);
	}
}
```

```java
public class PasswordTest {

		private String password;
		
		public String getPassword(){
			return password;
		}
		
		public void setPassword(String password) throws PasswordException{
			
			if(password == null){
				throw new PasswordException("비밀번호는 null 일 수 없습니다");
			}
			else if( password.length() < 5){
				throw new PasswordException("비밀번호는 5자 이상이어야 합니다.");
			}
			else if (password.matches("[a-zA-Z]+")){
				throw new PasswordException("비밀번호는 숫자나 특수문자를 포함해야 합니다.");
			}
			
			this.password = password;
		}
		
		public static void main(String[] args) {

			PasswordTest test = new PasswordTest();
			String password = null;
			try {
				test.setPassword(password);
				System.out.println("오류 없음1");
			} catch (PasswordException e) {
				System.out.println(e.getMessage());
			}
			
			password = "abcd";
			try {
				test.setPassword(password);
				System.out.println("오류 없음2");
			} catch (PasswordException e) {
				System.out.println(e.getMessage());
			}
			
			password = "abcde";
			try {
				test.setPassword(password);
				System.out.println("오류 없음3");
			} catch (PasswordException e) {
				System.out.println(e.getMessage());
			}
			
			password = "abcde#1";
			try {
				test.setPassword(password);
				System.out.println("오류 없음4");
			} catch (PasswordException e) {
				System.out.println(e.getMessage());
			}
		}
}
```

```java
비밀번호는 null 일 수 없습니다
비밀번호는 5자 이상이어야 합니다.
비밀번호는 숫자나 특수문자를 포함해야 합니다.
오류 없음4
```

## **11. 오류의 로그를 남기기 - java.util.logging.Logger 활용**



### **logging**



- 시스템 운영에 대한 기록
- 오류가 발생 했을 때 그 **오류에 대한 기록**을 남겨 디버깅을 용이하게 함
- **로그 파일에 기록하는 코드를 추가**하여 필요한 정보가 로그로 남을 수 있도록 한다
- **디버깅, 시스템 에러 추적, 성능, 문제점 향상**들을 위해 사용

### **java.util.logging**



- 파일이나 콘솔에 로그 내용을 출력할 수 있음
- `jre/lib/logging.properties` 파일을 편집하여 로그의 출력방식 로그 레벨을 변경 할 수 있음
- `logging` 패키지에서 제공하는 로그 레벨은 severe, warning, info, config, fine, finer, finest 임

![Untitled](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F348c828f-1b91-43ab-9de4-6e5bf99e2458%2FUntitled.png?table=block&id=3cfd5814-2579-4a6a-8159-0eb9bd02d014&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=930&userId=&cache=v2)

### **Logger 만들기**



- 시나리오
    
    학생 정보 시스템에 로그를 기록하도록 한다.
    
    학생의 이름에 오류가 있는 경우 예외 처리를 하고 예외 상황을 로그로 남긴다.
    
    학생의 이름은 null 이거나 중간에 space가 3개 이상인 경우 오류가 발생한다.
    
- 구현하기
    
    Logger 인스턴스를 생성한다.
    
    로그를 남기기 위한 FileHandler를 생성한다.
    
    FileHandler의 level을 지정하고
    
    Logger에 생성된 addHandler()메서드로 FileHandler를 추가한다.
    


```java
public class MyLogger {
	
	Logger logger = Logger.getLogger("mylogger");
	private static MyLogger instance = new MyLogger();
	
	public static final String errorLog = "log.txt";
	public static final String warningLog = "warning.txt";
	public static final String fineLog = "fine.txt";
	
	private FileHandler logFile = null;
	private FileHandler warningFile = null;
	private FileHandler fineFile = null;

	private MyLogger(){
	
			try {
				logFile = new FileHandler(errorLog, true);
				warningFile = new FileHandler(warningLog, true);
				fineFile = new FileHandler(fineLog, true);
				
			} catch (SecurityException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	
			logFile.setFormatter(new SimpleFormatter());
			warningFile.setFormatter(new SimpleFormatter());
			fineFile.setFormatter(new SimpleFormatter());
			
			logger.setLevel(Level.ALL);
			fineFile.setLevel(Level.FINE);
			warningFile.setLevel(Level.WARNING);
			
			logger.addHandler(logFile);
			logger.addHandler(warningFile);
			logger.addHandler(fineFile);
	}	
	
	
	public static MyLogger getLogger(){
		return instance;
	}

	
	public void log(String msg){
		
		logger.finest(msg);
		logger.finer(msg);
		logger.fine(msg);
		logger.config(msg);
		logger.info(msg);
		logger.warning(msg);
		logger.severe(msg);
		
	}
	
	public void fine(String msg){
		logger.fine(msg);
	}
	
	public void warning(String msg){
		logger.warning(msg);
	}
}
```

```java
public class LoggerTest {

	public static void main(String[] args) {

		MyLogger myLogger = MyLogger.getLogger();
		
		myLogger.log("test");
	}

}
```

```java
public class StudentNameFormatException extends IllegalArgumentException{

	public StudentNameFormatException(String message){
		super(message);
	}
}
```

```java
public class Student {

	private String studentName;
	MyLogger myLogger = MyLogger.getLogger();
	
	public Student(String studentName){

		if(studentName == null){
		
			throw new StudentNameFormatException("name must not be null");
		}
		if( studentName.split(" ").length > 3)
			throw new StudentNameFormatException("이름이 너무 길어요");
		
		this.studentName = studentName;
	}

	
	public String getStudentName() {
		
		myLogger.fine("begin getStudentName()");
		
		return studentName;
	}
}
```

```java
public class StudentTest {
	
	public static void main(String[] args) {
	
		MyLogger myLogger = MyLogger.getLogger();
		
		String name = null;
		try{
			Student student = new Student(name);
			
		}catch( StudentNameFormatException e ){
			myLogger.warning(e.getMessage());
		}
		
		try{
			Student student = new Student("Edward Jon Kim Test");
		}catch ( StudentNameFormatException e){
			myLogger.warning(e.getMessage());
		}
		
		Student student = new Student("James");
	}
	
}
```
