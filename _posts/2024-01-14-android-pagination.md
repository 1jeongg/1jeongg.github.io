---
layout: post
title:  "안드로이드 무한 스크롤 구현"
author: 1jeongg
categories: [ 안드로이드 ]
summary: Jetpack Compose에서 Paging3를 이용하여 무한 스크롤을 구현한 방법과 겪었던 에러 상황을 해결한 방법을 작성하였습니다.
tags: 
---

## 무한 스크롤
우리가 흔히 사용하는 게시판 애플리케이션 (에브리타임, 유튜브, 인스타그램 등)을 떠올려보자. 어느 정도 스크롤을 내리면 로딩 애니메이션이 뜨면서 새로 게시글을 여러 개 불러오는 경우를 볼 수 있을 것이다.
해당 방식을 무한 스크롤이라고 한다. 무한 스크롤을 사용하게 되면 사용자 참여 및 콘텐츠 탐색이 쉽고 사용자 경험 측면에서 장점이 있지만 페이지 성능이 느려지고 특정 항목 검색이 어려워지는 등의 단점이 존재한다.
이와 유사한 방식으로 페이지네이션이 있는데 이는 웹사이트(구글 등)에서 자주 사용되며 1,2,3,4 등 페이지를 주고 이를 클릭하는 방식을 말한다.
모바일에선 페이지네이션 방식이 불편하기에 대부분 무한 스크롤 방식을 사용하여 구현하는 편이다.
서버에서는 무한 스크롤이든, 페이지네이션이든 `url?page=0` 이런 식으로 url을 주고 이를 클라이언트에서 어떻게 처리하냐에 따라 달라진다.
이번엔 Paging3 라이브러리를 사용하여 무한 스크롤을 구현한 방법을 알아보겠다.

### 페이징 라이브러리
페이징 라이브러리는 로컬 저장소나 네트워크를 통해 대규모 데이터 세트의 데이터 페이지를 로드하고 표시할 수 있다. 이 방식을 사용하면 앱에서 네트워크 대역폭과 시스템 리소스를 더욱 효율적으로 사용할 수 있다.

### 페이징 라이브러리 이점
- Paging된 데이터의 메모리 내 캐싱 -> 앱이 Paging 데이터로 작업하는 동안 시스템 리소스를 효율적으로 사용 가능
- 요청 중복 삭제 기능이 기본 제공되므로 앱에서 네트워크 대역폭과 시스템 리소스를 효율적으로 사용 가능
- 사용자가 로드된 데이터의 끝까지 스크롤할 때 구성 가능한 RecyclerView 어댑터가 자동으로 데이터 요청
- Kotlin 코루틴 및 플로뿐만 아니라 LiveData 및 RxJava를 최고 수준으로 지원
- 새로고침 및 재시도 기능을 포함하여 오류 처리를 기본으로 지원

## 구현 방법
### 1. PagingSource 구현하기
PagingSource에서는 두 가지 함수 `load()` 와 `getRefreshKey()`를 구현해야 한다.

```kotlin
class ScrapPagingSource(
    private val scrapRepository: ScrapRepository,
    private val subscribeId: Long?
): PagingSource<Int, ScrapDTO>() {

    override fun getRefreshKey(state: PagingState<Int, ScrapDTO>): Int? {
        return state.anchorPosition?.let { anchorPosition ->
            val anchorPage = state.closestPageToPosition(anchorPosition)
            anchorPage?.prevKey?.plus(1) ?: anchorPage?.nextKey?.minus(1)
        }
    }

    override suspend fun load(params: LoadParams<Int>): LoadResult<Int, ScrapDTO> {
        return try {
            val page = params.key ?: STARTING_PAGE_INDEX
            val response = scrapRepository.getScrapList(subscribeId, page)
            val body = response.body<ApiUtils.ApiResult<ScrapListDTO>>()
            val contents = body.response?.scraps ?: emptyList()
            val errorMessage = body.error?.message ?: "스크랩 리스트를 불러오는데 실패하였습니다."

            if (response.status == HttpStatusCode.OK && body.success) {
                LoadResult.Page(
                    data = contents,
                    prevKey = if (page == STARTING_PAGE_INDEX) null else page - 1,
                    nextKey = if (contents.isEmpty()) null else page + 1
                )
            }
            else LoadResult.Error(Exception(errorMessage))
        } catch (exception: Exception) {
            LoadResult.Error(exception)
        }
    }
}
```

> `load()` 함수
> 
> 사용자가 스크롤할 때 표시할 더 많은 데이터를 비동기식으로 가져오기 위해 Paging 라이브러리에서 load() 함수를 호출한다. LoadParams 객체에는 다음 항목을 포함하여 로드 작업과 관련된 정보가 저장된다.
> 
> ---
> 로드할 페이지의 키: load()가 처음 호출되는 경우 LoadParams.key는 null이다. 여기서는 초기 페이지 키를 정의해야 한다. code smell을 줄이기 위해서 constant value인 시작 페이지 인덱스(0)은 따로 빼서 관리하였다. 
> 
> 로드 크기: 로드 요청된 항목의 수
> 
> 반환 값: LoadResult.Page(성공 시), LoadResult.Error(오류), LoadResult.Invalid(무효화 필요)
> 
> 이때 LoadResult.Page의 parameter엔 data(내용), prevkey(이전 페이지 키), nextKey(다음 페이지 키) 를 설정해주어야 한다.

> `getRefreshKey()` 함수
> 
> Paging 라이브러리가 UI 관련 항목을 새로고침해야 할 때 호출됨
> 
> 새 PagingSource에서 로드할 때는 사용자가 새로고침 후 목록에서 현재 위치를 잃지 않도록 새 PagingSource가 로드를 시작해야 하는 키를 제공하기 위해 `getRefreshKey()`가 호출됨
> 
> ---
> 위에서는 `PagingState.anchorPosition`을 사용했다.새로고침할 때는 anchorPosition에 가장 가까운 키를 가져와 로드 키로 사용한다. 이렇게 하면 새 PagingSource에서 로드를 다시 시작할 때 가져온 항목 집합에 이미 로드된 항목이 포함되므로 원활하고 일관된 사용자 환경이 보장된다.

### 2. GetScrapListUseCase 구현하기
```kotlin
class GetScrapList @Inject constructor(
    private val scrapRepository: ScrapRepository
){
    operator fun invoke(subscribeId: Long?): Flow<PagingData<ScrapDTO>> {
        return Pager(
            config = PagingConfig(enablePlaceholders = false, pageSize = HttpRoutes.PER_PAGE_SIZE, prefetchDistance = 3),
            pagingSourceFactory = { ScrapPagingSource(scrapRepository, subscribeId) }
        ).flow
    }
}
```
PagingData룰 구성하기 위해서 Pager 클래서의 여러 빌더 메서드 중 하나를 사용해야 한다.
- Kotlin Flow - Pager.flow 사용
- LiveData - Pager.liveData 사용
- RxJava Flowable - Pager.flowable 사용
- RxJava Observable - Pager.observable 사용
현재 안드로이드에서 밀고 있는 건 Kotlin Flow이기도 하고 비동기적 처리에도 유용하기 때문에 첫 번째 방법을 사용하였다.

PagingConfig 클래스에선 콘텐츠를 로드하는 방법에 관한 옵션을 설정한다. `pageSize`에서 각 페이지에 로드해야 하는 항목 수를 가리키는 페이지 크기를 정의한다. 나는 10으로 설정하였다. `prefetchDistance` 에선 몇 개의 항목이 남았을 때 새로 데이터를 가져올지 결정한다. `enablePlaceholders`는 true일 경우 아직 로드되지 않은 콘텐츠의 표시자로 null 항목을 반환하여 어댑터에 자리표시자 뷰를 표시할 수 있다, false로 하면 자리표시자를 중지한다.

### 3. ViewModel에서 PagingData 요청 및 캐싱
```kotlin
fun getScrapList(subscribeId: Long?) {
    contents = getScrapListUseCase(subscribeId).cachedIn(viewModelScope)
}
```
cachedIn 함수를 사용하여 캐싱한다.

### 4. UI에서 LazyColumn을 사용하여 해당 내용 불러오기
```kotlin
val contents = viewModel.contents.collectAsLazyPagingItems()
LazyColumn {
    items(
        count = contents.itemCount,
        key = contents.itemKey { it.contentId }
    ){ index ->
        val items = contents[index]
        NoticeItem(
            title = items?.contentTitle ?: "",
            date = items?.pubDate?.date.toString(),
            isBookmarked = items?.isScrap?: false,
            link = items?.link ?: "",
            onScrap = {viewModel.scrapEvent(it, items?.contentId ?: 0) }
        )
    }
}
```

## 에러
페이지네이션을 사용하여 게시글 목록을 조회하던 중 처음 게시글을 불러오면 page=0, page=1 이런식으로 두 개의 페이지를 가져왔다.
화면 안에 보이는 목록은 5개? 정도 밖에 안 되는데 예상치 못한 쿼리가 나가는게 이상하다고 생각했다.

```kotlin
Pager(
    config = PagingConfig(
        enablePlaceholders = false, 
        pageSize = HttpRoutes.PER_PAGE_SIZE, 
        prefetchDistance = 3
    ),
    pagingSourceFactory = { ScrapPagingSource(scrapRepository, subscribeId) }
).flow
```

Pager 를 생성할 때 `prefetchDistance`라는게 있다. 이는 얼만큼 항목이 남았으면 새로 페이지를 불러올지 결정하는 건데 default가 pageSize와 동일하기에 이전과 같은 결과가 발생한 것이었다. 그래서 prefetchDistance를 3으로 지정해주니 해결되었다. 굳

## 느낀 점
이전 프로젝트를 할 때 서버에서 페이지네이션, 무한 스크롤 그 어느 것도 구현하지 않고 모든 데이터를 한 번에 내려준 적이 있었다. 이때 데이터의 양이 크게 많지 않았음에도 (100개 이하) 데이터를 불러오는데 시간이 걸리고 데이터가 늘어날수록 더욱 느려지는 걸 경험할 수 있었다. 이때 페이지네이션을 사용하는게 중요하다고 생각했는데 이번 프로젝트를 통해서 이를 구현할 수 있어서 좋았다. 다음엔 Spring으로 Pagination을 구현하는 방법을 블로그로 작성해봐야겠다.

## 참고
- [무한 스크롤 vs 페이지네이션](https://slowalk.com/2596)
- [Android Paging Codelab](https://developer.android.com/codelabs/android-paging-basics?hl=ko#8)
