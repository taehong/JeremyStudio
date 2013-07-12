/**
 * @author JeremyJeong
 */
function JeremySceneContext(initCB, updateCB,destroyCB) {
	this.initCB = initCB;
	this.updateCB = updateCB;
	this.destroyCB = destroyCB;
}
JeremySceneContext.prototype.init = function () {
	this.initCB.call(this);
};
JeremySceneContext.prototype.update = function () {
	this.updateCB.call(this);
};
JeremySceneContext.prototype.destroy = function () {
	this.destroyCB.call(this);
};

