/**
 * @author Jeremy Jeong
 */
function JeremyVec3(argo) {
    this.type = 'JeremyVec3';
    this.x = argo.x;
    this.y = argo.y;
    this.w = argo.w;
}

JeremyVec3.prototype.isVector = function() {
    return (this.w === 0);
};
JeremyVec3.prototype.isPoint = function() {
    return (this.w === 1);
};
JeremyVec3.prototype.multiply = function(scalar) {
    var newVector = undefined;
    if (this.isVector()) {
        newVector = new JeremyVec3({
            x : this.x * scalar,
            y : this.y * scalar,
            w : 0
        });
    }
    return newVector;
};
JeremyVec3.prototype.addition = function(vec3) {
    var result = undefined, vectorToVector = (this.isVector() && vec3.isVector()), vectorToPoint = (this.isVector() && vec3.isPoint()), pointToVector = (this.isPoint() && vec3.isVector());
    try {
        if (vec3.type === 'JeremyVec3' && (vectorToVector || vectorToPoint || pointToVector)) {
            result = new JeremyVec3({
                x : this.x + vec3.x,
                y : this.y + vec3.y,
                w : this.w + vec3.w
            });
        } else {
            throw new Error('Invalid Operation');
        }
    } catch (e) {
        console.log(e.message);
    }
    return result;
};
JeremyVec3.prototype.subtraction = function(vec3) {
    var result = undefined, vectorToVector = (this.isVector() && vec3.isVector()), pointToPoint = (this.isPoint() && vec3.isPoint());
    try {
        if (vec3.type === 'JeremyVec3' && (vectorToVector || pointToPoint)) {
            result = new JeremyVec3({
                x : this.x - vec3.x,
                y : this.y - vec3.y,
                w : this.w - vec3.w
            });
        } else {
            throw new Error('Invalid Operation');
        }
    } catch (e) {
        console.log(e.message);
    }
    return result;
};
JeremyVec3.prototype.dot = function(vec3) {
    var u = this, v = vec3;
    if (this.isVector() && vec3.isVector()) {
        return new JeremyVec3({
            x : u.x * v.x,
            y : u.y * v.y,
            w : 0
        });
    } else {
        return undefined;
    }
};
JeremyVec3.prototype.magnitude = JeremyVec3.prototype.length = JeremyVec3.prototype.normL2 = function() {
    var normL2 = undefined;
    if (this.isVector()) {
        normL2 = Math.sqrt(this.x * this.x + this.y * this.y);
    }
    return normL2;
};
JeremyVec3.prototype.toString = function() {
    return JSON.stringify(this.valueOf());
};
JeremyVec3.prototype.valueOf = function() {
    return [this.x, this.y, this.w];
};
(function() {
    var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyMathematics') : undefined);
    if (target) {
        target.addModule('JeremyVec3', JeremyVec3);
    }
})();
