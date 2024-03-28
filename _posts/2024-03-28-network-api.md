---
layout: post
title:  "네트워크 API 활용"
author: 1jeongg
categories: [ Android ]
summary: 안드로이드에서 Linux 명령어를 실행하는 방법과 네트워크 및 Wifi 와 관련된 API 내용입니다.
tags: 
---


네트워크와 관련된 졸업과제를 하면서 리눅스 명령어를 실행해보고 연결가능한 wifi 탐색 및 앱을 이용한 연결 등 간단한 예제를 다루어봤습니다.

## Linux 명령어 실행 가능

---

```kotlin
try {
    val process = Runtime.getRuntime().exec("nslookup world.std.com")
    val br = BufferedReader(InputStreamReader(process.inputStream))
    var line = ""
    while (true) {
        line = br.readLine() ?: ""
        if (line.isNotBlank()) Log.d("jeongg_log", line)
    }

} catch (e: Exception) {
    e.fillInStackTrace();
    Log.d("jeongg_log", "Unable to execute top command");
}
```

- Android 10 이상부터는 해당 내용 사용 불가
    
    ![network]({{site.baseurl}}/assets/images/network_img2.png)
    

## 네트워크

---

### 사용 관리

- 와이파이 연결 여부 / 모바일 네트워크 연결 여부
    
    ```jsx
    val connMgr = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
    var isWifiConn: Boolean = false
    var isMobileConn: Boolean = false
    connMgr.allNetworks.forEach { network ->
        connMgr.getNetworkInfo(network).apply {
            if (type == ConnectivityManager.TYPE_WIFI) {
                isWifiConn = isWifiConn or isConnected
            }
            if (type == ConnectivityManager.TYPE_MOBILE) {
                isMobileConn = isMobileConn or isConnected
            }
        }
    }
    ```
    
- 기기가 Wi-Fi 네트워크에 연결된 경우에만 사용자가 동영상을 업로드하도록 설정
- 네트워크 가용성, 시간 간격 등 특정 기준에 따라 동기화 여부 결정
- 네트워크 연결 변경 여부
    
    ```kotlin
    class NetworkReceiver : BroadcastReceiver() {
    
        override fun onReceive(context: Context, intent: Intent) {
            val conn = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
            val networkInfo: NetworkInfo? = conn.activeNetworkInfo
    
            // userPref가 와이파이만 사용하고 있다면
            // 디바이스가 와이파이 연결을 하고 있는지 체크
            if (WIFI == sPref && networkInfo?.type == ConnectivityManager.TYPE_WIFI) {
                refreshDisplay = true
                Toast.makeText(context, R.string.wifi_connected, Toast.LENGTH_SHORT).show()
            } else if (ANY == sPref && networkInfo != null) {
                // 어느 네트워크든 연결만 되어있다면 refreshDisplay를 true로 설정
                refreshDisplay = true
            } else {
                // 네트워크 연결이 없으므로 refreshDisplay를 false로 설정
                refreshDisplay = false
                Toast.makeText(context, R.string.lost_connection, Toast.LENGTH_SHORT).show()
            }
        }
    }
    ```
    

### 상태 읽기

---

- 현재 연결된 네트워크의 속성
    - 경로, 링크 주소, 인터페이스 이름, 프록시 정보, DNS 서버
    
    ```kotlin
    val connectivityManager = getSystemService(ConnectivityManager::class.java)
    val currentNetwork = connectivityManager.activeNetwork
    
    val caps = connectivityManager.getNetworkCapabilities(currentNetwork)
    val linkProperties = connectivityManager.getLinkProperties(currentNetwork)
    ```
    
- 네트워크 이벤트 수신 대기
    
    ```kotlin
    connectivityManager.registerDefaultNetworkCallback(object : ConnectivityManager.NetworkCallback() {
        override fun onAvailable(network : Network) {
            Log.e(TAG, "The default network is now: " + network)
        }
    
        override fun onLost(network : Network) {
            Log.e(TAG, "The application no longer has a default network. The last default network was " + network)
        }
    
        override fun onCapabilitiesChanged(network : Network, networkCapabilities : NetworkCapabilities) {
            Log.e(TAG, "The default network changed capabilities: " + networkCapabilities)
        }
    
        override fun onLinkPropertiesChanged(network : Network, linkProperties : LinkProperties) {
            Log.e(TAG, "The default network changed link properties: " + linkProperties)
        }
    })
    ```
    
    ```kotlin
    The default network is now: 316
    The default network changed capabilities: [ 
    	Transports: WIFI Capabilities: NOT_METERED&INTERNET&NOT_RESTRICTED&TRUSTED&NOT_VPN&VALIDATED&NOT_ROAMING&FOREGROUND&NOT_CONGESTED&NOT_SUSPENDED&NOT_VCN_MANAGED 
    	LinkUpBandwidth>=12000Kbps LinkDnBandwidth>=60000Kbps 
    	TransportInfo: <SSID: <unknown ssid>, BSSID: 02:00:00:00:00:00, 
    	MAC: 02:00:00:00:00:00, IP: /192.168.0.18, 
    	Security type: 2, Supplicant state: COMPLETED, Wi-Fi standard: 5, RSSI: -53, 
    	Link speed: 351Mbps, Tx Link speed: 351Mbps, Max Supported Tx Link speed: 866Mbps, Rx Link speed: 468Mbps, Max Supported Rx Link speed: 866Mbps, Frequency: 5745MHz, Net ID: -1, Metered hint: false, score: 30, isUsable: true, CarrierMerged: false, SubscriptionId: -1, IsPrimary: -1, Trusted: true, Restricted: false, Ephemeral: false, OEM paid: false, OEM private: false, OSU AP: false, FQDN: <none>, Provider friendly name: <none>, Requesting package name: <none><none>MLO Information: , Is TID-To-Link negotiation supported by the AP: false, AP MLD Address: <none>, AP MLO Link Id: <none>, AP MLO Affiliated links: <none>> SignalStrength: -53 UnderlyingNetworks: Null]
    	
    The default network changed link properties: {InterfaceName: wlan0 LinkAddresses: [ fe80::d0de:9ff:fedc:10f2/64,192.168.0.18/24 ] DnsAddresses: [ /164.125.9.2 ] Domains: null MTU: 0 ServerAddress: /192.168.0.1 TcpBufferSizes: 524288,1048576,4194304,524288,1048576,4194304 Routes: [ fe80::/64 -> :: wlan0 mtu 0,192.168.0.0/24 -> 0.0.0.0 wlan0 mtu 0,0.0.0.0/0 -> 192.168.0.1 wlan0 mtu 0 ]}
    The application no longer has a default network. The last default network was 316      
    ```
    
    ```kotlin
    The default network is now: 317
    The default network changed capabilities: [ Transports: CELLULAR Capabilities: SUPL&RCS&INTERNET&NOT_RESTRICTED&TRUSTED&NOT_VPN&NOT_ROAMING&FOREGROUND&NOT_CONGESTED&NOT_SUSPENDED&NOT_VCN_MANAGED LinkUpBandwidth>=14Kbps LinkDnBandwidth>=14Kbps Specifier: <TelephonyNetworkSpecifier [mSubId = 1]> UnderlyingNetworks: Null]
    The default network changed link properties: {InterfaceName: rmnet_data1 LinkAddresses: [ 192.0.0.2/27,2001:4430:50e3:8fca:6909:1c33:d03e:8ab4/64 ] DnsAddresses: [ /192.0.0.1,/2001:4430:5:615::1,/2001:4430:8:814::1 ] Domains: null MTU: 0 TcpBufferSizes: 2097152,4194304,8388608,1048576,3145728,4194304 Routes: [ 0.0.0.0/0 -> 192.0.0.1 rmnet_data1 mtu 1372,::/0 -> fe80::3 rmnet_data1 mtu 1400,192.0.0.0/27 -> 0.0.0.0 rmnet_data1 mtu 0,2001:4430:50e3:8fca::/64 -> :: rmnet_data1 mtu 0 ]}
    ```
    

### 연결 상태 및 연결 측정 모니터링

- 코드
    
    ```kotlin
    //네트워크 요청 구성
    val networkRequest = NetworkRequest.Builder()
        .addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
        .addTransportType(NetworkCapabilities.TRANSPORT_WIFI)
        .addTransportType(NetworkCapabilities.TRANSPORT_CELLULAR)
        .build()
    
    // 네트워크 콜백 구성
    val networkCallback = object : ConnectivityManager.NetworkCallback() {
        // network is available for use
        override fun onAvailable(network: Network) {
            Log.d(TAG, "Available $network")
            super.onAvailable(network)
        }
    
        // Network capabilities have changed for the network
        override fun onCapabilitiesChanged(
            network: Network,
            networkCapabilities: NetworkCapabilities
        ) {
            super.onCapabilitiesChanged(network, networkCapabilities)
            val unmetered = networkCapabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_NOT_METERED)
            Log.d(TAG, "onCapabilitiesChanged $unmetered")
        }
    
        // lost network connection
        override fun onLost(network: Network) {
            Log.d(TAG, "onLost $network")
            super.onLost(network)
        }
    }
    
    // 네트워크 업데이트 등록
    val connectivityManager = getSystemService(ConnectivityManager::class.java) as ConnectivityManager
    connectivityManager.requestNetwork(networkRequest, networkCallback)
    ```
    
- 결과
    
    ```kotlin
    // 연학실 와이파이
    Available 321
    onCapabilitiesChanged true
    
    // 연학실 와이파이 끊고 모바일 네트워크 연결
    onLost 321
    Available 317
    onCapabilitiesChanged false
    ```
    

## Wifi

---

### 검색 설정

 기기에 보이는 Wi-Fi 액세스 포인트의 목록을 가져오기

> **프로세스**
> 
> 1. `SCAN_RESULTS_AVAILABLE_ACTION`의 **브로드캐스트 리스너를 등록**
> 2. `WifiManager.startScan()`을 사용하여 **스캔을 요청**
> 3. `WifiManager.getScanResults()`를 사용하여 **스캔 결과를 가져오기**

```kotlin
val wifiManager = context.getSystemService(Context.WIFI_SERVICE) as WifiManager

val wifiScanReceiver = object : BroadcastReceiver() {

  override fun onReceive(context: Context, intent: Intent) {
    val success = intent.getBooleanExtra(WifiManager.EXTRA_RESULTS_UPDATED, false)
    if (success) {
      scanSuccess()
    } else {
      scanFailure()
    }
  }
}

val intentFilter = IntentFilter()
intentFilter.addAction(WifiManager.SCAN_RESULTS_AVAILABLE_ACTION)
context.registerReceiver(wifiScanReceiver, intentFilter)

val success = wifiManager.startScan()
if (!success) {
  scanFailure()
}

private fun scanSuccess() {
  // 앞에 permission 체크 필요
  val results = wifiManager.scanResults
	Log.d(TAG, results.toString())
}

private fun scanFailure() {
	 Log.d(TAG, "scan Fail")
}
```

- 결과
    
    ```kotlin
    [SSID: "NC-400-310F48-5G", BSSID: 00:88:ba:31:0f:4b, 
    capabilities: [WPA2-PSK-CCMP+TKIP][RSN-PSK-CCMP+TKIP][WPA-PSK-CCMP+TKIP][ESS], 
    level: -78, frequency: 5200, timestamp: 1785476767073, 
    distance: ?(cm), distanceSd: ?(cm), passpoint: no, ChannelBandwidth: 2, 
    centerFreq0: 5210, centerFreq1: 0, standard: 11ac, 80211mcResponder: is not supported, 
    Radio Chain Infos: [RadioChainInfo: id=0, level=-80, RadioChainInfo: id=1, level=-84], 
    interface name: wlan0,
     
    SSID: "PNU-WiFi", BSSID: e6:55:2d:10:ea:e6, capabilities: [ESS], level: -83, frequency: 5180, timestamp: 1785476655264, distance: ?(cm), distanceSd: ?(cm), passpoint: no, ChannelBandwidth: 2, centerFreq0: 5210, centerFreq1: 0, standard: 11ac, 80211mcResponder: is not supported, Radio Chain Infos: [RadioChainInfo: id=0, level=-84, RadioChainInfo: id=1, level=-90], interface name: wlan0, 
    SSID: "KT_Free_WiFi", BSSID: 00:25:a6:a0:af:53, capabilities: [ESS], level: -58, frequency: 2412, timestamp: 1785476668982, distance: ?(cm), distanceSd: ?(cm), passpoint: no, ChannelBandwidth: 0, centerFreq0: 2412, centerFreq1: 0, standard: 11n, 80211mcResponder: is not supported, Radio Chain Infos: [RadioChainInfo: id=0, level=-63, RadioChainInfo: id=1, level=-60], interface name: wlan0, 
    SSID: "eduroam", BSSID: 84:3d:c6:f4:73:dd, capabilities: [WPA2-EAP/SHA1-CCMP][RSN-EAP/SHA1-CCMP][WPA-EAP/SHA1-CCMP][ESS], level: -76, frequency: 5745, timestamp: 1785477060706, distance: ?(cm), distanceSd: ?(cm), passpoint: no, ChannelBandwidth: 1, centerFreq0: 5755, centerFreq1: 0, standard: 11ac, 80211mcResponder: is not supported, Radio Chain Infos: [RadioChainInfo: id=0, level=-78, RadioChainInfo: id=1, level=-80], interface name: wlan0, 
    SSID: "PNU-WiFi-2.4G", BSSID: f2:55:2d:10:ea:e6, capabilities: [ESS], level: -84, frequency: 5180, timestamp: 1785476664197, distance: ?(cm), distanceSd: ?(cm), passpoint: no, ChannelBandwidth: 2, centerFreq0: 5210, centerFreq1: 0, standard: 11ac, 80211mcResponder: is not supported, Radio Chain Infos: [RadioChainInfo: id=0, level=-85, RadioChainInfo: id=1, level=-92], interface name: wlan0, SSID: "KT WiFi ", BSSID: 00:25:a6:a0:af:51, capabilities: [ESS], level: -59, frequency: 2412, timestamp: 1785476653015, distance: ?(cm), distanceSd: ?(cm), passpoint: no, ChannelBandwidth: 0, centerFreq0: 2412, centerFreq1: 0, standard: 11n, 80211mcResponder: is not supported, Radio Chain Infos: [RadioChainInfo: id=0, level=-65, RadioChainInfo: id=1, level=-60], interface name: wlan0, 
    SSID: "eduroam", BSSID: ee:55:2d:10:ea:e6, capabilities: [WPA2-EAP/SHA1-CCMP+TKIP][RSN-EAP/SHA1-CCMP+TKIP][WPA-EAP/SHA1-CCMP+TKIP][ESS], level: -85, frequency: 5180, timestamp: 1785476655450, distance: ?(cm), distanceSd: ?(cm), passpoint: no, ChannelBandwidth: 2, centerFreq0: 5210, centerFreq1: 0, standard: 11ac, 80211mcResponder: is not supported, Radio Chain Infos: [RadioChainInfo: id=0, level=-86, RadioChainInfo: id=1, level=-92], interface name: wlan0, 
    SSID: "iptime5G", BSSID: 5a:86:94:4f:b4:c4, capabilities: [ESS], level: -55, frequency: 5745, timestamp: 1785477060305, distance: ?(cm), distanceSd: ?(cm), passpoint: no, ChannelBandwidth: 2, centerFreq0: 5775, centerFreq1: 0, standard: 11ax, 80211mcResponder: is not supported, Radio Chain Infos: [RadioChainInfo: id=0, level=-59, RadioChainInfo: id=1, level=-57], interface name: wlan0, SSID: "연학실5G", BSSID: 90:9f:33:f9:2a:cc, capabilities: [WPA2-PSK-CCMP][RSN-PSK-CCMP][ESS][WPS], level: -50, frequency: 5745, timestamp: 1785479153266, distance: ?(cm), distanceSd: ?(cm), passpoint: no, ChannelBandwidth: 2, centerFreq0: 5775, centerFreq1: 0, standard: 11ac, 80211mcResponder: is not supported, Radio Chain Infos: [RadioChainInfo: id=0, level=-52, RadioChainInfo: id=1, level=-54], interface name: wlan0, 
    SSID: "연학실2.4G", BSSID: 90:9f:33:fa:2a:cc, capabilities: [WPA2-PSK-CCMP][RSN-PSK-CCMP][ESS][WPS], level: -39, frequency: 2467, timestamp: 1785477222579, distance: ?(cm), distanceSd: ?(cm), passpoint: no, ChannelBandwidth: 1, centerFreq0: 2457, centerFreq1: 0, standard: 11n, 80211mcResponder: is not supported,
    ```
    

### Wifi 인프라

- **Suggestion API:** 인터넷 지원 구성을 프로비저닝하고 제공하는 앱을 타겟팅
    
    플랫폼이 네트워크 제안 중 하나에 연결되면 설정에 네트워크 연결이 해당 제안자 앱을 출처로 표시하는 텍스트가 표시됨
    
    이걸로 연결하면 네트워크 연결 성공!
    
    ![network]({{site.baseurl}}/assets/images/network_img1.png)

    
    ```kotlin
    val suggestion1 = WifiNetworkSuggestion.Builder()
        .setSsid("PNU-Wifi")
        .setIsAppInteractionRequired(true) // Optional (Needs location permission)
        .build();
    
    val suggestion2 = WifiNetworkSuggestion.Builder()
        .setSsid("연학실2.4G")
        .setWpa2Passphrase("비밀번호 비공개 ㅎㅎ")
        .setIsAppInteractionRequired(true) // Optional (Needs location permission)
        .build();
    
    val suggestion3 = WifiNetworkSuggestion.Builder()
        .setSsid("eduroam")
        .setWpa3Passphrase("test6789")
        .setIsAppInteractionRequired(true) // Optional (Needs location permission)
        .build();
    
    val suggestionsList = listOf(suggestion1, suggestion2, suggestion3);
    
    val wifiManager = getSystemService(Context.WIFI_SERVICE) as WifiManager;
    
    val status = wifiManager.addNetworkSuggestions(suggestionsList);
    if (status != WifiManager.STATUS_NETWORK_SUGGESTIONS_SUCCESS) {
        // do error handling here
        Log.d(TAG, "error exist")
    }
    
    val intentFilter = IntentFilter(WifiManager.ACTION_WIFI_NETWORK_SUGGESTION_POST_CONNECTION);
    
    val broadcastReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            if (!intent.action.equals(WifiManager.ACTION_WIFI_NETWORK_SUGGESTION_POST_CONNECTION)) {
                return;
            }
            Log.d(TAG, "onReceived")
    
            // do post connect processing here
        }
    };
    registerReceiver(broadcastReceiver, intentFilter);
    
    ```
    
- **네트워크 요청 API:** 피어 기기에 연결해야 하는 앱을 타겟팅
    
    기기가 연결된 액세스 포인트를 변경하라는 메시지를 사용자에게 표시할 수 있음
    
    > **프로세스**
    > 
    > 1. `WifiNetworkSpecifier.Builder` 를 사용하여 Wifi 네트워크 지정자 생성
    > 2. 필수 사용자 인증 정보와 함께 연결할 네트워크와 일치하도록 네트워크 필터를 설정
    > 3. `SSID`, `SSID pattern`, `BSSID`, `BSSID pattern` 의 조합을 결정하여 각 요청에서 네트워크 필터 설정
    > 4. 요청 상태를 추적하려면 `NetworkCallback` 인스턴스와 함께 네트워크 요청에 지정자 추가
- `ACTION_WIFI_ADD_NETWORKS` **API:** 앱이 저장된 네트워크 또는 정기 결제 목록에 네트워크 또는 Passpoint 구성을 추가할 수 있도록 허용

### 기타

- **Wifi Direct (P2P):** 적절한 하드웨어가 있는 기기를 중간 액세스 포인트 없이 Wi-Fi를 통해 서로 직접 연결 가능
- **Wifi Aware(Neighbor Awareness Networking, NAN):** 다른 유형의 연결 없이 서로를 검색하여 직접 연결 가능
    - 다른 기기 탐색
    - 양방향 Wifi-Aware 네트워크 연결 생성
- **RTT APi로 Wifi 위치 설정:** 주변의 RTT 지원 Wifi 액세스 포인트 및 동종 앱 Wifi Aware 기기와의 거리 측정 가능 (다변측정 알고리즘 사용, 정확도는 1~2m)
- **로컬 전용 Wifi 핫스팟 사용**: 로컬 전용 핫스팟을 사용하여 Wi-Fi 핫스팟에 연결된 기기의 애플리케이션이 서로 통신

### 출처

https://developer.android.com/develop/connectivity?hl=ko