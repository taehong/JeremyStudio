/**
 * @author JeremyJeong
 */
function JeremyButton(argo) {
    var imgAsset = J('STU')('Asset').get('image', argo.asset);
    // TODO : CollisionManager!!
    this.collider = J('STU')('Collision').create({
        aabb : J('MAT')('AABB2')({
            center : J('MAT')('Vec3')({
                x : argo.posX + imgAsset.width / 2,
                y : argo.posY + imgAsset.height / 2,
                w : 1
            }),
            half : J('MAT')('Vec3')({
                x : imgAsset.width / 2,
                y : imgAsset.height / 2,
                w : 0
            })
        })
    });
    this.renderable = J('LIB')('Renderable2D')({
        layer : 'gui',
        drawCB : function(ctx, argo) {
            ctx.drawImage(argo.img, argo.posX, argo.posY);
        },
        argo : {
            posX : argo.posX,
            posY : argo.posY,
            img : imgAsset.getImage()
        }
    });
    this.name = argo.name;
    this.action = argo.action;
    this.argo = argo.argo;
    this.updateCB = argo.updateCB;
    this.updateArgo = argo.updateArgo;
    console.log('JeremyButton >> ', this.name, this.collider);
}
JeremyButton.prototype.update = function() {
	this.updateCB(this.updateArgo, this);
};
JeremyButton.prototype.destroy = function() {
    J('STU')('R2D').remove(this.renderable);
    this.renderable = null;
    this.collider = null;
};

JeremyButton.prototype.show = function() {
    J('STU')('R2D').add(this.renderable);
};
JeremyButton.prototype.hide = function() {
    J('STU')('R2D').remove(this.renderable);
};

JeremyButton.prototype.doAction = function() {
    this.action(this.argo);
};
(function() {
    var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyLibrary') : undefined);
    if (target) {
        target.addModule('JeremyButton', JeremyButton);
    }
})();
