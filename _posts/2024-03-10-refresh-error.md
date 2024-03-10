---
layout: post
title:  "Ktor RefreshToken 문제 해결"
author: 1jeongg
categories: [ 안드로이드 ]
summary: Ktor의 플러그인 Auth를 사용했을 때 refreshToken 이 캐싱되는 문제를 해결하였습니다.
tags: 
---

PPAP 프로젝트를 진행하던 중 토큰이 만료되면 refresh가 제대로 되지 않는 문제가 발생하였다. 

## 문제 발생

[Bearer 토큰의 refresh 동작 방식을 설명한 Ktor의 공식문서](https://ktor.io/docs/bearer-client.html) 를 보면 **Specify how to obtain a new token if the old one is invalid using refreshTokens.**  라고 적혀있다. 

나는 이 부분을 읽고 보낸 토큰이 401 에러가 나면 `refreshTokens` 내 함수를 한 번만 호출하고 이때 return한 토큰은 사용되지 않는 것으로 Ktor의 Auth 작동 방식을 완전히 잘못 이해했다.

하지만 Ktor의 동작 방식을 다음 코드를 A 요청을 수행했을 때를 예시로 설명해보면 이렇다.

1. **토큰이 만료되기 전**
    
    -> A요청 with `Authorization: Bearer abc123`
    
    이렇게 loadTokens 내 BearerToken의 accessToken이 들어간다.
2. **토큰이 만료된 경우 (401 Error 발생)**
    
    -> ㄱ. Hello 출력

    -> ㄴ. 토큰 리프레시 요청 수행 (B요청)

    -> ㄷ. A요청 with `Authorization: Bearer def456`

3. **토큰이 한 번 이상 리프레시된 뒤**  

    -> A요청 with `Authorization: Bearer def456`

```kotlin
install(Auth) {
    bearer {
        loadTokens {
            BearerTokens("abc123", "xyz111")
        }
        refreshTokens {
            println("Hello")

            // 토큰 리프레시 요청 수행 (B요청)
            val result = client.post(MY_PATH) {
                setBody(RefreshTokenDTO(refreshToken))
                markAsRefreshTokenRequest()
            }.body<RefreshResult>()

            BearerTokens("def456", "xyz111")
        }
    }
}
```

## 문제 해결

나는 `refreshToken` 내 함수 실행 이후 결과를 dataStore에 저장했는데 이때 accessToken 을 `Bearer hello` 이런 식으로 저장했기에 토큰 리프레시 후 재 요청하면 `Bearer Bearer hello` 이렇게 요청이 날라가기에 문제가 생겼던 것이다.

그래서 Bearer prefix가 앞에 붙어있으면 파싱하는 작업을 했더니 잘 해결되었다 ^0^~

## 또 문제 발생 

그런데 로그아웃 또는 회원탈퇴를 한 뒤 로그인하는데 또 문제가 발생했다.

로그아웃 후 로그인을 하면 refreshToken이 아직 남아있으니 `Authorization: Bearer def456` 이렇게 캐싱된 내용이 들어가는 것이었다.

이렇게 잘못된 토큰을 로그인할 때 보내면 서버의 `JwtAuthenticationFilter` 내에서 에러가 발생했다.

로그인할 때만 `refreshToken` 에서 토큰값을 꺼내오지 않기 위해 정말 다양한 방법을 써봤지만.. 해당 함수를 호출하는 게 아니라 저장된 토큰값만 꺼내오는 것이기에 이걸 내 마음대로 조절할 수 없었다.

## 문제 해결

그래서 생각한 방법은 이렇게 저장된 토큰을 다 지워버리면 되지 않나? 였다.

물론 좋은 방법은 아니지만 현재로서 내가 생각할 수 있는 최선이었다.

```kotlin
// login 함수 내
client.plugin(Auth).providers.filterIsInstance<BearerAuthProvider>().first().clearToken()
```

이렇게 시원하게 지워버리면 다 잘 작동된다.

## 결론

Ktor는 아직 많이 사용되지 않는 라이브러리이기에 사용시 공식 문서를 꼼꼼히 읽어봐야 겠다 (아니 근데 너무 설명이 대충되어있는 것도 한 몫 하긴 했어요)

그리고 무슨 token 관리하는데 path에 따라 token 안보내고 이러는 것도 없을까요? 제가 못 찾은 걸까요..? ㅠㅠ 아무튼 좀 별로인 것 같네요.

그리고 Ktor와 Jetpack Compose를 사용한건 KMM으로 마이그레이션을 용이하기 위함이었는데 맥북을 결국 살 돈이 없고... 그래서.. 예.... 별 의미가 없네요

그래도 새로운 문제도 해결하고 좋은 경험이었습니다 ^^ (；′⌒`)