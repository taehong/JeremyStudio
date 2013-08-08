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
		this.btnCredit = J('STU')('GUI').create('Button', {
			name : 'Credit',
			asset : 'btnCredit',
			posX : 490,
			posY : 400
		});
		this.btnHelp = J('STU')('GUI').create('Button', {
			name : 'Help',
			asset : 'btnHelp',
			posX : 490,
			posY : 300
		});
		J('STU')('R2D').add(this.bgMenuMain);
		this.btnCredit.show();
		this.btnHelp.show();
		J('STU')('Event').set('onClickButton', '#jeremy', 'click', function(e) {

		});
	},
	updateCB : function() {

	},
	destroyCB : function() {
		J('STU')('R2D').remove(this.bgMenuMain);
		this.btnCredit.destroy();
		this.btnHelp.destroy();

		this.bgMenuMain = null;
		this.btnCredit = null;
		this.btnHelp = null;
	}
})); 