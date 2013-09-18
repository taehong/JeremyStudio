/**
 * @author Jeremy
 */
var __ObjectManager = {
	creator : {},
	objects : {},
	singleton : {},
	loadCounter : 0,
	init : function() {
		console.log('Init : JeremyStudio.ObjectManager');
		this.type = 'ObjectManager';
		__ObjectManager.loadObjects(Jeremy.getConfig('object'));
		/*
		* Setup object arrays
		*/
		// for (creatorName in __ObjectManager.creator) {
		// __ObjectManager.objects[creatorName] = [];
		// }

	},
	loadObjects : function(config) {
		var l = {
			singleton : config.singleton,
			creator : config.creator
		};
		l.singleton.forEach(function(elem) {
			__ObjectManager.loadObject(elem);
		});
		l.creator.forEach(function(elem) {
			__ObjectManager.loadObject(elem);
		});
	},
	loadObject : function(objConfig) {
		__ObjectManager.loadCounter++;
		$.ajax({
			type : "GET",
			url : objConfig.url,
			dataType : "script"
		}).done(function(data) {
			__ObjectManager.loadCounter--;
			console.log('Object Loaded : ' + objConfig.name);
		});
	},
	create : function(creatorName, argo) {
		var creator = this.getCreator(), object = undefined;
		if (creator !== undefined) {
			object = creator(argo);
			__ObjectManager.addObject(creatorName, object);
		}
		// If creator is undefined, then return undefined.
		return object;
	},
	getCreator : function(creatorName) {
		var creator = undefined;
		if (( creator = this.creator[creatorName]) !== undefined) {
			return creator;
		} else {
			return undefined;
		}
	},
	addCreator : function(creatorName, creator) {
		this.creator[creatorName] = creator;
	},
	addSingleton : function(singletonName, singleton) {
		__ObjectManager.singleton[singletonName] = singleton;
	},
	getSingleton : function(singletonName) {
		return __ObjectManager.singleton[singletonName];
	},
	addObject : function(creatorName, object) {
		__ObjectManager.objects[creatorName].push(object);
	},
	removeObject : function() {

	},
	getObject : function(isSingleton, name, id) {
		var object = null;
		if (isSingleton) {
			object = __ObjectManager.getSingleton(name);
		} else {
			object = __ObjectManager.objects[name];
			// this is array
		}
		return object;
	}
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyStudio') : undefined);
	if (target) {
		target.addModule('ObjectManager', __ObjectManager);
		target.addInterface('Object', {
			create : __ObjectManager.create,
			get : __ObjectManager.getObject,
			set : function(key, name, obj) {
				switch(key) {
					case 'Singleton':
						return __ObjectManager.addSingleton(name, obj);
						break;
					case 'Creator':
						return __ObjectManager.addCreator(name, obj);
						break;
				}
			}
		});
	}
})();
