---
layout: post
title:  "데이터베이스 정리"
author: 1jeongg
categories: [ DB ]
image: assets/images/database.png
tags: featured
---

## 01. Introduction to Databsae

---

### 용어 정리

| 용어 | 설명 |
| --- | --- |
| 데이터베이스 | 기관의 여러 응용 프로그램에서 운영 목적으로 통합되어 저장된 데이터 모음 |
| DBMS | 데이터베이스를 저장하고 관리하기 위해 설계된 소프트웨어 조각. |
| 데이터 모델 | 데이터를 설명하는 개념의 컬렉션 |
| 스키마 | 주어진 데이터 모델을 이용하여 데이터 컬렉션을 설명 |
| 트랜잭션 | DB 액션의 원자적 시퀀 |
| 데이터 무결성 | 전반적인 데이터의 정확성, 완전성, 일관성 |

### 데이터 추상화 단계

---

- `Physical level`: 데이터가 실제로 어떻게 저장되는지
- `Logical level`: 어떤 데이터, 연관관계가 저장되는지
- `View level`: 전체 데이터베이스의 부분

### DB가 많은 사용자에게 제공하는 문제점

---

- `Security`: 유저별로 다른 역할 부여
- `Performance`: 동일한 접근 필요
- `Consistency`:

### DBMS 특징

---

- Transaction
- Data Integrity
- Concurrency & Locking
- 로깅을 통한 Atomicity & Durability
    
    ⇒ Write ahead logging(WAL)을 사용(만약 트랜잭션이 crash되면 Ctrl-Z해서 원자성을 보장해줘야한다)
    

## 02. Relational Model

---

### Data Model

---

> 데이터와 연관관계를 설명하는 개념의 모음
> 
> - Structure, Constraints, Operations 설명

### 1) Structure of the data

---

- 전반적인 데이터베이스의 디자인 (테이블, 속성 이름 등)
- 개념적인 구조 설명 (데이터 타입 등)
- Instance: DB에 있는 데이터 컨텐츠 (value)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/c256e108-fd9a-4c15-9548-7caa838d19b2/0af17c24-baa8-49d5-b9c3-5125bcce0807/Untitled.png)

### 2) Constraints of the data

---

- 데이터가 가질 수 있는 제약 조건 설명 (unique 등)
- 데이터의 완전성 보장(데이터 무결성)
- Keys
    - Superkey: 하나 이상의 속성으로 구성된 집합으로, 관계 내의 튜플을 고유하게 식별할 수 있게
    - Candidate key: 최소 superkey 집합,
    - Primary key: 데이터베이스 디자이너에 의해 Candidate key 중 하나, null 가지면 안됨
    - Foreign key: 연관된 테이블에서 pk 값과 매칭되는 속성 set의 value, null 안

### 3) Operations of the data

---

- 쿼리 언어(SQL 등)
- SQL
    - 정보를 검색, 데이터베이스 바꿈
    - 선언적 언어 ↔ 절차적 언어
    - 엔진: SQL Query → Relation Algebra(RA) Plan → Optimized RA Plan → Execution

### Relational Algebra

---

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/c256e108-fd9a-4c15-9548-7caa838d19b2/0fe75dd3-d545-4711-9bf8-ba50da02186c/Untitled.png)

### * Selection(𝝈)

---

> 조건문에 해당하는 row만 출력하도록 함, 중복 X
> 
> 
> 𝜎d𝑒𝑝𝑡_𝑛𝑎𝑚𝑒="𝑃ℎ𝑦𝑠𝑖𝑐𝑠"(instructor)
> 

### * Projection(𝝅)

---

> 원하는 column만 출력, 중복 X
𝜋𝐼𝐷,𝑛𝑎𝑚𝑒,𝑠𝑎𝑙𝑎𝑟𝑦(instructor)
> 

### * Union(∪)

---

> 합집합
compatible해야 한다(attribute 개수, 타입, 이름, 순서까지도 같아야한다)
> 

### * Set difference(-)

---

> 차집합
⭐non-monotonic⭐ 이다 (A-B에서 B의 크기가 커지면 결과 크기가 작아질 수 있음, 다른 operators과 차별성!)
> 

### * Intersection(∩)

---

> 교집합
> 

### * Cartesian Product(x)

---

> m개의 record와 n개의 record가 만나면 m*n개의 record를 만들어냄
> 

### * Renaming(𝝆)

---

> 𝜌𝑛𝑒𝑤/𝑜𝑙𝑑(𝑅) : attribute의 이름 바꿔줌𝜎𝑖.𝑠𝑎𝑙𝑎𝑟𝑦>𝑤.𝑠𝑎𝑙𝑎𝑟𝑦(𝜌𝑖(instructor)×𝜎𝑤.𝑖𝑑=12121(𝜌𝑤(instructor)))
> 

> 가장 큰 balance 찾기
> 
> 
> 𝜋accNumber(Account)–𝜋Account.accNumber(𝜎Account.balance<d.balance(Account×𝜌𝑑(Account)))
> 

### * Join(⨝)

---

- Natural join: 동일한 attribute 기반 Join, 공통된 attribute(중복) 제거,하나도 겹치는 게 없으면 둘 다 가져옴, projection 처리
- Theta join: Cartesian product + 조건을 만족
- EquiJoin01: 조건문이 `=`임(어떤 걸 기준으로 join할지 명시), 중복 제거

---

- (Inner) join: 같은 애들만 남김
- Outer join: 모든 정보 남김
    - left outer join
    - right outer join
    - full outer join

### Assignment(←)

---

- 임시 변수를 설정해줌
- Physics←𝜎dept_name="Physics"(instructor)

### Division

---

- Division 𝑅/𝑆(or 𝑅÷𝑆)

### 요약

---

- `Difference` : The only non monotone operator
- `Projection`: The only operator that removes columns
- `Cartesian product` : The only operator that concatenates columns
- `Selection` : The only operator that includes a filtering condition
- `Union` : The only operator that concatenates rows

## 03. SQL

---

### Data-Definition Language (DDL)

---

- 관계형 스키마를 정의내림
- 테이블/속성 생성, 수정, 삭제
    - 생성: CREATE TABLE
    - 수정: ALTER TABLE Customer ADD height INTEGER; // column 추가
             ALTER TABLE Customer DROP height; // column 삭제
    - 삭제: DROP TABLE(테이블 삭제), DELETE TABLE(모든 record 삭제)
- Type: int, float, numeric, char, varchar, date, time
- Integrity constraints
    
    ```sql
    primary key (course_id),
    foreign key (dept_name) references department (dept_name)
    on delete set null
    ```
    

### Data-Manipulation Language (DML)

---

- 튜블 삽입
    
    ```sql
    insert into course 
    values ('CS-437', 'Database Systems', 'Comp. Sci.', 4);
    ```
    
- 삭제
    
    ```sql
    delete from instructor where dept_name= 'Finance';
    ```
    
- 수정
    
    ```sql
    update instructor set salary = salary * 1.05
    where salary < 70000;
    ```
    

### SFW query

---

> Select <columns> From <table name> Where <conditions>
> 

### ▪ Useful operators

---

`1️⃣ Distinct`

> query 결과로부터 중복을 제거해줌
> 
> 
> ```sql
> select distinct school from students
> ```
> 

`2️⃣ ORDER BY`

> 정렬해줌
> 
> 
> ```sql
> SELECT name, gpa, age FROM Students
> WHERE school = ‘PNU' ORDER BY gpa DESC, age ASC
> ```
> 

`3️⃣ LIKE`

> 패턴 매칭해줌
> 
> - %: 아무 char 0개 이상
> - _: 아무 char 1개
> 
> ```sql
> SELECT * FROM Students WHERE name LIKE 'Sm_t%'
> ```
> 

### Null

---

- null 수식 계산 → null
- null 비교 → UNKNOWN
- FALSE = 0, UNKNOWN = 0.5, TRUE = 1
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/c256e108-fd9a-4c15-9548-7caa838d19b2/49d76bf1-b29d-434c-a895-3dfef728c4fc/Untitled.png)
    

### Aggregate functions

---

- `COUNT`, `SUM`, `AVG`, `MAX`, `MIN`
- `GROUP BY`
    - column 몇 개에 값을 그룹지음
    
    ```sql
    select agg(column) // 4 (순서)
    from <table name>  // 1
    where <conditions> // 2
    group by <columns>;// 3
    
    select avg(gpa) from student group by gender;
    ```
    
- `HAVING`
    - GROUP BY에 있는 column의 조건을 포함한다
    
    ```sql
    select avg(gpa), gender from student
    where gpa > 2.5 group by gender having count(*) > 10
    ```
    

## 04. Intermediate SQL

---

### Queries on Multiple Tables

---

| 다중 테이블 | - 데이터 업데이트가 쉬움
- 개별 테이블 쿼리 날리는 게 빠름 |
| --- | --- |
| 단일 테이블 | - 데이터 교환(공유) 쉬워짐
- 다중 테이블을 join하는 cost 줄어듦 |

```sql
SELECT name FROM Students, Enrolled WHERE sid = student_id
```

### Cartesian Product

---

```sql
select name, building from student cross join department;
SELECT name FROM Students JOIN Enrolled ON sid = student_id;
SELECT S.name FROM Students S, Enrolled E WHERE S.sid = E.student_id;
```

### Join

---

- `inner join`
    
    ```sql
    select * from student join takes on student.id = takes.id;
    ```
    
- `outer join`
    - full outer join / left outer join / right outer join
- `union`
    
    ```sql
    SELECT name FROM Students, Enrolled
    WHERE sid = student_id AND cid = 354
    UNION
    SELECT name FROM Students, Enrolled
    WHERE sid = student_id AND cid = 454
    ```
    
- `intersect`
    
    ```sql
    SELECT name FROM Students, Enrolled
    WHERE sid = student_id AND cid = 354
    INTERSECT
    SELECT name FROM Students, Enrolled
    WHERE sid = student_id AND cid = 454
    ```
    
- UNION ALL, INTERSECT ALL, EXCEPT ALL은 중복을 허용한다

### Subquery - Where

---

- 다른 query로 nested되어있는 SFW 표현식
- Scalar subquery: 단일 constant 를 반환함 (>, <, = 등)
    
    ```sql
    SELECT C1.customerID FROM Customer C1
    WHERE C1.income > (SELECT avg(C2.income) FROM Customer C2)
    ```
    
- Set membership
    - `IN`, `NOT IN`, `EXIST`, `NOT EXISTS`
        
        ```sql
        SELECT C.firstName, C.lastName FROM Customer C
        WHERE C.customerID IN (
        		SELECT O.customerID	FROM Account A, Owns O
        		WHERE A.accNumber = O.accNumber
        		AND A.branchName = 'Burnaby')
        ```
        
- Set comparison: `ANY`, `ALL` 값들에 대한 비교
    
    

```sql
select distinct T.name
from instructor as T, instructor as S
where T.salary > S.salary
and S.dept_name = 'Biology';
```

```sql
select name
from instructor
where salary > some
(select salary
from instructor
where dept_name = 'Biology');
```

- Test for empty relations: `EXISTS`, `NOT EXISTS`

```sql
SELECT C.firstName, C.lastName
FROM Customer C, Account A, Owns O
WHERE C.customerID = O.customerID
AND A.accNumber = O.accNumber
AND A.branchName = ’Burnaby’
```

```sql
SELECT C.firstName, C.lastName
FROM Customer C
WHERE EXISTS ( SELECT *
FROM Account A, Owns O
WHERE C.customerID = O.customerID
AND A.accNumber = O.accNumber
AND A.branchName = ’Burnaby’)
```

- Test for absence of duplicate tuples: `UNIQUE`
    
    ```sql
    select T.course_id from course as T
    where unique (
    	select R.course_id from section as R
    	where T.course_id=R.course_id and R.year=2017);
    ```
    

### Subquery - Select

---

> scalar 서브쿼리는 select절에서 사용될 수 있다.
> 

```sql
select dept_name,
(select count (*) from instructor
where department.dept_name=instructor.dept_name)
as num_instructors from department;
```

### Subquery - From

---

> 서브쿼리의 relation 결과는 from 절에서 사용될 수 있다.
> 

```sql
SELECT firstName, lastName, sumBalance
FROM (SELECT firstName, lastName, sum(balance) AS sumBalance
FROM Customer C, Account A, Owns O
WHERE C.customerID = O.customerID
AND O.accNumber = A.accNumber
GROUP BY C.customerID) AS T
WHERE T. sumBalance = 0
```

```sql
SELECT firstName, lastName, sum(balance) AS sumBalance
FROM Customer C, Account A, Owns O
WHERE C.customerID = O.customerID AND O.accNumber = A.accNumber
GROUP BY C.customerID
HAVING sumBalance = 0
```

- With 절

```sql
select department.dept_name
from department,
(select max(budget) as value
from department)
as max_budget
where department.budget = max_budget.value;
```

```sql
with max_budget (value) as
(select max(budget)
from department)
select department.dept_name
from department, max_budget
where department.budget = max_budget.value;
```

### Subquery - DML

---

- Delete from … where …
    
    ```sql
    delete from instructor
    where salary < (select avg (salary) from instructor);
    ```
    
- insert into A Relation (from subquery)
    
    ```sql
    insert into instructor
    select id, name, dept_name, 38000 from student 
    where dept_name='Finance' and tot_cred > 100;
    ```
    
- update
    
    ```sql
    update instructor set salary = salary * 1.05
    where salary < (select avg (salary) from instructor);
    ```
    

### Correlated Subquery

---

> inner 쿼리가 outer 쿼리에서 제공되는 값에 의존함
> 

```sql
SELECT ename, sal, deptno FROM emp E
WHERE sal > (SELECT AVG(sal) FROM emp WHERE deptno = E.deptno);
```

- 어떠한 employee도 없는 department 리스트를 구해라

```sql
SELECT D1.deptno, D1.dname
FROM dept D1
EXCEPT
SELECT D2.deptno, D2.dname
FROM dept D2, emp E2
WHERE D2.deptno = E2.deptno
ORDER BY D1.deptno;
```

```sql
SELECT D.deptno, D.dname
FROM dept D
WHERE NOT EXISTS
(SELECT *
FROM emp E
WHERE E.deptno = D.deptno)
ORDER BY D.deptno;
```

### Quantifier

---

> 양의 비교
> 

```sql
SELECT DISTINCT Company.cname FROM Company
WHERE Company.name NOT IN
(SELECT Product.company FROM Product.price >= 100)
```

### Views

---

- 모든 유저가 모든 relation을 봐야할 필요가 없을 때 유저에게 필요한 몇 개의 data만 들고 있는 가상의 relation을 만듦 (보안 목적)

```sql
create view V as <query expression>
create view faculty as select id, name, dept_name from instructor;
```

### Integrity Constraints

---

- 단일 관계에서
    - not null, primary key, unique, check (p)
        
        ```sql
        CREATE TABLE employees (
        	id INT,
        	first_name VARCHAR (50),
        	last_name VARCHAR (50),
        	birth_date DATE not null,
        	joined_date DATE CHECK (joined_date > birth_date),
        	salary numeric CHECK (salary > 0),
        	PRIMARY key(id),
        	CHECK (birth_date > '1900-01-01'),
        	UNIQUE (first_name, last_name)
        );
        ```
        
- 다중 관계에서
    - foreign keys
        
        ```sql
        foreign key (dept_name) references department (dept_name)
        ```