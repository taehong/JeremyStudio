var JeremyStudio = {
	init: function () {
		
	}
};
function JS(manager) {
	var controller = null;
	switch(manager) {
		case 'asset':
			controller = {
				get : (function() {
					return JeremyStudio.AssetManager.getAsset;
				})(),
				set : (function() {
					return JeremyStudio.AssetManager.setAsset;
				})()
			};
			break;
		case 'event':
			controller = {
				get : (function() {
					return JeremyStudio.EventManager.getEvent;
				})(),
				set : (function() {
					return JeremyStudio.EventManager.setEvent;
				})()
			};
			break;
		case 'state':
			controller = {
				get : (function() {
					return JeremyStudio.StateManager.getState;
				})(),
				set : (function() {
					return JeremyStudio.StateManager.setState;
				})()
			};
			break;
		case 'scene':
			controller = {
				get : (function() {
					return JeremyStudio.SceneManager.getScene;
				})(),
				set : (function() {
					return JeremyStudio.SceneManager.setScene;
				})(),
				play : (function() {
					return JeremyStudio.SceneManager.playScene;
				})(),
			};
			break;
		case 'r2d':
			controller = {
				render : (function() {
					return JeremyStudio.Renderer2D.render;
				})(),
				get : (function() {
					return JeremyStudio.Renderer2D.getRenderable;
				})(),
				set : (function() {
					return JeremyStudio.Renderer2D.setRenderable;
				})()
			};
			break;
		case 'r3d':
			controller = {
				render : (function() {
					return JeremyStudio.Renderer3D.render;
				})(),
				get : (function() {
					return JeremyStudio.Renderer3D.getRenderable;
				})(),
				set : (function() {
					return JeremyStudio.Renderer3D.setRenderable;
				})()
			};
			break;
		case 'sound':
			controller = {
				play : (function() {
					return JeremyStudio.SoundManager.play;
				})(),
				get : (function() {
					return JeremyStudio.SoundManager.getPlayable;
				})(),
				set : (function() {
					return JeremyStudio.SoundManager.setPlayable;
				})()
			};
			break;
	}
}