/**
 * @Context SplashScreenCandleLight
 * @author Jeremy Jeong
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'SplashScreenCandleLight',
	initCB : function() {
		this.splashCandleLight = J('LIB')('Renderable2D')({
			layer : 'gui',
			drawCB : function(ctx, argo) {
				ctx.drawImage(argo.img, argo.posX, argo.posY);
			},
			argo : {
				img : J('STU')('Asset').get('image', 'splashCandleLight').getImage(),
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
					J('STU')('Scene').playNext();
				} else {
					var ctx = J('STU')('R2D').context('gui');
					ctx.globalAlpha = argo.getAlpha();
				}
			},
			argo : {
				duration : 240,
				getAlpha : function() {
					return Math.sin(J('STU')('Data').get('splashAlphaAngle'));
				}
			}
		});
		J('STU')('R2D').add(this.splashCandleLight);
	},
	updateCB : function() {
		this.timer.update();
		J('STU')('Data').set('splashAlphaAngle', this.angle += (Math.PI / 240));
	},
	destroyCB : function() {
		J('STU')('R2D').remove(this.splashCandleLight);
		this.timer = null;
	}
}));
