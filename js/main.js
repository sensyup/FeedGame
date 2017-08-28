var can1;
var can2;
var mx;
var my;
var lastTime=0;
var deltaTime=0;
var width;
var height;
var data=new dataObj();
var wave=new waveObj();
var dust=new dustObj();
var dustPic=[];
var helo=new heloObj();
document.body.onload=game;
var bgPic=new Image();
var ane=new aneObj();
var fruit=new fruitObj();
var mom=new momObj();
var baby=new babyObj();
var helo=new heloObj();
var babyTail = new Image(); //小鱼尾巴数组
var babyEye = [];  //小鱼眨眼数组
var babyBody = []; //小鱼身体数组
var reset=false;
var momTail = [];
var momEye = [];
var momBodyOra = [];  //大鱼橙色身体
var momBodyBlue = [];  //大鱼蓝色身体
var start=0;
function game(){

	init();
	gameloop();
}
function init(){
	reset=false;
	can1=document.getElementById("canvas1");
	can1.addEventListener('mousemove',onMouseMove,false);
	can1.addEventListener('click',onclick,false);
	ctx1=can1.getContext("2d");

	can2=document.getElementById("canvas2");
	ctx2=can2.getContext("2d");
	bgPic.src="./src/background.jpg";
	canWidth=can1.width;
	canHeight=can1.height;

	ane.init();
	
	fruit.init();

	helo.init();

	babyTail.src="src/babyTail0.png";
	//初始化小鱼眨眼数组
	for(var j = 0; j < 2; j++) {
		babyEye[j] = new Image();
		babyEye[j].src = "src/babyEye" + j + ".png";
	}
	// 初始化身体变白数组
	for(var k = 0; k < 20; k++) {
		babyBody[k] = new Image();
		babyBody[k].src = "src/babyFade" + k + ".png";
	}
	//初始化大鱼尾巴数组
	for(var mi = 0; mi < 8; mi++) {
		momTail[mi] = new Image();
		momTail[mi].src = "src/bigTail" + mi + ".png";
	}
	for(var mj = 0; mj < 2; mj++) {
		momEye[mj] = new Image();
		momEye[mj].src = "src/bigEye" + mj + ".png";
	}
	for(var di = 0; di < 7; di++) {
		dustPic[di] = new Image();
		dustPic[di].src = "src/dust" + di + ".png";
	}
	dust.init();
	// mombody=new Image();
	// mombody.src="src/big.png";
	for(var mbody = 0; mbody < 8; mbody++) {   //大鱼身体变化
		momBodyOra[mbody] = new Image();
		momBodyBlue[mbody] = new Image();
		momBodyOra[mbody].src = "src/bigSwim" + mbody + ".png";
		momBodyBlue[mbody].src = "src/bigSwimBlue" + mbody + ".png";
	}
	mom.init();
	baby.init();
	mx=canWidth*0.5;
	my=canWidth*0.5;

}
function gameloop(){
	window.requestAnimFrame(gameloop);//to replace setTiemout
	var now=Date.now();
	deltaTime=(now-lastTime)>50?50:(now-lastTime);
	lastTime=now;
	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();
	ctx1.clearRect(0, 0, canWidth, canHeight);   //把前面一帧的内容清空掉
	mom.draw();
	baby.babyEyeTimer++;
	if(baby.babyEyeTimer<=10){
		baby.babyEyeCount=1;

	}
	else if(baby.babyEyeTimer>10&&baby.babyEyeTimer<50){
		baby.babyEyeCount=0;	
	}
	else{
		baby.babyEyeTimer=Math.random()*5;
	}
	
	baby.draw();

	momFruitsCollision();
	wave.draw();
	momBabyCollision();
	helo.draw();
	data.draw();
	dust.draw();
	if(start<150){
		console.log(start);
		ctx2.save();
		ctx2.fillStyle = "white";
		ctx2.font = "30px Verdana";
		ctx2.shadowColor = "white";
		ctx2.shadowBlur = 10;
		ctx2.textAlign = "center";
		ctx2.fillText("Find fruits and feed your baby!" , canWidth * 0.5, canHeight * 0.5-50);
		ctx2.restore();
		start++;
	}
}

function onMouseMove(e) {  
	// if( !data.gameOver ) {
		if(e.offSetX || e.layerX) {
			// 获取鼠标坐标
			mx = e.offSetX === undefined ? e.layerX : e.offSetX;
			my = e.offSetY === undefined ? e.layerY : e.offSetY;
		}
	// }
	
}

function onclick(e) {  
	// console.log("here");
	if(reset){
		data.gameOver=false;
		data.score=0;
		baby.babyBodyCount=0;

	}
	
}