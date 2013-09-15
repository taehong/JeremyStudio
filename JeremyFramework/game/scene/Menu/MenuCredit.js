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
			posX : 5,
			posY : 8,
			actionCB : function(argo) {
				J('STU')('Scene').playPrev();
			},
			actionArgo : null,
			updateCB : function() {
			},
			updateArgo : null,
			assets : {
				idle : J('STU')('Asset').get('image', 'btnBack'),
				mouseover : J('STU')('Asset').get('image', 'btnStory'),
				mousedown : J('STU')('Asset').get('image', 'btnHelp')
			}
		});
		
		this.btnBack.show();
	},
	updateCB : function() {
		this.btnBack.update();
	},
	destroyCB : function() {
		J('STU')('R2D').remove(this.bgMenuCredit);
		this.btnBack.destroy();
		this.bgMenuCredit = null;
		this.btnBack = null;
	}
}));