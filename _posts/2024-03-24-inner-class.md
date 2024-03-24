---
layout: post
title:  "내부 클래스와 람다식"
author: 1jeongg
categories: [ Java, Spring, Kakao-Tech-Campus ]
summary: 내부 함수와 람다식을 알아보고 객체지향 프로그래밍과 비교한 내용입니다.
tags: 
---

> 해당 내용은 카카오 테크 캠퍼스의 1단계 1주차 강의를 들으며 작성한 내용입니다.
> [참고자료](https://gitlab.com/easyspubjava/javacoursework/-/tree/master/Chapter6)

## **01. 여러 내부 클래스의 정의와 유형**

### **내부 클래스란? (inner class)**

**클래스 내부에** 선언한 클래스(=중첩 클래스)

다른 외부 클래스에서 사용할 일이 거의 없는 경우 사용

- 지역(local) 내부 클래스,
- 익명(anonymous) 내부 클래스
- 인스턴스 내부 클래스
- 정적(static) 내부 클래스

```cpp
class OuterClass{ //외부 클래스
	class InstanceInner{ // 인스턴스 클래스 }
	static class StaticInner{ // 정적 클래스}
	void method() {
		class LocalInner{ // 지역 클래스}
	}
}
```


### 인스턴스 내부  클래스

- 내부적으로 사용할 클래스를 선언 (private으로 선언하는 것을 권장)
- 외부 클래스가 생성된 후 생성

> **⚒️ 객체 생성 방법**
> 
> 외부클래스.인스턴스클래스 객체명 = new 외부클래스().new 인스턴스클래스();
> 
> 
> ```cpp
> OuterClass.InstanceInner ii = new OuterClass().new InstanceInner();
> ```
> 

> 외부클래스 객체 생성 후
> 
> 
> 외부클래스.인스턴스클래스 객체명 = 외부클래스.new 인스턴스클래스();
> 
> ```cpp
> OuterClass outer = new OuterClass();
> OuterClass.InstanceInner ii2 = outer.new InstanceInner();
> ```
> 


> 🚨 **유의사항**
> 
> 인스턴스 내부 클래스에서 `static variable`이나 `static method`를 사용할 경우 에러남



### 정적 내부 클래스



```java
class OuterClass{ //외부 클래스
	static class StaticInner{ // 정적 클래스
	}
}
public class InnerEx {
	public static void main(String[] args) {
		OuterClass.StaticInner si = new OuterClass.StaticInner();
    
	}
}
```

- 클래스 내부에 `static` 키워드를 가지며 주로 외부 클래스의 클래스 메소드에 사용될 목적으로 선언됨
- 정적 변수, 정적 메서드 사용
- 정적 내부 클래스 일반 메서드와 정적 메서드에서의 변수 사용
    
    ![Untitled](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F4b0c8858-6d1e-41e9-a0c2-5ba8c50be939%2FUntitled.png?table=block&id=5e5e0a98-6c40-44db-b04a-9fcec6e5acc9&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=1340&userId=&cache=v2)
    

### **지역 내부 클래스**


- **메서드 내부에서 정의**하여 사용
- 지역 내부 클래스에서 사용하는 메서드의 지역 변수나 매개 변수는 `final`로 선언됨
    - 메서드 호출 이후에도 사용해야 하는 경우가 있을 수 있기 때문

```java
class OuterClass{ //외부 클래스
	void method() {
		class LocalInner{ // 지역 클래스
			int a = 5;
		}
		LocalInner li = new LocalInner();
		System.out.println(li.a);
	}
}
```


> 🚨 **유의사항**
> **지역 내부 클래스에서 에러가 나는 경우 
> → 메서드의 지역변수, 매개변수는 final로 선언되기 때문에 메소드 호출과 생성 시점이 달라 에러  발생**

```java
class Outer{
	int outNum = 100;
	static int sNum = 200;
	Runnable getRunnable(int i){
		int num = 100;
		class MyRunnable implements Runnable{
			int localNum = 10;
			@Override
			public void run() {
				**//num = 200;   //에러 남. 지역변수는 상수로 바뀜
				//i = 100;     //에러 남. 매개 변수 역시 지역변수처럼 상수로 바뀜
				// 오류가 나는 이유는, 메소드 호출과 생성 시점이 다르기 때문이다.
				// final로 처리가 되어서 외부 지역변수는 메소드 호출이 끝나도 사라지지 않고, 
				// 상수 메모리에 따로 잡힘.**
				System.out.println("i =" + i); 
				System.out.println("num = " +num);  
				System.out.println("localNum = " +localNum);
				System.out.println("outNum = " + outNum + "(외부 클래스 인스턴스 변수)");
				System.out.println("Outter.sNum = " + Outer.sNum + "(외부 클래스 정적 변수)");
				}
			}
		 return new MyRunnable();
	}
}
```



### **익명 내부 클래스**

- 클래스의 이름을 생략하고 주로 **하나의 인터페이스나 하나의 추상 클래스를 구현**하여 반환
- 인터페이스나 추상 클래스 자료형의 변수에 **직접 대입하여 클래스를 생성**하거나 지**역 내부 클래스의 메서드 내부에서 생성하여 반환** 할 수 있음

```java
class Outter2{
		
	Runnable getRunnable(int i){

		int num = 100;
		
		return new Runnable() {
				
		@Override
		public void run() {
			//num = 200;   //에러 남
			//i = 10;      //에러 남
			System.out.println(i);
			System.out.println(num);
			}
		};
	}
	// 익명 내부 클래
	Runnable runner = new Runnable() {
		
		@Override
		public void run() {
			System.out.println("""
Runnable 이 구현된 익명 클래스 변수""");
			
		}
	};
}
```

```java

public class AnonymousInnerTest {

	public static void main(String[] args) {
		Outter2 out = new Outter2();
	
		Runnable runnerble = out.getRunnable(10);
		runnerble.run();
		
		out.runner.run();
	}
}
```

```java
10
100
RunnablRunnable 이 구현된 익명 클래스 변수
```

## **02. 람다식(Lambda expression)**



### **함수형 프로그래밍과 람다식**


1️⃣ **람다식**

> 함수형 프로그래밍 방식
>
> = 함수의 구현과 호출만으로 프로그래밍이 수행되는 방식
 

**2️⃣ 함수형 프로그래밍**

> 순수함수(pure function)를 구현하고 호출하는 방식
> 
> → 외부 자료에 부수적인 영향(side effect)를 주지 않음
> 
> → 여려 자료가 동시에 수행되는 병렬처리가 가능(자료에 독립적)
> 
> → 동일한 자료에 대해 동일한 결과를 보장, 다양한 자료에 대해 같은 기능을 수행 가능


### **람다식 문법**

- 익명 함수 만들기
- 매개 변수와 매개변수를 이용한 실행문 (매개변수) -> {실행문;}

```java
(int x, int y) -> {return x+y;}

x, y -> {System.out.println(x+y);}  // 오류

str-> return str.length();  //오류

str->{System.out.println(str);}

str-> System.out.println(str);

(x, y) -> x+y;
str -> str.length;
```

## **03. 함수형 인터페이스와 람다식 구현하여 사용하기**

### **함수형 인터페이스 선언하기**

- 람다식을 선언하기 위한 인터페이스
- 익명 함수와 매개 변수만으로 구현되므로 **인터페이스는 단 하나의 메서드만을 선언해야함**
- `@FunctionalInterface` 애노테이션(annotation)

```java
@FunctionalInterface
public interface MyNumber {
	int getMax(int num1, int num2);
	int add(int x, int y);
}
```

```java
MyNumber max = (x, y)->(x>= y)? x:y;
 // 람다식을 인터페이스 자료형 max 변수에 대입
```

![Java 에서는 기본적으로 많이 사용되는 함수형 인터페이스](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F1d44f82c-525f-4648-b4ab-a144a5f151cd%2FUntitled.png?table=block&id=6e39eaa2-2150-42bd-8e53-281bc755b8c7&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=2000&userId=&cache=v2)

Java 에서는 기본적으로 많이 사용되는 함수형 인터페이스

## **04. 객체지향 프로그래밍 vs. 람다식 구현**



### **객체 지향 프로그래밍과 람다식 비교**




📢 task: 문자열 두 개를 연결하여 출력



1️⃣ **객체 지향 프로그래밍**

```java
public interface StringConcat {
	
	public void makeString(String s1, String s2);

}
```

```java
public class StringConCatImpl implements StringConcat{

	@Override
	public void makeString(String s1, String s2) {
		System.out.println( s1 + "," + s2 );
	}
}
```

```java
public class TestStringConcat {

	public static void main(String[] args) {

		String s1 = "Hello";
		String s2 = "World";
		StringConCatImpl concat1 = new StringConCatImpl();
		concat1.makeString(s1, s2);
    }
}
```

2️⃣ 람다식 구현

```java
StringConcat concat2 = (s, v)->System.out.println(s + "," + v ); //System.out.println(i);
concat2.makeString(s1, s2);
```

### **익명 객체를 생성하는 람다식**



> 람다식을 구현하면 익명 내부 클래스가 만들어지고, 이를 통해 익명 객체가 생성됨
> 
> 람다식 내부에서 에서도 외부에 있는 지역 변수의 값을 변경하면 오류가 발생함


### **함수를 변수처럼 사용하는 람다식**



- 인터페이스형 변수에 람다식 대입하기
    
    ```java
    interface PrintString{	
    	void showString(String str);
    }
    ```
    
    ```java
    PrintString lambdaStr = s->System.out.println(s);
    //람다식을 변수에 대입
    lambdaStr.showString("hello lambda_1");
    ```
    
- 매개변수로 전달하는 람다식
    
    ```java
    showMyString(lambdaStr); 
    
    public static void showMyString(PrintString p) {
    	p.showString("hello lambda_2");
    }
    ```
    
- 반환 값으로 쓰이는 람다식
    
    ```java
    public static PrintString returnString() {         //반환 값으로 사용
    		return s->System.out.println(s + "world");
    }
    
    PrintString reStr = returnString();  
    reStr.showString("hello ");
    ```
    
## 참고자료

- [[Java/자바] 내부클래스(Inner Class) - 인스턴스 클래스, 정적 클래스, 지역 클래스, 익명 클래스](https://lasbe.tistory.com/57)
- [Java 8 함수형 인터페이스 (Functional Interface)](https://bcp0109.tistory.com/313)