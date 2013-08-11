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

JeremyBST.prototype.insert = function(key, value) {
    var modifiedNode = null;
    if (undefined === this.key || key === this.key) {
        this.key = key;
        this.valueList.push(value);
        this.valueList.sort(); // TODO: 글쎄;;
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
(function() {
    var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyDataStructure') : undefined);
    if (target) {
        target.addModule('JeremyBST', JeremyBST);
    }
})(); 