/**
 * @author Administrator
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'MenuMain',
	initCB : function() {
		this.bgMenuMain = J('LIB')('Renderable2D')({
			layer : 'background',
			drawCB : function(ctx, argo) {
				ctx.drawImage(argo.img, argo.posX, argo.posY);
			},
			argo : {
				img : J('STU')('Asset').get('image', 'bgMenuMain').getImage(),
				posX : 0,
				posY : 0
			}
		});
		this.btnCredit = new JeremyButton({
			name : 'Credit',
			asset : 'btnCredit',
			posX : 490,
			posY : 400
		});
		this.btnHelp = new JeremyButton({
			name : 'Help',
			asset : 'btnHelp',
			posX : 490,
			posY : 300
		});
		J('STU')('R2D').add(this.bgMenuMain);
		this.btnCredit.ready();
		this.btnHelp.ready();
	},
	updateCB : function() {

	},
	destroyCB : function() {
		J('STU')('R2D').remove(this.bgMenuMain);
		this.btnCredit.destroy();
		this.btnHelp.destroy();

		this.bgMenuMain = null;
		this.btnCredit = null;
		this.btnHelp = null;
	}
}));

function JeremyButton(argo) {
	var imgAsset = J('STU')('Asset').get('image', argo.asset);
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
}

JeremyButton.prototype.destroy = function() {
	J('STU')('R2D').remove(this.renderable);
	this.renderable = null;
	this.collider = null;
};

JeremyButton.prototype.ready = function() {
	J('STU')('R2D').add(this.renderable);
};