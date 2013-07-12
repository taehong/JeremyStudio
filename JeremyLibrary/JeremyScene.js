/**
 * @author JeremyJeong
 */
function JeremyScene(name, nextScenes, prevScenes, context) {
	this.name = name;
	this.nextSceneNames = nextScenes;
	this.prevSceneNames = prevScenes;
	this.context = context;
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