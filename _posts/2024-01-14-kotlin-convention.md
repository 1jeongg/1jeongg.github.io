---
layout: post
title:  "코틀린 컨벤션"
author: 1jeongg
categories: [ 안드로이드 ]
summary: kotlinorg.org에 정의된 코틀린 컨벤션을 정리한 글입니다.
tags: 
---

## 📁 Source code organization

### 파일 이름 관리

- 클래스/인터페이스는 **Upper Camel Case** 사용 `HelloKotlin.kt`

- 해당 파일이 어떤 역할을 하는지 직관적으로 드러날 수 있어야하며,
**파일 이름과 클래스/인터페이스 이름이 동일**해야 함

- 해당 클래스의 `extension function`을 정의할 경우,
따로 파일을 분리하기 보다, **같은 파일에** 넣어야 함


### 클래스/인터페이스

비슷한 기능을 하는 method끼리 묶어서 배치하기 → 읽기 좋게


### Class Content 순서


> 1. Prooperty declarations and initializer blocks
> 2. Secondary constructors
> 3. Method declarations
> 4. Companion object

## 🚧 Naming rules


### Package, class Name

`uppercase letter`와 `camel case`사용
 

```kotlin
open class DeclarationProcessor { /*...*/ }

object EmptyDeclarationProcessor : DeclarationProcessor() { /*...*/ }
```

### Function names


> `lowercase letter`와 `camel case` 사용
`underscores(_)` 사용 ❌❌


```kotlin
interface Foo { /*...*/ }

class FooImpl : Foo { /*...*/ }

fun Foo(): Foo { return FooImpl() }
```

### Names for test Methods

> 공백 등을 사용해서 자유롭게 사용 가능
런타임 내에서 support되지 않음


```kotlin
class MyTestCase {
     @Test fun `ensure everything works`() { /*...*/ }

     @Test fun ensureEverythingWorks_onAndroid() { /*...*/ }
}
```

### Property names


> **immutable data**는 `uppercase`사용, `udnerscore-separated(snake_case)`


```kotlin
const val MAX_COUNT = 8
val USER_NAME_FIELD = "UserName"
```

> **beavior나 mutable** 데이터는 `camel case` 사용


```kotlin
val mutableCollection: MutableSet<String> = HashSet()
```

> **singleton object**를 참조하는 property는 `Upper camel case` 사용
> 

```kotlin
val mutableCollection: MutableSet<String> = HashSet()
```

### Names for backing properties

> 두 개의 property가 개념적으로 동일하지만 하나가 public API에서 받아오는 것이라면 다른 하나는 prefix로 `underscore` 붙여주기


```kotlin
class C {
    private val _elementList = mutableListOf<Element>()

    val elementList: List<Element>
         get() = _elementList
}
```

## 🪓 Formatting

### Indentation

> 공백 4개 사용,주석
> 

```kotlin
if (elements != null) {
    for (element in elements) {
        // ...
    }
}
```

### Horizontal whitespace

- binary operation에 공백 `( a + b )`
- unary operation에 공백 ❌ `a++`
- method call할 때 parameter에 공백 넣지 않기 `foo(1)`
- `(`,`[`,`]`,`)` , `.` , `?.`, `?`뒤에 공백 ❌
- 주석 기호 뒤에 공백 `// Comment`

### Colon

- type이나 supertype을 구분할 때 사용하므로 그 외에는 절대 앞에 공백을 붙이지 않음
- 뒤에는 무조건 공백

```kotlin
abstract class Foo<out T : Any> : IFoo {
    abstract fun foo(a: Int): T
}

class FooImpl : Foo() {
    constructor(x: String) : this(x) { /*...*/ }

    val x = object : IFoo { /*...*/ }
}
```

### Functions

- 한 줄에 안 적히면 parameter, return을 다른 줄에 분리해서 작성
- single expression 추구, 최대한 한 줄로 작성

```kotlin
fun longMethodName(
    argument: ArgumentType = defaultValue,
    argument2: AnotherArgumentType,
): ReturnType {
    // body
}
```

```kotlin
val isEmpty: Boolean get() = size == 0

val foo: String
    get() { /*...*/ }

private val defaultCharset: Charset? =
    EncodingRegistry.getInstance().getDefaultCharsetForPropertiesFiles(file)
```

### Control flow statements

> 여러 줄일 경우 분리해서 작성
else 등은 다음 줄 바로 앞에 두기
when은 여러 줄이면 `{}`를 통해 분리
> 

```kotlin
if (!component.isSyncing &&
    !hasAnyKotlinRuntimeInScope(module)
) {
    return createKotlinNotConfiguredPanel(module)
}
```

```kotlin
if (condition) {
    // body
} else {
    // else part
}

try {
    // body
} finally {
    // cleanup
}
```

```kotlin
private fun parsePropertyValue(propName: String, token: Token) {
    when (token) {
        is Token.ValueToken ->
            callback.visitValue(propName, token.value)

        Token.LBRACE -> { // ...
        }
    }
}
```

### Wrap chained calls


> `.` 이나 `?.` 뒤에는 분리
> 

```kotlin
val anchor = owner
    ?.firstChild!!
    .siblings(forward = true)
    .dropWhile { it is PsiComment || it is PsiWhiteSpace }
```

### Lambdas



> `{ }` 앞 뒤로 공백 넣기
> 

```kotlin
list.filter { it > 10 }

appendCommaSeparated(properties) { prop ->
    val propertyValue = prop.get(obj)  // ...
}

foo {
   context: Context,
   environment: Env
   ->
   context.configureEnv(environment)
}
```

### Documentation comments

> /** 으로 구별
> 

```kotlin
/**
 * This is a documentation comment
 * on multiple lines.
 */
```

### Conditional statements



> return에 바로 적기보다는 try, if, when을 구별하기
> 

```kotlin
if (x)
    return foo()
else
    return bar()

when(x) {
    0 -> return "zero"
    else -> return "nonzero"
}
```

### Conditional statements



> return에 바로 적기보다는 try, if, when을 구별하기
> 

```kotlin
if (x)
    return foo()
else
    return bar()

when(x) {
    0 -> return "zero"
    else -> return "nonzero"
}
```

### Loop

> for 대신 forEach 사용하기 → Nullable하기 때문
0..n - 1 대신 until n 사용
> 

```kotlin
for (i in 0..n - 1) { /*...*/ }  // bad
for (i in 0 until n) { /*...*/ }  // good
```