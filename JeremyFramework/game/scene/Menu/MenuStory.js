/**
 * @author JeremyJeong
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'MenuStory',
	initCB : function() {
		this.bgMenuStory = J('LIB')('Renderable2D')({
			layer : 'background',
			drawCB : function(ctx, argo) {
				ctx.globalAlpha = 0.3;
				ctx.drawImage(argo.img, argo.posX, argo.posY, 300, 200);
				ctx.globalAlpha = 1;
			},
			argo : {
				img : J('STU')('Asset').get('image', 'bgMenuStory').getImage(),
				posX : 220,
				posY : 120
			}
		});
		/*
		 * added button
		 */
		this.btnPopUp = J('STU')('GUI').create('Button', {
			name : 'popup',
			asset : 'btnPopUp',
			posX : J('STU')('Layer').layer('game').width - 60,
			posY : 8,
			action : function(argo) {
				if(!argo.flag || argo.flag === null) {
					J('STU')('R2D').add(argo.popUp);
					argo.flag = true;
				} else {
					argo.flag = false;
					J('STU')('R2D').remove(argo.popUp);
				}
			},
			argo : {
				popUp : J('LIB')('Renderable2D')({
						layer : 'background',
						drawCB : function(ctx, argo) {
						ctx.globalAlpha = 0.8;
						ctx.fillStyle = '#ff00ff';
						ctx.fillRect(argo.posX, argo.posY, 100, 100);
						ctx.fillStyle = '#0f00ff';
						ctx.font = "18px Verdana";
						ctx.fillText( "Pausing", argo.posX + 15, argo.posY + 50 )
						ctx.globalAlpha = 1;
						argo.flag = true;
						},
						argo : {
							posX : 330,
							posY : 180
						}
					}),
				flag : null
			}
		});
		this.btnBack = J('STU')('GUI').create('Button', {
			name : 'Back',
			asset : 'btnBack',
			posX : 5,
			posY : 8,
			action : function(argo) {
				J('STU')('Scene').playPrev();
			},
			argo : null
		});
		J('STU')('R2D').add(this.bgMenuStory);

		this.btnBack.show();
		this.btnPopUp.show();
		
	},
	updateCB : function() {

	},
	destroyCB : function() {
		J('STU')('R2D').remove(this.bgMenuStory);
		this.btnBack.destroy();
		this.btnPopUp.destroy();
		
		this.bgMenuStory = null;
		this.btnBack = null;
	}
}));