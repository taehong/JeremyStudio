/**
 * @author Jeremy
 */
var __SceneManager = {
	currScene : null,
	prevScene : null,
	nextScene : null,
	needUpdate : false,
	init : function() {
		console.log('Init: JeremyStudio.SceneManager');
		__SceneManager.type = 'SceneManager';
		__SceneManager.scenes = {};
		__SceneManager.loadScenes(Jeremy.getConfig('scene'));
	},
	update : function() {
		if (__SceneManager.needUpdate) {
			__SceneManager.setPrev(__SceneManager.currScene.getPrevSceneName(0));
			__SceneManager.setNext(__SceneManager.currScene.getNextSceneName(0));
			J('STU')('Context').setNeedUpdate();
			__SceneManager.needUpdate = false;
		}
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
		console.log('Scene Loaded : ' + sceneConfig.name);
		__SceneManager.addScene(scene);
	},
	addScene : function(scene) {
		__SceneManager.scenes[scene.name] = scene;
	},
	getScene : function(name) {
		return __SceneManager.scenes[name];
	},
	playScene : function(name) {
		__SceneManager.setCurr(name);
		J('STU')('Context').setPlaying(true);
	},
	playPrev : function() {
		__SceneManager.playScene(__SceneManager.getPrev().name);
	},
	playNext : function() {
		__SceneManager.playScene(__SceneManager.getNext().name);
	},
	setCurr : function(name) {
		__SceneManager.currScene = __SceneManager.getScene(name);
		__SceneManager.setNeedUpdate();
	},
	setPrev : function(name) {
		__SceneManager.prevScene = __SceneManager.getScene(name);
	},
	setNext : function(name) {
		__SceneManager.nextScene = __SceneManager.getScene(name);
	},
	getCurr : function() {
		return __SceneManager.currScene;
	},
	getPrev : function() {
		return __SceneManager.prevScene;
	},
	getNext : function() {
		return __SceneManager.nextScene;
	},
	setNeedUpdate : function() {
		__SceneManager.needUpdate = true;
	}
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyStudio') : undefined);
	if (target) {
		target.addModule('SceneManager', __SceneManager);
		target.addInterface('Scene', {
			get : __SceneManager.getScene,
			getCurr : __SceneManager.getCurr,
			getPrev : __SceneManager.getPrev,
			getNext : __SceneManager.getNext,
			setPrev : __SceneManager.setPrev,
			setNext : __SceneManager.setNext,
			play : __SceneManager.playScene,
			playPrev : __SceneManager.playPrev,
			playNext : __SceneManager.playNext,
			update : __SceneManager.update
		});
	}
})(); 