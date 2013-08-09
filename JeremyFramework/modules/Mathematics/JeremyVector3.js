/**
 * @author Jeremy Jeong
 */
function JeremyVector3(argo) {
	this.type = 'JeremyVector3';
	this.x = argo.x;
	this.y = argo.y;
	this.w = argo.w;
}

JeremyVector3.prototype.isVector = function() {
	return (this.w === 0);
};
JeremyVector3.prototype.isPoint = function() {
	return (this.w === 1);
};
JeremyVector3.prototype.addition = function(vector3) {
	var result = undefined, vectorToVector = (this.isVector() && vector3.isVector()), vectorToPoint = (this.isVector() && vector3.isPoint()), pointToVector = (this.isPoint() && vector3.isVector());
	try {
		if (vector3.type === 'JeremyVector3' && (vectorToVector || vectorToPoint || pointToVector)) {
			result = new JeremyVector3({
				x : this.x + vector3.x,
				y : this.y + vector3.y,
				w : this.w + vector3.w
			});
		} else {
			throw new Error('Invalid Operation');
		}
	} catch (e) {
		console.log(e.message);
	}
	return result;
};
JeremyVector3.prototype.subtraction = function(vector3) {
	var result = undefined, vectorToVector = (this.isVector() && vector3.isVector()), pointToPoint = (this.isPoint() && vector3.isPoint());
	try {
		if (vector3.type === 'JeremyVector3' && (vectorToVector || pointToPoint)) {
			result = new JeremyVector3({
				x : this.x - vector3.x,
				y : this.y - vector3.y,
				w : this.w - vector3.w
			});
		} else {
			throw new Error('Invalid Operation');
		}
	} catch (e) {
		console.log(e.message);
	}
	return result;
};
JeremyVector3.prototype.dot = function(vector3) {
	var u = this, v = vector3;
	if (this.isVector() && vector3.isVector()) {
		return new JeremyVector3({
			x : u.x * v.x,
			y : u.y * v.y,
			w : 0
		});
	} else {
		return undefined;
	}
};
JeremyVector3.prototype.toString = function() {
	return JSON.stringify(this.valueOf());
};
JeremyVector3.prototype.valueOf = function() {
	return [this.x, this.y, this.w];
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyMathematics') : undefined);
	if (target) {
		target.addModule('JeremyVector3', JeremyVector3);
	}
})();
