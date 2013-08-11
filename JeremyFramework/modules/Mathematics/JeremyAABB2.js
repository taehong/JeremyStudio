/**
 * @author Jeremy Jeong
 */
/*
 * @param argo = {
 * 		center: (JeremyVec3)center point,
 * 		half: (JeremyVec3)half dimension vector
 * }
 */
function JeremyAABB2(argo) {
	this.type = 'JeremyAABB2';
	this.center = argo.center;
	this.half = argo.half;
}

JeremyAABB2.prototype.isIntersectingWith = function(aabb2) {
	var cVector = aabb2.center.subtraction(this.center), 
	   horiTest = (aabb2.half.x + this.half.x >= cVector.x), 
	   vertTest = (aabb2.half.y + this.half.y >= cVector.y);
	return horiTest && vertTest;
};
JeremyAABB2.prototype.isContaining = function(point) {
	var pVec = point.subtraction(this.center), 
	   horiTest = (this.half.x >= pVec.x), 
	   vertTest = (this.half.y >= pVec.y);
	return horiTest && vertTest;
};
JeremyAABB2.prototype.getLeft = function() {
	return this.center.x - this.half.x;
};
JeremyAABB2.prototype.getTop = function() {
	return this.center.y - this.half.y;
};
JeremyAABB2.prototype.getRight = function() {
	return this.center.x + this.half.x;
};
JeremyAABB2.prototype.getBottom = function() {
	return this.center.y + this.half.y;
};
JeremyAABB2.prototype.getLeftTop = function() {
	return new JeremyVec3({
		x : this.getLeft(),
		y : this.getTop(),
		w : 1
	});
};
JeremyAABB2.prototype.getRightTop = function() {
	return new JeremyVec3({
		x : this.getRight(),
		y : this.getTop(),
		w : 1
	});
};
JeremyAABB2.prototype.getLeftBottom = function() {
	return new JeremyVec3({
		x : this.getLeft(),
		y : this.getBottom(),
		w : 1
	});
};
JeremyAABB2.prototype.getRightBottom = function() {
	return new JeremyVec3({
		x : this.getRight(),
		y : this.getBottom(),
		w : 1
	});
};
JeremyAABB2.prototype.getWidth = function() {
	return this.half.x * 2;
};
JeremyAABB2.prototype.getHeight = function() {
	return this.half.y * 2;
};
JeremyAABB2.prototype.toString = function() {
	return JSON.stringify(this.valueOf());
};
JeremyAABB2.prototype.valueOf = function() {
	return {
		left : this.getLeft(),
		right : this.getRight(),
		top : this.getTop(),
		bottom : this.getBottom(),
		width : this.getWidth(),
		height : this.getHeight()
	};
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyMathematics') : undefined);
	if (target) {
		target.addModule('JeremyAABB2', JeremyAABB2);
	}
})();