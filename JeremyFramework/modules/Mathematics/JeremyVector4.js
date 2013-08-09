/**
 * @author Jeremy Jeong
 */
function JeremyVector4(argo) {
	this.type = 'JeremyVector4';
	this.x = argo.x;
	this.y = argo.y;
	this.z = argo.z;
	this.w = argo.w;
}

JeremyVector4.prototype.isVector = function() {
	return (this.w === 0);
};
JeremyVector4.prototype.isPoint = function() {
	return (this.w === 1);
};
JeremyVector4.prototype.addition = function(vector4) {
	var result = undefined, vectorToVector = (this.isVector() && vector4.isVector()), vectorToPoint = (this.isVector() && vector4.isPoint()), pointToVector = (this.isPoint() && vector4.isVector());
	try {
		if (vector4.type === 'JeremyVector4' && (vectorToVector || vectorToPoint || pointToVector)) {
			result = new JeremyVector4({
				x : this.x + vector4.x,
				y : this.y + vector4.y,
				z : this.z + vector4.z,
				w : this.w + vector4.w
			});
		} else {
			throw new Error('Invalid Operation');
		}
	} catch (e) {
		console.log(e.message);
	}
	return result;
};
JeremyVector4.prototype.subtraction = function(vector4) {
	var result = undefined, vectorToVector = (this.isVector() && vector4.isVector()), pointToPoint = (this.isPoint() && vector4.isPoint());
	try {
		if (vector4.type === 'JeremyVector4' && (vectorToVector || pointToPoint)) {
			result = new JeremyVector4({
				x : this.x - vector4.x,
				y : this.y - vector4.y,
				z : this.z - vector4.z,
				w : this.w - vector4.w
			});
		} else {
			throw new Error('Invalid Operation');
		}
	} catch (e) {
		console.log(e.message);
	}
	return result;
};
JeremyVector4.prototype.dot = function(vector4) {
	var u = this, v = vector4;
	if (u.isVector() && v.isVector()) {
		return new JeremyVector4({
			x : u.x * v.x,
			y : u.y * v.y,
			z : u.z * v.z,
			w : 0
		});
	} else {
		return undefined;
	}
};
JeremyVector4.prototype.cross = function(vector4) {
	var u = [this.x, this.y, this.z], v = [vector4.x, vector4.y, vector4.z];
	if (u.isVector() && v.isVector()) {
		return new JeremyVector4({
			x : (u[1] * v[2] - u[2] * v[1]),
			y : -(u[0] * v[2] - u[2] - v[0]),
			z : (u[0] * v[1] - u[1] * v[0]),
			w : 0
		});
	} else {
		return undefined;
	}
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyMathematics') : undefined);
	if (target) {
		target.addModule('JeremyVector4', JeremyVector4);
	}
})(); 