﻿/*
 * argo.unit : unit time in msec
 * argo.onTick : function (argo) { ... }
 * argo.argo : argo for callback
 */
function Timer(argo) {
	this.unit = argo.unit;
	this.onTick = argo.onTick;
	this.argo = argo.argo;
	this.argo.timer = this;
	this.isSleeping = false;
	this.count = 0;
	this.elapsed = 0;
	this.current = this.getTime();
	this.previous = this.getTime();
};
Timer.prototype.update = function() {
	if (this.isSleeping)
		return;
	this.current = this.getTime();
	this.elapsed = this.current - this.previous;
	if (this.elapsed >= this.unit) {
		this.onTick(this.argo);
		this.previous = this.current;
		this.count++;
	}
};
/*
 * Pause
 */
Timer.prototype.sleep = function() {
	this.isSleeping = true;
};
/*
 * Restart
 */
Timer.prototype.wake = function() {
	this.isSleeping = false;
};
/*
 * Reset and Restart
 */
Timer.prototype.reset = function() {
	this.current = this.getTime();
	this.previous = this.getTime();
	this.elapsed = 0;
	this.count = 0;
	this.wake();
};
Timer.prototype.getTime = function() {
	return (new Date()).getTime();
};