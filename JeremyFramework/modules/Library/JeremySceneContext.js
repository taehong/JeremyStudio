/**
 * @author JeremyJeong
 */
// @param initCB, updateCB,destroyCB
function JeremySceneContext(argo) {
	this.initCB = argo.initCB;
	this.updateCB = argo.updateCB;
	this.destroyCB = argo.destroyCB;
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

