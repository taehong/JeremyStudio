/**
 * @author Jeremy Jeong
 */
// @param owner, rectangle
function JeremyCollider(argo) {
	this.id = (new Date()).getTime();
	this.area = argo.area;
}

JeremyCollider.prototype.isCollidedWith = function(collider) {
	return this.area.isIntersectingWith(collider.area);
};
JeremyCollider.prototype.isSelected = function(point) {
	return this.area.isContaining(point);
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