# jih023.github.io

- 홈: https://jih023.github.io/
- 블로그: https://jih023.github.io/blog/

## 새 글 쓰기

**가장 쉬운 방법** — 블로그 홈(/blog/) 맨 아래 `+ 새 글 쓰기`를 누르면 GitHub 새 파일 화면이 오늘 날짜와 기본 양식이 채워진 채로 열려요. 파일 이름의 `new-post` 부분(글 주소가 됨)과 제목·본문만 바꾸고 **Commit changes**를 누르면 1~2분 뒤 사이트에 올라가요.

직접 만들 때는 `_posts/YYYY-MM-DD-주소.md` 파일을 만들고 맨 위에 아래를 붙이면 돼요.

```yaml
---
title: "글 제목"
date: 2026-11-18 19:00:00 +0900
categories: [Backend, Kafka]   # 왼쪽 메뉴 CATEGORIES에 묶여요
tags: [태그1, 태그2]            # 오른쪽 Trending Tags / TAGS 페이지
description: "목록 카드에 보일 한두 줄 요약 (생략 가능)"
---
```

- 글 주소는 `/blog/주소/` 가 돼요 (파일 이름에서 날짜 뒤 부분). 영문·숫자·하이픈 추천.
- 이미지는 `assets/img/` 에 올리고 `![설명](/assets/img/파일.png)` 로 넣어요.
- 날짜가 미래인 글은 그 시간이 지나야 보여요.

## 꾸미기

- 사이트 이름/소개: `_config.yml`의 `title`, `author`, `description`
- 프로필 사진: `assets/img/avatar.jpg`를 올리고 `_config.yml`의 `avatar`에 경로를 적어요
- 이메일 아이콘: `_config.yml`의 `email`
- 소개 페이지: `about.md`
- 디자인: `assets/css/style.css` (맨 위 색상 변수만 바꿔도 분위기가 바뀌어요)
- 주소 `/`는 `/blog/`로 바로 넘어가요 (`index.html`)

## 로컬에서 미리보기

```bash
bundle install
bundle exec jekyll serve
# http://localhost:4000
```
