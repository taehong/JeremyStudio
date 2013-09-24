J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'WorldSelect',
	initCB : function() {
		
		J('STU')('Data').set('mousePos', J('MAT')('Vec3')({
			x:0,
			y:0,
			w:1
		}));
		J('STU')('Data').set('mouseClick', false);

		this.bgWorldSelect = J('LIB')('Renderable2D')({
			layer : 'background',
			drawCB : function(ctx, argo) {
				ctx.globalAlpha = 0.3;
				ctx.drawImage(argo.img, argo.posX, argo.posY, 300, 370);
				ctx.globalAlpha = 1;
			},
			argo : {
				img : J('STU')('Asset').get('image', 'bgMenuHelp').getImage(),
				posX : 220,
				posY : 30
			}
		});
		
		this.worldSelectTitle = J('LIB')('Renderable2D')({
			layer : 'background',
			drawCB : function(ctx, argo) {
				ctx.globalAlpha = 1;
				ctx.drawImage(argo.img, argo.posX, argo.posY);
			},
			argo : {
				img : J('STU')('Asset').get('image', 'worldSelectTitle').getImage(),
				posX : 90,
				posY : 10
			}
		});
		
		this.btnWorld1 = J('STU')('GUI').create('Button', {
			name : 'World1',
			posX : 50,
			posY : 120,
			actionCB : function(argo) {
				J('STU')('Scene').setNext("Playing");
				if (J('STU')('Scene').getNext().name === "Playing")
					J('STU')('Scene').playNext();
			},
			actionArgo : null,
			updateCB : function(argo) {
				if (J('STU')('Data').get('mouseClick') && argo.LPos === null) {
					argo.LPos = J('STU')('Data').get('mousePos').x;
				} else if(!J('STU')('Data').get('mouseClick')) argo.LPos = null;
				
				if(J('STU')('Data').get('mouseClick') && J('STU')('Data').get('mouseMove')) {
					if(J('STU')('Data').get('mousePos').x - argo.LPos < 0 &&
					parseInt(J('STU')('R2D').canvas("gui").style.left) >= -200) {
						console.log("Ldrag!");
						argo.num -= 3;
						J('STU')('R2D').canvas("gui").style.left = argo.num + "px";
						J('STU')('R2D').canvas("gui").width += 3;
					} else if(J('STU')('Data').get('mousePos').x - argo.LPos > 0 && 
					parseInt(J('STU')('R2D').canvas("gui").style.left) <= 0 ) {
						console.log("Rdrag!");
						argo.num += 3;
						J('STU')('R2D').canvas("gui").style.left = argo.num + "px";
						J('STU')('R2D').canvas("gui").width -= 3;
					}
				};
			},
			updateArgo : {
				LPos: null,
				num : 0
			},
			assets : {
				idle : J('STU')('Asset').get('image', 'btnWorld1'),
				mouseover : J('STU')('Asset').get('image', 'btnWorld1'),
				mousedown : J('STU')('Asset').get('image', 'btnWorld1')
			}
		});
		
		this.btnWorld2 = J('STU')('GUI').create('Button', {
			name : 'World2',
			posX : 350,
			posY : 120,
			actionCB : function(argo) {
				J('STU')('Scene').setNext("Playing");
				if (J('STU')('Scene').getNext().name === "Playing")
					J('STU')('Scene').playNext();
			},
			actionArgo : null,
			updateCB : function() {
			},
			updateArgo : null,
			assets : {
				idle : J('STU')('Asset').get('image', 'btnWorld2'),
				mouseover : J('STU')('Asset').get('image', 'btnWorld2'),
				mousedown : J('STU')('Asset').get('image', 'btnWorld2')
			}
		});
		
		this.btnWorld3 = J('STU')('GUI').create('Button', {
			name : 'World3',
			posX : 650,
			posY : 120,
			actionCB : function(argo) {
				J('STU')('Scene').setNext("Playing");
				if (J('STU')('Scene').getNext().name === "Playing")
						J('STU')('Scene').playNext();
			},
			actionArgo : null,
			updateCB : function() {
			},
			updateArgo : null,
			assets : {
				idle : J('STU')('Asset').get('image', 'btnWorld3'),
				mouseover : J('STU')('Asset').get('image', 'btnWorld3'),
				mousedown : J('STU')('Asset').get('image', 'btnWorld3')
			}
		});
		
		this.btnBack = J('STU')('GUI').create('Button', {
			name : 'Back',
			posX : 15,
			posY : 20,
			actionCB : function(argo) {
				J('STU')('Scene').playPrev();
			},
			actionArgo : null,
			updateCB : function() {
			},
			updateArgo : null,
			assets : {
				idle : J('STU')('Asset').get('image', 'btnBack'),
				mouseover : J('STU')('Asset').get('image', 'btnBack_MouseDown'),
				mousedown : J('STU')('Asset').get('image', 'btnBack_MouseUp')
			}
		});
		
		J('STU')('R2D').add(this.bgWorldSelect);
		J('STU')('R2D').add(this.worldSelectTitle);
		
		this.btnBack.show();
		this.btnWorld1.show();
		this.btnWorld2.show();
		this.btnWorld3.show();
		
	},
	updateCB : function() {
		this.btnBack.update();
		this.btnWorld1.update();
		this.btnWorld2.update();
		this.btnWorld3.update();
		
	},
	destroyCB : function() {
		this.btnBack.destroy();
		this.btnWorld1.destroy();
		this.btnWorld2.destroy();
		this.btnWorld3.destroy();
		
		J('STU')('R2D').remove(this.bgWorldSelect);
		J('STU')('R2D').remove(this.worldSelectTitle);
		
		this.bgLevelSelect = null;
		this.levelSelectTitle = null;

	}
}));