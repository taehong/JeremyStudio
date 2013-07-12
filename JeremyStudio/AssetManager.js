var __AssetManager = null;
JeremyStudio.AssetManager = {
    init: function () {
        console.log('Init: JeremyStudio.AssetManager');
        __AssetManager = this;
        this.type = 'AssetManager';
        this.assetType = {
            IMAGE: 0,
            SPRITE: 1,
            SOUND: 2
        };
        this.resources = {
            IMAGE: {},
            SPRITE: {},
            SOUND: {}
        };
        this.assets = {
            IMAGE: {},
            SPRITE: {},
            SOUND: {}
        };
    },
    initAssets: function () {
        var resources = this.resources,
            resourceType = null;
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
    loadImage: function (imgConfig) {
        var assetName = null,
            assetData = null,
            image = null,
            asset = null;
        for (assetName in imgConfig) {
            assetData = imgConfig[assetName];
            image = new JeremyImage(assetData.src, assetData.class, assetData.id);
            asset = new JeremyAsset('IMAGE', assetName, image);
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
            asset = new JeremyAsset('SPRITE', assetName, sprite);
            this.addAsset(asset);
        }
    },
    loadSound: function (soundConfig) {
        // var assetName = null,
        // assetData = null,
        // sound = null,
        // asset = null;
        // for (assetName in soundConfig) {
        // assetData = soundConfig[assetName];
        // // sound = new JeremySound();
        // // sound.initWithConfig(assetData);
        // asset = new JeremyAsset('SOUND', assetName, sound);
        // this.addAsset(asset);
        // }
    },
    addAsset: function (asset) {
        this.assets[asset.type][asset.name] = asset;
    },
    getAsset: function (type, name) {
        return __AssetManager.assets[type][name].getItem();
    },
    addResource: function (type, name, dataObj) {
        this.resources[type][name] = dataObj;
    },
    update: function () {
    	
    }
};