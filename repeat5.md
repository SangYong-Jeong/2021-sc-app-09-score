# firebase 무료사용 한도 있음 초과하면 요금 내야함

# 주석을 자주 써서 내가 어떤 작업을 했는지 흔적을 남겨놓는게 중요하다.

# input required 넣을 시 -> 입력란 비어 있으면 "이 입력란을 작성하세요." 나옴
## 사용자들이 올바른 값을 input에 넣도록 validation하는 작업 필요
### input type=file은  value값이 경로이고, files로 접근해야 input에 넣은 file의 data가 나온다.

# animation은 css or jQuery로 해결하자

# 자식 부모 형제 DOM 접근 방법 
1) $().next()     // 바로 다음    (JS) nextSibling   ->   JS에서 nextSibling을 1)빈공간인 Tap으로 인식(jQuery가 더 편하게 다른 Dom에 접근할 수 있다.)
2) $().prev()     // 바로 전           previousSibling
3) $().parent()   // 내 부모           parentNode
4) $().parents()  // 내 조상들         parentNode
5) $().siblings() // 내 형제자매       
6) $().children() // 내 자식           childNodes
7) $().find()     // 내 자손           childNodes


# input.blur() -> input이 focus를 가졌다가 잃는것 -> blur event도 존재

# key 관련 이벤트는 down, press, up이 있다. (js, jQuery 둘 다 있음.)
## keydown -> 키를 누르기 시작
## keypress -> 키가 완전히 눌렸을 때
## keyup ->  키가 눌리고 올라올 때

# 이벤트 여러개에 같은 콜백함수를 줘서 핸들링 가능

# change event 값이 바뀐다면

# input type="file" -> input.files.length 를 이용해서 분기 나눠서 핸들링 가능

# jpg, jpeg는 같은것 -> 확장자명만 3글자로 맞추기 위해 jpg는 용량 줄여줌 칼라줄여서 픽셀 줄이므로

# 확장자명으로 validation하는 것은 보안 위협 존재

# IT 경력증명서 중요!! -> 담당업무, 몇개월 했는지  -> www.sw.or.kr 이 곳에서 경력관리 신청하고 만약 퇴사시 경력증명서 뽑아 제출해 관리 계속하기

# db.push({넣을내용}).key; (.key를 넣지 않아도 리얼타임 데이터베이스 데이터는 key값으로 들어가게 된다.)

# 1. 실시간 이벤트 -> socket.io 기술 
1) db.on('child_added', onAdded); -> 그안에 data들이 더해지면 onAdded 실행
2) db.on('child_changed', onChanged); -> 그안에 data들이 수정되면 onChanged 실행       
3) db.on('child_removed', onRemoved); -> 그안에 data들이 지워지면 onRemoved 실행

# 2. 사용자 이벤트 -> 한 번 이벤트가 발생하고 마는 것
1) db.push({ 넣을내용 }).key; -> 데이터 넣기
2) db.child('key값').remove(); -> 데이터 지우기
3) db.child('key값').set({바뀔내용}); -> 빈 객체 넣으면 삭제됨 -> 데이터 수정
4) db.get().then(onGet).catch(onError); // 모든데이터 가져오기
5) db.ordeByKey().get().then(onGet).catch(onError); // 모든 데이터를 key 오름차순으로 가져오기
6) db.ordeByKey().once().then(onGet).catch(onError); // 모든 데이터를 key 오름차순으로 한번만 가져오기 -> 메모리에 저장 안됨
7) db.ordeByChild('readnum').get().then(onGet).catch(onError); // readnum으로 정렬 -> firebase는 정렬이 무조건 오름차순으로 되어있다. 내림차순으로 만들려면 따로 작업이 필요하다.
8) db.orderByKey().limitToFirst(5).get().then(onGet).catch(onError); // 맨 처음부터 몇개 -> limitToFirst는  앞에 orderBy로 정리 해줘야 사용 가능
9) db.orderByKey().limitToLast(5).get().then(onGetLast).catch(onError); // 맨 뒤에서부터 몇개

# index.js 구조 
## 전역변수
```js
var auth = firebase.auth(); -> login 위해 auth 객체 받기
var googleAuth = new firebase.auth.GoogleAuthProvider(); -> 구글로그인 불러오기 위해
var firebaseDatabase = firebase.database(); -> database 객체 리턴
var firebaseStorage = firebase.storage(); -> 스토리지 객체 리턴
var user = null; -> validation 위해 user 전역변수 설정
var db = firebaseDatabase.ref('root/board'); -> realtime-database의 root/board를 db로 변수 설정 -> ref는 두번 이상 쓸수 없다. ref 쓴 이후로는 child로 아래 파일 접근해야한다.
var storage = firebaseStorage.ref('root/board'); -> storage의 root/board 파일을 변수로 선언
var allowType = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4']; -> upfile 검증을 위해 집어넣는 파일의 타입을 변수로 선언
``` 

## elemet init -> 자바스크립트로 짤 경우 element들을 변수로 선언해 놓아야 간략하고 가독성이 좋게 짤 수 있다. 이 경우 나중에 잊어버릴 수 있으므로 element 변수 선언시 주석으로 표시해 놓아서 나중에 봐도 빠르게 remind 할 수 있게 만들어 놓는 게 중요하다.

## event-init 
### auth를 위해 auth객체의 onAuthStateChanged(콜백함수) 이벤트 설정 이 이벤트시 실행되는 콜백함수는 user 정보를 인자로 받는다. 이경우 googleAuth

### 로그인과 로그아웃을 위해 로그인/로그아웃 버튼에 클릭 이벤트 설정 로그인 시 auth.signInWithPopup(googlAuth);를 이용해 구글 팝업 띄우고 로그인한다. 로그인 되면 구글로부터 user정보가 넘어오고 이는 곧 authStateChanged 된것이므로 onAuthStateChanged이벤트 안에 넣어놓은 콜백함수가 실행되고 여기에 user 정보가 인자로 들어가게 된다. 로그아웃의 경우 auth.signOut();를 실행해 구글로부터 user 정보를 null 값을 받는다. -> 이를 이용해서 로그인/로그아웃 버튼을 나타내거나 지울 수 있다. (선생님 파일 그림 참조)

### 모달창을 열고 닫는 이벤트 설정 -> 글작성 버튼 클릭시 모달창 생성, 모달창 생성 후 오른쪽위에 나오는 X표시 클릭시 모달창이 닫힌다.

### form과 form에 있는 구성요소들만 name으로 접근 가능

#### arr의 메서드 중 reverse(); -> 배열이 갖고있는 요소들의 순서를 거꾸로 만드는 메서드이다.

# 동기, 비동기 개념은 es6들어가면서 명확하게 알 수 있을듯

## break문은 forEach메서드에서 사용할 수 없다!!
# 반응형때문에 width가 변하므로 padding-top으로 16:9비율 유지하는 trick을 사용할 수 없다. 따라서 list안에 박스를 넣어 padding-top을 주면 width가 변해도 padding-top 역시 변하므로 같은 비율을 계속 유지해 줄 수 있다. // globalKey는 list-wrapper로 가면 null값으로 초기화 시켜주고 view-wrapper 들어갈때만 globalkey에 view-wrapper data의 키값을 넣어준다.

