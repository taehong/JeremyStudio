/**
 * @author Jeremy Jeong
 */
function JeremyCollider(owner, rectangle) {
	this.owner = owner;
	this.area = rectangle;
}
JeremyCollider.prototype.isCollidedWith = function (collider) {
	return this.area.isIntersectingWith(collider.area);
};
JeremyCollider.prototype.isSelected = function (point) {
	return this.area.isContaining(point);
};