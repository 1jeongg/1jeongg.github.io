---
layout: post
title:  "Java Basics2"
author: 1jeongg
categories: [ Java, Spring, Kakao-Tech-Campus ]
summary: Java의 유용한 메서드와 객체 지향 핵심에 대해 작성한 글입니다.
tags: 
---



> 해당 내용은 카카오 테크 캠퍼스의 1단계 1주차 강의를 들으며 작성한 내용입니다.
> [참고자료](https://gitlab.com/easyspubjava/javacoursework/-/tree/master/Chapter3)

# Week 03


# Ch 03. 객체 지향 핵심

## 01. 객체 간의 상속은 어떤 의미일까?


### 클래스 상속

![상속](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F314d9bd2-aa74-4443-8c9f-b23403e8c1b9%2FUntitled.png?table=block&id=e4ef281d-4005-430f-a22a-3722edb46334&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=670&userId=&cache=v2)

> 📌 이미 구현된 클래스보다 **더 구체적인 기능을 가진 클래스**를 구현해야 할때 기존 클래스를 상속함
> 
> 한 마디로 **속성이나 기능을 확장하여 클래스를 구현!!**



```java
class B extends A{
}

extends 키워드 뒤에는 단 하나의 클래스만 올 수 있음
자바는 단일 상속(single inheritance)만을 지원함
```

### 참고 - **부모 클래스에서 상속이 안 되는 것**



- 부모 클래스의 `private` 접근 제한을 갖는 필드 및 메소드
- 부모와 자식 클래스가 서로 다른 패키지에 있다면, 부모의 default 접근 제한을 갖는 필드 및 메소드도 자식이 물려받을 수 없음

## **02. 상속을 활용한 멤버십 클래스 구현하기**



```java
회사에서 고객 정보를 활용한 맞춤 서비스를 하기 위해 일반고객(Customer)과 
이보다 충성도가 높은 우수고객(VIPCustomer)에 따른 서비스를 제공하고자 함

물품을 구매 할때 적용되는 할인율과 적립되는 보너스 포인트의 비율이 다름 
여러 멤버십에 대한 각각 다양한 서비스를 제공할 수 있음
멤버십에 대한 구현을 클래스 상속을 활용하여 구현해보기
```

### `Customer` Class 구현



- 속성 : 고객 아이디, 고객 이름, 고객 등급, 보너스 포인트, 보너스 포인트 적립비율
- 물품 구매시 1%의 보너스 포인트 적립

```java
public class Customer {
  // 고객의 속성
	private int customerID;
	private String customerName;
	private String customerGrade;
	int bonusPoint;
	double bonusRatio;
	
 // 메서드
	public Customer() {
		customerGrade = "SILVER";
		bonusRatio = 0.01; // 포인트 적립비율
	}
	
	public int calcPrice(int price) {
		bonusPoint += price * bonusRatio;
		return price;
	}
	
	public String showCustomerInfo() {
		return customerName + "님의 등급은 " + customerGrade + 
				"이며, 보너스 포인트는" + bonusPoint + "입니다";
		
	}
}
```

### `VIPCustomer` 구현



![Untitled](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F339b45ac-a818-42c9-b242-4242893b66d3%2FUntitled.png?table=block&id=040657c6-259b-4a2e-83c8-c27c2edf48e8&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=720&userId=&cache=v2)

- Customer를 확장하여 구현함(상속) - Customer 내용과 중복되므로
- 특징
    - 제품을 살때 10%를 할인해 줌
    - 보너스 포인트는 제품 가격의 5%를 적립해 줌
    - 담당 전문 상담원이 배정됨

```java
public class VIPCustomer extends Customer{

	private int agentID;
	double salesRatio;
	
	public VIPCustomer() {
		    
  **//오류 발생 - Customer class에서 private variable이기 때문
	// 상위 클래스에 선언된 private 멤버 변수는 하위 클래스에서 접근 할 수 없음
    customerGrade = "VIP";**

		bonusRatio = 0.05;
		salesRatio = 0.1;
	}
	
	public int getAgentID() {
		return agentID;
	}
}
```

### `protected` 접근 제어자



> 위의 오류를 해결할 수 있음!!
> 
> - 외부 클래스는 접근 할 수 없지만, **하위 클래스는 접근 할 수 있도록** protected 접근 제어자를 사용

```java
	**protected** int customerID;
	**protected** String customerName;
	**protected** String customerGrade;

	//getter, setter 구현
	...
	public int getCustomerID() {
		return customerID;
	}

	public void setCustomerID(int customerID) {
		this.customerID = customerID;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getCustomerGrade() {
		return customerGrade;
	}

	public void setCustomerGrade(String customerGrade) {
		this.customerGrade = customerGrade;
	}

```

### 테스트 코드



```java
public class CustomerTest {

	public static void main(String[] args) {
		Customer customerLee = new Customer();
		customerLee.setCustomerName("이순신");
		customerLee.setCustomerID(10010);
		customerLee.bonusPoint = 1000;
		System.out.println(customerLee.showCustomerInfo());
			
			
		VIPCustomer customerKim = new VIPCustomer();
		customerKim.setCustomerName("김유신");
		customerKim.setCustomerID(10020);
		customerKim.bonusPoint = 10000;
		System.out.println(customerKim.showCustomerInfo());
	}
}
```

## **03. 상속에서 클래스 생성 과정과 형 변환**



### `super` 키워드



> 하위 클래스에서 가지는 상위 클래스에 대한 **참조 값**
> 
- 사용하는 **Case**
    - 하위 클래스에서 명시적으로 상위 클래스의 생성자를 호출하지 않을때
    - 상위 클래스의 기본 생성자가 없는 경우
    - 상위 클래스의 메서드나 멤버 변수에 접근

```java
// super를 이용하여 상위 클래스의 생성자 명시적으로 호출
public VIPCustomer(int customerID, String customerName) {
		**super(customerID, customerName);**
		
		customerGrade = "VIP";
		bonusRatio = 0.05;
		salesRatio = 0.1;
		
		System.out.println("VIPCustomer(int, String) 생성자 호출");
}
```

### **상속에서 인스턴스 메모리의 상태**



![상위 클래스 인스턴스 생성 → 하위 클래스 인스턴스 생성](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F484e8927-e0fc-4f27-910a-a7d2c9e9899c%2FUntitled.png?table=block&id=13b8f9d1-7739-4e54-bbf4-5b547e935fe5&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=1420&userId=&cache=v2)

상위 클래스 인스턴스 생성 → 하위 클래스 인스턴스 생성

### **형 변환과 메모리**



![Untitled](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F17033b39-537f-4e8d-944a-216f0cc15d87%2FUntitled.png?table=block&id=ed1153e0-8724-4f0f-b106-b5504fdee17b&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=1300&userId=&cache=v2)


> 📌 **형 변환 (업캐스팅)**
> 
> - 상위 클래스 타입의 변수에 하위 클래스 변수가 대입
>     - `VIPCustomer vCustomer = new VIPCustomer();`
>         
>         타입이 Customer → 실제 접근 가능한 변수나 메서드는 Customer의 변수, 메서드
>         
>     - `addCustomer(vCustomer); int addCustomer(Customer customer){}`
> - 상위 클래스로 변수를 선언하고 하위 클래스의 생성자로 인스턴스를 생성
>     - `Customer customerLee = new VIPCustomer();`
> - 상속 관계에서 모든 하위 클래스는 상위 클래스로 형 변환(업캐스팅)이 됨
> 

> **참고 - 업캐스팅하는 이유?**
>
> 공통적으로 할 수 있는 부분을 만들어 간단하게 다루기 위해서
상속 관계에서 상속 받은 서브 클래스가 몇 개이든 하나의 인스턴스로 묶어서 관리할 수 있기 때문
> 


> **참고 - 다운캐스팅**
> 
> 다운캐스팅은 거꾸로 부모 클래스가 자식 클래스 타입으로 캐스팅 되는 것
업캐스팅한 객체를 다시 자식 클래스 타입의 객체로 되돌리는데 목적을 둠
> 

## **04. 메서드 재정의하기(`overring`)**



### 하위 클래스에서 메서드 재정의



**오버라이딩**

> 상위 클래스에 정의된 메서드의 구현 내용이 하위 클래스에서 구현할 내용과 맞지 않는 경우 하위 클래스에서 **동일한 이름의 메서드를 재정의**
> 

```java
@Override
public int calcPrice(int price) {
	bonusPoint += price * bonusRatio;
	return price - (int)(price * salesRatio);
}
```

### **`@overriding` 애노테이션 (annotation)**



![Untitled](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ffbda27a7-ab9b-40be-ba47-1505b63a618b%2FUntitled.png?table=block&id=cd61f679-439d-4a76-8c49-41289d064130&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=1620&userId=&cache=v2)


> ⚠️ **유의!!**
> - @overriding 애노테이션은 **재정의 된 메서드**라는 의미로 **선언부가 기존의 메서드와 다른 > 경우 에러**
> 


### **형 변환과 오버라이딩 메서드 호출**


`Customer customerNo = new VIPCustomer(10030, "나몰라");`

- 변수의 타입 - Customer, 인스턴스 타입 - VIPCustomer
- 인스턴스의 메서드가 항상 호출됨 (가상메서드의 원리)

## **05. 메서드 재정의와 가상 메서드 원리**



### **메서드는 어떻게 호출되고 실행 되는가?**



> 메서드의 이름 = 주소값
> 
> 메서드 호출 → 명령어 set이 있는 주소를 찾아 명령어 실행(한 번만 로드됨) → 스택 메모리에 > 변수들 위치
> 
> 다른 인스턴스라도 같은 메서드의 코드는 같으므로 같은 메서드가 호출됨


### **가상 메서드의 원리**

가상 메서드란? - 인스턴스의 메서드가 호출되는 기술

가상 메서드 테이블(vitual method table)에서 해당 메서드에 대한 address를 가지고 있음
 

## **06. 다형성과 다형성을 사용하는 이유**



### **다형성(polymorphism) 이란?**


> 📌 하나의 코드가 **여러 자료형**으로 구현되어 실행되는 것
> 
> 같은 코드에서 **여러 다른 실행 결과**가 나옴
> 
> 다형성을 잘 활용하면 **유연하고 확장성있고, 유지보수가 편리한 프로그램**을 만들수 있음



- 예시 코드 - 동물
    
    ```java
    class Animal{
    	
    	public void move() {
    		System.out.println("동물이 움직입니다.");
    	}
    	
    	public void eating() {
    		
    	}
    }
    
    class Human extends Animal{
    	public void move() {
    		System.out.println("사람이 두발로 걷습니다.");
    	}
    	
    	public void readBooks() {
    		System.out.println("사람이 책을 읽습니다.");
    	}
    }
    
    class Tiger extends Animal{
    	
    	public void move() {
    		System.out.println("호랑이가 네 발로 뜁니다.");
    	}
    	
    	public void hunting() {
    		System.out.println("호랑이가 사냥을 합니다.");
    	}
    }
    
    class Eagle extends Animal{
    	public void move() {
    		System.out.println("독수리가 하늘을 날아갑니다.");
    	}
    	
    	public void flying() {
    		System.out.println("독수리가 날개를 쭉 펴고 멀리 날아갑니다");
    	}
    }
    
    public class AnimalTest {
    
    	public static void main(String[] args) {
    
    		Animal hAnimal = new Human();
    		Animal tAnimal = new Tiger();
    		Animal eAnimal = new Eagle();
    		
    		AnimalTest test = new AnimalTest();
    		test.moveAnimal(hAnimal);
    		test.moveAnimal(tAnimal);
    		test.moveAnimal(eAnimal);
    		
    		ArrayList<Animal> animalList = new ArrayList<Animal>();
    		animalList.add(hAnimal);
    		animalList.add(tAnimal);
    		animalList.add(eAnimal);
    		
    		for(Animal animal : animalList) {
    			animal.move();
    		}
    	}	
    	
    	public void moveAnimal(Animal animal) {
    		animal.move();
    		
    	}
    }
    ```
    

### **다형성을 사용하는 이유?**



- 다른 동물을 추가하는 경우 **상속과 메서드 재정의**를 활용하여 **확장성 있는 프로그램**을 만들 수 있음
- 상위 클래스에서는 **공통적인 부분을 제공**하고 하위 클래스에서는 **각 클래스에 맞는 기능 구현**
- 여러 클래스를 **하나의 타입(상위 클래스)으로 핸들링** 할 수 있음

### **다형성을 활용한 멤버십 프로그램 확장**



```java
일반 고객과 VIP 고객 중간 멤버십 만들기
고객이 늘어 일반 고객보다는 많이 구매하고 VIP보다는 적게 구매하는 고객에게도 해택을 주기로 했다.
GOLD 고객 등급을 만들고 혜택은 다음과 같다

제품을 살때는 10프로를 할인해준다
보너스 포인트는 2%를 적립해준다
```

```java
public class CustomerTest {

	public static void main(String[] args) {
		
		ArrayList<Customer> customerList = new ArrayList<Customer>();
		
		Customer customerLee = new Customer(10010, "이순신");
		Customer customerShin = new Customer(10020, "신사임당");
		Customer customerHong = new GoldCustomer(10030, "홍길동");
		Customer customerYul = new GoldCustomer(10040, "이율곡");
		Customer customerKim = new VIPCustomer(10050, "김유신", 12345);
		
		customerList.add(customerLee);
		customerList.add(customerShin);
		customerList.add(customerHong);
		customerList.add(customerYul);
		customerList.add(customerKim);
		
		System.out.println("====== 고객 정보 출력 =======");
		
		for( Customer customer : customerList){
			System.out.println(customer.showCustomerInfo());
		}
		
		System.out.println("====== 할인율과 보너스 포인트 계산 =======");
		
		int price = 10000;
		for( Customer customer : customerList){
			int cost = customer.calcPrice(price);
			System.out.println(customer.getCustomerName() +" 님이 " +  + cost + "원 지불하셨습니다.");
			System.out.println(customer.getCustomerName() +" 님의 현재 보너스 포인트는 " + customer.bonusPoint + "점입니다.");
		}
	}
}
```

```java
public class GoldCustomer extends Customer{

	double saleRatio;
	
	public GoldCustomer(int customerID, String customerName){
		super(customerID, customerName);
	
		customerGrade = "GOLD";
		bonusRatio = 0.02;
		saleRatio = 0.1;
	
	}
	
	public int calcPrice(int price){
		bonusPoint += price * bonusRatio;
		return price - (int)(price * saleRatio);
	}
}
```

```java
//showCustomerInfo() 재정의
public String showCustomerInfo(){
		return super.showCustomerInfo() + " 담당 상담원 번호는 " + agentID + "입니다";  
}
```

## **07. 상속은 언제 사용 할까?**



### **IS-A 관계(is a relationship : inheritance)**



> 추상화(형식이나 클래스와 같은)들 사이의 **포함 관계**를 의미하며, 한 클래스 A가 다른 클래스 B의 **서브클래스(파생클래스)**임
> 


📌

- **일반적인(general) 개념**과 **구체적인(specific) 개념**과의 관계
- **상위 클래스** : 하위 클래스보다 일반적인 개념 ( 예: Employee )
- **하위 클래스** : 상위 클래스보다 구체적인 개념들이 더해짐 ( 예: Engineer, Manager...)
- **상속은 클래스간의 결합도가 높은 설계**
- 상위 클래스의 수정이 많은 하위 클래스에 영향을 미칠 수 있음
- 계층구조가 복잡하거나 hierarchy가 높으면 좋지 않음
- 추상 클래스


### **HAS-A 관계(composition)**



> 한 오브젝트(구성된 객체, 또는 부분/멤버 객체라고도 부릅니다)가 다른 오브젝트(composite type이라고 부릅니다)에 **"속한다(*belongs to*)"**

객체의 멤버 필드라고 불리는 객체
is-a 관계에 비해 느슨함
> 


📌

- 클래스가 **다른 클래스를 포함**하는 관계 ( 변수로 선언 )
- **코드 재사용**의 가장 일반적인 방법
- Student가 Subject를 포함하는 Library를 구현할 때 ArrayList 생성하여 사용
- 상속하지 않음
- 인터페이


## **08. 다운 캐스팅과 instanceof**



### **다운 캐스팅(downcasting)**



- 업캐스팅된 클래스를 다시 원래의 타입으로 형 변환
- 하위 클래스로의 형 변환은 명시적으로 해야 함

```java
Customer vc = new VIPCustomer();              //묵시적
VIPCustomer vCustomer = (VIPCustomer)vc;      //명시적
```

### **instanceof를 이용하여 인스턴스의 형 체크**

```java
public void testDownCasting(ArrayList<Animal> list) {
		
		for(int i =0; i<list.size(); i++) {
			Animal animal = list.get(i);
		
			if ( animal instanceof Human) {
				Human human = (Human)animal;
				human.readBooks();
			}
			else if( animal instanceof Tiger) {
				Tiger tiger = (Tiger)animal;
				tiger.hunting();
			}
			else if( animal instanceof Eagle) {
				Eagle eagle = (Eagle)animal;
				eagle.flying();
			}
			else {
				System.out.println("error");
			}
		
		}
}
```



## **09. 추상 클래스(abstract class) 구현하기**



### **추상 클래스란?**



> 하나 이상의 **추상 메소드(**자식 클래스에서 반드시 오버라이딩해야만 사용할 수 있는 메소드)를 포함하는 클래스
> 


- 메서드 선언(declaration) : 반환타입, 메서드 이름, 매개변수로 구성
    - `int add(int x, int y);`
- 메서드 정의(definition) : 메서드 구현(implementation)과 동일한 의미 구현부(body) 를 가짐
    - `int add(int x, int y){ }`
- `abstract` 예약어를 사용
- 추상 클래스는 new 할 수 없음 ( **인스턴스화 할 수 없음 )**


### 추상 클래스 구현하기


- 메서드에 구현 코드가 없으면 `abstract`로 선언
- `abstract`로 선언된 메서드를 가진 클래스는 `abstract`로 선언
- 모든 메서드가 구현 된 클래스라도 `abstract`로 선언되면 **추상 클래스로 인스턴스화 할 수 없음**
- 추상 클래스의 추상 메서드는 **하위 클래스가 상속** 하여 구현
- 추상 클래스 내의 추상 메서드 : **하위 클래스가 구현해야 하는 메서드**
- 추상 클래스 내의 구현 된 메서드 : **하위 클래스가 공통으로 사용하는 메서드** ( 필요에 따라 하위 클래스에서 재정의 함 )


![Untitled](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F16e38182-24f6-400b-b8a5-d853b2c95144%2FUntitled.png?table=block&id=6fc31ee1-86f0-452a-820d-9e53e3d40b73&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=870&userId=&cache=v2)

```java
public abstract class NoteBook extends Computer{
	@Override
	public void typing() {
		System.out.println("NoteBook typing");		
	}
}
```

```java
public class MyNoteBook extends NoteBook{

	@Override
	void display() {
		System.out.println("MyNoteBook display");		
	}
}
```

```java
public class ComputerTest {

	public static void main(String[] args) {
		Computer computer = new DeskTop();
		computer.display();
		computer.turnOff();
		
		NoteBook myNote = new MyNoteBook();
	}
}
```

```java
public abstract class  Computer {

	abstract void display();
	abstract void typing();
	
	public void turnOn() {
		System.out.println("전원을 켭니다.");
	}
	
	public void turnOff() {
		System.out.println("전원을 끕니다.");
	}
}
```

```java
public class DeskTop extends Computer{

	@Override
	void display() {
		System.out.println("DeskTop display");
	}

	@Override
	void typing() {
		System.out.println("DeskTop typing");
	}

	@Override
	public void turnOff() {
		System.out.println("Desktop turnoff");
	}
}
```

## **10. 추상 클래스의 응용 - 템플릿 메서드 패턴**



### **템플릿 메서드**



> 추상 메서드나 구현 된 메서드를 활용하여 코드의 흐름(시나리오)를 정의하는 메서드

`final`로 선언하여 **하위 클래스에서 재정의 할 수 없게 함**

전체적인 **흐름을 정의** 하고 하위 클래스에서 **다르게 구현되어야 하는 부분**은 추상 메서드로 선언하여 **하위 클래스에서 구현 하도록 함**


![Untitled](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fd793acae-cc15-4a8e-a2ff-06e8a7730f52%2FUntitled.png?table=block&id=2f6c1ab0-9d3d-4477-8655-e831d6f46cb4&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=880&userId=&cache=v2)

### **final 예약어**



- `final 변수` : 값이 변경될 수 없는 상수 `public static final double PI = 3.14;`
- `final 메서드` : 하위 클래스에서 재정의 할 수 없는 메서드
- `final 클래스` : 상속할 수 없는 클래스

## **11. 인터페이스(interface)**



### 인터페이스란?



> 다른 클래스를 작성할 때 기본이 되는 틀을 제공하면서, 다른 클래스 사이의 중간 매개 역할까지 담당하는 일종의 추상 클래스
> 
> - 특징
    - 모든 메서드가 추상 메서드로 선언됨 `public abstract`
    - 모든 변수는 상수로 선언됨 `public static final`

```java
public interface Calc {

	double PI = 3.14;
	int ERROR = -99999999;
	
	int add(int num1, int num2);
	int substract(int num1, int num2);
	int times(int num1, int num2);
	int divide(int num1, int num2);
	
}
```

### **인터페이스 구현과 형 변환**



![Untitled](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc76e2311-6678-4f42-a4e8-a25868b059d7%2FUntitled.png?table=block&id=a8c1dee9-e070-4e2e-bf4e-d4dac01064ff&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=1110&userId=&cache=v2)

- 상속에서의 형 변환과 동일한 의미
- 클래스 상속과 달리 구현 코드가 없으므로 **여러 인터페이스를 구현**할 수 있음
- 형 변환되는 경우 **인터페이스에 선언된 메서드만을 사용가능**함

## **12. 인터페이스는 왜 쓰는가?**


**클래스나 프로그램이 제공하는 기능**을 명시적으로 선언

일종의 클라이언트 코드와의 약속이며 **클래스나 프로그램이 제공하는 명세**(specification)

클라이언트 프로그램은 인터페이스에 선언된 메서드 **명세만 보고 이를 구현한 클래스를 사용할 수 있음**

어떤 객체가 하나의 인터페이스 타입이라는 것은 **그 인터페이스가 제공하는 모든 메서드를 구현했다**는 의미임

인터페이스를 구현한 **다양한 객체**를 사용함 - 다형성



## **13 인터페이스를 활용한 다형성 구현 (dao 구현하기)**



### **인터페이스와 다형성**



> 하나의 인터페이스를 여러 객체가 구현하게 되면 
클라이언트 프로그램은 **인터페이스의 메서드**를 활용하여 
**여러 객체의 구현을 사용**할 수 있음 ( 다형성)
> 

![Untitled](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F130e2269-706c-4f93-b58d-ee58fc46b9dd%2FUntitled.png?table=block&id=f4d9bff8-fba3-458a-91eb-fc48622dbb2d&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=990&userId=&cache=v2)

### `dao` 구현하기



- `UserInfo. java` (사용자 정보 클래스)
    
    ```java
    public class UserInfo {
    	
    	private String userId;
    	private String passwd;
    	private String userName;
    	
    	public String getUserId() {
    		return userId;
    	}
    	
    	public void setUserId(String userId) {
    		this.userId = userId;
    	}
    	
    	public String getPasswd() {
    		return passwd;
    	}
    	
    	public void setPasswd(String passwd) {
    		this.passwd = passwd;
    	}
    	
    	public String getUserName() {
    		return userName;
    	}
    	
    	public void setUserName(String userName) {
    		this.userName = userName;
    	}
    }
    ```
    
- `UserInfoDao.java` ( dao 에서 제공되어야 할 메서드를 선언한 인터페이스 )
    
    ```java
    public interface UserInfoDao {
    
    	void insertUserInfo(UserInfo userInfo);
    	void updateUserInfo(UserInfo userInfo);
    	void deleteUserInf(UserInfo userInfo);
    }
    ```
    
- `UserInfoMySqlDao.java` (UserInfoDao 인터페이스를 구현한 MySql 버전 dao)
    
    ```java
    public class UserInfoMySqlDao implements UserInfoDao{
    
    	@Override
    	public void insertUserInfo(UserInfo userInfo) {
    		System.out.println("insert into MYSQL DB userId =" + userInfo.getUserId() );
    	}
    
    	@Override
    	public void updateUserInfo(UserInfo userInfo) {
    		System.out.println("update into MYSQL DB userId = " + userInfo.getUserId());
    	}
    
    	@Override
    	public void deleteUserInf(UserInfo userInfo) {
    		System.out.println("delete from MYSQL DB userId = " + userInfo.getUserId());
    
    	}
    
    }
    
    ```
    
- `UserInfoOracleDao.java` (UserInfoDao 인터페이스를 구현한 Oracle 버전 dao)
    
    ```java
    public class UserInfoOracleDao implements UserInfoDao{
    
    	public void insertUserInfo(UserInfo userInfo){
    		System.out.println("insert into ORACLE DB userId =" + userInfo.getUserId() );
    	}
    
    	public void updateUserInfo(UserInfo userInfo){
    		System.out.println("update into ORACLE DB userId = " + userInfo.getUserId());
    	}
    
    	public void deleteUserInf(UserInfo userInfo){
    		System.out.println("delete from ORACLE DB userId = " + userInfo.getUserId());
    	}
    }
    
    ```
    
- `UserInfoClient.java` (UserInfoDao 인터페이스를 활용하는 클라이언트 프로그램)
    
    ```java
    public class UserInfoClient {
    
    	public static void main(String[] args) throws IOException {
    
    		FileInputStream fis = new FileInputStream("db.properties");
    		
    		Properties prop = new Properties();
    		prop.load(fis);
    		
    		String dbType = prop.getProperty("DBTYPE");
    		
    		UserInfo userInfo = new UserInfo();
    		userInfo.setUserId("12345");
    		userInfo.setPasswd("!@#$%");
    		userInfo.setUserName("이순신");
    		
    		
    		UserInfoDao userInfoDao = null;
    		
    		if(dbType.equals("ORACLE")){
    			userInfoDao = new UserInfoOracleDao();
    		}
    		else if(dbType.endsWith("MYSQL")){
    			userInfoDao = new UserInfoMySqlDao();
    		}
    		else{
    			System.out.println("db support error");
    			return;
    		}
    		
    		userInfoDao.insertUserInfo(userInfo);
    		userInfoDao.updateUserInfo(userInfo);
    		userInfoDao.deleteUserInf(userInfo);
    	}
    }
    ```
    

## **14. 인터페이스의 여러가지 요소**



### 상수



> 모든 변수 → 상수로 변환, `public static final`
> 

```java
double PI = 3.14;
int ERROR = -999999999;
```

### 정적 메서드



> 인스턴스 생성과 상관 없이 인터페이스 타입으로 사용할 수 있는 메서드
> 

```java
static int total(int[] arr) {
	int total = 0;
		
	for(int i: arr) {
		total += i;
	}
	mystaticMethod();
	return total;
}
```

### 추상 메서드



> 모든 선언된 메서드는 추상 메서드 `public abstract`
> 

### **디폴트 메서드**



> 구현을 가지는 메서드, 인터페이스를 구현하는 클래스들에서 공통으로 사용할 수 있는 기본 메서드
> 

```java
default void description() {
	System.out.println("정수 계산기를 구현합니다.");
	myMethod();
}
// 처음 봄,,
```

### private 메서드



> 인터페이스 내부에서만 사용하기 위해 구현하는 메서드
> 

```java
private void myMethod() {
	System.out.println("private method");
}
	
private static void mystaticMethod() {
	System.out.println("private static method");
}
```

# **Ch 04. 자바의 유용한 클래스들**



## **01. Object 클래스 - 모든 클래스의 최상위 클래스**



### **모든 클래스는 Object 클래스를 상속 받는다**



- 모든 클래스의 최상위 클래스는 Object에서 상속받고, 
Object 클래스의 메서드 중 일부는 재정의해서 사용할 수 있음
- 컴파일러가 `extends Object`를 추가 `class Student => class Student extends Object`

### **toString() 메서드**



- 객체의 정보를 String으로 바꾸어서 사용할 때 쓰임
- String이나 Integer 클래스는 이미 재정의 되어 있음

## **02. Object 클래스의 메서드 활용**



### **`equals()` 메서드**


두 인스턴스의 **주소 값을 비교**하여 `true/false`를 반환 (진짜 값이 아님!!)

인스턴스가 다르더라도 논리적으로 동일한 경우 `true`를 반환하도록 **재정의 할 수 있음**



### **`hashCode()` 메서드**


- `hashCode()`는 **인스턴스의 저장 주소**를 반환함
- 힙메모리에 인스턴스가 저장되는 방식이 **hash 방식(**자료의 특정 값(키 값)에 대한 저장 위치를 반환**)**
- 두 인스턴스가 같다는 것은?
    - 두 인스턴스에 대한 equals()의 반환 값이 true 동일한 hashCode() 값을 반환
- 논리적으로 동일함을 위해 equals() 메서드를 재정의 하였다면 
hashCode()메서드도 재정의 하여 동일한 hashCode 값이 반환되도록 한다


### **clone() 메서드**



**객체의 원본을 복제**하는데 사용하는 메서드 (deep copy)

생성과정의 복잡한 과정을 반복하지 않고 복제 할 수 있음

clone()메서드를 사용하면 객체의 정보(멤버 변수 값등...)가 **동일한 또 다른 인스턴스가 생성**되는 것이므로, 객체 지향 프로그램에서의 **정보 은닉, 객체 보호의 관점에서 위배**될 수 있음

`cloneable` 인터페이스를 명시해 줌



## **03. String, StringBuilder, StringBuffer 클래스, text block**



### String 클래스



```java
String str1 = new String("abc"); // 힙 메모리에 인스턴스로 생성되는 경우
String str2 = "abc"; // 상수 풀(constant pool)에 있는 주소를 참조
```

- 힙 메모리는 생성될때마다 다른 주소 값을 가지지만, 상수 풀의 문자열은 모두 같은 주소 값을 가짐
- 한번 생성된 String은 불변(immutable)
- String을 연결하면 기존의 String에 연결되는 것이 아닌 새로운 문자열이 생성됨
    - `java = java.concat(android);`


### **StringBuilder, StringBuffer 활용하기**



```java
public class StringBuilderTest {

	public static void main(String[] args) {
		String java = new String("java");
		String android = new String("android");
		
		StringBuilder buffer = new StringBuilder(java);
		System.out.println(System.identityHashCode(buffer));
		buffer.append("android");
		System.out.println(System.identityHashCode(buffer));
		
		java = buffer.toString();
	}
}
```


- 내부적으로 가변적인 `char[]`를 멤버 변수로 가짐
- 문자열을 **여러번 연결하거나 변경**할 때 사용하면 유용함
- 새로운 인스턴스를 생성하지 않고 **char[] 를 변경**함
- `StringBuffer`는 멀티 쓰레드 프로그래밍에서 **동기화(synchronization)을 보장**
- **단일 쓰레드 프로그램**에서는 StringBuilder 사용을 권장
- toString() 메서드로 `String`반환


### **text block 사용하기 (java 13)**



```java
String strBlock = """
				This 
				is 
				text
				block
				test.""";
```

## **04. Class 클래스 사용하기**



### **Class 클래스**



- 자바의 모든 클래스와 인터페이스는 컴파일 후 **class 파일이 생성**됨
- Class 클래스는 컴파일 된 class 파일을 로드하여 **객체를 동적 로드하고, 정보를 가져오는 메서드 제공**

```java
Class c = Class.forName("java.lang.String");
```

```java
Class c = String.class;
```

```java
String s = new String();
Class c = s.getClass();  //Object 메서드
```

### **동적 로딩**



**1️⃣ 동적 로딩이란?**

> **실행(runtime) 중**에 데이터 타입을 binding 하는 방법
> 

**2️⃣ 장점**

> 프로그래밍 시에는 문자열 변수로 처리했다가 **런타임시에 원하는 클래스를 로딩**하여 binding 할 수 있다
> 

**3️⃣ 문제점**

> 컴파일 시에 타입이 정해지지 않으므로 **동적 로딩시 오류**가 발생하면 프로그램의 **심각한 장애**가 발생가능****
> 

### **클래스 정보 알아보기**



- **reflection 프로그래밍** : Class 클래스를 사용하여 클래스의 정보(생성자, 변수, 메서드)등을 알 수 있고 인스턴스를 생성하고, 메서드를 호출하는 방식의 프로그래밍
- 로컬 메모리에 객체 없는 경우, 원격 프로그래밍, 객체의 타입을 알 수 없는 경우에 사용
- `java.lang.reflect` 패키지에 있는 클래스를 활용하여 프로그래밍
- 일반적으로 자료형을 알고 있는 경우엔 사용하지 않음

# 좋았던 점




❤️ 아는 내용, 모르는 내용, 헷갈리는 내용이 적당히 섞여 있어서 더욱 흥미롭게 공부할 수 있어서 좋았다. 

지난 1주차에서는 내용이 다소 쉬워서 아쉬웠는데 이번에는 난이도가 딱 적당한 것 같았다!! 

강의를 듣고 노션에 내용을 정리하는 식으로 공부했는데 더욱 복습이 잘되고 다 하고 보니 굉장히 뿌듯했다!!



# 아쉬운 점




💔 정리를… 너무 마구잡이 식으로 했나 싶다..

강의 자료, 블로그 내용, 코드 등등 넣고 싶은 내용 다 넣다보니까 양이… 나중에 봐도 알아보기 힘들 수준 같다.

중간쯤에 깨달은 내용이라 이제 와서 그만두기도 애매해서 이렇게 돼버렸다..ㅠㅠ
앞으로는 적당히 모르는 것만 적어야 겠다

그리고 강의가 조금 길어서 힘들었다,, 시험 수요일 밤에 끝났는데…. 😢



# 참고자료



- 코딩 팩토리 - **[[Java] 자바 클래스(Class)의 상속(Extends) 사용법 & 예제](https://coding-factory.tistory.com/865)**
- Inpa Dev -  **[☕ JAVA 업캐스팅 & 다운캐스팅 - 완벽 이해하기](https://www.notion.so/0755f0de47bf4b4e998b5c961fff51a1?pvs=21)**
- 미누시 - **[객체 지향적 관점에서의 has-a와 is-a 차이점](https://minusi.tistory.com/entry/%EA%B0%9D%EC%B2%B4-%EC%A7%80%ED%96%A5%EC%A0%81-%EA%B4%80%EC%A0%90%EC%97%90%EC%84%9C%EC%9D%98-has-a%EC%99%80-is-a-%EC%B0%A8%EC%9D%B4%EC%A0%90)**
- 마이자몽 - [[JAVA] 추상클래스 VS 인터페이스 왜 사용할까? 차이점, 예제로 확인](https://myjamong.tistory.com/150)
- 잭피토리 - [[JAVA] Shalow copy(얕은 복사) vs Deep copy(깊은 복사)](https://jackjeong.tistory.com/100)