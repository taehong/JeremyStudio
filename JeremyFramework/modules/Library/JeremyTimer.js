/*** @Class JeremyTimer : 타이머 객체 ***/
// @param unit, timerCB, argo
/*
 * TODO: 이거 옛날거임 새걸로 업데이트 해야함
 */
function JeremyTimer(argo) {
	this.unit = argo.unit;
	this.current = (new Date()).getTime();
	this.previous = (new Date()).getTime();
	this.count = 0;
	this.elapsed = 0;
	this.callback = argo.timerCB;
	this.argo = argo.argo;
	this.argo.timer = this;
};
JeremyTimer.prototype.update = function() {
	this.current = (new Date()).getTime();
	this.elapsed = this.current - this.previous;
	if (this.elapsed >= this.unit) {
		this.callback(this.argo);
		this.previous = this.current;
		this.count++;
	}
};
JeremyTimer.prototype.reset = function() {
	this.current = (new Date()).getTime();
	this.previous = (new Date()).getTime();
	this.elapsed = 0;
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyLibrary') : undefined);
	if (target) {
		target.addModule('JeremyTimer', JeremyTimer);
	}
})(); 