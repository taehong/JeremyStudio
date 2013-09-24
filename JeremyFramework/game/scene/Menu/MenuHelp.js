J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'MenuHelp',
	initCB : function() {
		this.bgMenuHelp = J('LIB')('Renderable2D')({
			layer : 'background',
			drawCB : function(ctx, argo) {
				ctx.globalAlpha = 0.3;
				ctx.drawImage(argo.img, argo.posX, argo.posY, 300, 370);
				ctx.globalAlpha = 1;
			},
			argo : {
				img : J('STU')('Asset').get('image', 'bgMenuHelp').getImage(),
				posX : 220,
				posY : 30
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
				mouseover : J('STU')('Asset').get('image', 'btnBack_MouseDown'),
				mousedown : J('STU')('Asset').get('image', 'btnBack_MouseUp')
			}
		});
		
		J('STU')('R2D').add(this.bgMenuHelp);
		this.btnBack.show();
	},
	updateCB : function() {
		this.btnBack.update();
	},
	destroyCB : function() {
		J('STU')('R2D').remove(this.bgMenuHelp);
		this.btnBack.destroy();
		
		this.bgMenuHelp = null;
		this.btnBack = null;
	}
}));