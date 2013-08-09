/**
 * @author Jeremy
 */
var __CollisionManager = {
	colliders : [],
	init : function() {
		console.log('Init: JeremyStudio.CollisionManager');
		__CollisionManager.type = 'CollisionManager';
	},
	createCollider : function(argo) {
		var newCollider = J('LIB')('Collider')(argo);
		__CollisionManager.addCollider(newCollider);
		return newCollider;
	},
	addCollider : function(collider) {
		__CollisionManager.colliders.push(collider);
	},
	removeCollider : function(collider) {
		var targetIndex = __CollisionManager.indexOfCollider(collider);
		__CollisionManager.colliders[targetIndex] = null;
	},
	indexOfCollider : function(collider) {
		var targetIndex = -1;
		__CollisionManager.colliders.forEach(function(elem, index) {
			if (elem.isEquals(collider)) {
				targetIndex = index;
			}
		});
		return targetIndex;
	}
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyStudio') : undefined);
	if (target) {
		target.addModule('CollisionManager', __CollisionManager);
		target.addInterface('Collision', {
			create : __CollisionManager.createCollider
		});
	}
})(); 