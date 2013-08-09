/**
 * @author Jeremy Jeong
 */
// @param owner, rectangle
function JeremyCollider(argo) {
	this.owner = argo.owner;
	this.area = argo.area;
}

JeremyCollider.prototype.isCollidedWith = function(collider) {
	return this.area.isIntersectingWith(collider.area);
};
JeremyCollider.prototype.isSelected = function(point) {
	return this.area.isContaining(point);
};
JeremyCollider.prototype.isEquals = function(collider) {
	var thisCollider = JSON.stringify(this), thatCollider = JSON.stringify(collider);
	return thisCollider == thatCollider;
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyLibrary') : undefined);
	if (target) {
		target.addModule('JeremyCollider', JeremyCollider);
	}
})(); 