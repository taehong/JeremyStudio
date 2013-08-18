/**
 * @author Jeremy
 */
// TODO: sibling
function JeremyLCRSTree(argo) {
    this.parent = argo.parent;
    this.key = argo.key;
    this.value = argo.value;
    this.left = new JeremyLinkedList();
    this.right = new JeremyLinkedList();
};
JeremyLCRSTree.prototype.appendChild = function(key, value) {
    var newChild = new JeremyLCRSTree({
        parent : this,
        key : key,
        value : value
    });
    this.left.forwards(function (node, list, argo) {
        argo.newChild.addSibling(node);
        node.addSibling(argo.newChild);
    }, {
        newChild:newChild
    });
    this.left.insertEnd(newChild);
};