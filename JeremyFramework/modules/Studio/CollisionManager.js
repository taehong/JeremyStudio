/**
 * @author Jeremy
 */
var __CollisionManager = {
    colliders : [],
    init : function() {
        console.log('Init: JeremyStudio.CollisionManager');
        __CollisionManager.type = 'CollisionManager';
        // __CollisionManager.quadtree = J('DAT')('Quadtree')({
            // capacity : 1,
            // aabb : J('MAT')('AABB2')({
                // center : J('MAT')('Vec3')({
                    // x : 600,
                    // y : 240,
                    // w : 1
                // }),
                // half : J('MAT')('Vec3')({
                    // x : 120,
                    // y : 240,
                    // w : 0
                // })
            // })
        // });
    },
    createCollider : function(argo) {
        var newCollider = J('LIB')('Collider')(argo);
        __CollisionManager.addCollider(newCollider);
        return newCollider.id;
    },
    addCollider : function(collider) {
        __CollisionManager.colliders.push(collider);
        // __CollisionManager.quadtree.insertAABB(collider.aabb);
    },
    removeCollider : function(collider) {
        var targetIndex = __CollisionManager.indexOfCollider(collider);
        __CollisionManager.colliders[targetIndex] = null;
        // __CollisionManager.quadtree = J('DAT')('Quadtree')({
            // capacity : 1,
            // aabb : J('MAT')('AABB2')({
                // center : J('MAT')('Vec3')({
                    // x : 600,
                    // y : 240,
                    // w : 1
                // }),
                // half : J('MAT')('Vec3')({
                    // x : 120,
                    // y : 240,
                    // w : 0
                // })
            // })
        // });
        // __CollisionManager.colliders.forEach(function(elem) {
            // __CollisionManager.quadtree.insertAABB(elem.aabb);
        // });
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