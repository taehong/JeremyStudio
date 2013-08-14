/**
 * @author Jeremy
 */
function JeremyTileMap(argo) {
    this.aabb = argo.aabb;
    this.number = argo.number;
    this.tiles = J('DAT')('Array2D')({
        rows : this.number,
        cols : this.number
    });
    this.generate = function() {
        var aabb = this.aabb, num = this.number;
        this.tiles.forEach(function(col, row, list, elem) {
            list[col][row] = J('LIB')('Tile')({
                row : row,
                col : col,
                aabb : J('MAT')('AABB2')({
                    center : J('MAT')('Vec3')({
                        x : (aabb.center.x - aabb.half.x) + aabb.getWidth() / num * row,
                        y : (aabb.center.y - aabb.half.y) + aabb.getHeight() / num * col,
                        w : 1
                    }),
                    half : J('MAT')('Vec3')({
                        x : aabb.getWidth() / num,
                        y : aabb.getHeight() / num,
                        w : 0
                    })
                })
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
