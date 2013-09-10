/*** @Class JeremyTimer : 타이머 객체 ***/
/*
 * argo.unit : unit time in msec
 * argo.onTick : function (argo, timer) { ... }
 * argo.argo : argo for callback
 */
function JeremyTimer(argo) {
	if (argo !== undefined) {
		this.unit = argo.unit;
		this.onTick = argo.onTick;
		this.argo = argo.argo;
	}
	this.isSleeping = false;
	this.count = 0;
	this.elapsed = 0;
	this.current = this.getTime();
	this.previous = this.getTime();
};
JeremyTimer.prototype.tick = function() {
	if (this.isSleeping)
		return;
	this.current = this.getTime();
	this.elapsed = this.current - this.previous;
	if (this.elapsed >= this.unit) {
		if (this.onTick !== undefined) {
			this.onTick(this.argo, this);
		}
		this.previous = this.current;
		this.count++;
	}
};
/*
 * Pause
 */
JeremyTimer.prototype.sleep = function() {
	this.isSleeping = true;
};
/*
 * Restart
 */
JeremyTimer.prototype.wake = function() {
	this.isSleeping = false;
};
/*
 * Reset
 */
JeremyTimer.prototype.reset = function() {
	this.current = this.getTime();
	this.previous = this.getTime();
	this.elapsed = 0;
	this.count = 0;
};
JeremyTimer.prototype.getTime = function() {
	return (new Date()).getTime();
};

(function() {
    var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyLibrary') : undefined);
    if (target) {
        target.addModule('JeremyTimer', JeremyTimer);
    }
})();