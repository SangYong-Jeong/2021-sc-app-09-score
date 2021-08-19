# uuid(범용 식별자) -> uuid.js 파일을 이용해서 uuid v4 생성 가능

# onUploading, onUploadError, onUploaded, onSuccess, onError -> onsubmit 안에 이 함수들을 넣은 이유는 외부에서 쓰이지 않고 onSubmit에서만 쓰이는 변수들을 같이 쓰기 위함이다.

# video는 태그 달고 그안에 source를 만들어서 사용할 수 있다. 아니면 video 태그만으로도 가능 -> 웹에서 mp4는 다 돌아가는데 다른 확장자명은 안 돌아갈 수 있음. 
## video controls : 바가 생기고 시간 이동가능
## video autoplay : 자동재생 (muted 있을 때에만 가능)
## video muted : 음소거
## video loop : 무한반복
