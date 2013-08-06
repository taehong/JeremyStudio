var __AssetManager = null;
JeremyStudio.AssetManager = {
    init: function () {
        console.log('Init: JeremyStudio.AssetManager');
        __AssetManager = this;
        this.type = 'AssetManager';
        this.initAssets();
    },
    assets: {
        IMAGE: {},
        SPRITE: {},
        SOUND: {}
    },
    initAssets: function () {
        var assetConfig = this.AssetConfig,
            configType = null;
        for (configType in assetConfig) {
            switch (this.AssetType[configType]) {
                case this.AssetType.IMAGE:
                    this.loadImage(assetConfig[configType]);
                    break;
                case this.AssetType.SPRITE:
                    this.loadSprite(assetConfig[configType]);
                    break;
                case this.AssetType.SOUND:
                    this.loadSound(assetConfig[configType]);
                    break;
            }
        }
    },
    loadImage: function (imgConfig) {
        var assetName = null,
            assetData = null,
            image = null,
            asset = null;
        for (assetName in imgConfig) {
            assetData = imgConfig[assetName];
            image = new JeremyImage(assetData.src, assetData.class, assetData.id);
            asset = new this.Asset('IMAGE', assetName, image);
            this.addAsset(asset);
        }
    },
    loadSprite: function (spriteConfig) {
        var assetName = null,
            assetData = null,
            sprite = null,
            asset = null;
        for (assetName in spriteConfig) {
            assetData = spriteConfig[assetName];
            sprite = new JeremySprite();
            sprite.initWithConfig(assetData);
            asset = new this.Asset('SPRITE', assetName, sprite);
            this.addAsset(asset);
        }
    },
    loadSound: function (soundConfig) {
		var assetName = null,
			assetData = null,
			sound = null,
			asset = null;
		for (assetName in soundConfig) {
			assetData = soundConfig[assetName];
			sound = new JeremySound();
			sound.initWithConfig(assetData);
			asset = new this.Asset('SOUND', assetName, sound);
			this.addAsset(asset);
		}	
    },
    addAsset: function (asset) {
        this.assets[asset.type][asset.name] = asset;
    },
    getAsset: function (type, name) {
        return __AssetManager.assets[type][name].getItem();
    }
};
JeremyStudio.AssetManager.AssetType = {
    IMAGE: 0,
    SPRITE: 1,
    SOUND: 2
};
JeremyStudio.AssetManager.Asset = function (type, name, item) {
    this.type = type;
    this.name = name;
    this.item = item;
};
JeremyStudio.AssetManager.Asset.prototype.getItem = function () {
    return this.item;
};