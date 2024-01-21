---
layout: post
title:  "널널(null null)한 처리"
author: 1jeongg
categories: [ 안드로이드 ]
summary: Kotlin의 다양한 Null값 처리 방법에 대해 정리한 글입니다.
tags: 
---


## !! (Not null type)

> 강제로 not null로 바꿔줌
>
> 여기서 null을 넣으면 Null Point Exception 발생

```kotlin
fun ignoreNulls(s: String?) {
    val sNotNull: String = s!!
    println(sNotNull.length)
}
```

## !!.
> cascading해서 사용 가능
>
> 단점: 어디서 Null Point Exception 발생했는지 알 수 없음 → 사용 줄이기!!

```kotlin
person.company!!.address!!.country
```

## ? (Nullable)

> null이 될 수 있음을 알려줌
> 
> nullable한 변수에서 method를 호출하면 컴파일 에러 발생


```kotlin
val s: String? = null
println(s.length)
/**
 * error
 * Only safe (?.) or non-null asserted (!!.) calls are allowed on a nullable receiver of type String?
 */
```

## ?. (Null Safe Operator)


> null을 안전하게 처리하기 위해 `?.` 연산자 지원
> 
> 다음 예제에서 s가 null이면 `null` 반환, 아닐때만 오른쪽 함수 실행
> 
> property 접근시에도 편리하게 `?.`를 사용해서 null 처리 가능 
> 
> `val employ = employee.manager?.name`


```kotlin
fun printAllCaps(s: String?) {
    val allCaps: String? = s?.toUpperCase()
    println(allCaps)
}
```

## ?: (Elvis Operator)

> null인 경우 default값을 줌

```kotlin
fun getName(str: String?) {
    val name = str ?: "Unknown"
    //if (str != null) str else "Unknown"과 동일
}
```

## let function

> not null인 경우에만 지정된 구문 실행

```kotlin
fun sendEmailTo(email: String) {
    println("Sending email to $email")
}

fun main(args: Array) {
    var email: String? = "yole@example.com"
    email?.let { sendEmailTo(it) }
    email = null
    email?.let { sendEmailTo(it) }
}
```

### Rereference

[[Kotlin] 코틀린 null 처리 - ? ?. ?: !!, let, lateinit, 제너릭, 플랫폼 타입](https://tourspace.tistory.com/114)