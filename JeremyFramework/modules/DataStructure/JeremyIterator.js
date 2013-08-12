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
    if (this.hasNext()) {
        element = this.list[this.current++];
    }
    return element;
};
JeremyIterator.prototype.hasNext = function() {
    return this.current < this.list.length;
};
(function() {
    var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyDataStructure') : undefined);
    if (target) {
        target.addModule('JeremyIterator', JeremyIterator);
    }
})(); 