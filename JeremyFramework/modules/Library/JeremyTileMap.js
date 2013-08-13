/**
 * @author Jeremy
 */
function JeremyTileMap(argo) {
    this.size = argo.size;
    this.number = argo.number;
    this.tiles = J('DAT')('Array2D')({
        rows : this.number,
        cols : this.number
    });
    this.generate = function() {
        this.tiles.forEach(function(col, row, list, elem) {
            list[col][row] = J('LIB')('Tile')({
                row : row,
                col : col,
                aabb:null,
                renderable:null
            });
        });
    }
    this.generate();
}

(function() {
    var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyLibrary') : undefined);
    if (target) {
        target.addModule('JeremyTileMap', JeremyTileMap);
    }
})();
