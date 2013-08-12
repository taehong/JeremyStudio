/**
 * @author Jeremy Jeong
 */
// @param owner, rectangle
function JeremyCollider(argo) {
	this.id = (new Date()).getTime();
	this.aabb = argo.aabb;
}

JeremyCollider.prototype.isCollidedWith = function(collider) {
	return this.aabb.isIntersectingWith(collider.aabb);
};
JeremyCollider.prototype.isSelected = function(point) {
	return this.aabb.isContaining(point);
};
JeremyCollider.prototype.isEquals = function(collider) {
	return this.id == collider.id;
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyLibrary') : undefined);
	if (target) {
		target.addModule('JeremyCollider', JeremyCollider);
	}
})(); 