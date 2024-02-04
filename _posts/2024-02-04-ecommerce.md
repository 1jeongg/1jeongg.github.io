---
layout: post
title:  "대규모 이커머스 프로젝트 기획"
author: 1jeongg
categories: [ Kakao-Tech-Campus ]
summary: 대규모 이커머스 프로젝트, 루시드 차트, 머메이드, 스타트업 초기 서비스 개발
tags: asdf
---


## 01. 초기 이커머스 아이디어 기획

### 아이디어 표현 방법

- 제품, 서비스 모양 그려보기
- 서비스 흐름을 그려보기
    - UML - 플로우 차트
- 상태 전이를 그려보기
    - UML - [상태 다이어그램](https://www.lucidchart.com/pages/ko/uml-state-machine-diagram)
- 누가 사용자 또는 고객인가?
    - 사용자(고객) 파악하기 - UseCase, define Actor, Actor별 UseCase 파악

### 아이디어 → 서비스 (구체화 단계)



- 고객 시나리오 - 다양한 시나리오
    - [8. UX 시나리오](https://cmos00.tistory.com/1980)
    
- MVP (Minimum Viable Product)
    - 최소 실행 가능 제품
    - ![image]({{site.baseurl}}/assets/images/week2/Untitled.png)
    
- PRD (Product Requirment Document)
    - 요구 사항, 효과를 표현 (배경, 목표, 사용자 스토리, UX 원칙, 주요 지표, 개발 계획, FAQ 등)
- 1 Pager
    - 목적, 배경, 왜 우리를 고용했는가?, 원칙, 주요 지표, 개발 계획, FAQ
    
- 보도 자료 포맷
    - "제목, 부제목, 새로운 기능 등 세부적인 내용 , 고객이 받을 수 있는 혜택, 담당 책임자의 말"
    
- 3 Whys
    - 왜????????????????
    
### 아이디어 시각화 기본 도구

> 도구가 생각을 방해하면 안된다. (단순한 것이 최고다!)
편집이 생각을 방해하면 안된다. (선 기록, 후 편집)
> 
> ![image]({{site.baseurl}}/assets/images/week2/Untitled1.png)
> 

### 아이디어 시각화 방법

1. 오프라인 도구로 생각을 모으고 정리한다
    1. 메모장, 포스트잇, 화이트보드 등
2. 온라인으로 표현
    1. (온라인) 루시드 차트(Lucid Chart)
    2. (온라인) 피그마(Figma)
    3. (온라인) 머메이드(Mermaid)

### 유용한 도구들

**⚡ 루시드 차트**

> 공동 작업이 가능표현력이 높음
>
> 학습 곡선이 낮음
>
> 공유하기 쉬움

[Intelligent Diagramming Lucidchart](https://www.lucidchart.com/pages/)

**⚡ 머메이드**

> - 온라인 라이브 에디터 제공
> - 마크다운(Markdown) 스타일
> - 타 도구들과 연동이 가능하다.

[[markdown] mermaid를 이용해서 UML 그리기 - 플로우차트](https://sabarada.tistory.com/209)


### 요약


- 다양한 아이디어를 표현하는 방법이 있다.
    - 서비스 화면 그리기, 서비스 흐름 정리, 상태 정리, 액터 식별 등
- 아이디어를 구체적으로 정리하는 여러가지 방법이 있다.
    - 냅킨, 노트, 메모장, 화이트보드, 플로우차트, 상태다이어그램
- 아이디어 시각화 (오프라인 도구, 온라인 도구)
- 추천하는 아이디어 시각화 방법은 “화이트보드”와 “루시드차트(Lucid chart)”이다.
- 요즘 도구와 잘 맞는 머메이드(Mermaid)라는 도구도 추천


## 02. 아이디어 시각화 도구

### 루시드 차트

> **시각화 → 소통**이 중심!!

- UML (통합 모델링 언어)
- 객체 관계, 객체 상호 작용
- 도메인 분석 및 설계, 업무 분석, 시스템 분석

- 상태 전이
- 동료와 협업과공유
- 다른 도구와 통합

### 루시드 차트 - 기능

1. **기본 도형 및 UML(통합 모델링 언어) 기반**
    1. 도메인 분석, 절차 구성, 플로우차트, 상태, ERD
2. **아키텍처 설계 - 빅테크 기업**
    1. 클라우드 설계(AWS, Azure, GCP), 네트워크
3. **마인드 맵**
4. **조직 구성도**
5. **공유 및 협업하기**
6. **내보내기**
7. **그 외 수많은 템플릿**
    1. UML 기반 시각화 템플릿 제공
    2. 시스템 구성도 템플릿 제공
    3. 사이트맵

### 루시드 차트 - 샘플

![상품(일반, Prime) 구매 애플리케이션 시각화 by 루시드 차트]({{site.baseurl}}/assets/images/week2/Untitled2.png)

상품(일반, Prime) 구매 애플리케이션 시각화 by 루시드 차트

![상품 판매,배달 관련 애플리케이션 시각화 by 루시드 차트]({{site.baseurl}}/assets/images/week2/Untitled3.png)

상품 판매,배달 관련 애플리케이션 시각화 by 루시드 차트

### 머메이드

> 현재 업무에서 다른 도구에 통합하여 활용하는 시각화 도구

### 머메이드 - 기본기능

1. 플로우 차트

![Untitled]({{site.baseurl}}/assets/images/week2/Untitled4.png)

![Untitled]({{site.baseurl}}/assets/images/week2/Untitled5.png)

2. 시퀀스 다이어그램

```java
sequenceDiagram
	소닉 ->> 아트: 안녕하세요.
	아트 ->> 소닉: 네. 반갑습니다.
	럭키 ->> 아트: 실례합니다.
	포비 ->> 럭키: 잠시만요
	브로디 ->> 포비: 점심 드셨어요?
```

![Untitled]({{site.baseurl}}/assets/images/week2/Untitled6.png)

3. 상태 다이어그램

```java
stateDiagram-v2
	[*] --> 대기
	대기 --> [*]
	대기 --> 배송시작
	배송시작 --> 대기
	배송시작 --> 직접수령
	직접수령 --> [*]
```

![Untitled]({{site.baseurl}}/assets/images/week2/Untitled7.png)

1. 파이차트

```java
pie title 점심에 먹은 빵의 개수
	"소닉" : 60
	"아트" : 20
	"럭키" : 15
	"포비" : 5
	"브로디" : 5
```

![Untitled]({{site.baseurl}}/assets/images/week2/Untitled8.png)

### 머메이드 라이브 에디터

[Online FlowChart & Diagrams Editor - Mermaid Live Editor](https://mermaid.live/edit#pako:eNpVjstqw0AMRX9FaNVC_ANeFBq7zSbQQrPzZCFsOTMk80CWCcH2v3ccb1qtxD3nCk3Yxo6xxP4W760lUTjVJkCe96ay4gb1NJyhKN7mAyv4GPgxw_7lEGGwMSUXLq-bv18lqKbjqjGodeG6bKh69r8Cz1A3R0oa0_kvOd3jDB-N-7b5_H9ihXPrs-mp7KloSaAieSq4Q8_iyXX5_WlNDKplzwbLvHYkV4MmLNmjUePPI7RYqoy8wzF1pFw7ugj5LVx-AfLqVWg)


![Untitled]({{site.baseurl}}/assets/images/week2/Untitled9.png)


- 노션과 통합
    
    ```mermaid
    graph TD
      Mermaid --> Diagram
    ```
    
- 깃허브와 통합

![Untitled]({{site.baseurl}}/assets/images/week2/Untitled10.png)

![Untitled]({{site.baseurl}}/assets/images/week2/Untitled11.png)


## 좋았던 점

❤️ 이전에 프로젝트를 하면서 플로우 차트를 만들어봤던 기억이 있는데 그때는 그냥 네모, 화살표만 사용해서 이렇게까지 다양한 기능이 있다는 걸 몰랐는데 이번 강의를 통해서 이렇게 좋은 툴이 있다는 것을 알 수 있어서 좋았다.
다음에 써봐야징!!

## 아쉬운 점

💔 플로우 차트, 초기 프로젝트 설계의 중요성에 대해서 먼저 구체적으로 설명해줬으면 더 좋았을 것 같다고 생각한다!
그리고 시험기간이라 강의 몇 개 못 들어서 아쉽다 ㅠ
