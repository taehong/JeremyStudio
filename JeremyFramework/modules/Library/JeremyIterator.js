/**
 * @author Jeremy
 */
function JeremyIterator(collection) {
	this.current = 0;
	this.list = collection.list;
	// Array
}

JeremyIterator.prototype.next = function() {
	var element = null;
	if (this.hasMoreElement()) {
		element = this.list[this.current++];
	} else {
		element = null;
	}
	return element;
};
JeremyIterator.prototype.hasMoreElement = function() {
	return this.current < this.list.length;
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyLibrary') : undefined);
	if (target) {
		target.addModule('JeremyIterator', JeremyIterator);
	}
})();