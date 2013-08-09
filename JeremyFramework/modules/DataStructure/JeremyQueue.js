/**
 * @author JeremyJeong
 */
function JeremyQueue() {
	this.list = [];
	this.count = 0;
}

JeremyQueue.prototype.enqueue = function(item) {
	this.list.push(item);
	this.count++;
};

JeremyQueue.prototype.dequeue = function() {
	var item = null;
	if (!this.isEmpty()) {
		item = this.list.shift();
	} else {
		throw new Error('JeremyQueue.dequeue : isEmpty');
	}
	return item;
};

JeremyQueue.prototype.front = function() {
	var item = null;
	if (!this.isEmpty()) {
		item = this.list[0];
	} else {
		throw new Error('JeremyQueue.front : isEmpty');
	}
	return item;
};

JeremyQueue.prototype.isEmpty = function() {
	return this.count === 0;
};

JeremyQueue.prototype.length = function() {
	return this.count;
};

JeremyQueue.prototype.iterator = function() {
	return new JeremyIterator(this);
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyDataStructure') : undefined);
	if (target) {
		target.addModule('JeremyQueue', JeremyQueue);
	}
})();