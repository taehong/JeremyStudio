/**
 * @author Jeremy
 */
/*
* argo.area : JeremyRectangle
*/

//TODO : Error!! queryRange, subdivide, etc.
function JeremyQuadtree(argo) {
	this.capacity = argo.capacity;
	this.items = [];
	this.aabb = argo.aabb;
	this.northWest = null;
	this.northEast = null;
	this.southWest = null;
	this.southEast = null;
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
	if (this.northWest == null)
		this.subdivide();

	if (this.northWest.insert(item))
		return true;
	if (this.northEast.insert(item))
		return true;
	if (this.southWest.insert(item))
		return true;
	if (this.southEast.insert(item))
		return true;

	// Otherwise, the point cannot be inserted for some unknown reason (which should never happen)
	return false;
};
JeremyQuadtree.prototype.subdivide = function() {
	var aabb = this.aabb, subHalf = aabb.half.multiply(1/2);
	
	this.northWest = new JeremyQuadtree({
		capacity : this.capacity,
		aabb : new JeremyAABB2({
		    center: new JeremyVec3({
		        x:aabb.center.x - subHalf.x,
		        y:aabb.center.y - subHalf.y,
		        w:1
		    }),
		    half: subHalf
		})
	});
	this.northEast = new JeremyQuadtree({
		capacity : this.capacity,
		aabb : new JeremyAABB2({
            center: new JeremyVec3({
                x:aabb.center.x + subHalf.x,
                y:aabb.center.y - subHalf.y,
                w:1
            }),
            half: subHalf
        })
	});
	this.southWest = new JeremyQuadtree({
		capacity : this.capacity,
		aabb : new JeremyAABB2({
            center: new JeremyVec3({
                x:aabb.center.x - subHalf.x,
                y:aabb.center.y + subHalf.y,
                w:1
            }),
            half: subHalf
        })
	});
	this.southEast = new JeremyQuadtree({
		capacity : this.capacity,
		aabb : new JeremyAABB2({
            center: new JeremyVec3({
                x:aabb.center.x + subHalf.x,
                y:aabb.center.y + subHalf.y,
                w:1
            }),
            half: subHalf
        })
	});
};
JeremyQuadtree.prototype.queryRange = function(aabb2) {
	// Prepare an array of results
	var pointsInRange = [], index, items, length;

	// Automatically abort if the range does not collide with this quad
	if (!this.aabb.isIntersectingWith(aabb2))
		return pointsInRange;
	// empty list

	// Check objects at this quad level
	for ( index = 0, items = this.items, length = items.length; index < length; index++) {
		if (aabb2.isContaining(items[index]))
			pointsInRange.push(items[index]);
	}

	// Terminate here, if there are no children
	if (this.northWest == null)
		return pointsInRange;

	// Otherwise, add the points from the children
	pointsInRange = pointsInRange.concat(this.northWest.queryRange(aabb2));
	pointsInRange = pointsInRange.concat(this.northEast.queryRange(aabb2));
	pointsInRange = pointsInRange.concat(this.southWest.queryRange(aabb2));
	pointsInRange = pointsInRange.concat(this.southEast.queryRange(aabb2));

	return pointsInRange;
};
JeremyQuadtree.prototype.drawCB = function(ctx, argo) {
	this.drawAABB(ctx, argo.aabb);
	this.drawItem(ctx, argo.item);
	if (!this.northWest)
		return;
	this.northWest.drawCB(ctx, argo);
	this.northEast.drawCB(ctx, argo);
	this.southWest.drawCB(ctx, argo);
	this.southEast.drawCB(ctx, argo);
};
JeremyQuadtree.prototype.drawAABB = function(ctx, argo) {
	var aabb = this.aabb.valueOf();
	ctx.strokeStyle = argo.color;
	ctx.strokeRect(aabb.left, aabb.top, aabb.width, aabb.height);
};
JeremyQuadtree.prototype.drawItem = function(ctx, argo) {
	var items = this.items;
	ctx.fillStyle = argo.color;
	items.forEach(function(elem) {
		ctx.fillRect(elem.x, elem.y, argo.size, argo.size);
	});
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyDataStructure') : undefined);
	if (target) {
		target.addModule('JeremyQuadtree', JeremyQuadtree);
	}
})();