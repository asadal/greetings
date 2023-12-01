var canvas = document.getElementById('canv');
var ctx = canvas.getContext('2d');

var W = window.innerWidth;
var H = window.innerHeight;
canvas.width = W;
canvas.height = H;

var mf = 200; // 최대 눈송이 수
var flakes = [];

// 'center-title' 요소와 그 경계값을 가져옵니다.
var titleElement = document.querySelector('.center-title');
var titleRect = titleElement.getBoundingClientRect();

// 눈송이가 쌓일 글자 영역의 경계 설정
var textTopBoundary = titleRect.top; // 글자 윗쪽 경계
var textBottomBoundary = titleRect.bottom; // 글자 아래 경계
var textLeftBoundary = titleRect.left;
var textRightBoundary = titleRect.right;

// 눈송이 초기화
for (var i = 0; i < mf; i++) {
    flakes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 10 + 5, // 눈송이 반경
        d: Math.random() + 1, // 밀도
        size: Math.random() * 30 + 10 // 눈송이 크기
    });
}

// 눈송이 그리기 함수
function drawFlakes() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "white";

    for (var i = 0; i < mf; i++) {
        var f = flakes[i];
        ctx.font = f.size + "px Arial"; // 텍스트 크기와 폰트 설정
        ctx.fillText("*", f.x, f.y); // 텍스트로 눈송이 그리기
    }
}

// 눈송이 움직임 함수
function moveFlakes() {
    for (var i = 0; i < mf; i++) {
        var f = flakes[i];

        if (f.y > H) {
            // 화면 끝에 도달한 눈송이를 재위치
            flakes[i] = {x: Math.random() * W, y: 0, r: f.r, d: f.d, size: f.size};
        } else {
            // 눈송이를 하강시킴
            f.y += Math.pow(f.d, 2) + 1;
        }
    }
}

// 눈송이 업데이트 간격 설정
setInterval(function() {
    moveFlakes();
    drawFlakes();
}, 25);

// 창 크기 조정 감지 및 글자 영역 경계 재계산
window.onresize = function () {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    titleRect = titleElement.getBoundingClientRect();

    // 글자 영역 경계 재계산
    textTopBoundary = titleRect.top; // 글자 윗쪽 경계
    textBottomBoundary = titleRect.bottom;
    textLeftBoundary = titleRect.left;
    textRightBoundary = titleRect.right;
};
