/* 
false 판정: 0, null, undefined, '' , false
true 판정: false 판정 외 모든 것
- 0을 제외한 모든 숫자
- ''(빈문자열)을 제외한 모든 문자
- 객체, 함수 .... 전부 다
*/


/**************Global init ****************/
console.log(firebase);
var auth = firebase.auth();
var db = firebase.database();
var googleAuth = new firebase.auth.GoogleAuthProvider();

/**************Function init ****************/


/**************Event callback ****************/
function onAuthChanged(user) { // auth 상태가 변하면 알려줘
	if(user) {
		console.log(user);
		$('.bt-login').hide();
		$('.bt-logout').show();
		$('.photo-logo img').attr('src', user.photoURL);
		$('.photo-logo').show();
		$('.icon-logo').hide();
	}
	else {
		$('.bt-login').show();
		$('.bt-logout').hide();
		$('.photo-logo').hide();
		$('.icon-logo').show();
	}
}

function onLogin() {
	auth.signInWithPopup(googleAuth);
}

function onLogout() {
	auth.signOut();
}

/**************Event init ****************/
auth.onAuthStateChanged(onAuthChanged); // auth 상태가 변하면 알려줘
$('.bt-login').click(onLogin);
$('.bt-logout').click(onLogout);


