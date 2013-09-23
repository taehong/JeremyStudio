J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'PressAnyKey',
	initCB : function() {
		
		this.bgPressAnyKey = J('LIB')('Renderable2D')({
			layer : 'background',
			drawCB : function(ctx, argo) {
				ctx.globalAlpha = 0.3;
				ctx.drawImage(argo.img, argo.posX, argo.posY, 300, 200);
				ctx.globalAlpha = 1;
			},
			argo : {
				img : J('STU')('Asset').get('image', 'bgMenuMain').getImage(),
				posX : 0,
				posY : 0
			}
		});
		
		this.textAlpha = 0;
		
		this.pressAnyKeyText = J('LIB')('Renderable2D')({
						layer : 'background',
						drawCB : function(ctx, argo) {
						J('STU')('Data').set('textAlpha', this.textAlpha += (Math.PI / 240));
						ctx.globalAlpha = argo.textAlpha;
						ctx.fillStyle = '#ff00ff';
						ctx.font = "18px Verdana";
						ctx.fillText( "Pausing", argo.posX + 15, argo.posY + 50 );
						},
					argo : {
						textAlpha : Math.sin(J('STU')('Data').get('textAlpha'));
					}
		});
		
		J('STU')('R2D').add(this.bgPressAnyKey);
		J('STU')('R2D').add(this.pressAnyKeyText);

		
	},
	updateCB : function() {
	},
	destroyCB : function() {
		J('STU')('R2D').remove(this.bgPressAnyKey);
		J('STU')('R2D').remove(this.pressAnyKeyText);
	}
}));

	J('STU')('Event').set('onKeyDown', '#jeremy', 'onkeydown', function(e) {
		J('STU')('Scene').playNext();
	});
	J('STU')('Event').bind('onKeyDown');
