/**
 * @author JeremyJeong
 */
// @param initCB, updateCB,destroyCB
function JeremySceneContext(argo) {
	this.name = argo.name;
	this.initCB = argo.initCB;
	this.updateCB = argo.updateCB;
	this.destroyCB = argo.destroyCB;
}

JeremySceneContext.prototype.init = function() {
	console.log('SceneContext >> init >> ' + this.name);
	this.initCB.call(this);
};
JeremySceneContext.prototype.update = function() {
	this.updateCB.call(this);
};
JeremySceneContext.prototype.destroy = function() {
	console.log('SceneContext >> destroy >> ' + this.name);
	this.destroyCB.call(this);
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyLibrary') : undefined);
	if (target) {
		target.addModule('JeremySceneContext', JeremySceneContext);
	}
})(); 