---
layout: post
title:  "스트림"
author: 1jeongg
categories: [ Java, Spring, Kakao-Tech-Campus ]
summary: Stream에 대해 알아보고 연산 수행에 대한 구현을 할 수 있는 reduce() 연산을 정리한 글입니다.
tags: 
---

> 해당 내용은 카카오 테크 캠퍼스의 1단계 1주차 강의를 들으며 작성한 내용입니다.
> 
> [참고자료](https://gitlab.com/easyspubjava/javacoursework/-/tree/master/Chapter6)



## **05. 스트림(Stream)**

### **스트림 이란?**

> 수많은 데이터의 흐름 속에서 각각의 원하는 값을 가공하여 최종 소비자에게 제공
> 

![Untitled](https://unmarred-belief-362.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fb7e93387-c1e6-4008-af7d-0238c462e96a%2FUntitled.png?table=block&id=297dea50-8676-4bb9-b7dd-3b24aea4bfec&spaceId=c256e108-fd9a-4c15-9548-7caa838d19b2&width=1280&userId=&cache=v2)



> 📌 자료의 대상과 관계없이 **동일한 연산**을 수행
> 
> **배열, 컬렉션**을 대상으로 연산을 수행 함
> 
> 자료의 처리를 **쉽고 간단**하게 함
> 
> 자료 처리에 대한 **추상화**가 구현되었다고 함



> 📌 한번 생성하고 사용한 스트림은 **재사용 할 수 없음**
> 
> 자료에 대한 스트림을 생성하여 연산을 수행하면 **스트림은 소모**






> 📌 스트림 연산은 **기존 자료를 변경하지 않음**
> 
> 자료에 대한 스트림을 생성하면 스트림이 사용하는 **메모리 공간은 별도로 생성**되기 때문



> 📌 스트림 연산은 **중간 연산과 최종 연산**으로 구분 됨
> 
> 스트림에 대해 **중간 연산은 여러 개**의 연산이 적용될 수 있지만 **최종 연산은 마지막에 한 번만** 적용됨
> 
> **최종연산이 호출되어야 중간 연산에 대한 수행**이 이루어 지고 그 결과가 만들어짐
> 
> 따라서 중간 연산에 대한 결과를 연산 중에 알수 없음
> 
> ⇒ **'지연 연산'**



### **스트림 생성하고 사용하기**



```java
public class IntArrayTest {

	public static void main(String[] args) {

		int[] arr = {1,2,3,4,5};
		
		int sumVal = Arrays.stream(arr).sum();
		long count = Arrays.stream(arr).count();
		
		System.out.println(sumVal);
		System.out.println(count);
	}

}
```

### **중간 연산과 최종 연산**



- **중간연산**
    - 예  - `filter(), map(), sorted()` 등
    - 조건에 맞는 요소를 **추출(filter)**하거나 요소를 **변환 함(map)**
    
    ```java
    sList.stream().filter(s->s.length() >= 5).forEach(s->System.out.println(s));
    ```
    
    ```java
    customerList.stream().map(c->c.getName()).forEach(s->System.out.println(s));
    ```
    
- 최종연산
    - 예 - `forEach(), count(), sum()` 등
    - 스트림이 관리하는 자료를 하나씩 소모해가며 연산이 수행 됨

### **ArrayList 객체에 스트림 생성하고 사용하기**



```java
public class ArrayListStreamTest {

	public static void main(String[] args) {
		List<String> sList = new ArrayList<String>();
		sList.add("Tomas");
		sList.add("Edward");
		sList.add("Jack");
		
		Stream<String> stream = sList.stream();
		stream.forEach(s->System.out.print(s + " "));
		System.out.println();
		
		****sList.stream().sorted().forEach(s->System.out.print(s+ " "));
		sList.stream().map(s->s.length()).forEach(n->System.out.println(n));
		sList.stream().filter(s->s.length() >= 5).forEach(s->System.out.println(s));
		
	}

}
```

```java
Tomas Edward Jack 
Edward Jack Tomas 5
6
4
Tomas
Edward
```

## **06. 연산 수행에 대한 구현을 할 수 있는 reduce()연산**



### **reduce() 연산**



> 최종 연산으로 스트림의 요소를 소모하며 연산을 수행
reduce() 메서드의 두 번째 요소로 전달되는 람다식에 따라 다양한 기능을 수행 할 수 있음
> 

```java
Arrays.stream(arr).reduce(0, (a,b)->a+b));
```

### BinaryOperator를 구현하여 배열에 여러 문자열이 있을 때 길이가 가장 긴 문자열 찾기 예



```java
class CompareString implements BinaryOperator<String>{

	@Override
	public String apply(String s1, String s2) {
		if (s1.getBytes().length >= s2.getBytes().length) return s1;
		else return s2;
	}
}

public class ReduceTest {

	public static void main(String[] args) {

		String[] greetings = {"안녕하세요~~~", "hello", "Good morning", "반갑습니다^^"};
		
		System.out.println(Arrays.stream(greetings).reduce("", (s1, s2)-> 
		                          {if (s1.getBytes().length >= s2.getBytes().length) 
				                                  return s1;
		                          else return s2;})); 
		
		String str = Arrays.stream(greetings).reduce(new CompareString()).get(); //BinaryOperator를 구현한 클래스 이용
		System.out.println(str);
		                          
	}
}
```

```java
안녕하세요~~~
안녕하세요~~~
```

## **07. 스트림을 활용하여 패키지 여행 비용 계산하기**



### **문제 정의**




📎 여행사에 패키지 여행 상품이 있습니다. 여행 비용은 15세 이상은 100만원, 그 미만은 50만원 입니다.
고객 세 명이 패키지 여행을 떠난다고 했을 때 비용 계산과 고객 명단 검색등에 대한 연산을 스트림을 활용하여 구현해 봅니다.
고객에 대한 클래스를 만들고 ArrayList로 고객을 관리 합니다.

고객 정보는 다음과 같습니다.

CustomerLee
이름 : 이순신
나이 : 40
비용 : 100

CustomerKim
이름 : 김유신
나이 : 20
비용 : 100

CustomerHong
이름 : 홍길동
나이 :13
비용 : 50



### **고객 클래스**



```java
public class TravelCustomer {

	private String name;   //이름
	private int age;       //나이
	private int price;     //가격
	
	public TravelCustomer(String name, int age, int price) {
		this.name = name;
		this.age = age;
		this.price = price;
	}

	public String getName() {
		return name;
	}

	public int getAge() {
		return age;
	}

	public int getPrice() {
		return price;
	}
	
    	public void setName(String name) {
		this.name = name;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String toString() {
		return "name: " + name + "age: " + age + "price: " + price; 
	}

}
```

### **스트림을 활용한 연산 수행**



```java
public class TravelTest {

	public static void main(String[] args) {
		TravelCustomer customerLee = new TravelCustomer("이순신", 40, 100);
		TravelCustomer customerKim = new TravelCustomer("김유신", 20, 100);
		TravelCustomer customerHong = new TravelCustomer("홍길동", 13, 50);
		
		List<TravelCustomer> customerList = new ArrayList<>();
		customerList.add(customerLee);
		customerList.add(customerKim);
		customerList.add(customerHong);
		
		System.out.println("== 고객 명단 추가된 순서대로 출력 ==");
		customerList.stream().map(c->c.getName()).forEach(s->System.out.println(s));
		
		int total = customerList.stream().mapToInt(c->c.getPrice()).sum();
		System.out.println("총 여행 비용은 :" + total + "입니다");
		
		System.out.println("== 20세 이상 고객 명단 정렬하여 출력 ==");
		customerList.stream().filter(c->c.getAge() >= 20).map(c->c.getName()).sorted().forEach(s->System.out.println(s));
	}

}
```

### 결과값



```java
== 고객 명단 추가된 순서대로 출력 ==
이순신
김유신
홍길동
총 여행 비용은 :250입니다
== 20세 이상 고객 명단 정렬하여 출력 ==
김유신
이순신
```

## 참고자료

- [자바 직렬화, 그것이 알고싶다. 훑어보기편](https://techblog.woowahan.com/2550/)
- [Basics: 직렬화(Serialization)란? (feat. Java)](https://medium.com/@lunay0ung/basics-%EC%A7%81%EB%A0%AC%ED%99%94-serialization-%EB%9E%80-feat-java-2f3eb11e9a8)