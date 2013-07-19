/**
 * @author JeremyJeong
 */
var __SceneManager;
JeremyStudio.SceneManager = {
	init : function() {
		console.log('Init: JeremyStudio.SceneManager');
		__SceneManager = this;
		this.type = 'SceneManager';
		this.currScene = null;
		this.nextScene = null;
		this.prevScene = null;
		this.needUpdateCurr = false;
		this.needUpdateNext = false;
		this.needUpdatePrev = false;
		this.isPlaying = false;
		this.isForward = false;
		this.scenes = {};
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
		if (!this.isPlaying) {
			this.isPlaying = true;
			this.currScene.context.init();
		}
	},
	__stopCurrentScene : function() {
		if (this.isPlaying) {
			this.currScene.context.destroy();
			this.isPlaying = false;
		}
	},
	__changeNextToCurrent : function() {
		/** Show Next Scene : Next button was clicked **/
		if (this.nextScene) {
			this.isForward = true;
			this.__setNeedUpdateCurr();
		} else {
			throw new Error('Undefined Next');
		}
	},
	__changePrevToCurrent : function() {
		/** Show Prev Scene : Back button was clicked **/
		if (this.prevScene) {
			this.isForward = false;
			this.__setNeedUpdateCurr();
		} else {
			throw new Error('Undefined Prev');
		}
	},
	selectCurrScene : function(sceneName) {
		// TODO this is for jump to any scene
		var scene = this.getScene(sceneName);
		this.currScene = scene;
		this.__setNeedUpdateNext();
		this.__setNeedUpdatePrev();
	},
	selectNextScene : function(sceneName) {
		// TODO this is for undefined next : because currScene has multiple next scenes
		var scene = this.getScene(sceneName);
		this.nextScene = scene;
	},
	selectPrevScene : function(sceneName) {
		// TODO this is for undefined prev : because currScene has multiple prev scenes
		var scene = this.getScene(sceneName);
		this.prevScene = scene;
	},
	getScene : function(sceneName) {
		var scene = __SceneManager.scenes[sceneName];
		return scene;
	},
	__setNeedUpdateCurr : function() {
		this.needUpdateCurr = true;
	},
	__setNeedUpdateNext : function() {
		this.needUpdateNext = true;
	},
	__setNeedUpdatePrev : function() {
		this.needUpdatePrev = true;
	},
	__updateCurrScene : function() {
		// TODO this is for going to next or prev
		if (this.isForward) {
			this.currScene = this.nextScene;
		} else {
			this.currScene = this.prevScene;
		}
		this.__setNeedUpdateNext();
		this.__setNeedUpdatePrev();
		this.needUpdateCurr = false;
	},
	__updateNextScene : function() {
		// TODO set new next scene if there's only one next is exist, or just make it undefined
		var nextSceneNames = this.currScene.nextSceneNames;
		if (nextSceneNames.length === 1) {
			this.nextScene = this.getScene(nextSceneNames[0]);
		} else {
			this.nextScene = undefined;
		}
		this.needUpdateNext = false;
	},
	__updatePrevScene : function() {
		// TODO set new prev scene if there's only one prev is exist, or just make it undefined
		var prevSceneNames = this.currScene.prevSceneNames;
		if (prevSceneNames.length === 1) {
			this.prevScene = this.getScene(prevSceneNames[0]);
		} else {
			this.prevScene = undefined;
		}
		this.needUpdatePrev = false;
	},
	update : function() {
		this.__changeCurrentScene();
		this.__playCurrentScene();
	},
	__changeCurrentScene : function() {
		if (this.needUpdateCurr) {
			this.__updateCurrScene();
			this.__playCurr();
		}
		if (this.needUpdateNext) {
			this.__updateNextScene();
		}
		if (this.needUpdatePrev) {
			this.__updatePrevScene();
		}
	},
	__playCurrentScene : function() {
		if (this.isPlaying) {
			this.currScene.context.update();
		}
	}
};
