/*************** global init **************/
var auth = firebase.auth();
var database = firebase.database();
var storage = firebase.storage();
var googleAuth = new firebase.auth.GoogleAuthProvider();
var dbRoot = database.ref('root/uploads');
var stRoot = storage.ref().child('imgs');
var user = null;
var allowExt = ['jpg', 'jpeg', 'png', 'gif', 'mp4'];


/************** user function *************/
function genFile() {
	var folder = moment().format('YYYYMMDDHH');
	return {
		folder: folder,
		file:  folder + '_' + uuidv4()
	}
}

/************** event callback ************/
function onAuthChanged(r) {
	user = r;
	if(user) { // 로그인
		$('.bt-login').hide();
		$('.bt-logout').show();
		dbRoot.on('child_added', onAdded);
	}
	else { // 로그아웃
		$('.bt-login').show();
		$('.bt-logout').hide();
		$('.list-wrap').empty();
		$('.main-img').attr('src', '').hide();
		$('.main-video').attr('src', '').hide();
	}
}

function onLogin() {
	auth.signInWithPopup(googleAuth);
}

function onLogout() {
	auth.signOut();
}

function onSubmit(e) {
	e.preventDefault();
	var el = document.querySelector('input[name="upfile"]');
	if(el.files.length && user) {
		var file = document.querySelector('input[name="upfile"]').files[0]; // input type="file"
		if(allowExt.indexOf(file.name.split('.').pop().toLowerCase()) > -1) {
			var savename = genFile();
			var uploader = stRoot.child(savename.folder).child(savename.file).put(file);
			// console.log(uploader); -> 객체를 리턴해줌 이 객체는 업로드 하는 file을 의미 
			uploader.on('state_changed', onUploading, onUploadError, onUploaded); // -> uploader의 state_changed는 callback 3개
			// 이벤트 대상은 파일객체 -> 파일의 상태변화는 3가지 1) 업로딩중 2) 업로딩 완료 3) 업로드 에러 
		}
		else alert('업로드 가능한 파일은 이미지 또는 mp4영상입니다.')
	}
	else if (user === null) {
		alert('로그인 후 시도해 주세요.');
	}
	else {
		$('input[name="upfile"]').focus();
	}

	function onUploading (snapshot) { // 현재 상태를 인자로 보내줌
		console.log('uploading', snapshot.bytesTransferred);
		console.log('uploading', snapshot.totalBytes);
		console.log('================');
		upfile = snapshot;
	}
	
	function onUploaded () {
		upfile.ref.getDownloadURL().then(onSuccess).catch(onError); // ref는 file이 서버에 저장된 위치를 의미 거기서 downladeURL정보를 받아옴
	}
	
	function onUploadError (err) {
		console.log('error', err);
		if(err.code === 'storage/unauthorized') location.href = '../403.html'
		else console.log('error', err);
		// location.href = '../403.html' // -> 서버에 다시 요청하는것 err 가 뜨면 이 파일 보여줘 하는것
	}
	
	function onSuccess (r) { // 성공시 download URL을 인자로 받음 + 다양한 것들 존재
		$('.main-wrap').addClass('py-5');
		if(file.type.split('/')[0] === 'image') {
			$('.main-img').attr('src', r).show();
			$('.main-video').hide();
		}
		else if(file.type.split('/')[0] === 'video') {
			$('.main-video').attr('src', r).show();
			$('.main-img').hide();
		}
		var saveData = {
			oriname: file.name,
			savename: savename.file,
			path: r,
			type: file.type,
			size: file.size,
		}
		console.log(file);
		dbRoot.push(saveData);
	}
	function onError (err) {
		console.log(err);
	}
}

function onAdded(r) {
	var html = '<li class="list">';
	if(r.val().type.indexOf('image') > -1) {// String에서도 사용가능한 메서드 -> 문자열indexOf('문자열') -> (문자열)이 문자열의 어느 부분에서 시작하는지 값을 줌 없으면 -1
		html += '<a href="'+r.val().path+'" target="_blank"><img src="'+r.val().path+'"></a>'; 
	}
	else html += '<a href="'+r.val().path+'" target="_blank"><video src="'+r.val().path+'"></a>';
	html += '</li>';
	$(html).prependTo('.list-wrap')
}

/*************** event init ***************/
auth.onAuthStateChanged(onAuthChanged);
$('.bt-login').click(onLogin);
$('.bt-logout').click(onLogout);
$('form[name="uploadForm"]').submit(onSubmit);


/*************** start init ***************/