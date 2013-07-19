/**
 * @author Jeremy Jeong
 */
function JeremyVector4(x, y, z, w) {
	this.type = 'JeremyVector4';
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
}

JeremyVector4.prototype.isVector = function() {
	return (this.w === 0);
};
JeremyVector4.prototype.isPoint = function() {
	return (this.w === 1);
};
JeremyVector4.prototype.addition = function(vector4) {
	var result = undefined, 
		vectorToVector = (this.isVector() && vector4.isVector()), 
		vectorToPoint = (this.isVector() && vector4.isPoint()),
		pointToVector = (this.isPoint() && vector4.isVector());
	try {
		if (vector4.type === 'JeremyVector4' && (vectorToVector || vectorToPoint || pointToVector)) {
			result = new JeremyVector4(this.x + vector4.x, this.y + vector4.y, this.z + vector4.z, this.w + vector4.w);
		} else {
			throw new Error('Invalid Operation');
		}
	} catch (e) {
		console.log(e.message);
	}
	return result;
};
JeremyVector4.prototype.subtraction = function(vector4) {
	var result = undefined, 
		vectorToVector = (this.isVector() && vector4.isVector()), 
		pointToPoint = (this.isPoint() && vector4.isPoint());
	try {
		if (vector4.type === 'JeremyVector4' && (vectorToVector || pointToPoint)) {
			result = new JeremyVector4(this.x - vector4.x, this.y - vector4.y, this.z - vector4.z, this.w - vector4.w);
		} else {
			throw new Error('Invalid Operation');
		}
	} catch (e) {
		console.log(e.message);
	}
	return result;
};