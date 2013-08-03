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
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyMath') : undefined);
	if (target) {
		target.addModule('JeremyVector4', JeremyVector4);
	}
})(); 