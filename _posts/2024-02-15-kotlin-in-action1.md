---
layout: post
title:  "코틀린 기초"
author: 1jeongg
categories: [ Android, Kotlin ]
summary: "kotlin in action의 1~3장을 읽고 모르는 부분을 정리했습니다. (코틀린 소개, 코틀린 기초, 함수 정의와 호출)"
tags: 
---

## 01. 코틀린이란 무엇이며, 왜 필요한가?

> 코틀린은 자바가 사용되고 있는 모든 용도에 적합하면서도 더 간결하고 생산적이며 안전한 대체 언어를 제공하기 위해 만들어진 언어이다.

### 코틀린의 특성
- 자바가 실행되는 모든 곳에서 사용될 수 있다.
- 정적 타입 지정 언어 -> 성능, 신뢰성, 유지 보수성, 도구 지원에 좋음
   - 타입 추론
   - ⭐ 널이 될 수 있는 타입 (`nullable type`) 지원
- 함수형 프로그래밍, 객체지향 프로그래밍
   - first-class 함수
   - 불변성
   - 부수효과 없음
- 실용성, 간결성, 안전성, 상호운용성

## 02. 코틀린 기초

### 문(statement)과 식(expression)
> 식은 값을 만들어 내며 다른 식의 하위 요소로 계산에 참여할 수 있음
> 
> 문은 자신을 둘러싸고 있는 가장 안쪽 블록의 최상위 요소로 존재하며 아무런 값을 만들지 않음

> `if`
> - Kotlin - expression
> - Java - statement
> 
> `대입문`
> - Kotlin - statement
> - Java - expression

- 블록이 본문인 함수
    ```kotlin
    fun max(a: Int, b: Int): Int {
        if (a > b) return a
        else return b
    }
    ```
- 식이 본문인 함수
    ```kotlin
    fun max(a: Int, b: Int) = if (a > b) a else b
    ```

### 스마트 캐스트

```kotlin
interface Expr
class Num(val value: Int) : Expr
class Sum(val left: Expr, val right: Expr) : Expr

fun eval(e: Expr): Int {
    if (e is Num){
        // 여기서 Num으로 타입을 변환 (불필요한 중복)
        val n = e as Num
        return n.value
    }
    if (e is Sum){
        // 변수 e에 대해 스마트 캐스트를 사용
        return eval(e.right) + eval(e.left)
    }
    throw IllegalArgumentException()
}
```

코틀린의 is는 자바의 `instanceof`와 비슷하다.  
하지만 자바에서 어떤 변수의 타입을 `instanceof`로 확인한 다음에 그 타입에 속한 멤버에 접근하기 위해서는 명시적으로 타입 캐스팅해야 한다.

**코틀린에서는 컴파일러가 캐스팅을 해준다.**   
**어떤 변수가 원하는 타입인지 일단 is로 검사하고 나면 굳이 변수를 원하는 타입으로 캐스팅하지 않아도 마치 처음부터 그 변수가 원하는 타입으로 선언된 것처럼 사용할 수 있다.**

-> 스마트 캐스트

## 03. 함수 정의와 호출

> 코틀린의 함수
> - 자신만의 컬렉션 기능을 제공하지 않는다. 
> - 빈 파일의 최상단에 함수만 선언할 수 있다. 컴파일러가 이 파일을 컴파일할 때 새로운 클래스를 정의해주기 때문이다.
> - 확장 함수는 클래스 밖에 선언되며 오버라이드할 수 없다.

### 컬렉션 처리

- `vararg` 키워드를 사용하면 호출 시 인자 개수가 달라질 수 있는 함수를 정의할 수 있다.
    ```kotlin
    fun main(args: Array<String>){
        // 스프레드 연산자가 배열의 내용을 펼쳐준다.
        val list = listOf("args: ", *args)
        println(list)
    }
    ```
- `infix`(중위) 함수 호출 구문을 사용하면 **인자가 하나**뿐인 메서드를 간편하게 호출할 수 있다.
    ```kotlin
    infix fun Any.to(other: Any) = Pair(this, other)
    ```
- `destructuring declaration`(구조분해선언)을 사용하면 복합적인 값을 분해해서 여러 변수에 나눠 담을 수 있다.
    ```kotlin
    val (number, name) = 1 to "one
    ```