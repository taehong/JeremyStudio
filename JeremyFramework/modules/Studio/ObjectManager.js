/**
 * @author Jeremy
 */
var __ObjectManager = {
	creator : {},
	objects : {},
	singleton : {},
	init : function() {
		console.log('Init : JeremyStudio.ObjectManager');
		this.type = 'ObjectManager';
		for (creatorName in __ObjectManager.creator) {
			__ObjectManager.objects[creatorName] = [];
		}
	},
	create : function(creatorName, argo) {
		var creator = this.getCreator(), object = undefined;
		if (creator !== undefined) {
			object = creator(argo);
			__ObjectManager.registerObject(creatorName, object);
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
	registerObject : function(creatorName, object) {
		__ObjectManager.objects[creatorName].push(object);
	},
	deregisterObject : function() {

	},
	registerSingleton : function(singletonName, singleton) {
		__ObjectManager.singleton[singletonName] = singleton;
	},
	getSingleton : function(singletonName) {
		return __ObjectManager.singleton[singletonName];
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
			get : __ObjectManager.getObject
		});
	}
})(); 