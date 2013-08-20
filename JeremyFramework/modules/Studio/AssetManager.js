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
		__AssetManager.loadAssets(Jeremy.getConfig('asset'));
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
		$.when($.ajax({
			type : "get",
			url : spriteConfig.data,
			dataType : "json"
		}), $.ajax({
			type : "get",
			url : spriteConfig.sequence,
			dataType : "json"
		})).then(function(data, sequence) {
			var sprite = J('LIB')('Sprite')({
				atlas : J('LIB')('Image')({
					src : spriteConfig.atlas,
					className : 'SpriteAtlas',
					id : spriteConfig.name
				}),
				data : data[0],
				sequence : sequence[0]
			}), asset = J('LIB')('Asset')({
				type : 'sprite',
				name : spriteConfig.name,
				item : sprite
			});
			__AssetManager.addAsset(asset);
			console.log('Sprite Loaded : ', asset);
		});
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
