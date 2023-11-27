---
layout: post
title:  "소프트웨어공학 정리 (중간)"
author: 1jeongg
categories: [ Software-Engineering ]
summary: 소프트웨어 공학 수업을 듣고 중간고사 범위의 내용을 정리했습니다.
tags: 
---

### Abstract Class vs Interface

- 추상 클래스는 구현을 포함할 수 있다

### Actor

- 액터는 시스템과 상호작용(interaction)을 하는 시스템 외부의 존재이다.
- 액터는 시스템 외부의 존재이다
- 액터는 시스템 관점에서 바라본 역할
- 개발 대상이 되는 시스템에 따라서 달라질 수 있다
- 장치 유형의 액터의 표현 여부는 표준 플랫폼에 의한 지원에 따라 달라진다

### Aggregation / Composition	

- 집합 포함관계는 두 객체간의 포함 소속의 의미를 클래스 수준에서 표현한 것이다
- 집합 포함 관계는 전체는 부분으로 구성된다 .” 또는 부분은 전체의 부분이다 라는 의미로 해석된다
- 연관 관계가 가지고 있던 특성 즉 방향성 , 다중성 , 이름, 역할 등을 집합 포함 관계에도 적용할 수가 있다
- 집합/포함 관계는 연관 관계의 일종이다
- 집합 (aggregation) 관계는 공유 집합 (shared aggregation) 관계라고도 불리며 부분 객체가 여러 개의 전체 객체들 사이에서 공유 될 수 있음을 뜻한다
- 포함 (composition) 관계는 부분 객체가 오직 하나의 전체 객체에 포함될 수 있음을 뜻한다
- 반드시 Has a 의 의미가 성립되어야 한다
- 집합 포함 관계는 비대칭적이고 이행적이다
- 비대칭적 : A 가 전체이고 B 가 부분이면 , A 가 부분이고 B가 전체가 될 수는 없다
- 이행적 : A 가 B 를 포함하고 , B 가 C 를 포함하면 , A 는 C 를포함한다
- 부분의 역할을 하는 쪽이 클래스인 경우에는 포함관계를 이용하고 , 부분의 역할을 하는 쪽이 클래스가 아니라 데이터타입인 경우에는 속성으로서 정의하도록 한다


### Analysis	
- 분석 단계는 응용 소프트웨어 계층만을 대상으로 한다
- 분석은 기능적 요구사항만을 고려하여 수행된다

### Analysis  Class	
- 시스템을 구성하는 실체로서 외부 입력으로부터 출력을 산출하는 실질적인 기능을 제공한다
- 각 클래스는 유스케이스의 전체 기능의 일부만을 제공하므로
여러 클래스와의 협력 이 필요
- 클래스 간의 협력을 위해서는 클래스 간에 메시지 전달을 위한 관계relationship, association or 가 필요


### Analysis Class Model	
- 분석 클래스 모델을 구성하는 분석 클래스들은 그 역할에 따라서 분류됨
- 경계 클래스 (boundary): 시스템과 외부 액터와의 상호작용을 전담. 시스템의 기능 중에서 입력과 출력만을 전담하는 클래스이다 (UI, 사용자, 입출력) (SI, 시스템, 외부시스템과의 데이터 송수신), (DI, 장치, 장치 모니터링 및 제어)
- 제어 클래스 (control): 시스템이 실제로 제공하는 비즈니스 로직 및 제어 로직을 전담하는 클래스. 경계 클래스를 통하여 입력 받은 값을 정의된 요구사항에 따라서 적절한 출력 값을 산출하는 기능을 제공한다
- 엔티티 클래스 (entity): 시스템이 유지해야 하는 persistent 데이터를 관리하는 기능을 전담하는 클래스이다. Persistent 데이터는 시스템이 종료되어도 그 값이 유지되어야 하는 데이터를 말하며 파일 또는 데이터베이스 등으로 구현된다 (속성 : 엔티티 클래스가 관리할 정보 항목, 연산 : 데이터 관리 기능)

### Analysis 목표	
- Analysis aims at defining system elements that can fulfill the specified functional requirements

### Association	
- 연관 관계는 두 개 이상의 클래스 간의 관련성을 뜻한다
- 연관의 이름(동사)과 역할(명사)은 연관 관계의 의미를 명확하게 할 수 있다
- 연관의 이름 보다는 역할이 보다 권장된다
- 역할은 상 대 객체에 대한 참조 변수의 이름으로 사용된다
- 일부 UML 모델링 도구에서는 역할의 이름을 지정되지 않으면 연관을 위한 필드를 자동으로 생성하지 않기도 한다
- 연관 관계는 메시지 전달의 통로 역할을 한다 (한 객체는 연관 관계가 있는 다른 객체의 기능을 이용할 수가 있다, 반대로 말하면 연관 관계가 없는 객체의 기능을 이용할 수는 없다)
-연관 관계의 방향성은 메시지 전달의 방향을 뜻한다
- 연관 관계의 다중성은 복수 개의 객체와의 관련성을 표현한다
- 다중연관은 동일한 클래스 간의 존재하는 복수개의 연관 관계를 뜻한다.
- 연관의 다중성 은 동일한 의미 역할의 복 수개의 객체와의 관계를 뜻하는 반면에 다중 연관 은 다른 의미 역할을가지는 객체를 뜻한다
- 연관 관계의 의미는 관련된 두 클래스로부터 명확하게 결정될 수 있어야 한다


### Association 
- 클래스 간의 연관 관계와 객체 간의 메시지 전달 규칙	
- 연관 관계가 있는 클래스 간에 메시지가 전달 될 수 있다
- 메시지 전달 방향은 방향성과 일치되어야 한다
- 메시지에 대응되는 연산이 공용 (public) 가시성으로 정의되어 있어야 한다


### Association 방향	
- 연관관계의 방향은 데이터의 흐름이 아니라 제어 흐름을 뜻해야 한다
### Attribute	
- 클래스가 나타내고자 하는 객체들의 정보와 상태를 표현하는 변수들이다
- 가시성 이름 : 타입 다중성 ] = 초기값
- UML 기본 타입 , 사용자 정의 타입 , 대상 프로그래밍 언어의 타입을 타입으로서 사용할 수 있다
- 속성은 오직 하나의 구체적인 정보를 표현해야 한다
- 속성은 해당되는 전체 객체에 공통적이어야 한다
- 일부 객체에만 의미가 있는 속성들이 있는 경우에는 하위 클래스를 생성하여 일반화 관계를 맺도록 클래스 다이어그램을 재구성한다
- 속성들 간의 관련성이 낮을 때 즉 클래스의 응집도 (cohesion) 이 낮을 때는 관련된 속성들끼리 묶어서 클래스를 분할 하는 것이 바람직하다(밀접한 관련성)
- 속성은 클래스가 나타내고자 하는 객체들의 고유의 독립적인 정보를 표현해야 하며 , 다른 클래스 객체에 의존적인 정보를 속성으로 표현해서는 안 된다
- 다른 속성에 의해서 결정될 수 있는 속성을 유도 (derived) 속성이라고 부른다
- 유도 속성은 클래스 다이어그램에서 가시성과 속성의 이름 사이에 /을 이
용하여 표시한다
- 유도 속성의 값이 어떻게 다른 속성으로부터 계산될 수 있는 지를 명시적으로 기술하는 것이 바람직하다 .
- 유도 속성의 값은 자신의 다른 속성뿐만 아니라 다른 클래스와의 관계로부터 결정될 수도 있다

### Class	
- 클래스는 유사한 객체들의 묶음이다
- 클래스는 유사한 특성 즉 유사한 상태와 행동을 가지는 객체들을 한꺼번에 부르는 용어이다 (집합과 유사)
- 하나의 클래스는 오직 한가지 유형의 대상만을 표현해야 한다
- 유사한 속성과 유사한 연산을 가질 수 있는 객체들만을 묶어서 클래스로 정의
- 클래스의 표현 = 클래스 다이어그램
- 클래스의 이름은 명확하고 구체적이어야 한다.(일반화 계층 구조에서 하단에 위치한 클래스)
- 클래스의 이름으로부터 기대될 수 있는 속성 연산을 가지고 있어야 한다

### Class/Object vs Attribute	
- 클래스 객체는 독립적으로 존재하며 실체로서 각 객체의 식별성이 중요하다. 즉 동일한 클래스로부터 생성된 객체라 하더라도 각 객체를 구분할 필요가 있다
- 속성은 객체를 설명 ( 하기 위한 정보로서 값 자체가 의미가있다. 즉 동일한 값을 가지는 속성이 따로 구분될 필요가 없다

### Composite data	
- Defined in terms of its components

### Conceptual Data Model	
- Describe the high-level entities that will be managed by the system

### Conceptual UI Model	
- Describe UI elements(screens) and relationships among them

### Constraints	
- fixed premade decisions before design begins
- Business constraints: Team Composition and Makeup, Schedule or Budget, Legal 

### Restrictions
- Technical constraints: PL 선택, OS나 플랫폼, 컴포넌트나 기술

### Data Dictionary	
- Data dictionary contains the definitions of all data

### Dependency	
- 의존 관계는 제공자의 변경이 이용자에 영향을 미칠 수 있음을 뜻한다
- 의존 관계는 제공자의 변경이 이용자의 변경을 유발함
- 연관 관계와 마찬가지로 의존 관계가 있는 클래스 간에 메시지가 전달될 수 있다 구체적으로 말하면 이용자 클래스는 제공자 클래스의 연산을 호출할 수 있다
- 의존관계는 연산의 인자 , 지역 객체 , 전역 객체와의 관계를 표현한다
- 의존 관계는 패키지 사이에 유용하게 사용될 수 있다
- 클래스다이어그램은 인터페이스와 인터페이스 이용자 간의 이용 관계를 표현할 때 사용될 수 있다
- 인터페이스와 의존 관계: 클래스 다이어그램,  컴포넌트 다이어그램

### Elementary data	
- Defined in terms of the meaning of each of the values

### Generalization	
- 일반적인 클래스와 보다 구체적인 클래스 간의 관계를 뜻한다
- 많은 클래스 간의 일반화 관계를 전체적으로 정의한 것을 일반화 계층 구조라고 함
- 하위 클래스는 상위 클래스의 속성 연산과 관계를 물려 받는다
- 하위 클래스는 고유의 속성 연산과 관계를 추가할 수 있다
- 하위 클래스는 상위클래스로부터 물려받은 연산을 정의 즉 구현을 할 수 있다
- 추상 클래스는 객체를 생성할 수 없는 클래스이다
- 하위 클래스와 상위 클래스는 Is a 가 만족되어야 한다
- 다형성 등의 특징을 바탕으로 시스템의 확장성을 제공하기 위해서는 상속 관계는 반드시 일반화 관계를 준수해야  한다
- 기능적 재정의 : 상위 클래스로부터 물려 받은 연산이 하위 클래스 관점에서는 기능적으로 부적절할 수가 있다
- 비기능적 재정의 : 연산의 기능적인 측면에서는 동일하지만 수행 속도 또는 메모리 사용 등의 측면에서 상이한 구현이 필요한 경우에는 하위 클래스에서 재정의를 할 수 도 있다
- 적절한 계층 구조는 재사용성과 확장성이 높은 객체지향 시스템을 개발하는 데 큰 도움을 줄 수 있다
- 상위 클래스와 하위 클래스 간의 의미적 차이가 적절해야 한다 상위 클래스와 하위 클래스 간에 의미적 차이가 너무 크면 그 상이에 존재하는 개념 대상에 해당되는 클래스들을 추가할 수 있다
- 형제 클래스들은 동등한 수준의 개념을 의미해야 한다형제 클래스들은 개념적으로 동등한 수준이어야 한다. 즉 비교가 가능해야 한다

### Interaction	
- 액터와 유스케이스 간의 연관 관계는 둘 간의 상호작용을
뜻한다
- 하나의 연관관계는 시스템과 액터간의 다양한 상호작용을 표현한다
- 활성화 / 수행결과 통보 / 외부서비스 요청
- 상호작용의 이름:  시퀀스 다이어그램의 좌측 상단에 “sd” 키워드 뒤에 기술된다. 상호작용 이름은 다른 시퀀스 다이어그램 또는 상호작용 개요 다이어그램에서 참조 될 때 참조될 상호작용의 이름으로서 사용된다
- 상호작용은 인자와 반환 인자 를 포함할 수가 있다. 상호작용의 반환 값은 상호작용과 동일한 이름의 생명선을 이용하여 표현할 수가 있다
- 상호작용의 게이트: 상호작용의 외부로부터 수신되는 메시지를 표현할 때 메시지 송신 지점을 표현할 때 사용된다
- Interaction use allows to use (or call) another interaction.
- Large sequence diagrams can be simplified with interaction uses.
- It is also used to reuse common interaction between several other interactions.
### Lifeline	
- named element which represents an individual

### Message	
- named element that defines one specific kind

### Operation	
- 연산은 객체가 제공하는 행동을 표현한다
- 가시성 이름 인자방향 인자이름 1 : 타입 , …, 인자 방향 인자이름 n : 타입 ) : 반환타입
- 연산은 해당되는 전체 객체에 공통적이어야 한다
- 객체를 실체화하지 못하는 클래스 = 추상 (abstract) 클래스
- 연산은 클래스가 제공할 수 있는 단위 기능이 되어야 한다
- 여러 개의 기능을 제공하는 연산은 각 기능 별로 연산을 정의하도록 해야 한다
- 연산 내부의 구현 방법이 연산의 인터페이스 즉 연산의 이름, 인자 , 반환타입으로서 노출되지 않도록 해야 한다
- 가시성 : 클래스 외부로부터의 연산에 대한 접근의 허용 여부 지정
- 이름 : 연산을 구분하기 위한 이름으로서 overloading 이 가능하다 . 즉 인자의 개수와 타입이 다르면 동일한 이름의 연산을 정의하는 것이 허용된다
- 인자방향 : 인자방향은 호출자와 피호출자 간에 인자 값의 전달 방향을 뜻한다 . UML 에서는 in, out, inout 의 세가지 유형을정의하고 있다
- 인자 이름 : 인자 이름은 인자들 중에서 고유한 이름을 가지며 전달되는 값의 의미를 표현하는 용어를 사용하는 것이 바람직하다
- 타입 : 전달되는 인자 값의 타입을 뜻한다 . UML 기본 타입 , 사용자 정의 타입 , 프로그래밍 언어의 타입을 사용할 수가 있다
- 반환타입 : 연산의 수행 후에 반환되는 값의 타입을 지정한다
- 연산의 이름이 연산의 구현 방법을 뜻해서는 안 된다
-연산이 제공하는 기능의 전체를 뜻하는 용어가 연산의 이름으로 사용되어야 한다
- 연산이 제공하는 유일한 기능의 결과를 뜻하는 용어가 연산의 이름으로 사용되어야 한다
- 연산이 정의된 클래스를 수행 주체로 하여 연산의 이름을 결정해야 한다
- 연산의 인자 또는 반환 값으로서 여러 개의 변수가 항상 함께 사용된다면 대응되는 복합 타입을 정의할 수 있다(인자 반환들을 묶는 의미 있는 개념이 존재할 때만)
- 신뢰도 높은 소프트웨어를 개발하기 위해서는 각 연산의 선행 후행 조건을 명확하게 표현하고 이를 프로그램에서 구현하는 것이 바람직하다

### Problem Statement	
- summarize the problem being solved by this project.

### Quality Requirements - 강건성(Robustness)	
- The degree to which a system or component can function correctly in the presence of invalid inputs or stressful environment conditions
- VCS(Video Conferencing Systems)

### Quality Requirements - 성능	
- Response time, Throughput, Capacity, Degradation modes, Resource use

### Quality Requirements - 신뢰성	
- Mean Time Between Failures (MTBF)
- Mean Time To Repair (MTTR)
- Accuracy
- Maximum bugs or defect rate

### Quality Requirements⭐	
- 성능(performance): 시스템의 자원(CPU, 메모리 등)을 얼마나 효율적으로 사용하는가? 즉 사용자 입력에 대하여 얼마나 빠른 시간에 얼마나 적은 자원을 활용해서 결과를 출력할 수 있는가?
- 신뢰성(reliability): 시스템이 주어진 요구사항을 준수하여 동작하는 정도를 뜻한다. 일반적으로 장애 없이 동작하는 시간의 비율로서 정의된다.
- 보안성(security): 허가되지 않은 사용자가 시스템에 접근하거나, 사용자가 접근 권한이 없는 시스템의 정보를 접근하거나 해서는 안된다. 보안성은 이러한 측면에 대한 요구사항을 뜻한다.
- 안전성(safety): 시스템이 주변 환경, 인명, 재산에 피해를 주지 않아야 한다는 요구사항이다.
- 가용성(availability): 사용자가 원하는 순간에 시스템은 서비스를 제공해야 한다는 요구사항이다.

### Requirement Analysis	
- define high-level description of requirements
- overview, boundaries, features

### Requirement Elicitation	
- elicit requirements from the stakeholders on what they would like the system to provide. (목표)
Requirement Specification	
- define detailed and complete description of requirements

### Requirements Type	
- 기능적 요구사항:  소프트웨어에 주어진 입력에 따른 동작 및 출력에 대한 요구사항
- 품질 요구사항: 성능, 보안, 안전성, 가용성 등과 같은 기능적인 요구사항에 대한 제약
- 시스템 제약사항: 외부 인터페이스에 대한 제약,- 법규, 표준 등에 대한 준수 설계, 구현, 설치, 운영 등에 대한 제약

### Requirements가 갖추어야 하는 특성⭐	
- Unambiguous: It has only one interpretation
- Correct: It is one that stakeholder really wants
- Complete: It includes all the requirements
- Consistent: no subset has conflict
- Feasible(구현가능성): It is technically achievable
- Traceable: It traces to its source and implementation

### Sequence Diagram ⭐	
- 객체 사이의 상호작용을 시간 순서로 표현한다.
- describes the interactions between objects in the order of time.

### SLOC	
- Physical: The number of lines including comment lines(가변적)
- Logical: The number of executable statements

### Software Characteristic	- Schedule, Cost, Quality, Management
- Change가 Failure를 야기할 수도…

### Software Definition	
- Software is a set of items or objects that form a “configuration” that includes program, documents(deliverables), data, etc.

### Software Engineering Definition	
- The disciplined application of engineering, scientific, and mathematical principles and methods to the economical production of quality software
- The systematic approach to the development,
operation, maintenance, and retirement of software
- Multi person construction of multi version software.

### Software Engineering Goal	
- 소프트웨어 위기를 극복하기 위해
- quality, cost, time 개발

### Software Engineering 영향 주는 요소	
- Characteristics of Software
- Characteristics of S/W Development Project
- Types of Software
- Software Size
- Production and Acquisition Mode

### Software Size: Millitary	
- System, LOC와 Language

### Software Type	
- System Software
- Engineering and Scientific Software (캐드)
- Business Software (MIS)
- Real Time Software (군사)
- Embedded Software
- Transformational vs. Reactive Systems

### Source code Refactoring 방법	
- Extract superclass
- Extract method
- Extract template method
- Pull up field
Structured Analysis	
- Refine and decompose the system by identifying its
basic functions.

### Summary of Features	
- Summarize the benefits and features the System will provide

### System Element	
- 시스템을 구성하는 요소는 적용되는 개발 방법론에 따라
서 달라질 수 있다
- 구조적 방법론: 모듈(함수, 프로시져)
- 객체지향 방법론: 클래스
- 컴포넌트 기반 방법론: 컴포넌트

### System Interface 기능의 표현	
- 연관관계는 반드시 시스템이 제공하는 기능이어야 한다

### System Position Statement	
- summarize at the highest level, the unique position the System intends to fill in the marketplace.
- communicates the intent of the system and the importance of the project to all concerned stakeholders

### Use case Modeling	
- Use case diagrams used to describe a set of actions (usecases) that a system(subject) should perform with external entities of the system (actors)

### Usecase	
- 시스템이 제공하는 개별적인 기능을 뜻한다
- 사용자가 인지할 수 있는 하나의 기능 단위이다
- 구체적 이어야 한다 실제로 현실에서 발생하는 기능이어야 한다
- 하나의 유스케이스는 다양한 세부 상황 시나리오를 포함한다(1CRUD = 1Usecase)
- 활성화 triggering) 상호작용을 하는 액터가 있어야 한다(Primary actor)
- 모든 활성화 액터에게 동일한 기능을 제공해야 한다
- 유스케이스는 트랜잭션 성격을 가져야 한다
- 명명법: 제공되는 시스템의 기능을 표현하는 구체적이고 명확한 동사구 형태
- 선 후행 관계는 액티비티 다이어그램을 이용해서 표현할 수 있다

### Usecase Diagram	
- 시스템이 제공하는 기능 별로 외부 엔티티와의 관계를 표현하는 다이어그램이다.
- diagram which describes the functionalities of a system by associating with external entities.

### Usecase Model 구조화 방법	
- 액터 일반화: 시스템과 비슷한 방식으로 상호작용을 하는 유사한 액터를 일반화하여 부모 액터를 정의한다, 모든 자식 액터는 부모 액터와 동일한 상호작용을 한다
- 유스케이스 일반화: 유사한 기능을 제공하는 유스케이스들을 일반화하여 부모 유스케이스를 정의한다
- 유스케이스 포함: 여러 유스케이스에 공통적인 시나리오를 별도의 유스케이스로 정의한다, 모듈화를 통하여 재사용
성을 높임, 개발자 관점의 상세한 기능적 분할을 표현하지 않는다
- 유스케이스 확장: 기본 기능에 부가적인 기능을 별도의 유스케이스로 정의한다, 기초 유스케이스의 확장점은 확장이 필요한 시점만을 언급하며 구체적인 확장 기능을 정의하지 않는다, 세부적인 대안 시나리오를 표현하지 않는다
보다 구체적인 용어의 사용	
- 1. 일반화 관계를 활용
- 2. 포함 관계를 활용
- 3. 도메인의 용어 사전을 활용
시나리오	
- 각 스텝의 주어는 시스템 또는 액터로 하여 능동태의 문장으로 기술한다  
- 스텝은 시스템 또는 하나의 액터에 의한 하나의 동작을 기술한다
- 유스케이스와 관련된 모든 액터와의 모든 상호작용을 기술해야 한다
- 각 스텝은 시스템과 액터와의 입 출력이 명확하게 기술되어야 한다
- 명확한 표현과 이해를 위하여 IF, WHILE, FOR 등을 활용할 수 있다
- 시나리오는 명확하고 이해가 용이한 문장 스타일로 기술해야 한다
- 유스케이스 시나리오를 기술할 때는 개발자의 기술적인 용어를 사용하지 않고 도메인의 용어를 사용한다
우선순위	
- 기능의 중요도와 개발의 난이도를 고려함
- 우선 순위는 투입 시간 , 인력 , 개발 순서 결정 시 활용한다
후행 조건	
- 해당 유스케이스의 정상 동작에 대한 최소한의 판단 기준이 될 수 있다
- 후행 조건이 만족되지 않으면 시스템이 비 정상적으로 동작했다고 판단할 수 있다
- 그러나 후행 조건이 충족되었다고 시스템이 정상적으로
동작하였다고 판단할 수는 없다