# uuid(범용 식별자) -> uuid.js 파일을 이용해서 uuid v4 생성 가능

# onUploading, onUploadError, onUploaded, onSuccess, onError -> onsubmit 안에 이 함수들을 넣은 이유는 외부에서 쓰이지 않고 onSubmit에서만 쓰이는 변수들을 같이 쓰기 위함이다.

# video는 태그 달고 그안에 source를 만들어서 사용할 수 있다. 아니면 video 태그만으로도 가능 -> 웹에서 mp4는 다 돌아가는데 다른 확장자명은 안 돌아갈 수 있음. 
## video controls : 바가 생기고 시간 이동가능
## video autoplay : 자동재생 (muted 있을 때에만 가능)
## video muted : 음소거
## video loop : 무한반복

# child_added 이벤트가 콜백함수에 주는 인자는 data -> 그안에 data.key, data.val() 있음
## data.val()로 데이터베이스에 있는 데이터의 값에 접근 가능

# String에서도 사용가능한 메서드 -> 문자열indexOf('문자열') -> (문자열)이 문자열의 어느 부분에서 시작하는지 값을 줌 없으면 -1

# container는 1em의 좌우 패딩을 갖고 있다. + 반응형 처리도 되어있음

# row를 부모에게 주면 자식들이 flex 된다. row는 12칸으로 나뉘어져 있음 row되면 container padding 없어짐

# col은 row에 들어가는 칸을 의미 (d-lg-none lg size에서 display: none;)
## col은 전체 기준  반응형 size: col-sm, col-md, col-lg, col-xl  (w3c 사이트에 정확한 size 나와있음 bootstrap learn 들어가서 grid size 확인) 
### link -> https://www.w3schools.com/bootstrap4/bootstrap_grid_system.asp

# html 특수 기호들 존재 ex) &laquo; (<<), &lt; (<) ...

# table에서는 vertical align으로 세로 정렬 가능

# Design Google -> Material Icons에서 Icon 사용 가능 -> class or img or 유니코드( &에 code 붙여서 작성 )로 사용 가능

# jQuery -> 이벤트를 브라우저 띄우자마자 발생시켜주는 method = trigger('이벤트')

# resize 이벤트 적용해서 높이 맞추기