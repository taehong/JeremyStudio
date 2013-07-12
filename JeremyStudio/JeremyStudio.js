/*** @Class JeremyStudio : 게임 엔진 ***/
window.onload = function() {
	JeremyStudio.init();
}
function JS(address) {
	if (address === 'AssetManager') {
		return {
			get : (function() {
				return JeremyStudio.AssetManager.getAsset;
			})(),
			type : (function() {
				return function(typeName) {
					return JeremyStudio.AssetManager.assetType[typeName];
				};
			})(),
			set : (function() {
				return JeremyStudio.AssetManager.addResource;
			})
		};
	} else if (address === 'DataManager') {
		return {
			set : (function() {
				return JeremyStudio.DataManager.setData;
			})(),
			get : (function() {
				return JeremyStudio.DataManager.getData;
			})()
		};
	} else if (address === 'Renderer2D') {
		return {
			render : (function() {
				return JeremyStudio.Renderer2D.render;
			})(),
			add : (function() {
				return JeremyStudio.Renderer2D.addRenderable;
			})(),
			remove : (function() {
				return JeremyStudio.Renderer2D.removeRenderable;
			})()
		};
	} else if (address === 'SceneManager') {
		return {
			add : (function() {
				return JeremyStudio.SceneManager.addScene;
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
	}
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
