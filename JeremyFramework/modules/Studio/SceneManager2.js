/**
 * @author Jeremy
 */
var __SceneManager = {
	init : function() {
		console.log('Init: JeremyStudio.SceneManager');
		__SceneManager.type = 'SceneManager';
		__SceneManager.scenes = {};
		__SceneManager.loadScenes(J('STD')('Config').get('scene'));
	},
	loadScenes : function(config) {
		var iteration = config.count, listIndex = 0;
		for (iteration, listIndex; listIndex < iteration; listIndex++) {
			__SceneManager.loadScene(config.scenes[listIndex]);
		}
	},
	loadScene : function(sceneConfig) {
		var scene = J('LIB')('Scene')({
			name : sceneConfig.name,
			nextScenes : sceneConfig.nextScenes,
			prevScenes : sceneConfig.prevScenes,
			context : sceneConfig.context
		});
		__SceneManager.addScene(scene);
	},
	addScene : function(scene) {
		__SceneManager.scenes[scene.name] = scene;
	},
	getScene : function(name) {
		return __SceneManager.scenes[name];
	}
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyStudio') : undefined);
	if (target) {
		target.addModule('SceneManager', __SceneManager);
		target.addInterface('Scene', {
			get : __SceneManager.getScene,
			scenes : __SceneManager.scenes
		});
	}
})();