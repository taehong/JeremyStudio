/**
 * @author Jeremy
 */
// TODO: Tree, Node 구조로 바꾸기
function JeremyLCRSTree(argo) {
    this.id = Math.round((new Date()).getTime() * Math.random());
    if (argo !== undefined) {
        this.parent = argo.parent || null;
        this.key = argo.key || null;
        this.value = argo.value || null;
    } else {
        this.parent = null;
        this.key = null;
        this.value = null;
    }
    this.left = new JeremyLinkedList();
    this.right = new JeremyLinkedList();
};
// JeremyLCRSTree.prototype.toString = function() {
    // var tokens = {
        // id : "id : " + this.id,
        // key : "key : " + (this.key !== null ? this.key : 'null'),
        // value : "value : " + (this.value !== null ? this.value : 'null'),
        // parent : "parent : " + (this.parent !== null ? this.parent.id : 'null'),
        // child : "child : " + (this.left.isEmpty() ? 'null' : this.left.toString()),
        // // sibling : "sibling : " + (this.right.isEmpty() ? 'null' : this.right.toString())
    // };
    // // return "{" + tokens.id + ", " + tokens.key  + ", " + tokens.value + ", " + tokens.parent + ", " + tokens.child + ", " + tokens.sibling + "}";
    // return "{" + tokens.id + ", " + tokens.key  + ", " + tokens.value + ", " + tokens.parent + ", " + tokens.child + "}";
// };
JeremyLCRSTree.prototype.appendChild = function(key, value) {
    var newChild = new JeremyLCRSTree({
        parent : this,
        key : key,
        value : value
    });
    this.left.forwards(function(node, list, argo) {
        argo.newChild.addSibling(node);
        node.getItem().addSibling(argo.newChild);
    }, {
        newChild : newChild
    });
    this.left.insertEnd(newChild);
};
JeremyLCRSTree.prototype.addSibling = function(node) {
    if (!this.right.containsNode(node))
        this.right.insertEnd(node);
};