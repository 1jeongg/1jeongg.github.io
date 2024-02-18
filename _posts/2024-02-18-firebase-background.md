---
layout: post
title:  "FCM 설정 방법 및 클릭 시 url 열기"
author: 1jeongg
categories: [ Android, Kotlin ]
summary: "FCM(Firebase Cloud Messaging)을 적용하는 방법과 백그라운드에서 작업 표시줄에 뜬 알림 메시지를 클릭하면 url을 클릭하도록 하는 내용을 담았습니다."
tags: 
---

PPAP 앱을 만들면서 공지사항이 새로 등록되면 서버에서 푸시 알림을 전송해줘야하기에 FCM을 도입하기로 했다.

## FCM이란?
> Firebase Cloud Messaging
> 
> - 메시지를 안정적으로 무료 전송할 수 있는 크로스 플랫폼 메시징 솔루션
> - 알림 메시지 또는 데이터 메시지 전송

## 01. 프로젝트 등록
### 1-1. 파이어베이스 프로젝트 생성

[참고자료](https://firebase.google.com/docs/android/setup?hl=ko&_gl=1*1pnzfl1*_up*MQ..*_ga*MTUzOTQxMzAwNC4xNzA4MjUzOTc1*_ga_CW55HF8NVT*MTcwODI1Mzk3NC4xLjAuMTcwODI1Mzk3NC4wLjAuMA..)

[콘솔](https://console.firebase.google.com/)에 들어가서 Add Project 클릭, 기타 정보 입력

### 1-2. FCM 설정

왼쪽창의 `Engage > Messaging` 클릭해서 Android 버튼 클릭

![FCM]({{site.baseurl}}/assets/images/firebase1.png)

### 1-3. Firebase SDK 설정
📂 `<project>/build.gradle.kts`
```kotlin
id("com.google.gms.google-services") version "4.4.1" apply false
```
📂 `<project>/<app-module>/build.gradle.kts)`
```kotlin
plugins {
  id("com.android.application")
  id("com.google.gms.google-services")
  ...
}

dependencies {
  implementation(platform("com.google.firebase:firebase-bom:32.7.2"))
  implementation("com.google.firebase:firebase-analytics")
  implementation("com.google.firebase:firebase-messaging-ktx")
}
```


## 02. Android에서 Firebase 클라우드 메시징 클라이언트 앱 설정
### 2-1. 매니페스트 설정

`AndroidManifest.xml` 파일에 FirebaseMessagingService를 확장하는 서비스를 추가한다. 

```xml
<!-- android:name엔 FirebaseMessage를 관리하는 class의 위치를 넣어줘야함 -->
<service android:name=".data.fcm.FirebaseMessageService" 
    android:enabled="true"
    android:exported="false">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT"/>
    </intent-filter>
</service>
<meta-data
    android:name="com.google.firebase.messaging.default_notification_icon"
    android:resource="@drawable/icon" />
```

### 2-2. Android 13 이상에서 런타임 알림 권한 요청

Android 13 부터는 알림 권한을 받기 위해서는 반드시 사용자에게 물어봐야 한다.

```kotlin
// MainActivtiy.kt에 작성
private val requestPermissionLauncher = registerForActivityResult(
    ActivityResultContracts.RequestPermission(),
) { isGranted: Boolean ->
    if (!isGranted) {
        // 알림을 받을 수 없다고 사용자에게 알려줘야함
    }
}

private fun askNotificationPermission() {
    // API 레벨이 33 이상인 경우에만 가능
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) ==
            PackageManager.PERMISSION_GRANTED
        ) {
            // 알림 받기 가능
        } else if (shouldShowRequestPermissionRationale(Manifest.permission.POST_NOTIFICATIONS)) {
            // 일반적으로 앱에서 알림을 게시하도록 권한을 부여하면 사용 설정되는 기능을 사용자에게 설명하는 UI를 표시해야 합니다. 이 UI는 확인 및 아니요 버튼과 같이 사용자가 동의하거나 거부할 수 있는 옵션을 제공해야 합니다. 사용자가 확인을 선택하면 권한을 직접 요청합니다. 사용자가 아니요를 선택하면 알림 없이 계속 진행할 수 있도록 합니다.
        } else {
            // 알림 받을 겆ㄴ지 물어봄
            requestPermissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
        }
    }
}
```

나는 Composable 함수 내에서 해당 함수를 호출하기 위해 아래와 같이 작성하였다.

```kotlin
fun checkAndRequestLocationPermissions(
    context: Context,
    launcher: ManagedActivityResultLauncher<String, Boolean>
) {
    if (ContextCompat.checkSelfPermission(
            context,
            Manifest.permission.POST_NOTIFICATIONS
        ) != PackageManager.PERMISSION_GRANTED
    ) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            launcher.launch(Manifest.permission.POST_NOTIFICATIONS)
        }
        else {
            Toast.makeText(context, "설정에서 알림을 활성화시켜주세요.", Toast.LENGTH_SHORT).show()
        }
    }
}

@Composable
fun testComposable(){
    val context = LocalContext.current
    val launcher = rememberLauncherForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { isGranted ->
        if (!isGranted) {
            Toast.makeText(context, "알림이 비활성화되어 알림을 받을 수 없어요.", Toast.LENGTH_SHORT).show()
        }
    }
    Button(
        text = "알림 설정",
        onClick = { checkAndRequestLocationPermissions(context, launcher) }
    )
}

```


## 3. 메시지 수신

### 3-1. 메시지 수신

Firebase 알림의 동작은 수신하는 앱의 포그라운드/백그라운드 상태에 따라 달라진다.

메시지를 수신하려면 `FirebaseMessagingService`를 확장하는 서비스를 사용한다.  서비스에서 onMessageReceived 및 onDeletedMessages 콜백을 재정의해야 한다. 특히나 onMessageReceived는 다음 경우를 제외하고 대부분의 메시지 유형에 제공된다.

- 앱이 백그라운드에서 실행되고 있을 때 전송된 알림 메시지: 이 경우 알림이 기기의 작업 표시줄로 전송됩니다. 사용자가 알림을 탭하면 기본적으로 앱 런처가 열립니다.

- 알림과 데이터 페이로드가 둘 다 포함된 메시지(백그라운드에서 수신된 경우): 이 경우 알림은 기기의 작업 표시줄로 전송되고 데이터 페이로드는 런처 활동의 인텐트 부가 정보로 전송됩니다.

> 여기서 중요한 점은 `FirebaseMessagingService`의 내용은 포그라운드 상에서만 동작하고  백그라운드에서 수신된 경우 따로 설정해줘야 한다는 것이다.

| 앱 상태	| 알림 |	데이터 |	모두 |
|---|---|---|---|
|포그라운드|	onMessageReceived	|onMessageReceived|	onMessageReceived|
|백그라운드	|작업 표시줄|	onMessageReceived	|알림: 작업 표시줄, 데이터: 인텐트 부가 정보|

따라서 포그라운드, 백그라운드에서의 알림 처리를 따로 다뤄보겠다.

### 3-2. 포그라운드에서 알림 받았을 때 처리

앱을 사용자가 사용중일 때, 알림을 받았을 때 처리다. 이때는 그냥 MainActivity를 재실행하도록 하였다.

```kotlin
class FirebaseMessageService: FirebaseMessagingService() {

    override fun onMessageReceived(message: RemoteMessage) {
        super.onMessageReceived(message)
        if (message.data != null){
            val intent = Intent(applicationContext, MainActivity::class.java)
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            // MainActivity 재시작
            startActivity(intent)
        }
        // body: message.notification.body
        // title: message.notification.title
        // data: message.data["key"]

        FirebaseMessaging.getInstance().token.addOnCompleteListener(OnCompleteListener { task ->
            // 토큰: task.result
            if (!task.isSuccessful) {
                return@OnCompleteListener
            }
        })
    }
    // FCM SDK는 앱을 처음 시작할 때(앱 제거/재설치, 앱 데이터 소거시, 새 기기에서 앱 복원 시) 클라이언트 앱 인스턴스용 등록 토큰을 생성한다.
    override fun onNewToken(token: String) {
        val key = stringPreferencesKey(DataStoreKey.FCM_TOKEN_KEY.name)
        runBlocking {
            // FCM 토큰 저장
            dataStore.edit{ it[key] = token } 
        }
        super.onNewToken(token)
    }

}
```

### 3-3. 백그라운드에서 알림 받았을 때 처리

사용자가 앱을 사용하지 않을 때는 작업 표시줄에 알림이 온다. 해당 알림을 클릭하면 url을 열도록 설정하였다.

링크를 여는 Intent를 따로 설정하여 startActivity를 통해 실행해주었다.

```kotlin
@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        openNoticeLink()
        ...
    }

    private fun openNoticeLink() {
        try {
            if (intent?.extras != null) {
                // 알림 데이터가 있다면 링크 실행
                val link = intent.extras!!.get("link").toString()
                val browserIntent = Intent(Intent.ACTION_VIEW, Uri.parse(link))
                startActivity(browserIntent)
            }
        } catch(_: Exception){

        }
    }
}
```

## 4. 테스트

알림을 테스트해보기 위해 FCM 콘솔에서 새 캠페인을 만들어 테스트해볼 수 있다.

이때 추가 옵션에 맞춤 데이터 내용을 넣어 데이터 페이로드를 추가할 수 잇다.

나는 link - https://naver.com 을 추가해주었다.

## 5. 보고서 

- 전송 - 사용자에게 전송된 알림 및 데이터 메시지의 개수입니다.
- 수신됨 - 사용자가 수신한 알림/데이터 메시지의 개수입니다(Android에서만 지원 및 Apple은 부분적으로 지원).
- 노출 - 사용자가 수신한 알림/데이터 메시지의 개수입니다(Android에서만 지원 및 Apple은 부분적으로 지원).
- 열림: 사용자가 연 알림 메시지의 개수입니다

![보고서]({{site.baseurl}}/assets/images/firebase2.png)

이걸로 확인해볼 수 있다. 

전송과 수신됨에 차이가 있는데.. 이 문제는 이제 해결해야 됨 ^0^ 신난다....
