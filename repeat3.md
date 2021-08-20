# firebase 무료사용 한도 있음 초과하면 요금 내야함

# 주석을 자주 써서 내가 어떤 작업을 했는지 흔적을 남겨놓는게 중요하다.

# input required 넣을 시 -> 입력란 비어 있으면 "이 입력란을 작성하세요." 나옴
## 사용자들이 올바른 값을 input에 넣도록 validation하는 작업 필요
### input type=file은  value값이 경로이고, files로 접근해야 input에 넣은 file의 data가 나온다.

# animation은 css or jQuery로 해결하자

# 자식 부모 형제 DOM 접근 방법 
<!-- /* 
$().next()     // 바로 다음    (JS) nextSibling   ->   JS에서 nextSibling을 빈공간인 Tap으로 인식(jQuery가 더 편하게 다른 Dom에 접근할 수 있다.)
$().prev()     // 바로 전           previousSibling
$().parent()   // 내 부모           parentNode
$().parents()  // 내 조상들         parentNode
$().siblings() // 내 형제자매       
$().children() // 내 자식           childNodes
$().find()     // 내 자손           childNodes
*/ -->

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