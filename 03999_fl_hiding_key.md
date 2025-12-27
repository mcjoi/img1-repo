---
### essential info 
title: Google API key 감추기 - flutter
slug: 03999
date: 2025-12-22
# cover: https://picsum.photos/800/400
category: dev
tags:
  - flutter
  - windows

### optional info 
# updated: 2025-12-22 # 미설정 
# excerpt: 텍스트를 입력합니다. # 미설정 
# order: 10 # 미설정 
# draft: false #미설정 
---
은

## 아무도 말해주지 않았던 보안 문제..
개인적으로 DB를 사용하기 부담이 되는 경우가 많아 `Google Sheets API`를 자주 사용하곤 하는데, 최근 웹퍼블리싱을 하는 경우, 개발자 모드에서 나의 `API key`가 그대로 노출이 된다는 사실을 알게 되었다.
:::sp
알게 되서 다행이다 라는 생각보다는... 아놔 귀찮다... 라는 생각이 먼저 드는건 왜일까..
:::sp 2
## .env로 처리
뭐 대단한 정보를 가지고 있거나, 처리하지는 않겠지만, 그래도 몰랐으면 모를까.. 이미 알게 되었었으니, 그 중 가장 간단한 방법을 선택하여 처리를 해본다. 
:::sp
이게 맞는지 모르겠지만, `.env` 파일을 생성하고, 플러터의 `dot_env` 패키지를 사용해서 파일을 읽으면 끝이다. 정상작동까지는 확인했지만, 보안이란게 그렇지 않은가?
:::sp
완벽한 방법은 없다.
:::sp 2
## .env 파일을 구성하는 방법 
의외의 어려움은 .env 파일을 구성할 때 나타났는데, `API key` 에는 `\n`을 처리해야하는 부분이 있는데, `json` 구성과 `.env` 파일 구성은 chatGPT에게 템플릿을 만들어 달라고 하는 것이 여러모로 안전하다.
::sp
```dart
var cremap = {
  "type": dotenv.get("type"),
  "project_id": dotenv.get("project_id"),
  "private_key_id": dotenv.get("private_key_id"),
  "private_key": dotenv.get("private_key"),
  "client_email": dotenv.get("client_email"),
  "client_id": dotenv.get("client_id"),
  "auth_uri": dotenv.get("auth_uri"),
  "token_uri": dotenv.get("token_uri"),
  "auth_provider_x509_cert_url": dotenv.get("auth_provider_x509_cert_url"),
  "client_x509_cert_url": dotenv.get("client_x509_cert_url"),
  "universe_domain": dotenv.get("universe_domain")
};

var cremapJson = jsonEncode(cremap);
final gsheets = GSheets(cremapJson);
```
::sp
```env
type = service_account
private_key = "-----BEGIN PRIVATE KEY-----\nMI
```
::sp
더 이상 특별한 것은 없다.
::sp 2