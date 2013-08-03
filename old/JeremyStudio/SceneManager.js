/**
 * @author JeremyJeong
 */
var __SceneManager;
JeremyStudio.SceneManager = {
	init : function() {
		console.log('Init: JeremyStudio.SceneManager');
		__SceneManager = this;
		__SceneManager.type = 'SceneManager';
		__SceneManager.currScene = null;
		__SceneManager.nextScene = null;
		__SceneManager.prevScene = null;
		__SceneManager.needUpdateCurr = false;
		__SceneManager.needUpdateNext = false;
		__SceneManager.needUpdatePrev = false;
		__SceneManager.isPlaying = false;
		__SceneManager.isForward = false;
		__SceneManager.scenes = {};
	},
	addScene : function(scene) {
		var sceneName = scene.name;
		try {
			if (__SceneManager.scenes[sceneName] === undefined) {
				__SceneManager.scenes[sceneName] = scene;
			} else {
				throw new Error("Error >> DuplicatedSceneException >> Scene '" + sceneName + "' is already exist");
			}
		} catch (e) {
			console.log(e);
		}
	},
	playScene : function(sceneName) {
		var scene = __SceneManager.scenes[sceneName];
		try {
			if (!__SceneManager.isPlaying && scene) {
				__SceneManager.selectCurrScene(sceneName);
				__SceneManager.__playCurr();
			} else {
				throw new Error("Error >> UndefinedSceneException >> Scene '" + sceneName + "' is not defined");
			}
		} catch (e) {
			console.log(e);
		}
	},
	playPrev : function() {
		try {
			__SceneManager.__stopCurrentScene();
			__SceneManager.__changePrevToCurrent();
		} catch(e) {
			alert(e.message);
		}
	},
	playNext : function() {
		try {
			__SceneManager.__stopCurrentScene();
			__SceneManager.__changeNextToCurrent();
		} catch(e) {
			alert(e.message);
		}
	},
	__playCurr : function() {
		if (!__SceneManager.isPlaying) {
			__SceneManager.isPlaying = true;
			__SceneManager.currScene.context.init();
		}
	},
	__stopCurrentScene : function() {
		if (__SceneManager.isPlaying) {
			__SceneManager.currScene.context.destroy();
			__SceneManager.isPlaying = false;
		}
	},
	__changeNextToCurrent : function() {
		/** Show Next Scene : Next button was clicked **/
		if (__SceneManager.nextScene) {
			__SceneManager.isForward = true;
			__SceneManager.__setNeedUpdateCurr();
		} else {
			throw new Error('Undefined Next');
		}
	},
	__changePrevToCurrent : function() {
		/** Show Prev Scene : Back button was clicked **/
		if (__SceneManager.prevScene) {
			__SceneManager.isForward = false;
			__SceneManager.__setNeedUpdateCurr();
		} else {
			throw new Error('Undefined Prev');
		}
	},
	selectCurrScene : function(sceneName) {
		// TODO __SceneManager is for jump to any scene
		var scene = __SceneManager.getScene(sceneName);
		__SceneManager.currScene = scene;
		__SceneManager.__setNeedUpdateNext();
		__SceneManager.__setNeedUpdatePrev();
	},
	selectNextScene : function(sceneName) {
		// TODO __SceneManager is for undefined next : because currScene has multiple next scenes
		var scene = __SceneManager.getScene(sceneName);
		__SceneManager.nextScene = scene;
	},
	selectPrevScene : function(sceneName) {
		// TODO __SceneManager is for undefined prev : because currScene has multiple prev scenes
		var scene = __SceneManager.getScene(sceneName);
		__SceneManager.prevScene = scene;
	},
	getScene : function(sceneName) {
		var scene = __SceneManager.scenes[sceneName];
		return scene;
	},
	__setNeedUpdateCurr : function() {
		__SceneManager.needUpdateCurr = true;
	},
	__setNeedUpdateNext : function() {
		__SceneManager.needUpdateNext = true;
	},
	__setNeedUpdatePrev : function() {
		__SceneManager.needUpdatePrev = true;
	},
	__updateCurrScene : function() {
		// TODO __SceneManager is for going to next or prev
		if (__SceneManager.isForward) {
			__SceneManager.currScene = __SceneManager.nextScene;
		} else {
			__SceneManager.currScene = __SceneManager.prevScene;
		}
		__SceneManager.__setNeedUpdateNext();
		__SceneManager.__setNeedUpdatePrev();
		__SceneManager.needUpdateCurr = false;
	},
	__updateNextScene : function() {
		// TODO set new next scene if there's only one next is exist, or just make it undefined
		var nextSceneNames = __SceneManager.currScene.nextSceneNames;
		if (nextSceneNames.length === 1) {
			__SceneManager.nextScene = __SceneManager.getScene(nextSceneNames[0]);
		} else {
			__SceneManager.nextScene = undefined;
		}
		__SceneManager.needUpdateNext = false;
	},
	__updatePrevScene : function() {
		// TODO set new prev scene if there's only one prev is exist, or just make it undefined
		var prevSceneNames = __SceneManager.currScene.prevSceneNames;
		if (prevSceneNames.length === 1) {
			__SceneManager.prevScene = __SceneManager.getScene(prevSceneNames[0]);
		} else {
			__SceneManager.prevScene = undefined;
		}
		__SceneManager.needUpdatePrev = false;
	},
	update : function() {
		__SceneManager.__changeCurrentScene();
		__SceneManager.__playCurrentScene();
	},
	__changeCurrentScene : function() {
		if (__SceneManager.needUpdateCurr) {
			__SceneManager.__updateCurrScene();
			__SceneManager.__playCurr();
		}
		if (__SceneManager.needUpdateNext) {
			__SceneManager.__updateNextScene();
		}
		if (__SceneManager.needUpdatePrev) {
			__SceneManager.__updatePrevScene();
		}
	},
	__playCurrentScene : function() {
		if (__SceneManager.isPlaying) {
			__SceneManager.currScene.context.update();
		}
	}
};
