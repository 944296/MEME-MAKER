const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(document.getElementsByClassName("color-option")); //array.from()=>array 형태로 만들기
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas"); // canvas(종이)
const ctx = canvas.getContext("2d"); // context(붓): 2d 설정
canvas.width = 800; //canvas의 가로
canvas.height = 800; // canvas의 세로
ctx.lineWidth = lineWidth.value; //선의 굵기 기본값은 "HTML의 line-width의 value(5)"를 가져온다.
let isPainting = false;
let isFilling = false;
//1.path------------------------------------------
//  //사각형 그리기 : (x좌표, y좌표, 가로, 세로)
// ctx.rect(150, 150, 100, 100);
// ctx.rect(250, 250, 100, 100);
// ctx.fill(); //채우기

// ctx.beginPath(); // 새로운 경로

// ctx.rect(350, 350, 100, 100);
// ctx.rect(450, 450, 100, 100);
// ctx.fillStyle = " red"; //빨강색
// ctx.fill(); //채우기

//2.moveTo, lineTo---------------------------------
// ctx.moveTo(50, 50);  //좌표 이동: (0,0)-->(50, 50)
// ctx.lineTo(150, 50); //가로 선 : 100 
// ctx.lineTo(150, 150); //세로 선 : 100
// ctx.lineTo(50, 150); //가로 선 :-100
// ctx.lineTo(50, 50); //세로 선 : -100
// ctx.fill(); //(정사각형 100w,100h) 채우기

//집 그리기-----------------------------------------
// //양쪽 벽 세우기
// ctx.fillRect(200, 200, 50, 200); //x좌표,y좌표,가로,세로   fillRect => fill 사각형
// ctx.fillRect(400, 200, 50, 200); //x좌표 시작점 400
// //가운데 문 만들기
// ctx.lineWidth = 2;
// ctx.strokeRect(300, 300, 50, 100) //200과400사이,기존 y축보다 아래  strokeRect => border 사각형
// //천장 만들기
// ctx.fillRect(200, 200, 200, 20); //450-250=200,기준으로부터 기둥의 y축까지=200
// //지붕 만들기(좌표 이동)
// ctx.moveTo(200, 200);
// ctx.lineTo(325, 100); //집의 가운데 지점 : (450-200)/2=125 , 200+125=325 /  y축:200->100으로
// ctx.lineTo(450, 200); //마지막 기둥의 끝 지점: 400+50=450 /  y축: 100->200으로
// ctx.fill();

//사람 그리기(원 그리기)
// //얼굴 그리기
// ctx.arc(250, 100, 50, 0, 2*Math.PI); //arc(x축, y축, radius, startAngle, endAngle)
// ctx.fill();                          // start:2*math.pi -> 0.5*math.pi -> 1*math.pi -> 1.5*math.pi -> 2*math.pi:end
// //눈 그리기
// ctx.beginPath(); //새로운 경로 설정(색 바꾸기)
// ctx.fillStyle = "white";
// ctx.arc(260+10, 80, 5, Math.PI, 2*Math.PI); //반달 웃음 만들기 : 1*math.pi부터 2*math.pi까지
// ctx.arc(220+10, 80, 5, Math.PI, 2*Math.PI);
// ctx.fill();

//mousemove하면 선 긋기
// const colors = [
//     "#55efc4",
//     "#81ecec",
//     "#74b9ff",
//     "#a29bfe",
//     "#00b894",
//     "#00cec9",
//     "#fab1a0",
//     "#fdcb6e",
//     "#fd79a8",
//     "#e84393",
//     "#2d3436",
// ];

// function onClick(event) { //event시점의 
//     ctx.beginPath(); // 새로운 path를 만들어, 이전 path와 다른 새로운..
//     ctx.moveTo(0, 0); //(0.0)을 시작 기점으로 선긋기
//     const color =colors[Math.floor(Math.random() * colors.length)];//colors의 요소 중 random 선택
//     ctx.strokeStyle = color;
//     ctx.lineTo(event.offsetX, event.offsetY); //event시점의 x축과 y축
//     ctx.stroke();//선긋기
// }

// canvas.addEventListener("mousemove", onClick);

//마우스로 그림 그리기
function onMove(event) { //2.
    if (isPainting) {  //isPainting이 true라면(mousedown일떄) 
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke(); 
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY); //isPainting이 false라면(mouseup일때) - 죄표 위치 이동만
}
function startPainting() {
    isPainting = true;
}
function cancelPainting() {
    isPainting = false;
    ctx.beginPath();// 버그2 해결:painting이 끝났을때 새로운 path를...-
}
function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value; //버그2 발생: 이전에 그려진 선 까지 굵기가 변한다. -> 새로운 path를 생성해야.
}
function onColorChange(event) {
    ctx.strokeStyle = event.target.value; //선 색상
    ctx.fillStyle = event.target.value; //채우기 색상
}
function onColorClick(event) { //어떤 color가 클릭되었는지 알아야!!
    const colorValue = event.target.dataset.color; //HTML의 data-color="" => event.target.dataset.color에 저장됨을 console창에서 확인가능.
    ctx.strokeStyle = colorValue; //선 색상
    ctx.fillStyle = colorValue; //채우기 색상
    color.value = colorValue; //사용자에게 선택한 색깔을 알려주기 위한 코드................!!!!!!!!!!!!!!!!!????????????
}
function onModeClick() {
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else {
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}
function onCanvasClick() {
    if(isFilling){
        ctx.fillRect(0, 0, 800, 800); //캔버스 크기 만큼 색 채우기
    }
}

canvas.addEventListener("mousemove", onMove); //1.
canvas.addEventListener("mousedown", startPainting); //mousedown일떄 그리기
canvas.addEventListener("mouseup", cancelPainting); //mouseup일떄 그리지 않기
canvas.addEventListener("mouseleave", cancelPainting); //3.버그1 해결 : mousedown인 채로 canvas밖으로 나가면 mouseup을 인식 못함.--> mouseleave할떄 mouseup일떄의 함수가 나타나도록 설정.  
//클릭하면 fill모드로
canvas.addEventListener("click", onCanvasClick);
//선의 굵기를 조절하는 기능(HTML의 input: type은 range로 설정.)
lineWidth.addEventListener("change", onLineWidthChange);
//색 조절하는 기능(HTML의 input: type은 color로 설정.)
color.addEventListener("change", onColorChange);
//각 color마다 eventlistner해주기
colorOptions.forEach(color => color.addEventListener("click", onColorClick)) //colordms 각각 다른 colorOption이다.
//stroke-mode에서 fill-mode로 전환
modeBtn.addEventListener("click", onModeClick);