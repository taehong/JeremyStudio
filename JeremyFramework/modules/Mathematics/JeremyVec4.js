/**
 * @author Jeremy Jeong
 */
function JeremyVec4(argo) {
	this.type = 'JeremyVec4';
	this.x = argo.x;
	this.y = argo.y;
	this.z = argo.z;
	this.w = argo.w;
}

JeremyVec4.prototype.isVector = function() {
	return (this.w === 0);
};
JeremyVec4.prototype.isPoint = function() {
	return (this.w === 1);
};
JeremyVec4.prototype.addition = function(vec4) {
	var result = undefined, vectorToVector = (this.isVector() && vec4.isVector()), vectorToPoint = (this.isVector() && vec4.isPoint()), pointToVector = (this.isPoint() && vec4.isVector());
	try {
		if (vec4.type === 'JeremyVec4' && (vectorToVector || vectorToPoint || pointToVector)) {
			result = new JeremyVec4({
				x : this.x + vec4.x,
				y : this.y + vec4.y,
				z : this.z + vec4.z,
				w : this.w + vec4.w
			});
		} else {
			throw new Error('Invalid Operation');
		}
	} catch (e) {
		console.log(e.message);
	}
	return result;
};
JeremyVec4.prototype.subtraction = function(vec4) {
	var result = undefined, vectorToVector = (this.isVector() && vec4.isVector()), pointToPoint = (this.isPoint() && vec4.isPoint());
	try {
		if (vec4.type === 'JeremyVec4' && (vectorToVector || pointToPoint)) {
			result = new JeremyVec4({
				x : this.x - vec4.x,
				y : this.y - vec4.y,
				z : this.z - vec4.z,
				w : this.w - vec4.w
			});
		} else {
			throw new Error('Invalid Operation');
		}
	} catch (e) {
		console.log(e.message);
	}
	return result;
};
JeremyVec4.prototype.dot = function(vec4) {
	var u = this, v = vec4;
	if (this.isVector() && vec4.isVector()) {
		return new JeremyVec4({
			x : u.x * v.x,
			y : u.y * v.y,
			z : u.z * v.z,
			w : 0
		});
	} else {
		return undefined;
	}
};
JeremyVec4.prototype.cross = function(vec4) {
	var u = [this.x, this.y, this.z], v = [vec4.x, vec4.y, vec4.z];
	if (this.isVector() && vec4.isVector()) {
		return new JeremyVec4({
			x : (u[1] * v[2] - u[2] * v[1]),
			y : -(u[0] * v[2] - u[2] - v[0]),
			z : (u[0] * v[1] - u[1] * v[0]),
			w : 0
		});
	} else {
		return undefined;
	}
};
JeremyVec4.prototype.toString = function() {
	return JSON.stringify(this.valueOf());
};
JeremyVec4.prototype.valueOf = function() {
	return [this.x, this.y, this.z, this.w];
};
JeremyVec4.prototype.isEquals = function(vec4) {
	var sub = vec4.subtraction(this);
	// 서로 빼서 모든 요소가 0이면 같은 벡터 or 포인트
	return (sub.x + sub.y + sub.z + sub.w) === 0;
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyMathematics') : undefined);
	if (target) {
		target.addModule('JeremyVec4', JeremyVec4);
	}
})(); 