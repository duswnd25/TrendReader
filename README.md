# Trend Reader

> 트랜드 읽어주는 서비스 국내 IT 기술 블로그를 모아서 보여줍니다.

[![Known Vulnerabilities](https://snyk.io/test/github/duswnd25/trendreader/badge.svg)](https://snyk.io/test/github/duswnd25/trendreader)
[![codebeat badge](https://codebeat.co/badges/5f22107e-09b4-4221-8fa3-fb7f3a4b6b71)](https://codebeat.co/projects/github-com-duswnd25-trendreader-master)

# 사용법

## 파싱

> /api/data/parse/:blogId

```
ex 1 : ~/api/data/parse/all

ex 2 : ~/api/data/parse/aws
```

## 강제 업데이트

> /api/data/parse/force_update/:blogId

새 데이터유무에 관계없이 최신글을 저장합니다.

```
ex 1 : ~/api/data/parse/force_update/aws
```

## 데이터 삭제

> /api/data/remove/:blogId

```
ex 1 : ~/api/data/remove/aws
```

## 읽기

blogId 에 해당하는 데이터
> /api/data/read/blog/:blogtId

```
ex 1 : ~/api/data/read/blog/aws
```

해당 태그를 포함하는 데이터
> /api/data/read/category/:category

```
ex 1 : ~/api/data/read/category/tech
```

# 지원 블로그 목록

## 기업 & 단체 [24]

 |  블로그명  | Blog ID | 대표 서비스 | 
 | :-------: | :----: | :----: | 
 | 애드투페이퍼 | add2paper | 애드투페이퍼 | 
 | 아마존 웹서비스 | aws | AWS | 
 | 블록체인 | blockchain |  | 
 | 네이버 D2 | d2 | 네이버 | 
 | 드라마 앤 컴퍼니 | drama | 리멤버 | 
 | 구글 코리아 | google_korea | 구글 | 
 | 나는 프로그래머다 | iamprogrammer |  | 
 | 잔디 | jandi | 잔디 | 
 | 카카오 | kakao | 카카오톡 | 
 | 레진 | lezhin | 레진 코믹스 | 
 | 린치핀 | linchpin |  | 
 | 라인 | line | 라인 | 
 | 레이니스트 | rainist | 뱅크샐러드 | 
 | Realm | realm | Realm DB | 
 | SK | sk | SK | 
 | 스포카 | spoqa |  | 
 | StyleShare | styleshare |  | 
 | 티몬 | tmon | 티몬 | 
 | Tyle | tyle | Tyle | 
 | Unity | unity | Unity Engine | 
 | VCNC | vcnc | 비트윈 | 
 | WIT | wit |  | 
 | 우아한형제들 | woowabros | 배달의 민족 | 
 | 이상한 모임 | weirdx | 배달의 민족 | 

# 개인 [2]

 |  블로그명  | Blog ID | 
 | :-------: | :----: | 
 | 유용우 | luckyyowu | 
 | 아웃사이더 | outsider | R