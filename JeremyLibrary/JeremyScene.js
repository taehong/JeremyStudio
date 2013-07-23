/**
 * @author JeremyJeong
 */
// @param name, nextScenes, prevScenes, context
function JeremyScene(argo) {
	this.name = argo.name;
	this.nextSceneNames = argo.nextScenes;
	this.prevSceneNames = argo.prevScenes;
	this.context = argo.context;
}
JeremyScene.prototype.getNextSceneName = function(index) {
	var nextSceneName = this.nextSceneNames[index];
	return nextSceneName;
};
JeremyScene.prototype.getPrevSceneName = function(index) {
	var prevSceneName = this.prevSceneNames[index];
	return prevSceneName;
};
JeremyScene.prototype.getContext = function() {
	return this.context;
};