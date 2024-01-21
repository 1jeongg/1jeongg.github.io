---
layout: post
title:  "Java Basics"
author: 1jeongg
categories: [ Java, Spring ]
summary: Java의 기본 개념들과 객체 지향에 대해 작성한 글입니다.
tags: 
---


> 해당 내용은 카카오 테크 캠퍼스의 1단계 1주차 강의를 들으며 작성한 내용입니다.
> [참고자료](https://gitlab.com/easyspubjava/javacoursework/-/tree/master/Chapter2)

## 01. 객체와 객체 지향 프로그래밍

### 객체(Object)

- 의사나 행위가 미치는 대상 ( 사전적 의미 )
- 구체적, 추상적 데이터의 단위 ( 학생, 회원, 생산, 주문, 배송 )

### [객체 지향 프로그래밍](http://www.incodom.kr/%EA%B0%9D%EC%B2%B4_%EC%A7%80%ED%96%A5#:~:text=Articles%20(Article%201)-,%EA%B0%9D%EC%B2%B4%20%EC%A7%80%ED%96%A5(Object%20oriented)%20%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%9D%B4%EB%9E%80%3F,%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8%EC%9D%84%20%EB%A7%8C%EB%93%9C%EB%8A%94%20%EA%B2%83%EC%9D%84%20%EB%A7%90%ED%95%9C%EB%8B%A4.)


> 프로그램 구현에 필요한 **객체를 파악**하고 각각의 **객체들의 역할이 무엇인지를 정의**하여 객체들 간의 **상호작용**을 통해 프로그램을 만드는 것   
> 
> ex) C++, C#, python, Javascript, …

> ❓ **구현 방법**
> 
> - 객체를 정의 하고
> - 각 객체 제공하는 기능들을 구현하고
> - 각 객체가 제공하는 기능들 간의 소통(메세지 전달)을 통하여 객체간의 협력을 구현


**vs 절차 지향 프로그래밍**

> 시간이나 사건의 흐름에 따른 프로그래밍
> ex) C 등


[절차 지향 방식, 객체 지향 방식 비교](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https://t1.daumcdn.net/cfile/tistory/998992425B3768AA23)


## 02. 생활 속의 객체 → 클래스

> 객체의 속성은 클래스의 멤버 변수(`member variable`)로 선언함

```java
public class Student { // class 시작은 대문자

	// Camel notation(Coding convention)
	// member variable
	int studentNumber;
	String studentName;
	int majorCode;
	String majorName;
	int grade;
}
```

```java
public class Order {

	int orderId;
	String buyerId;
	String sellerId;
	int productId;
	String orderDate;
}
```

```java
public class UserInfo {

	String userId;
	String userPassWord;
	String userName;
	String address;
	int phoneNumber;
}
```

## 03. 함수와 메서드


### 함수

- 하나의 기능을 수행하는 일련의 코드
- 구현된(정의된) 함수는 호출하여 사용하고 호출된 함수는 기능이 끝나면 제어가 반환됨
- 함수로 구현된 하나의 기능은 여러 곳에서 동일한 방식으로 호출되어 사용될 수 있음
- 이름, 매개변수, 반환 값, 함수 몸체(body)로 구성
    
    ```java
    int add(int num1, int num2) {
    		
    	int result;
    	result = num1 + num2;
    	return result;
    }
    ```
    

```java
public class FunctionTest {
	
	public static int addNum(int num1, int num2) {
		int result;
		result = num1 + num2;
		return result;
	}
	
	public static void sayHello(String greeting) {
		System.out.println(greeting);
	}
	
	public static int calcSum() {
		
		int sum = 0;
		int i;
		
		for(i = 0; i<=100; i++) {
			sum += i;
		}
		
		return sum; // 반환값
	}

	public static void main(String[] args) {
		
		int n1 = 10;
		int n2 = 20;
		
		int total = addNum(n1, n2);
		
		sayHello("안녕하세요");
		int num = calcSum();
		
		System.out.println(total);
		System.out.println(num);
	}
}
```

### 함수 호출과 스택 메모리

- **스택** : 함수가 호출될 때 지역 변수들이 사용하는 메모리
- 함수의 수행이 끝나면 자동으로 반환 되는 메모리 (3번 내, 자동으로 없어짐)

![https://gitlab.com/easyspubjava/javacoursework/-/raw/master/Chapter2/2-03/img/stack.PNG](https://gitlab.com/easyspubjava/javacoursework/-/raw/master/Chapter2/2-03/img/stack.PNG)

### 메서드 (method)

- 객체의 기능을 구현하기 위해 **클래스 내부에 구현되는 함수**
- **멤버 함수** (`member function`)이라고도 함
- 메서드를 구현함으로써 **객체의 기능**이 구현 됨
- 메서드의 이름은 그 객체를 사용하는 **객체(클라이언트)에 맞게 짓는것**이 좋음
    예) `getStudentName()`
    

## 04. 객체의 속성은 멤버 변수로, 객체의 기능은 메서드로 구현!

```java
public class Student {
	
	public int studentID;
	public String studentName;  
	public String address;
			
	public void showStudentInfo() {
		System.out.println(studentName + "," + address);
	}
	
	public String getStudentName() {
		return studentName;
	}
}
```

```java
public class StudentTest {

	public static void main(String[] args) {
		
		Student studentLee = new Student();
		studentLee.studentName = "이순신";
		studentLee.address = "서울";
		
		
		studentLee.showStudentInfo();
		
		Student studentKim = new Student();
		studentKim.studentName = "김유신";
		studentKim.address = "경주";
		
		studentKim.showStudentInfo();
		
		System.out.println(studentLee);
		System.out.println(studentKim);
	}

}
```

## 05. 인스턴스 생성과 힙 메모리

### 인스턴스(instance)

> 객체 지향 프로그래밍에서 어떤 클래스에 속하는 각 객체
어떤 집합에 대해 그 집합의 개별적인 원소
> 
> - 참고 - 객체와 인스턴스의 차이점
> 
>     ex 붕어빵틀 = Class, 붕어빵 = Object, 각각의 붕어빵 = Instance, 붕어빵을 굽다 = instance화하다.
>
>    [인스턴스와 객체의 차이가 뭔가요?](https://www.codeit.kr/community/questions/UXVlc3Rpb246NWUzNDUyMjU4MGU1MTMzNzNkOTYyMzZj?utm_source=google_paid&utm_medium=pmax&utm_campaign=da_purchase&utm_content=general&gclid=Cj0KCQjwlumhBhClARIsABO6p-yCRBy0GwjYG0Km4wcRU3f6frvqjjD6SX5nVTtrO0VgXVDpGBlajDMaAkmcEALw_wcB)
    

### 힙 메모리

> 자바 프로그램이 실행되면서 **동적**으로 생성된 객체( new 연산자로 생성된 객체 또는 인스턴스)가 저장되는 공간
> 
> 장점: 원하는 떄, 원하는 만큼 메모리를 할당받아서 사용하고 원할때 반납(해제)할 수 있다!
> 
> 단점: 누수 위험성 존재, 할당/해제 속도 느림
> 


### 용어

- 객체 : 객체 지향 프로그램의 대상, 생성된 인스턴스

- 클래스 : 객체를 프로그래밍 하기위해 코드로 정의해 놓은 상태

- 인스턴스 : new 키워드를 사용하여 클래스를 메모리에 생성한 상태

- 멤버 변수 : 클래스의 속성, 특성

- 메서드 : 멤버 변수를 이용하여 클래스의 기능을 구현한 함수

- 참조 변수 : 메모리에 생성된 인스턴스를 가리키는 변수

- 참조 값 : 생성된 인스턴스의 메모리 주소 값


## 06. 생성자(constructor)

### 생성자

- 생성자 기본 문법 `<class_name>([<argument_list]){[<statements]}`
- 객체를 생성할 때 new 키워드와 함께 사용 - `new Student()`;
- 변수나 상수를 초기화 하거나 다른 초기화 기능을 수행하는 메서드를 호출
- 생성자는 반환 값이 없고, 클래스의 이름과 동일
- 생성자 예시 코드
    
    ```java
    public class Student {
    
    	public int studentNumber;
    	public String studentName;
    	public int grade;
    	
    	public Student(int studentNumber, String studentName, int grade) {
    		this.studentNumber = studentNumber;
    		this.studentName = studentName;
    		this.grade = grade;
    	}
    	
    	public String showStudentInfo() {
    		return studentName + "학생의 학번은 " + studentNumber + "이고, " + grade + "학년 입니다.";
    	}
    }
    ```
    

### 기본 생성자

- 클래스에 생성자를 구현하지 않아도 new 키워드와 함께 생성자를 호출할 수 있음
- 컴파일러가 생성자 코드를 넣어 줌 `public Student(){}`
- 매개 변수가 없음, 구현부가 없음

## 07. 생성자 오버로딩 (overloading)

### 생성자 정의

❓ 오버로딩이란

> 이미 사용하려는 이름과 같은 이름을 가진 메소드가 있더라도 매개변수의 개수 또는 타입이 다르면, 같은 이름을 사용해서 메소드를 정의할 수 있다.
> 
> - 생성자 오버로딩 예시
>     
>     ```java
>     public class UserInfo {
>     
>     	public String userId;
>     	public String userPassWord;
>     	public String userName;
>     	public String userAddress;
>     	public String phoneNumber;
>     	
>     	public UserInfo(){}
>     	
>     	public UserInfo(String userId, String userPassWord, String userName) {
>     		this.userId = userId;
>     		this.userPassWord = userPassWord;
>     		this.userName = userName;
>     	}
>     	
>     	public String showUserInfo() {
>     		return "고객님의 아이디는 " + userId + "이고, 등록된 이름은 " + userName + "입니다."; 
>     	}
>     }
>     ```
>     

❗ 오버라이딩과의 비교 (참고)

> 부모 클래스로부터 상속받은 메소드를 자식 클래스에서 재정의하는 것

## 09. 참조 자료형 변수

> **클래스를 타입으로 변수를 선언하는 자료형**
>  해당 변수에 대해 생성하여야 함


![https://gitlab.com/easyspubjava/javacoursework/-/raw/master/Chapter2/2-09/img/datatype.png](https://gitlab.com/easyspubjava/javacoursework/-/raw/master/Chapter2/2-09/img/datatype.png)

### 참조 자료형 예시 - 학새을 성적 산출하기



![https://gitlab.com/easyspubjava/javacoursework/-/raw/master/Chapter2/2-09/img/student.png](https://gitlab.com/easyspubjava/javacoursework/-/raw/master/Chapter2/2-09/img/student.png)

- 학생 코드
    
    ```java
    package ch09;
    
    public class Student {
    	
    	int studentID;
    	String studentName;
    	
    	Subject korea;
    	Subject math;
    	
    	public Student(int id, String name) {
    		studentID = id;
    		studentName = name;
    		
    		korea = new Subject();
    		math = new Subject();
    	}
    	
    	
    	public void setKoreaSubject(String name, int score) {
    		korea.subjectName = name;
    		korea.score = score;
    	}
    	
    	public void setMathSubject(String name, int score) {
    		math.subjectName = name;
    		math.score = score;
    	}
    	
    	public void showStudentSocre() {
    		int total = korea.score + math.score;
    		System.out.println(studentName +  " 학생의 총점은 " + total + "점 입니다." );
    		
    	}
    }
    ```
    
- 과목 코드
    
    ```java
    package ch09;
    
    public class Subject {
    	String subjectName;
    	int score;
    	int subjectID;
    }
    ```
    
- 전체 코드 (성적 산출)
    
    ```java
    package ch09;
    
    public class StudentTest {
    
    	public static void main(String[] args) {
    		
    		Student studentLee = new Student(100, "Lee");
    		studentLee.setKoreaSubject("국어", 100);
    		studentLee.setMathSubject("수학", 95);
    		
    		
    		Student studentKim = new Student(101, "Kim");
    		studentKim.setKoreaSubject("국어", 80);
    		studentKim.setMathSubject("수학", 99);
    		
    		studentLee.showStudentSocre();
    		studentKim.showStudentSocre();
    	}
    
    }
    ```
    

## 10.접근 제어 지시자와 정보은닉



### **접근 제어 지시자 (accesss modifier)**



> 클래스 외부에서 클래스의 멤버 변수, 메서드, 생성자를 사용할 수 있는지 여부를 지정하는 키워드
> 
> - `private`: 같은 클래스 내부에서만 접근 가능(외부 클래스, 상속 관계의 클래스에서도 접근 불가)
> - `default`: 같은 패키지 내부에서만 접근 가능 ( 상속 관계라도 패키지가 다르면 접근 불가
> - `proteced`: 같은 패키지나 상속관계의 클래스에서 접근 가능하고 그 외 외부에서는 접근 할 수 없음
> - `public`: 클래스의 외부 어디서나 접근 할 수 있음


### `get()` / `set()` 메서드


> `private` 으로 선언된 멤버 변수 (필드)에 대해 접근, 수정할 수 있는 메서드를 `public`으로 제공
> 

### 정보 은닉(information hiding)

> private일 때 각 변수에 대한 제한을 public 메서드에서 제어할 수 있다
최소한의 정보를 오픈 → 오류 방지 → 효율적으로 객체 활용
> 
> - information hiding example code
>     
>     ```java
>     public void setMonth(int month) {
>     		
>     		if ( month < 1 || month > 12) {
>     			isValid = false;
>     		}
>     		else {
>     			this.month = month;
>     		}
>     	}
>     ```
>     

## 11. 캡슐화

- 꼭 필요한 정보와 기능만 외부에 오픈
- 대부분의 멤버 변수와 메서드를 감추고 외부에 통합된 인터페이스만은 제공하여 일관된 기능을 구현
- 각각의 메서드나 멤버 변수를 접근함으로써 발생하는 오류를 최소화
- 레포트 만들기 예제
    
    ```java
    public class MakeReport {
    
    	StringBuffer buffer = new StringBuffer();
    	
    	private String line = "===========================================\n";
    	private String title = "  이름\t   주소 \t\t  전화번호  \n";
    	private void makeHeader()
    	{
    		buffer.append(line);
    		buffer.append(title);
    		buffer.append(line);
    	}
    	
    	private void generateBody()
    	{
    		buffer.append("James \t");
    		buffer.append("Seoul Korea \t");
    		buffer.append("010-2222-3333\n");
    		
    		buffer.append("Tomas \t");
    		buffer.append("NewYork US \t");
    		buffer.append("010-7777-0987\n");
    	}
    	
    	private void makeFooter()
    	{
    		
    		buffer.append(line);
    	}
    	
    	public String getReport()
    	{
    		makeHeader();
    		generateBody();
    		makeFooter();
    		return buffer.toString();
    	}
    }
    ```
    

## **12. 객체 자신을 가리키는 this**

> `this` - 객체 자신을 가리키는 레퍼런스 변수로, **자신의 객체에 접근할 때 사용
`this()` -** 같은 클래스에서 생성자가 다른 생성자를 호출할 때 사용, 생성자 코드에서만 사용 가능
> 

### this가 하는 일

- 인스턴스 자신의 메모리를 가리킴
    - 클래스 내에서 참조변수가 가지는 주소 값과 동일 한 주소 값을 가지는 키워드
    
    ```java
    public void setYear(int year) {
        this.year = year;
    }
    ```
    
- 생성자에서 또 다른 생성자를 호출 할때 사용
    - 인스턴스의 생성이 완전하지 않은 상태이므로 this() statement 이전에 다른 statement를 쓸 수 없음
    
    ```java
    public class Person {
    
    	String name;
    	int age;
    	
    	public Person() {
    		this("이름없음", 1);
    	}
    	
    	public Person(String name, int age) {
    		this.name = name;
    		this.age = age;
    	}
    }
    ```
    
- 자신의 주소(참조값)을 반환 함
    
    ```java
    public class Person {
    
    	String name;
    	int age;
    	
    	public Person() {
    		this("이름없음", 1);
    	}
    	
    	public Person(String name, int age) {
    		this.name = name;
    		this.age = age;
    	}
    	
    	public Person getPerson() {
    		return this;
    	}
    	
    	
    	public static void main(String[] args)
    	{
    		Person p = new Person();
    		p.name = "James";
    		p.age = 37;
    		
    		Person p2 = p.getPerson();
    		System.out.println(p);
    		System.out.println(p2);
    	}
    }
    ```
    

## 13, 14 객체 간의 협력 (collabration)과 예시


- 객체 지향 프로그램에서 객체 간에는 협력이 이루어짐
- 협력을 위해서는 필요한 메세지를 전송하고 이를 처리하는 기능이 구현되어야 함
- 매개 변수로 객체가 전달되는 경우가 발생

```java
James와 Tomas는 각각 버스와 지하철을 타고 학교에 갑니다.
James는 5000원을 가지고 있었고, 100번 버스를 타면서 1000원을 지불합니다.
Tomas는 10000원을 가지고 있었고, 초록색 지하철을 타면서 1200원을 지불합니다.
```

- 학생 코드
    
    ```java
    public class Student {
    	
    	String studentName;
    	int grade;
    	int money;
    	
    	public Student(String studentName, int money) {
    		this.studentName = studentName;
    		this.money = money;
    	}
    	
    	public void takeBus(Bus bus) {
    		bus.take(1000);
    		this.money -= 1000;
    	}
    	
    	public void takeSubway(Subway subway) {
    		subway.take(1200);
    		this.money -= 1200;
    	}
    		
    	public void showInfo() {
    		System.out.println(studentName +"님의 남은 돈은 " + money + "원 입니다");
    	}
    }
    ```
    
- 버스 코드
    
    ```
    public class Bus {
    
    	int busNumber;
    	int passengerCount;
    	int money;
    
    	public Bus(int busNumber) {
    		this.busNumber = busNumber;
    	}
    
    	public void take(int money) {  //승차
    		this.money += money;
    		passengerCount++;
    	}
    
    	public void showBusInfo() {
    		System.out.println(busNumber + "번 버스의 승객은 " + passengerCount + "명 이고, 수입은 " + money + "원 입니다");
    	}
    }
    
    ```
    

- 지하철 코드
    
    ```
    public class Subway {
    
    	int lineNumber;
    	int passengerCount;
    	int money;
    
    	public Subway(int lineNumber) {
    		this.lineNumber = lineNumber;
    	}
    
    	public void take(int money) {
    		this.money += money;
    		passengerCount++;
    	}
    
    	public void showSubwayInfo() {
    		System.out.println(lineNumber + "번 지하철의 승객은 " + passengerCount + "명 이고, 수입은 " + money + "원 입니다");
    	}
    }
    
    ```
    
- 전체 코드
    
    ```java
    public class TakeTransTest {
    
    	public static void main(String[] args) {
    		Student studentJ = new Student("James", 5000);
    		Student studentT = new Student("Tomas", 10000);
    		
    		Bus bus100 = new Bus(100);
    		
    		Subway subwayGreen = new Subway(2);
    		
    		
    		studentJ.takeBus(bus100);
    		studentT.takeSubway(subwayGreen);
    		
    		studentJ.showInfo();
    		studentT.showInfo();
    		
    		bus100.showBusInfo();
    				
    		subwayGreen.showSubwayInfo();
    	}
    
    }
    ```
    

## 16. static 변수, 구현과 활용



### static 변수 선언 및 사용


- 처음 프로그램이 메모리에 로딩될 때 메모리를 할당
- 클래스 변수, 정적변수라고도 함(vs. 인스턴스 변수)
- 인스턴스 생성과 상관 없이 사용 가능하므로 클래스 이름으로 직접 참조


📌 **static 변수와 메서드는 인스턴스 변수, 메서드가 아니므로 클래스 이름으로 직접 참조함
static 메서드(클래스 메서드)에서는 인스턴스 변수를 사용할 수 없음**



### 예시 - 회사원의 serialNum



- 회사원 클래스
    
    ```java
    public class Employee {
    
    	public static int serialNum = 1000;
    	
    	private int employeeId;
    	private String employeeName;
    	private String department;
    		
    	public int getEmployeeId() {
    		return employeeId;
    	}
    	public void setEmployeeId(int employeeId) {
    		this.employeeId = employeeId;
    	}
    	public String getEmployeeName() {
    		return employeeName;
    	}
    	public void setEmployeeName(String employeeName) {
    		this.employeeName = employeeName;
    	}
    	public String getDepartment() {
    		return department;
    	}
    	public void setDepartment(String department) {
    		this.department = department;
    	}
    	public static int getSerialNum() {
    		return serialNum;
    	}
    	public static void setSerialNum(int serialNum) {
    		this.serialNum = serialNum;
    	}
    	
    }
    ```
    
- 전체 코드
    
    ```java
    public class EmployeeTest {
    
    	public static void main(String[] args) {
    		Employee employeeLee = new Employee();
    		employeeLee.setEmployeeName("이순신");
    		System.out.println(employeeLee.serialNum);
    		
    		Employee employeeKim = new Employee();
    		employeeKim.setEmployeeName("김유신");
    		employeeKim.serialNum++;
    		
    		System.out.println(employeeLee.serialNum);
    		System.out.println(employeeKim.serialNum);
    		
    	}
    }
    ```
    

## 17. 변수의 유효 범위



## **18. static 응용 - 싱글톤 패턴(singleton pattern)**


### 싱글톤 패턴이란?

![https://gitlab.com/easyspubjava/javacoursework/-/raw/master/Chapter2/2-18/img/singleton.png](https://gitlab.com/easyspubjava/javacoursework/-/raw/master/Chapter2/2-18/img/singleton.png)

- 프로그램에서 인스턴스가 단 한 개만 생성되어야 하는 경우 사용하는 디자인 패턴
- static 변수, 메서드를 활용하여 구현 할 수 있음

[싱글톤(Singleton) 패턴이란?](https://tecoble.techcourse.co.kr/post/2020-11-07-singleton/)

### 예시

```java
//생성자는 private으로 선언
private Company() {} 

//클래스 내부에 유일한 private 인스턴스 생성
private static Company instance = new Company(); 

//외부에서 유일한 인스턴스를 참조할 수 있는 public 메서드 제공
public static Company getInstance() {
		
	if( instance == null) {
		instance = new Company();
	}
	return instance;
		
}

public class CompanyTest {

	public static void main(String[] args) {
		Company company1 = Company.getInstance();
		
		Company company2 = Company.getInstance();
		
		System.out.println(company1);
		System.out.println(company2);
		
		//Calendar calendar = Calendar.getInstance();
	}
}
```

## 더 공부해 볼만한 내용



- 객체 지향 프로그래밍 특징 - 추상화, 상속, 다형성, 캡슐화
    
    [객체 지향 프로그래밍의 4가지 특징ㅣ추상화, 상속, 다형성, 캡슐화 -](https://www.codestates.com/blog/content/객체-지향-프로그래밍-특징)
    
- 오버라이딩 vs 오버로딩
    
    [[JAVA] 오버로딩(Overloading)과 오버라이딩(Overriding)의 차이점](https://88240.tistory.com/450)
    
- 스택과 힙의 차이점
    
    [스택(Stack)과 힙(Heap) 차이점](https://junghyun100.github.io/힙-스택차이점/)
    

## 좋았던 점


📌 지난 학기에 플랫폼 기반 프로그래밍에서 배운 내용과 겹치는 부분이 많아 복습이 되고 좋았다. 강의 자료가 깔끔해서 한눈에 들어왔다.


## 아쉬운 점


📌 시험기간이라 시간이 부족해서 조금 더 자세히 알아보지 못한 것 같아 아쉽다.
시험 끝나면 열심히 해야징 ㅎㅎㅎ
