# pager -> IntersectionObserver로 UI Change
## orderByChildren(), orederByValue() 를 쓰기위해서는 data들이 존재하는 공간에 ".indexOn": ["sort"] 선언해야 한다.
### orderByChildren('값'), orederByValue('값')로 정렬한 경우 기준점이 되는 값들을 설정하려면 정렬한 값을 이용해야한다.
### r.numbChildren() -> 데이터들의 length 즉 갯수를 알려주는 firebase database method이다.

# 현재 작업중인 것
## 우리가 직접 idx를 붙여서 순서를 붙여준다. -> ".indexOn": ["idx"] 선언
### 먼저 올린 데이터 다음의 데이터 부터 if + numChildren를 활용해 idx를 큰 것부터 줄여서 붙여준다. -> 마지막 데이터를 갖고와서 거기의 index값을 뽑아내 1을 뺀다음 다음에 넣을 데이터의 idx값에 넣어주는 논리

#### 현재 하고 있는 작업 -> intersectionObserver를 넣어주는 작업 