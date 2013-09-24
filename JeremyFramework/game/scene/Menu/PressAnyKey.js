J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'PressAnyKey',
	initCB : function() {
		
		this.bgPressAnyKey = J('LIB')('Renderable2D')({
			layer : 'background',
			drawCB : function(ctx, argo) {
				ctx.globalAlpha = 0.6;
				ctx.drawImage(argo.img, argo.posX, argo.posY);
				ctx.globalAlpha = 1;
			},
			argo : {
				img : J('STU')('Asset').get('image', 'bgPressAnyKey').getImage(),
				posX : 0,
				posY : 0
			}
		});
		
		this.textAlpha = 0;
		
		this.pressAnyKeyText = J('LIB')('Renderable2D')({
				layer : 'gui',
				drawCB : function(ctx, argo) {
					ctx.fillStyle = '#fff000';
					ctx.font = "bold 35px Courier New";
					ctx.fillText( "Press Any Key", argo.posX, argo.posY);
				},
				argo : {
					posX : 230,
					posY : 350
				}
			
		});
		
		
		this.timer = J('LIB')('Timer')({
			unit : 800,
			onTick : function(argo, timer) {
					var ctx = J('STU')('R2D').context('gui');
					if(argo.getAlpha() == 0) 
						J('STU')('Data').set('textAlpha', this.textAlpha = 1);
					else J('STU')('Data').set('textAlpha', this.textAlpha = 0);
					ctx.globalAlpha = J('STU')('Data').get('textAlpha');
			},
			argo : {
				getAlpha : function() {
					return J('STU')('Data').get('textAlpha');
				}
			}
		});
		
		
		// this.timer = J('LIB')('Timer')({
			// unit : 1,
			// onTick : function(argo, timer) {
					// var ctx = J('STU')('R2D').context('gui');
					// ctx.globalAlpha = argo.getAlpha();
			// },
			// argo : {
				// getAlpha : function() {
					// return Math.sin(J('STU')('Data').get('textAlpha'));
				// }
			// }
		// });
		
		J('STU')('R2D').add(this.bgPressAnyKey);
		J('STU')('R2D').add(this.pressAnyKeyText);

		
	},
	updateCB : function() {
		this.timer.tick();
		//J('STU')('Data').set('textAlpha', this.textAlpha += (Math.PI / 45));
	},
	destroyCB : function() {
		J('STU')('R2D').remove(this.bgPressAnyKey);
		J('STU')('R2D').remove(this.pressAnyKeyText);
		J('STU')('R2D').context('gui').globalAlpha = 1.0;
		this.timer = null;
	}
}));

	//J('STU')('R2D').canvas("game"). !!!!
	J('STU')('Event').set('onKeyDown', document, 'keydown', function(e) {
		J('STU')('Scene').playNext();
		J('STU')('Event').unbind('onKeyDown');
	});
	J('STU')('Event').bind('onKeyDown');
