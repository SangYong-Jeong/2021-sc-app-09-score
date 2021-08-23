/* 
$().next()     // 바로 다음    (JS) nextSibling
$().prev()     // 바로 전           previousSibling
$().parent()   // 내 부모           parentNode
$().parents()  // 내 조상들         parentNode
$().siblings() // 내 형제자매       
$().children() // 내 자식           childNodes
$().find()     // 내 자손           childNodes

firebase data 처리
1. 실시간
db.on('child_added', onAdded);             // return 추가된 데이터
db.on('child_changed', onChanged);         // return 수정된 데이터
db.on('child_removed', onRemoved);         // return 삭제된 데이터
2. 이벤트에 의해서...
db.push().key                              // 데이터 저장
db.set({})                                 // 데이터 수정
db.remove()                                // 데이터 삭제
db.get()                                   // 데이터 가져오기
*/

/************* Global init ***************/
var auth = firebase.auth();
var googleAuth = new firebase.auth.GoogleAuthProvider();
var firebaseDatabase = firebase.database();
var firebaseStorage = firebase.storage();
var user = null;
var db = firebaseDatabase.ref('root/board');
var ref = db.orderByChild('idx');
var storage = firebaseStorage.ref('root/board'); 
var allowType = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
var exts = ['../img/jpg.png', '../img/png.png', '../img/gif.png', '../img/video.png'];

/************* element init ***************/
var btSave = document.querySelector('.write-wrapper .bt-save');            // 글작성버튼    /* 주석을 자주 이용해서 정리해 놔야 나중에 볼 때 편함 */
var btLogin = document.querySelector('.header-wrapper .bt-login');         // 로그인버튼 
var btLogout = document.querySelector('.header-wrapper .bt-logout');       // 로그아웃버튼
var btWrite = document.querySelector('.list-wrapper .bt-write');           // 글작성 모달창 오픈 버튼
var btClose = document.querySelector('.write-wrapper .bt-close')           // 글작성 모달창 닫기 버튼
var btReset = document.querySelector('.write-wrapper .bt-reset')           // 글작성 모달창 리셋 버튼
var writeWrapper = document.querySelector('.write-wrapper')                // 글작성 모달창
var writeForm = document.writeForm;                                        // 글작성 form
var loading = document.querySelector('.write-wrapper .loading-wrap');      // 파일 업로드 로딩바
var tbody = document.querySelector('.list-tbl tbody');                     // tbody
var gnb = document.querySelector('.gnb');                     // tbody
var observerEl = document.querySelector('.observer-el');                     // tbody


var page = 1;
var listCnt = 1; // 한 페이지에 보여질 list 수
var pagerCnt = 3; // pager의 숫자가 몇개 나올것인가 
var totalRecord = 0;
var observer;


/************* user function *************/
function listInit() {
	tbody.innerHTML = '';
	ref.limitToFirst(listCnt).get().then(onGetData).catch(onGetError);
}

function setHTML(k, v) {
	var n = tbody.querySelectorAll('tr').length + 1;
	var html = '<tr data-idx="'+v.idx+'" data-key="'+k+'">';
	html += '<td>'+n+'</td>';
	html += '<td>';
	if(v.upfile) {
		html += '<img src="'+exts[allowType.indexOf(v.upfile.file.type)]+'" class="icon">';
	}
	html += v.title;
	html += '</td>';
	html += '<td>'+v.writer+'</td>';
	html += '<td>'+moment(v.createAt).format('YYYY-MM-DD')+'</td>';
	html += '<td>0</td>';
	html += '</tr>';
	tbody.innerHTML += html;
	var tr = tbody.querySelectorAll('tr');
	observer.observe(tr[tr.length-1]);
	sortTr();
}

function sortTr() {
	var total = tbody.querySelectorAll('tr').length;
	tbody.querySelectorAll('tr').forEach(function(v, i) {
		v.querySelector('td').innerHTML = total - i;
	});
}

/************* event callback ************/
function onObserver(el, observer) {
	el.forEach(function (v, i) {
		console.log(v.isIntersecting);
		if(v.isIntersecting) {
			var tr = tbody.querySelectorAll('tr');
			var last =  Number(tr[tr.length - 1].dataset['idx']);
			ref.startAfter(last).limitToFirst(listCnt).get().then(onGetData).catch(onGetError)
			observer.unobserve(v.target);
		}
	});
}

function onGetData (r) {
	r.forEach(function (v, i) {
		setHTML(v.key, v.val());
	});
}

function onGetError (err) {
	console.log(err);
}

// onAuthStateChanged 
function onAuthChanged (r) { // login, logout 상태가 변하면...
	user = r;
	if (user) { // 로그인 되면 UI가 할일
		btLogin.style.display = 'none';
		btLogout.style.display = 'block';
		btWrite.style.display = ''; // 빈문자열로 넣으면 인라인 css가 아무 값도 안갖으므로 css파일 값의 css를 가져간다.
	}
	else { // 로그아웃 되면 UI가 할일
		btLogin.style.display = 'block';
		btLogout.style.display = 'none';
		btWrite.style.display = 'none';
	}
}

function onLogin() { // btLogin이 클릭되면
	auth.signInWithPopup(googleAuth);
}

function onLogout() { // btLogout이 클릭되면
	auth.signOut();
}

function onWrite() { // 모달창이 오픈되면...
	loading.style.display = 'none';
	$(writeWrapper).stop().fadeIn(300);
	writeForm.title.focus();
}

function onClose() { // 모달창이 닫히면...
	$(writeWrapper).stop().fadeOut(300);
	onWriteReset();
}

function onWriteReset (e) {
	writeForm.reset(); // button[type="reset"] 클릭한 효과
	writeForm.title.value = '';
	writeForm.title.classList.remove('active');
	writeForm.writer.value = '';
	writeForm.writer.classList.remove('active');
	writeForm.content.value = '';
	document.querySelectorAll('.required-comment').forEach(function (v,i) {
		v.classList.remove('active');
	});
}

function onWriteSubmit(e) { // btSave클릭시 (글 저장시) ,  validation 검증
	e.preventDefault();
	var title = writeForm.title;
	var writer = writeForm.writer;
	var upfile = writeForm.upfile;
	var content = writeForm.content;
	if(!user) {
		alert('로그인 후 이용하세요.');
		return false
	}
	if(!requiredValid(title)) {
		title.focus();
		return false;
	}
	if(!requiredValid(writer)) {
		writer.focus();
		return false;
	}
	if(!upfileValid(upfile)) {
		return false;
	}
	// firebase save
	var data = {};
	data.user = user.uid
	data.title = title.value;
	data.writer = writer.value;
	data.content = content.value;
	data.createAt = new Date().getTime();
	db.limitToLast(1).get().then(getLastIdx).catch(onGetError);
	function getLastIdx(r) {
		if(r.numChildren() === 0) {
			data.idx = 999999999;
		} 
		else {
			r.forEach(function (v) {
				data.idx = Number(v.val().idx) - 1;
			});
		}
		if(upfile.files.length) {   // 파일이 존재하면 처리 로직
			var upload = null;
			var file = {
				name: upfile.files[0].name,
				size: upfile.files[0].size,
				type: upfile.files[0].type,
			}
			var savename = genFile();
			var uploader = storage.child(savename.folder).child(savename.file).put(file);
			uploader.on('state_changed', onUploading, onUploadError, onUploaded);
			data.upfile = {folder: 'root/board/'+savename.folder, name: savename.file, file: file};
		}
		else {
			db.push(data).key; // fireabse 저장
			onClose();
			listInit();
		}
	}

	function onUploading (snapshot) { // 파일이 업로드 되는동안
		loading.style.display = 'flex';
		upload = snapshot;
	}
	
	function onUploaded () {  // 파일 업로드 완료 후
		upload.ref.getDownloadURL().then(onSuccess).catch(onError);
	}
	
	function onUploadError (err) {  // 파일 업로드 실패 시
		loading.style.display = 'none';
		if(err.code === 'storage/unauthorized') location.href = '../403.html'
		else {
			alert('파일 업로드에 실패하였습니다. 관리자에게 문의 후 다시 시도해 주세요.');
			console.log('error', err);
		}
		
	}
	function onSuccess (r) { // r: 실제 웹으로 접근 가능한 경로
		data.upfile.path = r;
		db.push(data).key;
		onClose();
		listInit();
	}
	
	function onError(err) {
		alert('파일 가져오기에 실패하였습니다. 관리자에게 문의 후 다시 시도해 주세요.');
		console.log(err);
	}
}

function onRequiredValid (e) { // title, writer에서 blur, keyup되면
	// var el = this; // e.target;
	requiredValid(this);
}

function requiredValid(el) {
	var next = $(el).next()[0];
	if(el.value.trim() === '') {
		el.classList.add('active');
		next.classList.add('active');
		return false;
	} 
	else {
		el.classList.remove('active');
		next.classList.remove('active');
		return true;
	}
}


function onUpfileValid (e) { // upfile에서 change되면
	upfileValid(this);
}

function upfileValid(el) {
	var next = $(el).next()[0];
	if(el.files.length > 0 && allowType.indexOf(el.files[0].type) === -1) {
			el.classList.add('active');
			next.classList.add('active');
			console.log('false');
			return false;
	}
	else {
		el.classList.remove('active');
		next.classList.remove('active');
		console.log('true');
		return true;
	}
}

function onLoadingClick(e) { // 로딩바가 돌 때 클릭 막기
	e.stopPropagation();
	e.preventDefault();
}

/************* event init ****************/
auth.onAuthStateChanged(onAuthChanged);
btLogin.addEventListener('click', onLogin);
btLogout.addEventListener('click', onLogout);
btWrite.addEventListener('click', onWrite);
btClose.addEventListener('click', onClose);
btReset.addEventListener('click', onWriteReset);
writeForm.addEventListener('submit', onWriteSubmit);
writeForm.title.addEventListener('blur', onRequiredValid);  /* blur는 focus를 가졌다가 잃으면 생기는 이벤트 */
writeForm.title.addEventListener('keyup', onRequiredValid);  
writeForm.writer.addEventListener('blur', onRequiredValid);
writeForm.writer.addEventListener('keyup', onRequiredValid);
writeForm.upfile.addEventListener('change', onUpfileValid);  /* change event -> 값이 바뀐다면 */
loading.addEventListener('click', onLoadingClick);




// db.on('child_added', onAdded);
// db.on('child_changed', onChanged);
// db.on('child_removed', onRemoved);





/************* start init ****************/
listInit();
observer  = new IntersectionObserver(onObserver, {rootMargin: '-100px'});