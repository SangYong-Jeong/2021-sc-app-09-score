<!-- 오늘 배운것 -->
# i tag -> button tag로 바꿈 (disabled 효과 주기 위해) + 이를 이용해서 if else 구문을 이용해 button이 특정 시점에 disabled 되도록 알고리즘을 짬.

# disabled속성은 button에만 적용된다.

# 06.io.html + js에서 intersection observer 개념을 배움
## 추가적으로 callback 개념도 배움! -> 콜백함수를 실행시키는 함수 즉, 콜백함수를 변수로 받는쪽에서 콜백함수에 어떠한 변수를  주고 실행할지를 다 설계 해놓는다. 그러므로 콜백함수에 인자를 설정해주고 그 인자로 함수 안을 설계해놓기만 하면 된다. 그러면 콜백함수를 인자로 받는 즉, 콜백함수를 실행시키는 쪽에서 함수를 실행하게 될 경우 알아서 실행 된다.

# polyfill은 es6문법을 es5로 바꿔준다. react에서 돌아가는 바벨과 비슷하다.
# 이러한 polyfill은 es6가 돌아가지 않는 익스플로러 때문에 필요하다.
# intersection-observer.js에도 polyfill이 적용되어 있어 es6인 intersection-observer를 ie에서 돌아갈 수 있게 만들어준다.

# intersection-observer 사용법 (11.ajax/html/06.io.html + 06.io.js 참고) -> intersection observer를 기본 option으로 사용시 target 설정 즉, observe 이벤트 붙여 줬을 때와 intersection이 일어났을 때 이벤트가 발생한다.
1) var observer = new IntersectionObserver(콜백함수, 옵션); -> option은 root, rootMargin, thresholds 등이 있다.
2) observer.observe(JS객체 -> jQuery 객체는 해당 안됨!!)
3) 콜백함수 (el, observer) {}
4) IntersectionObserver가 콜백함수에 주는 인자
5)  el(배열 형태로 옴 [0]에 값이 들어있다!) = intersetionRatio(observe 당하고 있는 js 객체의 비율), isIntersection(false면 intersect x, true면 intersect o), target(observe당하고 있는 js객체)     
6)  observer -> 내가 준 옵션들이 모여있는 값 [option: root: null(기본 값, browser의 viewport 따로 설정 가능), rootMargin: '0px'(기본값, root에서 margin 만큼 떨어져 있어도 intersection 된것처럼 볼 수 있게 도와줌), thresholds: 0 or 1 (1일 경우 내용물이 전부다 나와야 intersection 되었다고 봄) [0, .25, .5, .75, 1] 처럼 배열형태로 옵션을 줄 수 도 있음 이경우 각각의 경우 intersecting 되었다고 봄(확인 필요)
7)  observer.unobserve(v.target - js객체(jQuery 객체 해당 x));를 이용해서  observer를 지울 수 있다. dom을 지운다고 해서 observe()가 사라지지는 않는다.

# intersection observer는 보통 dummy를 하나 만들어 놓고 사용

# awesome font 중에 font뿐만 아니라 animation을 주는 것도 존재 -> ex) fa-spin 이를 이용해서 로딩바 구현

# branch는 create branch를 이용해서 만들 수 있다. 이를 이용해 각 ver들을 남겨 놓고 사용 할 수 있다. 대신 commit push 하는거 왼쪽위에 이름 뜨는 거 확인하고 잘 해야 한다. (master와 그 외 ver) branch name은 공백을 허용하지 않는다.

# storage 같은 경우 firebase-storage.js 넣은 후 해야 한다. 

# input type 중 file 타입만이 files라는 속성 값 (배열을 갖을 수 있다. [0]에 file에 대한 data값이 존재)

# storage root는 db와 다르게 storage.ref()로 바로 접근 가능하다. 그 안에 child를 넣어 폴더를 생성한다. 이후 넣을 파일은 이름을 정해 storage.ref().child('imgs').child(이름).put(넣을 파일)로 넣을 수 있다. <- 이 부분 중요 즉 파일을 서버에 업로드 하는 방법

# firebase init을 재 init 할 수 있다. 이 경우 파일들 덮어 쓰는 것 주의 하면서 해야한다.