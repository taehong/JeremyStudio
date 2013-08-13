/**
 * @author Jeremy
 */
function JeremyTile(argo) {
    this.id = (new Date()).getTime();
    this.row = argo.row;
    this.col = argo.col;
    this.aabb = argo.aabb;
    this.items = [];
    this.renderable = argo.renderable;
}
(function() {
    var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyLibrary') : undefined);
    if (target) {
        target.addModule('JeremyTile', JeremyTile);
    }
})(); 