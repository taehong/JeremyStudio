var __AssetManager = {
	init : function() {
		console.log('Init: JeremyStudio.AssetManager');
		__AssetManager.type = 'AssetManager';
		__AssetManager.assets = {
			image : {},
			sprite : {},
			audio : {},
			model : {}
		};
		__AssetManager.loadAssets(J('STU')('Config').get('asset'));
	},
	loadAssets : function(config) {
		__AssetManager.loadImageAssets(config.image);
		__AssetManager.loadSpriteAssets(config.sprite);
		__AssetManager.loadAudioAssets(config.audio);
		__AssetManager.loadModelAssets(config.model);
	},
	loadImageAssets : function(config) {
		var iteration = config.count, items = config.items, listIndex = 0;
		for (listIndex, iteration; listIndex < iteration; listIndex++) {
			__AssetManager.loadImage(items[listIndex]);
		}
	},
	loadSpriteAssets : function(config) {
		var iteration = config.count, items = config.items, listIndex = 0;
		for (listIndex, iteration; listIndex < iteration; listIndex++) {
			__AssetManager.loadSprite(items[listIndex]);
		}
	},
	loadAudioAssets : function(config) {
		var iteration = config.count, items = config.items, listIndex = 0;
		for (listIndex, iteration; listIndex < iteration; listIndex++) {
			__AssetManager.loadAudio(items[listIndex]);
		}
	},
	loadModelAssets : function(config) {
		var iteration = config.count, items = config.items, listIndex = 0;
		for (listIndex, iteration; listIndex < iteration; listIndex++) {
			__AssetManager.loadModel(items[listIndex]);
		}
	},
	loadImage : function(imageConfig) {
		var image = J('LIB')('Image')({
			src : imageConfig.src,
			className : imageConfig.className,
			id : imageConfig.id
		}), asset = J('LIB')('Asset')({
			type : 'image',
			name : imageConfig.name,
			item : image
		});
		__AssetManager.addAsset(asset);
	},
	loadSprite : function(spriteConfig) {
		console.log(spriteConfig);
		// var assetName = null, assetData = null, sprite = null, asset = null;
		// for (assetName in spriteConfig) {
		// assetData = spriteConfig[assetName];
		// sprite = new JeremySprite();
		// sprite.initWithConfig(assetData);
		// asset = new JeremyAsset('SPRITE', assetName, sprite);
		// __AssetManager.addAsset(asset);
		// }
	},
	loadAudio : function(soundConfig) {
		console.log(soundConfig);
	},
	loadModel : function(modelConfig) {
		console.log(modelConfig);
	},
	addAsset : function(asset) {
		__AssetManager.assets[asset.type][asset.name] = asset;
	},
	getAsset : function(type, name) {
		return __AssetManager.assets[type][name].getItem();
	}
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyStudio') : undefined);
	if (target) {
		target.addModule('AssetManager', __AssetManager);
		target.addInterface('Asset', {
			get : __AssetManager.getAsset
		});
	}
})();