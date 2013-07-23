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
	/*	switch (name) {
			case "Asset":
				newObject = new JeremyAsset(argo.type, argo.name, argo.item);
				break;
			case "Canvas":
				newObject = new JeremyCanvas(argo.selector, argo.id, argo.ctxMode, argo.width, argo.height, argo.zIndex, argo.top, argo.left);
				break;
			case "Collider":
				newObject = new JeremyCollider(argo.owner, argo.rectangle);
				break;
			case "Image":
				newObject = new JeremyImage(argo.src, argo.className, argo.id);
				break;
			case "Renderable2D":
				newObject = new JeremyRenderable2D(argo.layer, argo.drawCB, argo.argo);
				break;
			case "Scene":
				newObject = new JeremyScene(argo.name, argo.nextScenes, argo.prevScenes, argo.context);
				break;
			case "SceneContext":
				newObject = new JeremySceneContext(argo.initCB, argo.updateCB, argo.destroyCB);
				break;
			case "Sound":
				// newObject = new JeremySound();
				break;
			case "Sprite":
				// newObject = new JeremySprite();
				break;
			case "Timer":
				newObject = new JeremyTimer(argo.unit, argo.timerCB, argo.argo);
				break;
			default:
				break;
		} */
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