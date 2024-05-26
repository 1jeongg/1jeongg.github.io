---
layout: post
title:  "LazyColumn 아이템의 순서 변경하기"
author: 1jeongg
categories: [ 안드로이드, Jetpack-Compose ]
summary: 외부 라이브러리를 이용하여 구독목록의 순서를 변경하는 방법입니다.
tags: 
---

PPAP(부산대 공지사항 알림 서비스)를 개발하던 중 사용자 건의사항으로 다음과 같은 내용이 들어왔다!

![건의 사항]({{site.baseurl}}/assets/images/reorder1.png)

순서 변경을 위해서 어떻게 하면 좋을까? 직접 y 축 좌표를 계산해서 item을 이동하는 방법도 생각해봤지만, 생각보다 쉽지 않았다.

따라서 누군가가 만들어둔 좋은 [라이브러리](https://github.com/aclassen/ComposeReorderable)를 사용하기로 했다.



## 구현 방법

### 1. 디펜던시 추가

```gradle
dependencies {
    implementation("org.burnoutcrew.composereorderable:reorderable:<latest_version>")
}
```

### 2. LazyColumn List에 Reorder 내용 추가

먼저 메인인 `SubscribeScreen` 함수를 작성한다.

Reorder와 관련된 state와 drag시 일어날 동작들을 작성한다.

```kotlin

@Composable
fun SubscribeScreen() {
    // 변경 가능 여부 (순서 변경 버튼 누르면 true 이후 완료 누르면 false)
    val isChangingOrder = remember { mutableStateOf(false) }

    // reorder 리스트의 state 저장
    // onMove 는 움직일 경우 동작
    // canDragOver는 아이템을 움직일 수 있는지 여부
    val state = rememberReorderableLazyListState(
        onMove = { from, to -> viewModel.moveItem(from, to) },
        canDragOver = { from, to -> viewModel.isDraggable(from, to) && isChangingOrder.value }
    )

    // 순서 변경 가능한 상태일 때만 누름 감지
    val modifier = if (isChangingOrder.value) Modifier.detectReorderAfterLongPress(state) else Modifier

    LazyColumn(
        state = state.listState,
        modifier = modifier.fillMaxSize().reorderable(state) // 중요
    ) {
        item { SubscribeTitle() }
        item { SubscribeListTitle(isChangingOrder) }
        items(viewModel.customSubscribes.value, {it.subscribeId} ) { subscribe ->
            // 구독 아이템 한 개  (ReorderItem 함수 이용)
            SubscribeReorderItem(
                state = state,
                subscribe = subscribe,
                isChangingOrder = isChangingOrder.value,
                ...
            )
        }
        item { SubscribeAddButton() }
    }
}

```

다음으로 아이템 하나를 담고 있는 `SubscribeReorderItem` 함수이다.

이동중인 아이템을 구별하기 위해서 shadow를 16.dp 만큼 추가해주었다.

```kotlin
@Composable
private fun SubscribeReorderItem(
    state: ReorderableLazyListState,
    subscribe: SubscribeGetResponseDTO,
    isChangingOrder: Boolean,
    ...
) {
    ReorderableItem(
        state = state,
        key = subscribe.subscribeId,
    ) { isDragging ->
        val elevation = animateDpAsState(if (isDragging) 16.dp else 0.dp, label = "")
        SubscribeItem(
            subscribe = subscribe,
            isChangingOrder = isChangingOrder,
            elevation = elevation.value,
            ...
        )
    }
}
```

뷰모델에서의 동작은 Item을 이동할 때, 순서를 어떻게 변경해주어야 하는지와 이동 가능 여부에 관한 로직을 담당한다.

```kotlin

fun moveItem(from: ItemPosition?, to: ItemPosition?) {
    val (fromIndex, toIndex) = getItemIndex(from, to)
    _customSubscribes.value = _customSubscribes.value.toMutableList().apply {
        if (isValidIndex(fromIndex, toIndex))
            add(toIndex, removeAt(fromIndex))
    }
}
fun isDraggable(from: ItemPosition?, to: ItemPosition?): Boolean {
    val (fromIndex, toIndex) = getItemIndex(from, to)
    return isValidIndex(fromIndex, toIndex)
}
private fun getItemIndex(from: ItemPosition?, to: ItemPosition?): Pair<Int, Int> {
    val fromIndex = from?.index.let { it?.minus(2) } ?: -1
    val toIndex = to?.index.let { it?.minus(2) } ?: -1
    return Pair(fromIndex, toIndex)
}
private fun isValidIndex(from: Int, to: Int): Boolean {
    val range = 0 until _customSubscribes.value.size
    return from in range && to in range
}

```

## 주의 사항

> 해당 라이브러리에서 ItemPosition은 LazyColumn에서의 index를 의미한다.
>
> 따라서 변경해야하는 아이템 이외의 Title이나 Button은 움직이면 안되도록 설정해줘야 한다.

나는 이러한 문제를 해결하기 위해서
- `state` 의 `canDragOver`를 따로 설정했다.

    ```kotlin
    canDragOver = { from, to -> isDraggable(from, to) && isChangingOrder.value }
    ```
- 변경해야하는 아이템의 index를 구할 때 2를 빼주었다. (Title과 SubTitle 내용이 최상단에 있기 때문)
    ```kotlin
    val fromIndex = from?.index.let { it?.minus(2) } ?: -1
    ```

## 결과

아이템을 꾹 누르면 다음과 같이 이동 가능하다.

![결과 이미지]({{site.baseurl}}/assets/images/reorder2.gif)