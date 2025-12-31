---
### essential info 
title: flutter - Desktop Shortcut
slug: 03997
date: 2025-12-22
# updated: 2025-12-22 # 미설정
cover: https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/00_img/03_flutter.webp
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
`Rainmeter`같은 desktop 꾸미기 앱을 이용한다면 더 멋진 UI를 설계할 수 있으나, 내가 원하는 사용범위보다 훨씬 광범위한 기능을 제공하는 관계로, flutter deskstop을 통해 다시 만들게 되었다.
:::sp 2
## Structure
화면에 프로그램 실행, 특정 사이트 바로가기, 폴더 바로가기 등의 플로팅 창을 만드는 것이 목표이다. <br>
이는 윈도우즈의 바로가기만 써도 충분히 구현이 가능하지만, 바탕화면을 정리하면서 바로가기 파일들이 자주 사라지기 때문에 만들게 되었다. <br>
- 프로그램에 입력창같은 기능은 귀찮으니까, 제외를 하고, 같이 딸려있는 `json` 파일을 수정하는 형태로 구성한다.<br>
- 가로 사이즈는 고정이며, 세로 사이즈는 북마크 수량에 따라 자동으로 조정이 됐으면 한다.
- 이미지만 있으면 뭔지 까먹으니까, 마우스를 아이콘에 오버했을때, 내용을 확인할 수 있는 텍스트가 Hover 효과로 나타난다.
:::sp 2
## Package
꽤 오랜 세월이 지났으니, flutter windows app이 어느정도 편의를 제공할 수 있는 수준이 된 듯하다. 큰 무리없이 exe파일까지 build를 할 수 있었다. <br>
사용된 몇가지 패키지는 다음과 같다.
:::sp 2
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
그냥 만들면 재미가 없으니, 아크릴 패키지로 데코레이션을 해준다. 그런데... 자꾸 외곽선에 5픽셀정도 삑사리가 나서, 내 잘못인지, 윈도우10 잘못인지 몰라서, transparent 옵션으로만 설정했다. <br>
아쉽게도 윈도우10에서는 제대로 작동하는 듯 했는데, 윈도우11로 넘어오니, 제대로 작동이 되지 않는 듯하다.
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
항상 떠 있는 창이다 보니 가끔 걸리적거릴 때가 있다. 사용하지 않거나 화면을 많이 가리게 되는 경우는 system tray에 내려 둘 수 있도록 아래 패키지를 사용한다. <br>
그냥 샘플에 있는 코드를 넣는 것만으로도 활성화가 가능한 아주 신박한 패키지이다.

:::sp 2
***
:::sp 2

## Result
북마크 리스트를 `json` 파일로 관리하는 것이 처음에는 편했는데, 북마크가 많아지고 수정이 자주 생기니, 불편함이 생긴다. <br>
setting을 할 수 있는 페이지를 설계를 할 필요가 있다.
:::sp
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/flutter/03997/03997_desktop_bookmark.gif)
:::sp 2

