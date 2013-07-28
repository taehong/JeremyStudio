/*** @Class JeremyStudio : 게임 엔진 ***/
window.onload = function() {
	JeremyStudio.init();
}
function JS(manager) {
	var interfaceObject = null;
	switch (manager) {
		case 'AssetManager':
			interfaceObject = {
				get : (function() {
					return JeremyStudio.AssetManager.getAsset;
				})(),
				type : (function() {
					return function(typeName) {
						return JeremyStudio.AssetManager.assetType[typeName];
					};
				})(),
				set : (function() {
					// TODO : 뭐지 이게?
					return JeremyStudio.AssetManager.addResource;
				})(),
				add : (function() {
					return JeremyStudio.AssetManager.addAsset;
				})(),
				make : (function() {
					return JeremyStudio.AssetManager.generateImageAsset;
				})()
			};
			break;
		case 'DataManager':
			interfaceObject = {
				set : (function() {
					return JeremyStudio.DataManager.setData;
				})(),
				get : (function() {
					return JeremyStudio.DataManager.getData;
				})()
			};
			break;
		case 'SceneManager':
			interfaceObject = {
				add : (function() {
					return JeremyStudio.SceneManager.addScene;
				})(),
				get : (function() {
					return JeremyStudio.SceneManager.getScene;
				})(),
				play : (function() {
					return JeremyStudio.SceneManager.playScene;
				})(),
				next : (function() {
					return JeremyStudio.SceneManager.playNext;
				})(),
				prev : (function() {
					return JeremyStudio.SceneManager.playPrev;
				})()
			};
			break;
		case 'SoundManager':

			break;
		case 'Renderer2D':
			interfaceObject = {
				render : (function() {
					return JeremyStudio.Renderer2D.render;
				})(),
				add : (function() {
					return JeremyStudio.Renderer2D.addRenderable;
				})(),
				remove : (function() {
					return JeremyStudio.Renderer2D.removeRenderable;
				})(),
				canvas : (function() {
					return JeremyStudio.Renderer2D.canvas;
				})(),
				context : (function() {
					return JeremyStudio.Renderer2D.context;
				})()				
			};
			break;
		case 'Renderer3D':

			break;
	}
	return interfaceObject;
}
var JeremyStudio = {
	init : function() {
		console.log('Init: JeremyStudio');
		this.type = 'JeremyStudio';
		this.initModules();
		this.start();
		startGame();
	},
	initModules : function() {
		for (var module in this) {
			if ( typeof (this[module]) === 'object')
				this[module].init();
		}
	},
	start : function() {
		console.log('Start: JeremyStudio');
		window.requestAnimFrame(JeremyStudio.update);
	},
	update : function() {
		JeremyStudio.Renderer2D.update();
		JeremyStudio.SceneManager.update();
		window.requestAnimFrame(JeremyStudio.update);
	}
};