var eAssetType = {
	IMAGE : 0,
	SPRITE : 1,
	AUDIO : 2,
	MODEL : 3,
}, __AssetManager = {
	init : function() {
		console.log('Init: JeremyStudio.AssetManager');
		this.type = 'AssetManager';
		this.assets = {
			image : {},
			sprite : {},
			audio : {},
			model : {}
		};
		
	},
	initAssets : function() {
		var resources = this.resources, resourceType = null;
		for (resourceType in resources) {
			switch (JS('asset').type(resourceType)) {
				case JS('asset').type('IMAGE'):
					this.loadImage(resources[resourceType]);
					break;
				case JS('asset').type('SPRITE'):
					this.loadSprite(resources[resourceType]);
					break;
				case JS('asset').type('SOUND'):
					this.loadSound(resources[resourceType]);
					break;
			}
		}
	},
	loadImage : function(imgConfig) {
		var assetName = null, assetData = null, asset = null;
		for (assetName in imgConfig) {
			assetData = imgConfig[assetName];
			asset = generateImageAsset(assetName, assetData.src, assetData.class, assetData.id);
			this.addAsset(asset);
		}
	},
	loadSprite : function(spriteConfig) {
		var assetName = null, assetData = null, sprite = null, asset = null;
		for (assetName in spriteConfig) {
			assetData = spriteConfig[assetName];
			sprite = new JeremySprite();
			sprite.initWithConfig(assetData);
			asset = new JeremyAsset('SPRITE', assetName, sprite);
			this.addAsset(asset);
		}
	},
	loadSound : function(soundConfig) {
	},
	loadModel : function(modelConfig) {
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
			get: __AssetManager.getAsset
		});
	}
})();