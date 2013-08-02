/**
 * @author JeremyJeong
 */
function JeremyStack() {
	this.list = [];
	this.count = 0;
}

JeremyStack.prototype.push = function(item) {
	this.list.push(item);
	this.count++;
};

JeremyStack.prototype.pop = function() {
	var item = null;
	if (!this.isEmpty()) {
		item = this.list.pop();
	} else {
		throw new Error('JeremyStack.pop : isEmpty');
	}
	return item;
};

JeremyStack.prototype.top = function() {
	var item = null;
	if (!this.isEmpty()) {
		item = this.list[this.count - 1];
	} else {
		throw new Error('JeremyStack.top : isEmpty');
	}
	return item;
};

JeremyStack.prototype.isEmpty = function() {
	return this.count === 0;
};

JeremyStack.prototype.length = function() {
	return this.count;
};

JeremyStack.prototype.iterator = function() {
	return new JeremyIterator(this);
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyLibrary') : undefined);
	if (target) {
		target.addModule('JeremyStack', JeremyStack);
	}
})();
