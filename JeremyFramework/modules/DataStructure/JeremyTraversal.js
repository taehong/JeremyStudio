/**
 * @author Jeremy
 */
function JeremyTraversal() {
}

// TODO: 하나만 찾고 멈추게 해놨는데 여러 개 찾도록 해보기
// TODO: 그냥 리스트를 반환하고 충돌체크 메소드로 처리하는게 더 좋을 수도 있음 (callback과의 비교분석이 필요)
JeremyTraversal.prototype.preorderNR = function(node, callback, argo) {
    var stack = new JeremyStack(), queue = new JeremyQueue, root = node;
    while (true) {
        while (root) {
            stack.push(root);
            // queue.enqueue(root);
            if (callback(root, argo)) {
                return; // Breaking
            }
            root = root.left;
        }
        if (stack.isEmpty()) {
            break;
        }
        root = stack.pop().right;
    }
    return queue;
};

// TODO: 하나만 찾고 멈추게 해놨는데 여러 개 찾도록 해보기
// TODO: 그냥 리스트를 반환하고 충돌체크 메소드로 처리하는게 더 좋을 수도 있음 (callback과의 비교분석이 필요)
JeremyTraversal.prototype.inorderNR = function(node, callback, argo) {
    var stack = new JeremyStack(), queue = new JeremyQueue, root = node;
    while (true) {
        while (root) {
            stack.push(root);
            root = root.left;
        }
        if (stack.isEmpty()) {
            break;
        }
        root = stack.pop();
        // queue.add(root);
        if (callback(root, argo)) {
            return; // Breaking
        }
        root = root.right;
    }
    return queue;
};
// TODO: 검증 안됬음, 코드가 너무 길고 모르겠음
JeremyTraversal.prototype.postorderNR = function(node, callback, argo) {
    var stack = new JeremyStack(), queue = new JeremyQueue, root = node;
    while (true) {
        if (root) {
            if (queue.contains(root)) {
                // queue.enqueue(stack.pop());
                if (callback(root, argo)) {
                    return;
                }
                root = null;
            } else {
                stack.push(root);
                root = root.left;
            }
        } else {
            if (stack.isEmpty()) {
                break;
            } else if (stack.peek().right == null) {
                root = stack.pop();
                // queue.enqueue(root);
                if (callback(root, argo)) {
                    break; // Breaking
                }
                if (root == stack.peek().right()) {
                    queue.add(stack.pop());
                }
            }
            if (!stack.isEmpty()) {
                root = stack.peek().right();
            } else {
                root = null;
            }
        }
    }
    return queue;
};
(function() {
    var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyDataStructure') : undefined);
    if (target) {
        target.addModule('JeremyTraversal', JeremyTraversal);
    }
})();
