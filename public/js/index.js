/************* Global init ***************/
var auth = firebase.auth();
var googleAuth = new firebase.auth.GoogleAuthProvider();
var firebaseDatabase = firebase.database();
var firebaseStorage = firebase.storage();
var user = null;
var db = firebaseDatabase.ref('root/board');
var storage = firebaseStorage.ref('root/board'); 


/************* element init ***************/
var btSave = document.querySelector('.write-wrapper .bt-save');      // 글작성버튼    /* 주석을 자주 이용해서 정리해 놔야 나중에 볼 때 편함 */
var btLogin = document.querySelector('.header-wrapper .bt-login');   // 로그인버튼 
var btLogout = document.querySelector('.header-wrapper .bt-logout'); // 로그아웃버튼
var btWrite = document.querySelector('.list-wrapper .bt-write');     // 글작성 모달창 오픈 버튼
var writeWrapper = document.querySelector('.write-wrapper')          // 글작성 모달창
var writeForm = document.writeForm;                                  // 글작성 form


/************* user function *************/



/************* event callback ************/
// onAuthStateChanged 
function onAuthChanged (r) { // login, logout 상태가 변하면...
	user = r;
	if (user) { // 로그인 되면 UI가 할일
		btLogin.style.display = 'none';
		btLogout.style.display = 'block';
	}
	else { // 로그아웃 되면 UI가 할일
		btLogin.style.display = 'block';
		btLogout.style.display = 'none';
	}
}

function onLogin() { // btLogin이 클릭되면
	auth.signInWithPopup(googleAuth);
}

function onLogout() { // btLogout이 클릭되면
	auth.signOut();
}

function onWrite() { // 모달창이 오픈되면...
	$(writeWrapper).stop().fadeIn(300);
	writeForm.title.focus();
}

function onWriteSubmit(e) { // btSave클릭시 (글 저장시) ,  validation 검증
	e.preventDefault();
	var title = writeForm.title.value.trim();
	var writer = writeForm.writer.value.trim();
	var upfile = writeForm.upfile.files;
	var content = writeForm.content.value.trim();
	if(title === '') {
		
	}
	if(writer === '') {

	}
}

/************* event init ****************/
auth.onAuthStateChanged(onAuthChanged);
btLogin.addEventListener('click', onLogin);
btLogout.addEventListener('click', onLogout);
btWrite.addEventListener('click', onWrite);
writeForm.addEventListener('submit', onWriteSubmit);

/************* start init ****************/