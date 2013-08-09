/**
 * @author Jeremy
 */
/*
 * argo.area : JeremyRectangle
 */
function JeremyQuadtree(argo) {
	this.capacity = argo.capacity;
	this.items = [];
	this.aabb = argo.area;
	this.upperLeft = null;
	this.upperRight = null;
	this.lowerLeft = null;
	this.lowerRight = null;
}

JeremyQuadtree.prototype.insert = function(item) {
	// Ignore objects which do not belong in this quad tree
	if (!this.aabb.isContaining(item))
		return false;
	// object cannot be added

	// If there is space in this quad tree, add the object here
	if (this.items.length < this.capacity) {
		this.items.push(item);
		return true;
	}

	// Otherwise, we need to subdivide then add the point to whichever node will accept it
	if (this.upperLeft == null)
		this.subdivide();

	if (this.upperLeft.insert(item))
		return true;
	if (this.upperRight.insert(item))
		return true;
	if (this.lowerLeft.insert(item))
		return true;
	if (this.lowerRight.insert(item))
		return true;

	// Otherwise, the point cannot be inserted for some unknown reason (which should never happen)
	return false;
};
JeremyQuadtree.prototype.subdivide = function() {
	var aabb = this.aabb.valueOf();
	this.upperLeft = new JeremyQuadtree({
		capacity : this.capacity,
		area : new JeremyRectangle({
			x : aabb.left,
			y : aabb.top,
			w : aabb.width / 2,
			h : aabb.height / 2
		})
	});
	this.upperRight = new JeremyQuadtree({
		capacity : this.capacity,
		area : new JeremyRectangle({
			x : aabb.left + aabb.width / 2,
			y : aabb.top,
			w : aabb.width / 2,
			h : aabb.height / 2
		})
	});
	this.lowerLeft = new JeremyQuadtree({
		capacity : this.capacity,
		area : new JeremyRectangle({
			x : aabb.left,
			y : aabb.top + aabb.height / 2,
			w : aabb.width / 2,
			h : aabb.height / 2
		})
	});
	this.lowerRight = new JeremyQuadtree({
		capacity : this.capacity,
		area : new JeremyRectangle({
			x : aabb.left + aabb.width / 2,
			y : aabb.top + aabb.height / 2,
			w : aabb.width / 2,
			h : aabb.height / 2
		})
	});
};
JeremyQuadtree.prototype.queryRange = function(area) {
	// Prepare an array of results
	var pointsInRange = [], index, items, length;

	// Automatically abort if the range does not collide with this quad
	if (!this.aabb.isIntersectingWith(area))
		return pointsInRange;
	// empty list

	// Check objects at this quad level
	for ( index = 0, items = this.items, length = items.length; index < length; index++) {
		if (area.isContaining(items[index]))
			pointsInRange.push(items[index]);
	}

	// Terminate here, if there are no children
	if (this.upperLeft == null)
		return pointsInRange;

	// Otherwise, add the points from the children
	pointsInRange = pointsInRange.concat(this.upperLeft.queryRange(area));
	pointsInRange = pointsInRange.concat(this.upperRight.queryRange(area));
	pointsInRange = pointsInRange.concat(this.lowerLeft.queryRange(area));
	pointsInRange = pointsInRange.concat(this.lowerRight.queryRange(area));

	return pointsInRange;
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyDataStructure') : undefined);
	if (target) {
		target.addModule('JeremyQuadtree', JeremyQuadtree);
	}
})();
