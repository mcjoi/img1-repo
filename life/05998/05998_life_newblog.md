---
### essential info 
title: 블로그 이사(티스토리 → ?) 
slug: '05998'
date: 2025-12-29
# updated: 2025-12-22 # 미설정
cover: https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/00_img/00_noimage.webp
category: life
tags:
  - blog
  # - photo
  # - video

### optional info 
# excerpt: 텍스트를 입력합니다. # 미설정 
# order: 10 # 미설정 
# draft: false #미설정
---

## 티스토리
꽤 오랜시간 티스토리 블로그에 글을 적어왔다. <br>
가끔 까먹는 엑셀 함수를 기재해두는 메모 용도로 시작했는데, 세월의 길이 만큼이나, 글이 많아졌다. <br>
본의 아니게 `adsense` 광고비가 들어오던 때가 있어, 나름 동기부여가 되어오기도 했는데...
::sp
세상에 가장 좋지 않은 것이 줬다 뺏는 거라고 했던가? <br>
`CPM` 정책으로 변경 뒤부터 지급되던 코묻은 돈은 이제는 0이 되었다. <br>
수익은 없는데, 가독성을 떨어뜨리는 광고만 수두룩한 페이지가 되었다.
::sp
선택지는 분명하다. 광고를 털어내고 깔끔한 메모장으로 사용하거나, 다른 블로그 서비스로 이전을 하는 것 둘 중 하나이다. <br>
시간을 들여 `CSS`를 내 입맛에 맞게 수정한 시간이 좀 아깝기는 하지만, 새로운 블로그를 만들면서 그간 몰랐던 것을 익히는 공부의 시간이라고 생각하자.
::sp2


## 블로그 서비스
블로그의 시대는 유튜브의 득세, AI의 도둑질에 힘을 입어 끝난거나 마찬가지다. <br>
그럼에도, 다시 블로그들을 찾아보는 이유는 가장 시간적인 부담이 없다는 이유 때문일 것이다. 놀고 있는 태블릿으로도 충분히 끄적일 수 있다는 활용 측면도 있다.
::sp2


여튼 아래와 같이 호스팅할만한 서비스들의 후보군을 찾아보았다.
- 블로거(blogger) : 구글의 블로그 서비스, `html`과 `css`가 하나의 `xml`로 구성되어 유지보수를 하는데 난이도가 너무 높다. 놀랍게도 구글의 서비스임에도 구글에서 `SEO`가 잘 되지 않는다.
- 워드프레스(wordpress) : 직접 뭔가를 해보지는 않았는데, 유료이고, 난이도가 있다고 한다. 내가 싫어하는 두가지 단점을 모두 가지고 있다.
- Github pages : Github에서 제공하는 서비스. Markdown 언어로 작성을 하며, `Jekll/Hugo`등의 편의를 제공해주는 서비스(템플릿 등)이 있다.
- firebase hosting : GCP 서비스에 해당하지만, 10GB(트래픽/저장용량)까지는 무료로 알고 있다.
::sp2

이를 통해, 티스토리나 네이버 블로그가 얼마나 사용자 친화적인 서비스였는지 알 수 있었다. <br>
- 무려 이사를 가는 사람들을 위해 티스토리는 백업기능을 제공한다. 포스트들을 다 압축파일로 제공해주며, 이미지 파일은 무려 원본으로 받을 수 있다. <br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/life/05998/05998_img_01.webp)

::sp2
무료에 길들여진 나는.. `Github pages` 아니면 `firebase hosting`을 선택할 수 밖에 없다.
::sp2


## 구조
크게 UI/POST파트와 STORAGE파트로 구분을 해보자. 이 두가지가 어떤 서비스를 사용하게 되는지에 따라 차이가 많이 발생할 것으로 예상된다.
::sp
### Hugo + Github pages
UI/POST - Hugo <br>
Hugo는 정적사이트 생성기 중에서도 난이도가 쉽다고 알려져 있는데, 역시 티스토리만 쓰던 나에게는 이 또한 쉽지가 않다. 특히 Go 언어로 설계된 커스텀 부분은 주어진 템플릿과 뒤죽박죽이 될 수 있기 때문에 정리력이 필요하다. <br>
그럼에도 아주 손쉽게 블로그를 구현할 수 있었고, 이미 만들어진 템플릿도 상당히 고급스럽고, 나무랄 곳이 없었다. <br>
::sp
Storage - Github pages <br>
한 세트로 움직이기 때문에 Github pages와의 궁합이 아주 좋다. 딱히 불편한 점이 없다.
::sp
이를 통해서 새로운 블로그의 세팅을 SEO까지 전부 완료를 했었는데, flutter로 직접 만들면 어떨까 싶어서, 만들어 둔 내용을 삭제했다. 아니 실수로 삭제를 해버렸다. 여전히 후회스러운 부분이다. 

::sp2

### flutter web + Github pages
UI/POST - flutter <br>
flutter web으로 블로그를 만드니, 템플릿은 전혀 필요없다. 자유도가 매우 높아진다. <br>
설계를 할때, POST는 Hugo와 마찬가지로 Markdown으로 작성하도록 했다. <br>
Markdown 렌더링이 기본으로 다양하게 탑재된 Hugo와는 다르게, flutter는 최소한만 지원하는 관계로, 커스텀이 필요하다.
::sp
Storage - Github pages <br>
애석하게도 flutter web을 사용하면, post의 주소체계가 엉망이 된다. 일단, flutter web이 단일 페이지 웹사이트이기 때문에 하위 post 주소를 인식시키기 정말 어렵다. <br>
SEO에 불리하다는 이유 때문에, 여기서 포기했다.
::sp2

### flutter web + firebase hosting
UI/POST - flutter <br>
위와 동일하다. 
Storage - firebase hosting <br>
몇 가지 잔잔한 설정만 해주면 아주 손쉽게 사용이 가능하다. 특히 Github pages 와 다르게 각각의 post에 대한 라우팅을 지원해서, 주소체계를 익숙한 형태로 컨트롤 할 수 있다.

## 정리
물론 flutter를 사용하는 경우, 바닥부터 만들어야 했기 때문에 <br>
Hugo와 대비해서.. 어마어마한 오류와 에러, 작업요소들이 있다. <br>
하지만, 괜찮다. chatGPT의 시대니까..
::sp2
현재는 flutter로 UI를 설계, firebase hosting에 업로드하고, post들은 github에서 불러들이는 형태로 최종 그림을 잡고 있다. <br>
한꺼번에 올리는 것 보다 나은 점은 아무래도 github codespace의 장점 때문이랄까..
::sp2

## 뭔가 찜찜 
인간은 익숙함의 동물이라고 했던가? <br>
뭔가 어색하지만, 금새 익숙해지리라 믿는다. 어디부터 post 들을 마이그레이션해야할지 모르겠지만.. 일단 지난글을 그대로 두기로 한다.
::sp
끝.
::sp2

