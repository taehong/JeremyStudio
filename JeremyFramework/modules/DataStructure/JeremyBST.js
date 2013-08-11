/**
 * @author Jeremy
 */

// TODO: http://en.wikipedia.org/wiki/Binary_search_tree
// TODO: Sort, Search
function JeremyBST(argo) {
    this.key = (argo.key ? argo.key : undefined);
    this.valueList = [];
    if (argo.value) {
        this.valueList.push(argo.value);
    }
    this.left = (argo.left ? argo.left : undefined);
    this.right = (argo.right ? argo.right : undefined);
}

JeremyBST.prototype.insert = function(key, value) {
    var modifiedNode = null;
    if (undefined === this.key || key === this.key) {
        this.key = key;
        this.valueList.push(value);
        this.valueList.sort();
        // TODO: 글쎄;;
        modifiedNode = this;
    } else if (key < this.key) {
        if (undefined === this.left) {
            this.left = new JeremyBST({
                key : key,
                value : value
            });
            modifiedNode = this;
        } else {
            modifiedNode = this.left.insert(key, value);
        }
    } else if (key > this.key) {
        if (undefined === this.right) {
            this.right = new JeremyBST({
                key : key,
                value : value
            });
            modifiedNode = this;
        } else {
            modifiedNode = this.right.insert(key, value);
        }
    }
    return modifiedNode;
};
JeremyBST.prototype.traversePreorder = function(callback, argo) {
    callback(this, argo);
    if (this.hasLeft()) {
        this.left.traversePreorder(callback, argo);
    }
    if (this.hasRight()) {
        this.right.traversePreorder(callback, argo);
    }
};
JeremyBST.prototype.traverseInorder = function(callback, argo) {
    if (this.hasLeft()) {
        this.left.traversePreorder(callback, argo);
    }
    callback(this, argo);
    if (this.hasRight()) {
        this.right.traversePreorder(callback, argo);
    }
};
JeremyBST.prototype.traversePostorder = function(callback, argo) {
    if (this.hasLeft()) {
        this.left.traversePreorder(callback, argo);
    }
    if (this.hasRight()) {
        this.right.traversePreorder(callback, argo);
    }
    callback(this, argo);
};
JeremyBST.prototype.traverseMinToMax = function(callback, argo) {
    // TODO : First, sort the tree!!
    this.left.traverseInorder(callback, argo);
    this.right.traversePreorder(callback, argo);
};
JeremyBST.prototype.hasLeft = function() {
    return (this.left ? true : false);
};
JeremyBST.prototype.hasRight = function() {
    return (this.right ? true : false);
};
(function() {
    var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyDataStructure') : undefined);
    if (target) {
        target.addModule('JeremyBST', JeremyBST);
    }
})();