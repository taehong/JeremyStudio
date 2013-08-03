/**
 * @Context SplashScreenDigitalMedia
 * @author Jeremy Jeong
 */
J('STU')('Context').add('SplashScreenDigitalMedia', J('LIB')('SceneContext')({
	initCB : function() {
		this.splashDigitalMedia = J('LIB')('Renderable2D')({
			layer : 'gui',
			drawCB : function(ctx, argo) {
				ctx.drawImage(argo.img(), argo.posX, argo.posY);
			},
			argo : {
				img : J('STU')('Asset').get('image', 'splashDigitalMedia'),
				posX : 0,
				posY : 0
			}
		});
		this.angle = 0;
		J('STU')('Data').set('splashAlphaAngle', this.angle);
		this.timer = J('LIB')('Timer')({
			unit : 1,
			timerCB : function(argo) {
				if (argo.timer.count > argo.duration) {
					// JS('SceneManager').next();
				} else {
					// var ctx = JS('Renderer2D').context('gui');
					// ctx.globalAlpha = argo.getAlpha();
				}
			},
			argo : {
				duration : 240,
				getAlpha : function() {
					return Math.sin(J('STU')('Data').get('splashAlphaAngle'));
				}
			}
		});
		// JS('Renderer2D').add(this.splashDigitalMedia);
	},
	updateCB : function() {
		this.timer.update();
		J('STU')('Data').set('splashAlphaAngle', this.angle += (Math.PI / 240));
	},
	destroyCB : function() {
		// J('STU')('Renderer2D').remove(this.splashDigitalMedia);
	}
}));