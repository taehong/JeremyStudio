/**
 * @Context SplashScreenBrainstorm
 * @author Jeremy Jeong
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'SplashScreenBrainstorm',
	initCB : function() {
		this.splashBrainstorm = J('LIB')('Renderable2D')({
			layer : 'background',
			drawCB : function(ctx, argo) {
				ctx.drawImage(argo.img, argo.posX, argo.posY);
			},
			argo : {
				img : J('STU')('Asset').get('image', 'splashBrainstorm').getImage(),
				posX : 0,
				posY : 0
			}
		});
		this.angle = 0;
		J('STU')('R2D').context('background').globalAlpha = 0.0;
		J('STU')('Data').set('splashAlphaAngle', this.angle);
		this.timer = J('LIB')('Timer')({
			unit : 1,
			timerCB : function(argo, timer) {
				if (argo.timer.count > argo.duration) {
					J('STU')('Scene').playNext();
				} else {
					var ctx = J('STU')('R2D').context('background');
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
		J('STU')('R2D').add(this.splashBrainstorm);
	},
	updateCB : function() {
		this.timer.update();
		J('STU')('Data').set('splashAlphaAngle', this.angle += (Math.PI / 240));
	},
	destroyCB : function() {
		J('STU')('R2D').remove(this.splashBrainstorm);
		J('STU')('R2D').context('background').globalAlpha = 1.0;
		this.timer = null;
	}
}));
