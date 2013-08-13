/**
 * @author Jeremy
 */
function JeremyArray2D(argo) {
    this.list = [];
    this.rows = argo.rows;
    this.cols = argo.cols;
    while (this.list.length < this.cols) {
        this.list.push([]);
    }
}

JeremyArray2D.prototype.set = function(c, r, item) {
    if ((r > this.rows - 1) || (c > this.cols - 1) || (r < 0) || (r < 0)) {
        return false;
    } else {
        this.list[c][r] = item;
        return true;
    }
};

JeremyArray2D.prototype.get = function(c, r) {
    if ((r > this.rows - 1) || (c > this.cols - 1) || (r < 0) || (r < 0)) {
        return undefined;
    } else {
        return this.list[c][r];
    }
};
JeremyArray2D.prototype.forEach = function(forEachCB, argo) {
    var r, c, rows, cols, list = this.list, elem;
    for ( c = 0, cols = this.cols; c < cols; c++) {
        for ( r = 0, rows = this.rows; r < rows; r++) {
            elem = this.get(c, r);
            forEachCB(c, r, list, elem, argo);
        }
    }
};
(function() {
    var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyDataStructure') : undefined);
    if (target) {
        target.addModule('JeremyArray2D', JeremyArray2D);
    }
})();