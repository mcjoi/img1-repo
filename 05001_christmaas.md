---
### essential info 
title: Christmas 2025
slug: 05001
date: 2025-12-22
cover: https://picsum.photos/800/400

### optional info 
# updated: 2025-12-22
# excerpt: 
category: life
tags:
  - food
draft: false
# order: 10
---


## 25년의 크리스마스 

as completely exposed.

&nbsp;
&nbsp;
&nbsp;

---  

After some Googling… of course, I realized I was the only one who hadn’t thought about handling these security issues.
&nbsp;  

I’m not sure what programming language the tutorials were for, but there are several ways to hide an API key that are easy to find online. However, I couldn’t find a post that explained a method that could be directly used in Flutter, so I got a bit lazy.
&nbsp;  

In the end, I had no choice but to follow whatever method I could. The easiest solution I found was using a `.env` file. I have no idea how secure this actually is, but at least Flutter has packages for `.env` files. I installed the `dot_env` package and tried testing it…

***

## Making Line Breaks (\n) Work in a .env File

Loading single values works fine, but loading an entire JSON object was tricky. There are several suggested solutions online, but with my limited experience, they only added confusion.  

I decided it would be easier to just call individual values, organize them into a map, and then encode them as a `JSON` file.  

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
&nbsp;

I carefully organized the individual values into Map. But unsurprisingly, I quickly ran into another problem: the private_key field in the Google API key requires line breaks (\n).    

How do you make the line breaks recognized…? I had no choice but to reopen Google and spent a long time searching.  

Surprisingly, the solution was simple: wrap the value in double quotes (" "), and the line breaks (\n) are recognized.  

My lack of understanding of `.env` files caused this expected fiasco. At least now, my API key information no longer appears in the `JS` files.  

```env
type = service_account
private_key = "-----BEGIN PRIVATE KEY-----\nMI
```

For now, that’s it.  

The End.  

&nbsp;
