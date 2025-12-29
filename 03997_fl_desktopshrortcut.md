---
### essential info 
title: flutter - Desktop Shortcut
slug: 03997
date: 2025-12-22
# updated: 2025-12-22 # 미설정
cover: https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/img/03_flutter.webp
category: dev
tags: 
  - windows
  - flutter

### optional info  
# excerpt: 텍스트를 입력합니다. # 미설정 
# order: 10 # 미설정 
# draft: false #미설정 
---

## What is it?
폴더나, 파일을 매번 찾기 귀찮으니, 바로가기를 만들었다.<br>
`Rainmeter`를 통해서 이와 유사한 앱을 만들었지만, 약간 부족한 감이 있어 다시 만든다. 
:::sp 2
## Structure
프로그램에 입력창같은 기능은 귀찮으니까, 제외를 하고, 같이 딸려있는 json 파일을 수정하는 형태로 구성하면 좋겠다. <br>
가로 사이즈는 고정이며, 세로 사이즈는 북마크 수량에 따라 자동으로 조정이 됐으면 한다. 이미지만 있으면 뭔지 까먹으니까, 마우스를 아이콘에 오버했을때, 내용을 확인할 수 있으면 된다.
:::sp 2
## Package
꽤 오랜 세월이 지났으니, flutter windows app이 어느정도 편의를 제공할 수 있는 수준이 된 듯하다. 큰 무리없이 exe파일까지 build를 할 수 있었다.
:::sp
몇가지 핵심만 요약해서 정리를 해둔다.
::sp 2
### window manager
`pub.dev`에서 windows의 프로그램 창을 관리할 수 있는 첫번째 패키지를 선택했다. 좋은건지 나쁜건지는 모르겠지만, 내가 사용할 기능정도는 있는 것같다.
:::sp
- 초기화 : main()
```dart
 // Initialize the window manager
  await windowManager.ensureInitialized();
``` 
:::sp
- 기본 창 사이즈 설정
```dart
  double windowWidth = 240;
  double windowHeight = 340 + addsize();

  double posX = 1920 - windowWidth - 20; // 오른쪽 끝에서 약간 떨어진 위치
  double posY = 1080 - windowHeight - 50; // 아래쪽 끝에서 약간 떨어진 위치

  WindowOptions windowOptions = WindowOptions(
    size: Size(windowWidth, windowHeight),
    alwaysOnTop: true,
    minimumSize: Size(windowWidth, windowHeight),
    maximumSize: Size(windowWidth, windowHeight),
  );
```
:::sp
- 세부사항 설정
```dart
  windowManager.waitUntilReadyToShow(windowOptions, () async {
    windowManager.setPosition(Offset(posX, posY));
    windowManager.setHasShadow(false);
    windowManager.setMaximizable(false);
    windowManager.setMinimizable(false);
    // windowManager.setClosable(false);
    windowManager.setPreventClose(true);
    windowManager.addListener(MyWindowListener());

    await windowManager.show();
    await windowManager.focus();
  });
```
:::sp 2
### flutter_acrylic
그냥 만들면 재미가 없으니, 아크릴 패키지로 데코레이션을 해준다. 그런데... 자꾸 외곽선에 5픽셀정도 삑사리가 나서, 내 잘못인지, 윈도우10 잘못인지 몰라서, transparent 옵션으로만 설정했다.
:::sp
- 초기화와 effect 설정정도면 간단하게 끝이다.
```dart
  await Window.initialize();

  await Window.setEffect(
    effect: WindowEffect.acrylic,
    // color: fc.Colors.black.withAlpha(200),
    dark: true,
  );
```
:::sp 2
### system_tray
항상 떠 있는 창이다 보니 가끔 걸리적거릴 때가 있다. 사용하지 않거나 화면을 많이 가리게 되는 경우는 system tray에 내려 둘 수 있도록 아래 패키지를 사용한다. 그냥 샘플에 있는 코드를 넣는 것만으로도 활성화가 가능한 아주 신박한 패키지이다.
:::sp 2
***
:::sp 2

## Result
윈도우11로 넘어오면서 transparent 기능이 좀 이상하게 작동하기는 하지만, 본래의 목적 자체가 미적인데 있지 않기 때문에 그냥 쓰자.
:::sp
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/img/desktop_bookmark.gif)
:::sp 2




