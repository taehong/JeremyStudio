/**
 * @author Jeremy
 */
function JeremyLinkedList() {
    this.length = 0;
    this.front = null;
    this.end = null;
}

JeremyLinkedList.prototype.isEmpty = function() {
    return this.length === 0;
};
JeremyLinkedList.prototype.toString = function() {
    return this.forwards(function(node, list, argo) {
        argo.string += node.toString();
        if (node.hasNext()) {
            argo.string += ", ";
        } else {
            return argo.string += "]";
        }
    }, {
        string : "["
    });
};
JeremyLinkedList.prototype.containsNode = function(node) {
    return this.forwards(function(node, list, argo) {
        if (node.isEquals(argo.given)) {
            return true;
        }
    }, {
        given : node
    });
};
JeremyLinkedList.prototype.containsValue = function(value, compare) {
    return this.forwards(function(node, list, argo) {
        if (argo.compare(node.item, argo.given)) {
            return true;
        }
    }, {
        given : value,
        compare : (compare !== undefined ? compare : function(a, b) {
            return a === b;
        })
    });
};
JeremyLinkedList.prototype.getNodesContainingItem = function(value, compare) {
    return this.forwards(function(node, list, argo) {
        if (argo.compare(node.item, argo.given)) {
            argo.list.push(node);
        }
        if (!node.hasNext()) {
            return argo.list;
        }
    }, {
        given : value,
        compare : (compare !== undefined ? compare : function(a, b) {
            return a === b;
        }),
        list : []
    });
};
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
    this.length++;
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
    this.length++;
};
JeremyLinkedList.prototype.insertFront = function(item) {
    if (this.front === null) {
        this.front = new this.ListNode(item, null, null);
        this.end = this.front;
        this.length++;
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
    this.length--;
};
JeremyLinkedList.prototype.ListNode = function(item, prev, next) {
    this.id = Math.round((new Date()).getTime() * Math.random());
    this.item = item;
    this.prev = prev;
    this.next = next;
};
JeremyLinkedList.prototype.ListNode.prototype.toString = function() {
    var tokens = {
        id : "id : " + this.id,
        item : "item : " + this.item,
        prev : "prev : " + (this.prev !== null ? this.prev.id : 'null'),
        next : "next : " + (this.next !== null ? this.next.id : 'null')
    };
    return "<" + tokens.id + ", " + tokens.item + ", " + tokens.prev + ", " + tokens.next + ">";
};
JeremyLinkedList.prototype.ListNode.prototype.isEquals = function(node) {
    return this.id === node.id;
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
    var target = (window['Jeremy'] != undefined ? Jeremy.getComponent('JeremyDataStructure') : undefined);
    if (target) {
        target.addModule('JeremyLinkedList', JeremyLinkedList);
    }
})();
