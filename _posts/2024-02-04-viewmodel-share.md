---
layout: post
title:  "다중 Screen에서 ViewModel을 이용한 데이터 공유"
author: 1jeongg
categories: [ 안드로이드 ]
summary: 여러 Screen에서 동일한 데이터가 필요할 때 두 번의 query 조회 필요 없이 데이터 공유를 통해 받아오기
tags: 
---

> 구독 추가를 위해 단과 대학 > 헉과 > 게시판 리스트 이런 식으로 depth를 타고 데이터를 조회해야 하는 상황이었다.
> 
> API는 다음과 같이 나왔기 때문에 단과 대학과 학과 데이터를 공통으로 관리해야 됐다.
> 
> ![API 구성]({{site.baseurl}}/assets/images/viewmodel-share2.png)
>
> 처음엔 하나의 스크린을 두고 데이터만 바꿀까.. 했는데 그럴 경우 뒤로가기 했을 때 이상한 상황이 벌어지기에 단과 대학, 학과, 게시판 리스트별로 Screen을 만들기로 했다.

구현 방법은 단과대학, 학과를 관리하는 스크린에서 동일한 ViewModel을 공유하여 데이터를 조회하고 게시판 리스트 스크린으로 넘어갈 때 title과 univId를 navArgument를 통해 전달해주기로 했다.

## 개발

### 01. 단과대학, 학과 데이터를 가진 ViewModel 생성

다음과 같은 데이터를 관리한다.

- selected(UnivListDTO): 현재 선택된 단과 대학 데이터
- univList(List<UnivListDTO>): 단과 대학 리스트

01-1 단과 대학,학과 데이터를 관리하는 ViewModel

실제 코드에서 꼭 필요한 부분만 가져옴
```kotlin
@HiltViewModel
class UnivViewModel @Inject constructor(
    private val getUnivListUseCase: GetUnivList
): ViewModel() {

    private val _selected = mutableStateOf(UnivListDTO())
    val selected = _selected

    private val _univList = mutableStateOf<List<UnivListDTO>>(emptyList())
    val univList = _univList

    init {
        getUnivList()
    }

    fun selectSubscribe(index: Int){
        _selected.value = _univList.value[index]
    }

    private fun getUnivList() {
        viewModelScope.launch{
            getUnivListUseCase().collect { response ->
                if (response is Resource.Success){
                    _univList.value = response.data ?: emptyList()
                }
            }
        }
    }
}
```

### 02. NavGraphBuilder에서 해당 viewModel을 공유하도록 설정

현재 BackStackEntry, 즉 이전에 사용자가 다녀간 Screen 정보를 저장해둬서 Screen이 바뀌어도 hiltViewModel의 내용이 초기화되지 않도록 설정하였다.

자세한 설명은 [해당 영상](https://www.youtube.com/watch?v=h61Wqy3qcKg) 참고

```kotlin
@Composable
inline fun <reified T: ViewModel> NavBackStackEntry.sharedViewModel(
    navController: NavController
): T {
    val navGraphRoute = destination.parent?.route ?: return hiltViewModel()
    val parentEntry = remember(this){
        navController.getBackStackEntry(navGraphRoute)
    }
    return hiltViewModel(parentEntry)
}
```

```kotlin
composable(
    route = Screen.UnivListScreen.route,
    content = { entry ->
        val viewModel = entry.sharedViewModel<UnivViewModel>(navController)
        UnivListScreen(navController, viewModel)
    }
)
composable(
    route = Screen.DepartmentListScreen.route,
    content = {entry ->
        val viewModel = entry.sharedViewModel<UnivViewModel>(navController)
        DepartmentListScreen(navController, viewModel)
    }
)
```

이제 단과 대학과 학과 정보는 모두 잘 선택했다. 이제 다음 게시판을 선택하는 스크린으로 넘어가자

### 03. navArgument를 이용한 Screen 사이 데이터 전달

학과 리스트에서 게시판 리스트로 이동할 때 제목과 univId를 넘겨주어야 한다.

이것도 NavGraphBuilder 내에서 navArgument를 통해 제어할 수 있다.

03-1. NavGraphBuilder 내 처리
```kotlin
composable(
    route = Screen.NoticeBoardListScreen.route + "?univId={univId}&title={title}",
    arguments = listOf(
        navArgument("univId"){
            type = NavType.LongType
            defaultValue = -1L
        },
        navArgument("title"){
            type = NavType.StringType
            defaultValue = "전체"
        }
    ),
    content = { NoticeBoardListScreen(navController) }
)
```

03-2. 다른 스크린에서 호출
```kotlin
val title = "전체 / ${selected.univ} / ${department.name}"
val route = Screen.NoticeBoardListScreen.route + "?univId=${department.univId}&title=$title"
navController.navigate(route)
```

03-3. ViewModel에서 사용

```kotlin
@HiltViewModel
class NoticeBoardViewModel @Inject constructor(
    private val savedStateHandle: SavedStateHandle
): ViewModel() {

    val title = mutableStateOf("")
    private val univId = mutableLongStateOf(-1L)

    init {
        savedStateHandle.get<Long>("univId")?.let{
            univId.longValue = it
        }
        savedStateHandle.get<String>("title")?.let{
            title.value = it
        }
    }
}
```

지금 서버가 꺼져있어서.. 전체 스크린을 보여주질 못하네요 ㅠㅠ