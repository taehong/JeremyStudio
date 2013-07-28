/**
 * @author Jeremy Jeong
 */
// @param owner, rectangle
function JeremyCollider(argo) {
	this.owner = argo.owner;
	this.area = argo.rectangle;
}
JeremyCollider.prototype.isCollidedWith = function (collider) {
	return this.area.isIntersectingWith(collider.area);
};
JeremyCollider.prototype.isSelected = function (point) {
	return this.area.isContaining(point);
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyLibrary') : undefined);
	if (target) {
		target.addModule('JeremyCollider', JeremyCollider);
	}
})();