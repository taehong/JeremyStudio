/**
 * @author JeremyJeong
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'MenuCredit',
	initCB : function() {
		this.bgMenuCredit = J('LIB')('Renderable2D')({
			layer : 'background',
			drawCB : function(ctx, argo) {
				ctx.drawImage(argo.img, argo.posX, argo.posY);
			},
			argo : {
				img : J('STU')('Asset').get('image', 'bgMenuCredit').getImage(),
				posX : 0,
				posY : 0
			}
		});
		this.btnBack = J('STU')('GUI').create('Button', {
			name : 'Back',
			asset : 'btnBack',
			posX : 490,
			posY : 300,
			action : function(argo) {
				J('STU')('Scene').playPrev();
			},
			argo : null
		});
		J('STU')('R2D').add(this.bgMenuCredit);
		this.btnBack.show();
	},
	updateCB : function() {

	},
	destroyCB : function() {
		J('STU')('R2D').remove(this.bgMenuCredit);
		this.btnBack.destroy();
		this.bgMenuCredit = null;
		this.btnBack = null;
	}
}));