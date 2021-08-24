# pager -> IntersectionObserver로 UI Change
## orderByChildren(), orederByValue() 를 쓰기위해서는 data들이 존재하는 공간에 ".indexOn": ["sort"] 선언해야 한다.
### orderByChildren('값'), orederByValue('값')로 정렬한 경우 기준점이 되는 값들을 설정하려면 정렬한 값을 이용해야한다.
### r.numbChildren() -> 데이터들의 length 즉 갯수를 알려주는 firebase database method이다.

# 현재 작업중인 것
## 우리가 직접 idx를 붙여서 순서를 붙여준다. -> ".indexOn": ["idx"] 선언
### 먼저 올린 데이터 다음의 데이터 부터 if + numChildren를 활용해 idx를 큰 것부터 줄여서 붙여준다. -> 마지막 데이터를 갖고와서 거기의 index값을 뽑아내 1을 뺀다음 다음에 넣을 데이터의 idx값에 넣어주는 논리

#### 현재 하고 있는 작업 -> intersectionObserver를 넣어주는 작업 

## firebase.ref()에서 data를 갖고오는건 한 번 더 포장되어 있는 형태이다. 따라서 받은 데이터 r안에 v값을 forEach문으로 뽑아내 데이터를 핸들링한다.
### firebase.ref().child('data')에 바로 접근하는 경우에는 onSuccess를 통해 받는 r이 바로 곧 위 데이터의 v이다. 따라서 바로 r로 핸들링하면 된다. 

## 아직 안 배운 개념인데 html에서 다른 html로 query를 get방식으로 보내는 경우 query를 받는 html이 처리하지 못한다. 즉, client는 client가 보낸 query를 처리하지 못한다. (그래서 server가 필요하다. 프론트단에서 데이터 요청, 응답이 안된다고 보면 될듯) -> 우리가 보내는 query에 대한 응답을 받을려면 server로 보내야 한다.


# 1교시 내용 : UI 부분 구현 -> html, css, 간단한 js 이용 , viewShow() -> switch/case문을 통해 case별로 보여야할 page 설계

# 2교시 내용: 간단한 UI단 JS 주기 -> 이전글, 다음글 기능 구현을 위해 KEY값을 찾는 로직 설계 (key값 이용하는 태그에 dataset['key']값을 다 던져준다)
## firebase는 sort가 무조건 오름차순밖에 안되서 이용하기가 매우 까다롭다. (마음대로 data를 handling하는게 쉽지 않음)
### saveAfter() 함수를 이용해 data를 push하고 난 뒤 list-page로 바로 이동하게 설계 -> 컴포넌트 분리 개념

# 기능이 틀려지면 함수를 만드는게 좋다.

## firebase의 경우 가져오려는 data를 직접적으로 하나 가져오는 경우 -> 데이터가 곧바로 오기 때문에 forEach 쓸 필요없이 바로 data.key, data.val()에 접근하면 된다.

### 3교시 내용 중 key point -> firebase를 이용한 sorting 시 index기준 확인 잘 하기 || endAt, startAt에서 2개씩 데이터를 가져온뒤 현재 키값이면 if문 통과 못하게 조건을 짜서 prev, next 값 구해냈다. (이 prev와 next라는 변수에 이전글, 이후글 key값을 넣어서 바로 이동하고 그 key값으로 다시 이전글, 이후글 불러올수 있게만들었다. (주의할점) -> 맨마지막 또는 맨 처음 글인 경우 이후 또는 이전글이 없기때문에 key 값이 존재하지않는다. 이경우 조건문에 추가적으로 이후글 이전글의 키값이 존재하는지 물어보는 조건을 추가했다. false면 if문을 빠져 나가고 prev에는 null이 들어간다. 따라서 setNavi 함수에서 if문을 통과 못한 후 else로 가게되고  이전 또는 이후글이 없다는 문자열이 브라우저에 나오게 된다.)

# 현재 짜고 있는 방식은 절차지향 방식이다.

## globalKey를 이용해서 -> login시 수정, 삭제 button이 뜨도록 handling -> view-wrapper에 들어가게 되면 globalKey의 값에 현재 view-wrapper에 나오고 있는 data의 키값이 들어오게 설계했다. LIST로 돌아가는 경우에는 viewShow함수에서 globalKey를 null값을 주어 초기화를 시킨다. 즉, view-wrapper에 들어가있는 경우에만 globalKey에 key값이 존재하는것이다. 또한 view-wrapper에 들어가야만 수정, 삭제 버튼이 뜨도록 추가 설계를 했다.

## readcnt 늘리는 논리 -> 이미 readcnt를 갖고 있는 친구들을 view-wrapper로 가면 늘어나게 readcnt를 갖고있지않으면 1이 되게 로직을 짠다.
## readcnt는 list-wrapper로 돌아갈때 데이터들을 다시 불러오므로 view-wrapper가 아닌 list-wrapper에서 적용된다.
### 따라서 list-wrapper로 돌아갈때 데이터들을 다시 불러오는 작업을 해줘야한다.

## 지금 수정부분 작업중

## 오늘 복습 5교시 + 6교시 초반 없음

## 항상 주의해야할 것이 null 값을 객체로 보고 속성에 접근하면 아예 error가 떠버린다. 이거는 주의해야한다.

## bootstrap 덮어쓸 때에는 값들과 점수를 보면서 덮어써줘야 한다. 잘못 보면 못 덮을수도 있음

# String의 method -> substr, substring
## substr ->  substr(시작idx, 시작idx포함해서 retrun할 갯수) -> return 문자열
## substring -> substring(시작idx, 끝idx) -> 시작idx부터 끝idx의 앞의 문자까지 -> return 문자열

## 작업할때 함수 하나하나에 주석처리를 해 구분 짓는게 좋다. 
##  HTML에 주는 EVENT는 이벤트인자를 받지 못한다. 왜냐하면 js 함수 불러오는것이기 때문

### btSave를 이용해 작성, 수정 예정 (공통사항: 수정버튼과 삭제버튼 둘 다 view-wrapper에 들어가자마자 dataset에 key 값을 주었다.)

## confirm은 확인을 누르면 true 리턴 , 취소를 누르면 false를 리턴

# data -> 삭제 논리
## 수정 button 옆에 나오는 삭제 button에 이벤트를 주었다. -> 현재 삭제버튼의 dataset['key']안에는 view-wrapper에 나와있는 data의 key값이 들어있다.
### 삭제버튼에 클릭시 onDelete이벤트가 실행되도록 만들었다. 삭제버튼에 담겨있는 dataset의 key값으로 view-wrapper에 나온 data의 값을 불러내고 로그인 했는지 그리고 database에 넣어놓은 uid값가 user의 uid가 같은지 비교해 같다면 그리고 db안에 upfile 즉, 파일을 업로드 했다면 파일을 storage에서 지워주고(removeFile을 통해), db에 있는

# data -> 수정 논리
##


## firebase로 게시판 만드는거는 힘들다.(data handling이 힘들다. - sort가 어렵기 때문 but 채팅 짜는거는 괜찮음)
### NoSQL -> simple한 경우에는 좋다. (logger 정도 -> 형식이 들쭉날쭉한 data를 넣는 용도)
### SQL -> 핸들링 + 형식이 정해져있는 DATA의 경우에는 SQL이 좋다. 

# input[type="hidden"] -> 존재는 하지만 브라우저상에는 보이지 않는 input이다. 이를 이용해 값을 넣어줄수 있다. 즉, 특정값을 넣고 뽑아내 사용할 수 있는 용도가 존재한다.

# 절차지향은 하나의 파일에 모든것들을 절차순으로 담는 것이다. -> 간단한 내용을 구현하는데는 효과적이다. 하지만 코드가 길어질수록 유지보수가 힘들어지게된다. 어떤 부분이 문제인지 알기위해서는 순서대로 하나하나씩 다 보면서 흐름을 파악해야 하기 때문에
## 이러한 절차지향의 단점을 개선한 방법이 객체지향, 함수지향 방식이다. 함수지향같은 경우에는 모든 함수를 기능별로 세세하게 설계하고 전역변수를 안쓰는 순수함수로 설계하는것이다. 객체지향같은 경우에는 특정 부분 부분들을 하나의 파일로 만들어 설계하는 방식이다. 이렇게 설계하는 경우 코드는 더 길어지게 되지만 컴포넌트별로 구분짓기 때문에 유지보수가 간편하고 재사용이 쉽다는 장점이 있다.


