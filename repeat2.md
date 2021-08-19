# uuid(범용 식별자) -> uuid.js 파일을 이용해서 uuidv4()로 uuid 생성 가능

# onUploading, onUploadError, onUploaded, onSuccess, onError -> onsubmit 안에 이 함수들을 넣은 이유는 외부에서 쓰이지 않고 onSubmit에서만 쓰이는 변수들을 같이 쓰기 위함이다.
## onUploading 이벤트는 현재 업로딩 되고 있는 상태를 인자로 업로딩 되면서 보내준다.
## onUploaded 이벤트는 인자를 콜백함수에 보내주지 않는다.
### upfile = onUploading이 보내주는 인자; upfile.ref.getDownloadURL().then(onSuccess).catch(onError); -> ref는 내가 보내는 파일이 저장된 위치를 의미한다. getDownloadURL() 메서드는 내가 보내는 파일의 위치에서 다운로드 받을 수 있는 URL 정보를 받아오는 역할을 한다. 이후 promise절을 이용해 DownloadURL을 잘 받아 왔는지 아닌지 확인한다는 의미 -> getDownloadURL()을 통해 받는 DownloadURL은 onSuccess의 인자로 들어가게 된다.

# if(err.code === 'storage/unauthorized') location.href = '../403.html' -> err 발생시 err.code가 'storage/unauthorized'일 경우 location.href = '../403.html' // -> 클라이언트가 서버에 다시 요청하고 서버 경로에 있는 '../403.html' 파일을 보여줘 하는것(원래 요청한거에서 위로 올라가 403.html 파일을 보여준다고 생각됨)


# video는 태그 달고 그안에 source를 만들어서 사용할 수 있다. 아니면 video 태그만으로도 가능 -> 웹에서 mp4는 다 돌아가는데 다른 확장자명은 안 돌아갈 수 있음. 
## video controls : 바가 생기고 시간 이동가능
## video autoplay : 자동재생 (muted 있을 때에만 가능)
## video muted : 음소거
## video loop : 무한반복

# child_added 이벤트가 콜백함수에 주는 인자는 data -> 그안에 data.key, data.val() 있음
## data.val()로 데이터베이스에 있는 데이터의 값에 접근 가능

# String에서도 사용가능한 메서드 -> 문자열indexOf('문자열') -> (문자열)이 문자열의 어느 부분에서 시작하는지 값을 줌 없으면 -1

# th한테만 size를 주면 td들은 따라온다 

# user-select는 글씨 긁히는거 허용 하는거 즉 드래그 할 수 있게 하는것 -> user-select: none;을 주면 드래그 긁히는 것을 없앨 수 있다.

# pager형태는 bootstrap에서 가져올 수 있다. bootstrap이 주는 css를 변형해 변경하는 것도 가능하다.

# container는 1em의 좌우 패딩을 갖고 있다. + 반응형 처리도 되어있음

# row를 부모에게 주면 자식들이 flex 된다. row는 12칸으로 나뉘어져 있음 row되면 container padding 없어짐

# col은 row에 들어가는 칸을 의미 (d-lg-none lg size에서 display: none;)
## col은 전체 기준  반응형 size: col-sm, col-md, col-lg, col-xl  (w3c 사이트에 정확한 size 나와있음 bootstrap learn 들어가서 grid size 확인) 
### link -> https://www.w3schools.com/bootstrap4/bootstrap_grid_system.asp
#### (간단한 것들은 col을 통해 반응형을 주면 편하다. 복잡한 것은 css파일의 @media를 이용하는 것이 좋다. 반응형 크기를 직접적으로 줄 수 있고 핸들링 하기 편하기 때문)
##### bootstrap -> col은 (모바일 -> 웹으로 만들어가는 과저을 만들어준다고 생각하면 된다.) 

# html 특수 기호들 존재 ex) &laquo; (<<), &lt; (<) ... (검색하면 나옴)

# table에서는 vertical align으로 세로 정렬 가능

# Design Google -> Material Icons에서 Icon 사용 가능 -> class or img or 유니코드( &에 code 붙여서 작성 )로 사용 가능
## class로 이용할 시 사용법 -> 유니코드 만들 tag의 class에 "material-icons"를 붙여준다. 이후 태그 안에 구글에서 제공하는 icon 폰트 두번째 칸에 있는 이름을 그대로 써준다.
### icon들은 tage 안에 들어가 있는 것으로 판정 된다.

# jQuery -> 이벤트를 브라우저 띄우자마자 발생시켜주는 method = trigger('이벤트')

# resize 이벤트 적용해서 높이 맞추기

# jQuery show() 적용할 때 Dom에 (css파일 display: flex; + 인라인css display: none;)된 경우 인라인 css 죽이고 css파일 css 살리면서 show()가 적용된다. 

# 높이를 맞추는 기술로 minheight: calc(100vh - ''px);가 있다.