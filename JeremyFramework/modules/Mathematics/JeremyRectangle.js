/**
 * @author Jeremy Jeong
 */
function JeremyRectangle(argo) {
	this.type = 'JeremyRectangle';
	this.left = argo.x;
	this.top = argo.y;
	this.right = argo.x + argo.w;
	this.bottom = argo.y + argo.h;
	this.width = argo.w;
	this.height = argo.h;
}

JeremyRectangle.prototype.setLeft = function(left) {
	this.left = left;
	this.right = this.left + this.width;
};
JeremyRectangle.prototype.setTop = function(top) {
	this.top = top;
	this.bottom = this.top + this.height;
};
JeremyRectangle.prototype.isIntersectingWith = function(rectangle) {
	var isIntersecting = false, leftTopTest = this.isContaining(rectangle.leftTop()), rightTopTest = this.isContaining(rectangle.rightTop()), leftBottomTest = this.isContaining(rectangle.leftBottom()), rightBottomTest = this.isContaining(rectangle.rightBottom());
	if (leftTopTest || rightTopTest || leftBottomTest || rightBottomTest) {
		isIntersecting = true;
	}
	return isIntersecting;
};
JeremyRectangle.prototype.isContaining = function(point) {
	var isContaining = false, horizontalTest = (this.left <= point.x && this.right >= point.x), verticalTest = (this.top <= point.y && this.bottom >= point.y);
	if (horizontalTest && verticalTest) {
		isContaining = true;
	}
	return isContaining;
};
JeremyRectangle.prototype.leftTop = function() {
	return new JeremyVec3({
		x : this.left,
		y : this.top,
		w : 1
	});
};
JeremyRectangle.prototype.rightTop = function() {
	return new JeremyVec3({
		x : this.right,
		y : this.top,
		w : 1
	});
};
JeremyRectangle.prototype.leftBottom = function() {
	return new JeremyVec3({
		x : this.left,
		y : this.bottom,
		w : 1
	});
};
JeremyRectangle.prototype.rightBottom = function() {
	return new JeremyVec3({
		x : this.right,
		y : this.bottom,
		w : 1
	});
};
JeremyRectangle.prototype.toString = function() {
	return JSON.stringify(this.valueOf());
};
JeremyRectangle.prototype.valueOf = function() {
	return {
		left : this.left,
		right : this.right,
		top : this.top,
		bottom : this.bottom,
		width : this.width,
		height : this.height
	};
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyMathematics') : undefined);
	if (target) {
		target.addModule('JeremyRectangle', JeremyRectangle);
	}
})();