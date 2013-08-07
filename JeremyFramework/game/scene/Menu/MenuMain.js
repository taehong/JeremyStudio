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
		this.btnCredit = new JeremyButton('Credit', J('LIB')('Collider')({
			owner:this.btnCredit,
			area: '망했다'
		}), J('LIB')('Renderable2D')({
			layer : 'gui',
			drawCB : function(ctx, argo) {
				var width = ctx.measureText(argo.text).width + 2 * argo.horiPad, height = argo.fontSize + 2 * argo.vertPad;
				ctx.fillStyle = argo.bgColor;
				ctx.fillRect(argo.posX, argo.posY, width, height);
				ctx.font = argo.fontSize + "px" + " " + argo.font;
				ctx.fillStyle = argo.txtColor;
				ctx.fillText(argo.text, argo.posX + argo.horiPad, argo.posY + argo.vertPad + (height) / 2);
			},
			argo : {
				bgColor : '#ffffff',
				posX : 505,
				posY : 400,
				font : "Arial",
				fontSize : 30,
				txtColor : '#000000',
				horiPad : 50,
				vertPad : 10,
				text : 'Credit'
			}
		}));
		this.btnHelp = J('LIB')('Renderable2D')({
			layer : 'gui',
			drawCB : function(ctx, argo) {
				var width = ctx.measureText(argo.text).width + 2 * argo.horiPad, height = argo.fontSize + 2 * argo.vertPad;
				ctx.fillStyle = argo.bgColor;
				ctx.fillRect(argo.posX, argo.posY, width, height);
				ctx.font = argo.fontSize + "px" + " " + argo.font;
				ctx.fillStyle = argo.txtColor;
				ctx.fillText(argo.text, argo.posX + argo.horiPad, argo.posY + argo.vertPad + (height) / 2);
			},
			argo : {
				bgColor : '#ffffff',
				posX : 505,
				posY : 300,
				font : "Arial",
				fontSize : 30,
				txtColor : '#000000',
				horiPad : 59,
				vertPad : 10,
				text : 'Help'
			}
		});
		J('STU')('R2D').add(this.bgMenuMain);
		this.btnCredit.ready();
		this.btnHelp.ready();
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

function JeremyButton(name, collider, renderable) {
	this.name = name;
	this.collider = collider;
	this.renderable = renderable;
}

JeremyButton.prototype.destroy = function() {
	J('STU')('R2D').remove(this.renderable);
	this.renderable = null;
	this.collider = null;
};

JeremyButton.prototype.ready = function() {
	J('STU')('R2D').add(this.renderable);
};
