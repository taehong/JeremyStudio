/**
 * @Scene SplashScreenCandleLight
 * @author Jeremy Jeong
 */
var SplashScreenCandleLight = new JeremyScene('SplashScreenCandleLight', ['SplashScreenDigitalMedia'], ['SplashScreenBrainstorm'], new JeremySceneContext(function init() {
	var srcSplashCandleLight = "Assets/Images/splash/Candlelight_splashscreen1.png";
	JS('AssetManager').add(JS('AssetManager').make('splashCandleLight', srcSplashCandleLight, 'splashImage', 'splashCandleLight'));
	this.splashCandleLight = new JeremyRenderable2D('gui', function(ctx, argo) {
		ctx.drawImage(argo.img(), argo.posX, argo.posY);
	}, {
		img : function() {
			return JS('AssetManager').get('IMAGE', 'splashCandleLight').getImage();
		},
		posX : 0,
		posY : 0
	});
	this.angle = 0;
	JS('DataManager').set('splashAlphaAngle', this.angle);
	this.timer = new JeremyTimer(1, function(argo) {
		if (argo.timer.count > argo.duration) {
			JS('SceneManager').next();
		} else {
			var ctx = JS('Renderer2D').context('gui');
			ctx.globalAlpha = argo.getAlpha();
		}
	}, {
		duration : 240,
		getAlpha : function() {
			return Math.sin(JS('DataManager').get('splashAlphaAngle'));
		}
	});
	JS('Renderer2D').add(this.splashCandleLight);
}, function update() {
	this.timer.update();
	JS('DataManager').set('splashAlphaAngle', this.angle += (Math.PI / 240));
}, function destroy() {
	JS('Renderer2D').remove(this.splashCandleLight);
})); 