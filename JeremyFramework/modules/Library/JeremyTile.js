/**
 * @author Jeremy
 */
function JeremyTile(argo) {
    this.id = (new Date()).getTime();
    this.row = argo.row;
    this.col = argo.col;
    this.aabb = argo.aabb;
    this.items = [];
    var aabbVal = this.aabb.valueOf();
    this.renderable = J('LIB')('Renderable2D')({
        layer : 'background',
        drawCB : function(ctx, argo) {
            ctx.strokeStyle = argo.strokeColor;
            ctx.strokeRect(argo.left, argo.top, argo.width, argo.height);
        },
        argo : {
            strokeColor : "#000000",
            left : aabbVal.left,
            top : aabbVal.top,
            width : aabbVal.width,
            height : aabbVal.height
        }
    });
}

(function() {
    var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyLibrary') : undefined);
    if (target) {
        target.addModule('JeremyTile', JeremyTile);
    }
})();
