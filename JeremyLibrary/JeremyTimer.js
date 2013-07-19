/*** @Class JeremyTimer : 타이머 객체 ***/
function JeremyTimer(unit, timerCB, argo) {
	this.unit = unit;
	this.current = (new Date()).getTime();
	this.previous = (new Date()).getTime();
	this.count = 0;
	this.elapsed = 0;
	this.callback = timerCB;
	this.argo = argo;
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