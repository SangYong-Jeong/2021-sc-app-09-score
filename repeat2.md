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