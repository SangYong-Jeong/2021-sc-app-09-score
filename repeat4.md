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