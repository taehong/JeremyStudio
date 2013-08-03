/**
 * @author Jeremy Jeong
 */
function JL(name, argo) {
	return JeremyLibrary.factory(name, argo);
}

var JeremyLibrary = {
	module : {},
	factory : function(name, argo) {
		var constructor = 'Jeremy' + name,
			newObject = new JeremyLibrary.module[constructor](argo);
		return newObject;
	}
}; 

if(JeremyAsset) {
	JeremyLibrary.module.JeremyAsset = JeremyAsset;
}
if(JeremyCanvas) {
	JeremyLibrary.module.JeremyCanvas = JeremyCanvas;
}
if(JeremyCollider) {
	JeremyLibrary.module.JeremyCollider = JeremyCollider;
}
if(JeremyImage) {
	JeremyLibrary.module.JeremyImage = JeremyImage;
}
if(JeremyRenderable2D) {
	JeremyLibrary.module.JeremyRenderable2D = JeremyRenderable2D;
}
if(JeremyScene) {
	JeremyLibrary.module.JeremyScene = JeremyScene;
}
if(JeremySceneContext) {
	JeremyLibrary.module.JeremySceneContext = JeremySceneContext;
}
if(JeremySound) {
	JeremyLibrary.module.JeremySound = JeremySound;
}
if(JeremySprite) {
	JeremyLibrary.module.JeremySprite = JeremySprite;
}
if(JeremyTimer) {
	JeremyLibrary.module.JeremyTimer = JeremyTimer;
}