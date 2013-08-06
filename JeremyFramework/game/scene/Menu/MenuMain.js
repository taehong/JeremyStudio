/**
 * @author Administrator
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'MenuMain',
	initCB : function() {
		this.bgMenuMain = J('LIB')('Renderable2D')({
			layer : 'background',
			drawCB : function(ctx, argo) {
				ctx.drawImage(argo.img, argo.posX, argo.posY);
			},
			argo : {
				img : J('STU')('Asset').get('image', 'bgMenuMain').getImage(),
				posX : 0,
				posY : 0
			}
		});
		this.btnRect = J('LIB')('Renderable2D')({
			layer : 'gui',
			drawCB : function(ctx, argo) {
				
			},
			argo : {

			}
		});
		console.log(J('STU')('Asset').get('image', 'bgMenuMain'));
		console.log(this.bgMenuMain);
		J('STU')('R2D').add(this.bgMenuMain);
	},
	updateCB : function() {

	},
	destroyCB : function() {
		J('STU')('R2D').remove(this.bgMenuMain);
		this.bgMenuMain = null;
	}
})); 