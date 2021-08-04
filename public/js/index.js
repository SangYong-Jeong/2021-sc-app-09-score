/**************Global init ****************/
console.log(firebase);
var auth = firebase.auth();
var db = firebase.database();
var googleAuth = new firebase.auth.GoogleAuthProvider();

/**************Function init ****************/


/**************Event callback ****************/
function onAuthChanged() {

}

function onLogin() {
	auth.signInWithPopup(googleAuth);
}

/**************Event init ****************/
auth.onAuthStateChanged(onAuthChanged);
$('.bt-login').click(onLogin);

