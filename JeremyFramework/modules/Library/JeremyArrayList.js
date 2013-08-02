/**
 * @author JeremyJeong
 */

/*
 * TODO: 짜다가 말았다!!
 */
function JeremyArrayList() {
	this.count = 0;
	this.list = [];
	this.needUpdateIndices = false;
}

JeremyArrayList.prototype.ListNode = function(value, prevNode, nextNode, index) {
	this.value = value;
	this.prevNode = prevNode;
	this.nextNode = nextNode;
	this.index = index;
};
JeremyArrayList.prototype.Iterator = function(list) {
	this.currentIndex = 0;
	this.list = list;
};
JeremyArrayList.prototype.Iterator.prototype.next = function() {
	var nextItem = this.list[this.currentIndex++];
	return nextItem;
};
JeremyArrayList.prototype.push = function(item) {
	var lastIndex = this.__lastIndex(), lastItem = this.list[lastIndex];
	this.list.push(lastItem.nextNode = new this.ListNode(item, lastItem, null, this.count++));
};
JeremyArrayList.prototype.pop = function() {
	var lastItem = this.list.pop(), newLastItem = this.list[this.__lastIndex()];
	newLastItem.nextNode = null;
	this.count--;
	return lastItem.value;
};
JeremyArrayList.prototype.top = function() {
	var lastIndex = this.__lastIndex();
	return this.list[lastIndex].value;
};
JeremyArrayList.prototype.iterator = function() {
	var valueList = [];
	this.list.forEach(function(item) {
		valueList.push(item.value);
	});
	return new this.Iterator(valueList);
};
// JeremyArrayList.prototype.get = function(index) {
// if (index < 0 || index > this.count) {
//
// }
// };
JeremyArrayList.prototype.__lastIndex = function() {
	return this.count - 1;
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyLibrary') : undefined);
	if (target) {
		target.addModule('JeremyArrayList', JeremyArrayList);
	}
})(); 