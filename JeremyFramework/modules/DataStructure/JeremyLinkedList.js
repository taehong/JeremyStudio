/**
 * @author Jeremy
 */
function JeremyLinkedList() {
    this.front = null;
    this.end = null;
}

// TODO: Iterator
JeremyLinkedList.prototype.toArray = function() {
    var arr = this.forwards(function(node, list, argo) {
        argo.array.push(node.item);
        if (!node.hasNext())
            return argo.array;
    }, {
        array : []
    });
    return arr;
};
JeremyLinkedList.prototype.forwards = function(callback, argo) {
    var node = this.front, retVal = null;
    while (node) {
        if ( retVal = callback(node, this, argo)) {
            return retVal;
        }
        node = node.getNext();
    }
};
JeremyLinkedList.prototype.backwards = function(callback, argo) {
    var node = this.end, retVal = null;
    while (node) {
        if ( retVal = callback(node, this, argo)) {
            return retVal;
        }
        node = node.getPrev();
    }
};
JeremyLinkedList.prototype.insertBefore = function(node, item) {
    var newNode = null;
    if (node.hasPrev()) {
        newNode = new this.ListNode(item, node.getPrev(), node);
        node.getPrev().setNext(newNode);
    } else {
        newNode = new this.ListNode(item, null, node);
        this.front = newNode;
    }
    node.setPrev(newNode);
};
JeremyLinkedList.prototype.insertAfter = function(node, item) {
    var newNode = null;
    if (node.hasNext()) {
        newNode = new this.ListNode(item, node, node.getNext());
        node.getNext().setPrev(newNode);
    } else {
        newNode = new this.ListNode(item, node, null);
        this.end = newNode;
    }
    node.setNext(newNode);
};
JeremyLinkedList.prototype.insertFront = function(item) {
    if (this.front === null) {
        this.front = new this.ListNode(item, null, null);
        this.end = this.front;
    } else {
        this.insertBefore(this.front, item);
    }
};
JeremyLinkedList.prototype.insertEnd = function(item) {
    if (this.end === null) {
        this.insertFront(item);
    } else {
        this.insertAfter(this.end, item);
    }
};
JeremyLinkedList.prototype.remove = function(node) {
    if (node.hasPrev()) {
        node.getPrev().setNext(node.getNext());
    } else {
        this.front = node.getNext();
    }
    if (node.hasNext()) {
        node.getNext().setPrev(node.getPrev());
    } else {
        this.end = node.getPrev();
    }
    node.destroy();
};
JeremyLinkedList.prototype.ListNode = function(item, prev, next) {
    this.item = item;
    this.prev = prev;
    this.next = next;
};
JeremyLinkedList.prototype.ListNode.prototype.setItem = function(item) {
    this.item = item;
};
JeremyLinkedList.prototype.ListNode.prototype.setPrev = function(prev) {
    this.prev = prev;
};
JeremyLinkedList.prototype.ListNode.prototype.setNext = function(next) {
    this.next = next;
};
JeremyLinkedList.prototype.ListNode.prototype.getItem = function() {
    return this.item;
};
JeremyLinkedList.prototype.ListNode.prototype.getPrev = function() {
    return this.prev;
};
JeremyLinkedList.prototype.ListNode.prototype.getNext = function() {
    return this.next;
};
JeremyLinkedList.prototype.ListNode.prototype.hasItem = function() {
    return (this.item !== null ? true : false);
};
JeremyLinkedList.prototype.ListNode.prototype.hasPrev = function() {
    return (this.prev !== null ? true : false);
};
JeremyLinkedList.prototype.ListNode.prototype.hasNext = function() {
    return (this.next !== null ? true : false);
};
JeremyLinkedList.prototype.ListNode.prototype.destroy = function() {
    this.item = this.prev = this.next = null;
};
(function() {
    var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyDataStructure') : undefined);
    if (target) {
        target.addModule('JeremyLinkedList', JeremyLinkedList);
    }
})();