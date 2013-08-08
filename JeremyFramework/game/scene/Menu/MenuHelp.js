/**
 * @author JeremyJeong
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'MenuHelp',
	initCB : function() {
		this.bgMenuHelp = J('LIB')('Renderable2D')({
			layer : 'background',
			drawCB : function(ctx, argo) {
				ctx.drawImage(argo.img, argo.posX, argo.posY);
			},
			argo : {
				img : J('STU')('Asset').get('image', 'bgMenuHelp').getImage(),
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
		J('STU')('R2D').add(this.bgMenuHelp);
		this.btnBack.show();
	},
	updateCB : function() {

	},
	destroyCB : function() {
		J('STU')('R2D').remove(this.bgMenuHelp);
		this.btnBack.destroy();
		this.bgMenuHelp = null;
		this.btnBack = null;
	}
}));