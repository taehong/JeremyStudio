/**
 * @author Jeremy
 */
function JeremyDeque() {
	this.list = [];
	this.count = 0;
};
JeremyDeque.prototype.push = function(item) {
	this.list.push(item);
	this.count++;
};
JeremyDeque.prototype.pop = function() {
	var item = null;
	if (!this.isEmpty()) {
		item = this.list.pop();
	} else {
		throw new Error('JeremyStack.pop : isEmpty');
	}
	return item;
};
JeremyDeque.prototype.top = function() {
	var item = null;
	if (!this.isEmpty()) {
		item = this.list[this.count - 1];
	} else {
		throw new Error('JeremyStack.top : isEmpty');
	}
	return item;
};
JeremyDeque.prototype.enqueue = function(item) {
	this.list.push(item);
	this.count++;
};

JeremyDeque.prototype.dequeue = function() {
	var item = null;
	if (!this.isEmpty()) {
		item = this.list.shift();
	} else {
		throw new Error('JeremyQueue.dequeue : isEmpty');
	}
	return item;
};
JeremyDeque.prototype.front = function() {
	var item = null;
	if (!this.isEmpty()) {
		item = this.list[0];
	} else {
		throw new Error('JeremyQueue.front : isEmpty');
	}
	return item;
};
JeremyDeque.prototype.isEmpty = function() {
	return this.count === 0;
};
JeremyDeque.prototype.length = function() {
	return this.count;
};
JeremyDeque.prototype.iterator = function() {
	return new JeremyIterator(this);
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyDataStructure') : undefined);
	if (target) {
		target.addModule('JeremyDeque', JeremyDeque);
	}
})(); 