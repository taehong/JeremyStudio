/**
 * @author JeremyJeong
 */
function JeremyButton(argo) {
	var imgAsset = J('STU')('Asset').get('image', argo.asset);
	// TODO : CollisionManager!!
	this.collider = J('LIB')('Collider')({
		owner : this,
		area : J('MAT')('Rectangle')({
			x : argo.posX,
			y : argo.posY,
			w : imgAsset.getWidth(),
			h : imgAsset.getHeight()
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
}

JeremyButton.prototype.destroy = function() {
	J('STU')('R2D').remove(this.renderable);
	this.renderable = null;
	this.collider = null;
};

JeremyButton.prototype.show = function() {
	J('STU')('R2D').add(this.renderable);
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
