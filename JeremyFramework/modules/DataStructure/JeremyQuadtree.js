/**
 * @author Jeremy
 */
/*
* argo.area : JeremyRectangle
*/

//TODO : Error!! queryRange, subdivide, etc.
//TODO : http://blog.notdot.net/2009/11/Damn-Cool-Algorithms-Spatial-indexing-with-Quadtrees-and-Hilbert-Curves
function JeremyQuadtree(argo) {
    this.capacity = argo.capacity;
    this.items = [];
    this.aabb = argo.aabb;
    this.northWest = null;
    this.northEast = null;
    this.southWest = null;
    this.southEast = null;
}

JeremyQuadtree.prototype.eKeyList = ['northWest', 'northEast', 'southWest', 'southEast'];
JeremyQuadtree.prototype.insertAABB = function(aabb2) {
    var test = undefined, subAABBs = this.getSubAABBs(), retVal = false;
    if (this.aabb.isBinding(aabb2)) {
        test = this.findSubBinding(aabb2, subAABBs);
        if (test) {
            if (!this.northWest)
                this.subdivide(subAABBs);
            retVal = this[test].insertAABB(aabb2);
        } else {
            this.items.push(aabb2);
            retVal = true;
        }
    }
    return retVal;
};

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
JeremyQuadtree.prototype.subdivide = function(subAABBs) {
    var subAABBs = ( subAABBs ? subAABBs : this.getSubAABBs());
    // subAABBs를 재활용할 수 있다.
    this.northWest = new JeremyQuadtree({
        capacity : this.capacity,
        aabb : subAABBs.northWest
    });
    this.northEast = new JeremyQuadtree({
        capacity : this.capacity,
        aabb : subAABBs.northEast
    });
    this.southWest = new JeremyQuadtree({
        capacity : this.capacity,
        aabb : subAABBs.southWest
    });
    this.southEast = new JeremyQuadtree({
        capacity : this.capacity,
        aabb : subAABBs.southEast
    });
};
JeremyQuadtree.prototype.getSubAABBs = function() {
    var aabb = null, subHalf = null, subAABBs = null;
    if (this.northEast) {
        subAABBs = {
            northWest : this.northWest.aabb,
            northEast : this.northEast.aabb,
            southWest : this.southWest.aabb,
            southEast : this.southEast.aabb
        };
    } else {
        aabb = this.aabb;
        subHalf = aabb.half.multiply(1 / 2);
        subAABBs = {
            northWest : new JeremyAABB2({
                center : new JeremyVec3({
                    x : aabb.center.x - subHalf.x,
                    y : aabb.center.y - subHalf.y,
                    w : 1
                }),
                half : subHalf
            }),
            northEast : new JeremyAABB2({
                center : new JeremyVec3({
                    x : aabb.center.x + subHalf.x,
                    y : aabb.center.y - subHalf.y,
                    w : 1
                }),
                half : subHalf
            }),
            southWest : new JeremyAABB2({
                center : new JeremyVec3({
                    x : aabb.center.x - subHalf.x,
                    y : aabb.center.y + subHalf.y,
                    w : 1
                }),
                half : subHalf
            }),
            southEast : new JeremyAABB2({
                center : new JeremyVec3({
                    x : aabb.center.x + subHalf.x,
                    y : aabb.center.y + subHalf.y,
                    w : 1
                }),
                half : subHalf
            })
        };
    }
    return subAABBs;
};
JeremyQuadtree.prototype.findSubContaining = function(point, subAABBs) {
    var keyList = this.eKeyList, key = undefined, listIndex = 0;
    for (listIndex; listIndex < 4; listIndex++) {
        key = keyList[listIndex];
        if (subAABBs[key].isContaining(point)) {
            return key;
        }
    }
};
JeremyQuadtree.prototype.findSubBinding = function(aabb2, subAABBs) {
    var keyList = this.eKeyList, key = undefined, listIndex = 0;
    for (listIndex; listIndex < 4; listIndex++) {
        key = keyList[listIndex];
        if (subAABBs[key].isBinding(aabb2)) {
            return key;
        }
    }
};
JeremyQuadtree.prototype.retrieve = function(point) {
    var test = undefined, retVal = [], subAABBs = this.getSubAABBs();
    if (this.aabb.isContaining(point)) {
        if (this.northWest) {
            if ( test = this.findSubContaining(point, subAABBs))
                retVal = this.items.concat(this[test].retrieve(point));
        } else {
            retVal = this.items;
        }
    }
    return retVal;
};
JeremyQuadtree.prototype.queryRange = function(aabb2) {
    // Prepare an array of results
    var itemInRange = [], index, items, length;

    // Automatically abort if the range does not collide with this quad
    if (!this.aabb.isIntersectingWith(aabb2))
        return itemInRange;
    // empty list

    // Check objects at this quad level
    for ( index = 0, items = this.items, length = items.length; index < length; index++) {
        if (aabb2.isBinding(items[index]))
            itemInRange.push(items[index]);
    }

    // Terminate here, if there are no children
    if (this.northWest == null)
        return itemInRange;

    // Otherwise, add the points from the children
    itemInRange = itemInRange.concat(this.northWest.queryRange(aabb2));
    itemInRange = itemInRange.concat(this.northEast.queryRange(aabb2));
    itemInRange = itemInRange.concat(this.southWest.queryRange(aabb2));
    itemInRange = itemInRange.concat(this.southEast.queryRange(aabb2));

    return itemInRange;
};
JeremyQuadtree.prototype.drawCB = function(ctx, argo) {
    this.drawAABB(ctx, argo.aabb);
    this.drawContainedAABBs(ctx, argo.item);
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
JeremyQuadtree.prototype.drawContainedPoints = function(ctx, argo) {
    var items = this.items;
    ctx.fillStyle = argo.color;
    items.forEach(function(elem) {
        ctx.fillRect(elem.x, elem.y, argo.size, argo.size);
    });
};
JeremyQuadtree.prototype.drawContainedAABBs = function(ctx, argo) {
    var items = this.items;
    ctx.fillStyle = items.color;
    items.forEach(function(elem) {
        ctx.fillRect(elem.getLeft(), elem.getTop(), elem.getWidth(), elem.getHeight());
    });
};
(function() {
    var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyDataStructure') : undefined);
    if (target) {
        target.addModule('JeremyQuadtree', JeremyQuadtree);
    }
})();