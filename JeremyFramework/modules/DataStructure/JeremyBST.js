/**
 * @author Jeremy
 */

function JeremyBST(argo) {
    this.key = (argo.key ? argo.key : undefined);
    this.valueList = [];
    if (argo.value) {
        this.valueList.push(argo.value);
    }
    this.left = (argo.left ? argo.left : undefined);
    this.right = (argo.right ? argo.right : undefined);
}

JeremyBST.prototype.hasLeft = function() {
    return (this.left ? true : false);
};
JeremyBST.prototype.hasRight = function() {
    return (this.right ? true : false);
};
JeremyBST.prototype.insert = function(key, value) {
    var modifiedNode = null;
    if (undefined === this.key || key === this.key) {
        this.key = key;
        this.valueList.push(value);
        // this.valueList.sort();
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

JeremyBST.prototype.findRecursively = function(key) {
    var currentNode = this;
    if (key < currentNode.key) {
        currentNode = currentNode.left.findRecursively(key);
    } else if (key > this.key) {
        currentNode = currentNode.right.findRecursively(key);
    }
    return currentNode;
};

JeremyBST.prototype.find = function(key) {
    var currentNode = this;
    while (currentNode) {
        if (key < currentNode.key) {
            currentNode = currentNode.left;
        } else if (key > currentNode.key) {
            currentNode = currentNode.right;
        } else {
            break;
        }
    }
    return currentNode;
};
JeremyBST.prototype.preorderRecursively = function(callback, argo) {
    var queue = new JeremyQueue();
    queue.enqueue(callback(this, argo));
    if (this.hasLeft()) {
        queue = queue.concat(this.left.preorderRecursively(callback, argo));
    }
    if (this.hasRight()) {
        queue = queue.concat(this.right.preorderRecursively(callback, argo));
    }
    return queue;
};
JeremyBST.prototype.inorderRecursively = function(callback, argo) {
    var queue = new JeremyQueue();
    if (this.hasLeft()) {
        queue = queue.concat(this.left.inorderRecursively(callback, argo));
    }
    queue.enqueue(callback(this, argo));
    if (this.hasRight()) {
        queue = queue.concat(this.right.inorderRecursively(callback, argo));
    }
    return queue;
};
JeremyBST.prototype.postorderRecursively = function(callback, argo) {
    var queue = new JeremyQueue();
    if (this.hasLeft()) {
        queue = queue.concat(this.left.postorderRecursively(callback, argo));
    }
    if (this.hasRight()) {
        queue = queue.concat(this.right.postorderRecursively(callback, argo));
    }
    queue.enqueue(callback(this, argo));
    return queue;
};
JeremyBST.prototype.minToMaxRecursively = function(callback, argo) {
    var queue = new JeremyQueue();
    // TODO : First, sort the tree!!
    queue = this.left.inorderRecursively(callback, argo);
    queue = queue.concat(this.right.preorderRecursively(callback, argo));
    return queue;
};
// // TODO: 하나만 찾고 멈추게 해놨는데 여러 개 찾도록 해보기
// // TODO: 그냥 리스트를 반환하고 충돌체크 메소드로 처리하는게 더 좋을 수도 있음 (callback과의 비교분석이 필요)
// JeremyBST.prototype.nonRecursivePreorder = function(callback, argo) {
    // var stack = new JeremyStack(), queue = new JeremyQueue, root = this;
    // while (true) {
        // while (root) {
            // stack.push(root);
            // if (callback(root, argo)) {
                // return true;
                // // Breaking
            // } else {
                // queue.enqueue(root);
            // }
            // root = root.left;
        // }
        // if (stack.isEmpty()) {
            // break;
        // }
        // root = stack.pop().right;
    // }
    // return queue;
// };
// 
// // TODO: 하나만 찾고 멈추게 해놨는데 여러 개 찾도록 해보기
// // TODO: 그냥 리스트를 반환하고 충돌체크 메소드로 처리하는게 더 좋을 수도 있음 (callback과의 비교분석이 필요)
// JeremyBST.prototype.nonRecursiveInorder = function(callback, argo) {
    // var stack = new JeremyStack(), queue = new JeremyQueue, root = this;
    // while (true) {
        // while (root) {
            // stack.push(root);
            // root = root.left;
        // }
        // if (stack.isEmpty()) {
            // break;
        // }
        // root = stack.pop();
        // if (callback(root, argo)) {
            // return true;
            // // Breaking
        // } else {
            // queue.enqueue(root);
        // }
        // root = root.right;
    // }
    // return queue;
// };
// // TODO: 검증 안됬음, 코드가 너무 길고 모르겠음
// JeremyBST.prototype.nonRecursivePostorder = function(callback, argo) {
    // var stack = new JeremyStack(), queue = new JeremyQueue, root = this;
    // while (true) {
        // if (root) {
            // if (queue.contains(root)) {
                // if (callback(root, argo)) {
                    // return true;
                    // // Breaking
                // } else {
                    // queue.enqueue(root);
                // }
                // root = null;
            // } else {
                // stack.push(root);
                // root = root.left;
            // }
        // } else {
            // if (stack.isEmpty()) {
                // break;
            // } else if (stack.peek().right == null) {
                // root = stack.pop();
                // if (callback(root, argo)) {
                    // return true;
                    // // Breaking
                // } else {
                    // queue.enqueue(root);
                // }
                // if (root == stack.peek().right()) {
                    // queue.add(stack.pop());
                // }
            // }
            // if (!stack.isEmpty()) {
                // root = stack.peek().right();
            // } else {
                // root = null;
            // }
        // }
    // }
    // return queue;
// };
// JeremyBST.prototype.nonRecursiveMinToMax = function(callback, argo) {
    // var leftRetVal = null, rightRetVal = null;
    // // TODO : First, sort the tree!!
    // if ( leftRetVal = this.left.nonRecursiveInorder(callback, argo) === true) {
        // return true;
    // }
    // if ( rightRetVal = this.right.nonRecursivePreorder(callback, argo) === true) {
        // return true;
    // }
    // return leftRetVal.concat(rightRetVal);
    // // Both retVals are JeremyQueue
// };
(function() {
    var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyDataStructure') : undefined);
    if (target) {
        target.addModule('JeremyBST', JeremyBST);
    }
})();
