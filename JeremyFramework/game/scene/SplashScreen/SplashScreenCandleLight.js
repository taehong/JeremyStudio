/**
 * @Context SplashScreenCandleLight
 * @author Jeremy Jeong
 */
var SplashScreenCandleLight = JL('SceneContext', {
	initCB : function() {
		var assetSplashImage = JL('Asset', {
			type : 'IMAGE',
			name : 'splashCandleLight',
			item : JL('Image', {
				src : "Assets/Images/splash/Candlelight_splashscreen1.png",
				className : 'splashImage',
				id : 'splashCandleLight'
			})
		});
		JS('AssetManager').add(assetSplashImage);
		this.splashCandleLight = JL('Renderable2D', {
			layer : 'gui',
			drawCB : function(ctx, argo) {
				ctx.drawImage(argo.img(), argo.posX, argo.posY);
			},
			argo : {
				img : function() {
					return JS('AssetManager').get('IMAGE', 'splashCandleLight').getImage();
				},
				posX : 0,
				posY : 0
			}
		});
		this.angle = 0;
		JS('DataManager').set('splashAlphaAngle', this.angle);
		this.timer = JL('Timer', {
			unit : 1,
			timerCB : function(argo) {
				if (argo.timer.count > argo.duration) {
					JS('SceneManager').next();
				} else {
					var ctx = JS('Renderer2D').context('gui');
					ctx.globalAlpha = argo.getAlpha();
				}
			},
			argo : {
				duration : 240,
				getAlpha : function() {
					return Math.sin(JS('DataManager').get('splashAlphaAngle'));
				}
			}
		});
		JS('Renderer2D').add(this.splashCandleLight);
	},
	updateCB : function() {
		this.timer.update();
		JS('DataManager').set('splashAlphaAngle', this.angle += (Math.PI / 240));
	},
	destroyCB : function() {
		JS('Renderer2D').remove(this.splashCandleLight);
	}
});