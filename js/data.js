var dataObj = function() {
	this.fruitNum = 0;
	this.double = 1;   
	this.color="orange";
	this.score = 0;	//分值
	this.top=0;
	this.gameOver = false;   //游戏状态判断
	this.alpha = 0;
};

//把分值绘制到画布上
dataObj.prototype.draw = function() {
	//画布宽高
	var w = can1.width; 
	var h = can1.height;
	ctx1.save();
	ctx1.fillStyle = "#fff";
	ctx1.font = "20px Verdana";
	ctx1.shadowColor = "white";
	ctx1.shadowBlur = 10;

	ctx1.textAlign = "center";
	// ctx1.fillText("果实数量" + this.fruitNum, w * 0.5, h - 50);
	// ctx1.fillText("double" + this.double, w * 0.5, h - 70);
	ctx1.fillText("Score：" + this.score, w * 0.5, h - 50);
	ctx1.fillText("top：" + this.top, w * 0.5, h -20);
	ctx1.restore();
	ctx1.save();
	ctx1.font = "50px Verdana";
	ctx1.shadowColor = "white";
	ctx1.shadowBlur = 10;
	//画布提示游戏结束
	if(this.gameOver) {
		this.alpha += deltaTime * 0.0003;
		if(this.alpha > 1) {
			this.alpha = 1;
		}
		ctx1.fillStyle = "rgba(255,255,255," + this.alpha + ")";
		ctx1.fillText("Game Over", w * 0.5, h * 0.5);
		ctx1.font = "20px Verdana";
		ctx1.fillText("Click anywhere to restart", w * 0.5+12, h * 0.5+50);
		reset=true;
	}
	ctx1.restore();

};
dataObj.prototype.addScore = function() {
	this.score += this.fruitNum * 10 * this.double;
	this.fruitNum = 0;
	this.double = 1;
};
