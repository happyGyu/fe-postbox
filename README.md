# 📮 __빨간 우체통 찾기__

## [데모페이지](https://happygyu.github.io/fe-postbox/)
***
## 🗓 __기간__
22.03.07 ~ 22.03.11 (1주일)

## 🛠 __프로젝트 요약__
- Vanilla JS
- 페어 프로그래밍 ([규칙](https://alabaster-silica-d08.notion.site/3-0ffc75f8c5a64739b97e8ecd96c51f89))
- __랜덤하게__ 깊이가 __무한한__ 노드를 생성
- __무한(?)한__ 노드를 탐색하는 API 개발
***

## 🧑‍💻 __구현 내용 상세__ 👩‍💻

<details>
   <summary>Step1 </summary>
   <div markdown="1">       

   1. 랜덤 마을 배치
      - 랜덤 크기를 구현하기 위해 가로 크기를 상위 마을 크기 기준으로 부여했습니다.
      - 랜덤 배치를 구현하기 위해 마진을 상위 마을 크기 기준으로 부여하고 display flex와 wrap을 사용했습니다.
      - 랜덤한 크기와 마진을 가진 마을이 wrap에 의해 겹치지 않고 자연스럽게 무작위 공간에 배치되기 위함.

   2. 마을 안에 마을 구현
      - 마을 생성을 재귀적으로 구현하여 이론상 무한 마을이 가능하도록   하였습니다.
      - 마을 최소 크기를 기준으로 재귀를 종료하여 생성되는 마을의 층이  다양하도록 하였습니다.
      - 다만, 지나치게 많은 수가 생성되지 않도록 하기 위해 같은 층에 생성되는    마을의 갯수를 maxSibilingTownNum으로 제한했습니다.
   </div>
</details>
<details>
   <summary> 
      Step2 
   </summary>
   <div markdown="2">
   
   1. 우체통 찾기 구현
      -  배열에 담긴 자식 마을들을 순회하며 우체통이 존재하는지 확인
      -  우체통 존재 여부 확인이 끝나면 자식 마을 배열을 재귀함수의 매개변수로 전달
      -  콜백큐에는 같은 깊이의 마을들이 순차적으로 쌓이므로 bfs 알고리즘으로서 구현됨.
2. querySelector 구현
   -  tagName, className, id 전부 처리할 수 있도록 구현
   -  탐색을 시작할 엘리먼트를 입력받아 자식 엘리먼트가 있으면 탐색을 재귀적으로 수행하는 dfs 알고리즘을 활용
   -  클래스가 여러개인 엘리먼트를 고려하여 현재 탐색하고 있는 엘리먼트 속성값을 공백을 기준으로 배열에 나누어 담아 query의 존재 여부를 확인함
3. sort(삽입 정렬) 구현
   -  JS의 sort함수처럼 정렬의 기준이 되는 콜백함수를 받을 수 있도록 구현
   -  깊이가 무한한 마을을 탐색한다고 가정했을 때, 한 계층을 탐색한 후 우체통의 정보들을 업데이트 한다.
      삽입 정렬은 실시간으로 입력받은 데이터가 중간에 삽입되어 정렬되어야 할 때 유리하므로 이를 활용하였다.       
   </div>
</details>

***
## 💡 __구현할 때 고민했던 것__
<details>
   <summary>깊이가 무한인 마을을 탐색하려면?</summary>
   <div markdown="1">

   - 미션 설명에 '마을안에 마을은 무한대로 존재할 수 있다' 라는 조건을 나름대로 해석
   - 데이터가 무한인 경우가 있을까? 
      -  탐색해야할 데이터가 굉장히 많아서 탐색을 마치고 결과를 내어 놓기까지의시간이 아주 길다면 그것이 사용자에게는 '무한'처럼 느껴질 것이다. 
      -  그렇다면, 탐색이 전부 끝나지 않았더라도 중간중간 사용자에게 결과를 보여줄 수있도록 해야겠다! 
   - bfs를 비동기로 수행해야한다
      -  깊이가 무한이기 때문에 dfs보단 bfs가 합리적이라고 판단.
      -  bfs탐색을 layer단위로 단계를 나눠 delay(0)을 이용해 Task queue로 넘겼다가실행 --> 탐색이 끝날 때까지 callstack을 점유하는 것을 방지하고 콜스택이 비는순간 렌더링을 가능하게 함
   - 중간 결과 업데이트
      -  renderFindResult()는 탐색 시작 전에 미리 일정 시간    delay를 걸어두고 실행예약
      -  delay 이후에 태스크 큐에 renderFindResult()가 태스크큐에    재귀적으로추가될 것이므로 delay가 실행시점을 보장하지는 않음
      -  updatePostbox()는 현재 노드의 자식들 수만큼 재귀적으로   자기를 호출해태스크큐에 넣으므로 태스크큐에 작업이 많이 쌓일 수    있음 -->renderFindResult가 원하는 시점보다 느리게 호출될 수   있음.  
      -  원래 로직대로라면 업데이트 과정이 layer마다 반복적으로   수행되어야하지만,이번 미션에서 전체 탐색 작업은 2초보다 훨씬 이전에   끝나므로 임의로 한번만수행하게 해둠....
   -  micro 태스크 큐 & macro 태스크 큐
      -  Promise는 micro 태스크큐에 콜백을 등록, setTimeout은  macro 태스크큐에콜백을 등록
      -  이벤트루프가 callstack에 작업을 전달할 때 micro태스크큐가   macro보다우선순위가 높음
      -  그렇기 때문에 setTimeout함수만 사용했을 때와 Promise로   setTimeout을 감싸delay 함수를 만들어 사용했을 때 두    태스크큐간의 우선순위로 인해 로직 수행순서에 차이가 생길까    고민했으나... --> 그림을 그려보며 따져보니 결국 매크로태스크큐에    담기게 될 것이므로 대동소이......한 것 같음
   <div>
</details>

<details>
   <summary>insertion sort를 선택한 이유</summary>
   <div markdown="1">

   -  위 고민에서 정리한 이유로, 원래대로라면 renderFindResult()는 탐색 중간중간 실행되며 update된 내용을 반영한다. 
   -  추가로 찾은 우체통을 반영하여 정렬할 때는 이미 정렬된 배열에 추가하는 것이므로 삽입 정렬이 유리하다고 판단(구현도 쉽고...)
   -  단, 첫 정렬은 merge sort나 quick sort같이 더 빠른 알고리즘을 사용한 후 그 다음부터 삽입정렬을 사용하는 것이 성능적으로 우수할 수 있을 듯..(여기까진 구현 X)
<div>
</details>
<details>
   <summary>this bind</summary>
   <div markdown="1">

   - 객체의 메서드를 콜백함수로 사용할 때, 객체와의 연결성이 사라져 this가 달라짐
   - 콜백함수로 객체의 메소드를 그냥 넣어주면, this.메서드를 콜백에 등록할 때 this는 객체를 의미하나 태스크큐에 담긴 this.메서드가 실행되면 그때의 실행컨텍스트에서 this는 undefined를 가리킴.
   - 이를 해결하기 위해 함수 선언시 this가 결정되는 화살표 함수를 사용하여 콜백에 등록할 때 this.메서드의 내부의 this를 객체로 바인딩함. 
   - `promise().then(this.메서드)` -> `promise().then(()=>{this.메서드()})`
<div>
</details>
<details>
   <summary>네이밍</summary>
   <div markdown="1">

   - 이번 페어프로그래밍에서 줄글처럼 자연스럽게 읽히는 코드를 작성하고 싶었습니다.
   - 의미가 명확한 네이밍을 생각하다보니 지나치게 이름이 길어지는 경우가 있었습니다.
   - Math.random() \* (긴 이름 - 긴 이름) + 긴 이름 같은 경우 읽기가 부담스럽기도 하여 util 함수로 만들어주었습니다.
<div>
</details>
<details>
   <summary>노드 추가 방식</summary>
   <div markdown="1">

   - 노드를 생성할 때 템플릿 문자열로 넣어줄지 appendChlid와 같은 DOM API를 사용할지 고민했습니다.
   - 한번에 템플릿을 모아 innerHTML로 넣어주면 DOM 조작을 한번만 하면 된다는 장점이 있지만 각 마을 노드에 class와 style 속성을 부여하기에는 DOM API메서드를 사용하는 것이 더 유리하다고 생각하여 DOM API 메소드를 사용했습니다.
<div>
</details>

***
## 🙋‍♀️ __Members__ 🙋‍♂️

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/mogooee">
        <img src="https://avatars.githubusercontent.com/u/92701121?v=4" width="150px;" alt="Dotori"/><br />
        <sub><b>Dotori</b><br></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/happyGyu">
        <img src="https://avatars.githubusercontent.com/u/95538993?s=400&u=142c62a8238fbfd3a3e46976651dbc991cafc088&v=4" width="150px;" alt="Alan"/><br />
        <sub><b>Alan</b><br></sub>
      </a>
    </td>
  </tr>
</table>

***

