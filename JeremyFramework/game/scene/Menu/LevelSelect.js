J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'LevelSelect',
	initCB : function() {

		J('STU')('Data').set('mousePos', J('MAT')('Vec3')({
			x:0,
			y:0,
			w:1
		}));
		J('STU')('Data').set('mouseClick', false);
		
		this.bgLevelSelect = J('LIB')('Renderable2D')({
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
		
		this.level1Pic = J('LIB')('Renderable2D')({
			layer : 'gui',
			drawCB : function(ctx, argo) {
				ctx.globalAlpha = 1;
				ctx.drawImage(argo.img, argo.posX, argo.posY);
			},
			argo : {
				img : J('STU')('Asset').get('image', 'Level1_1Pic').getImage(),
				posX : 90,
				posY : 90
			}
		});
		
		this.level2Pic = J('LIB')('Renderable2D')({
			layer : 'gui',
			drawCB : function(ctx, argo) {
				ctx.globalAlpha = 1;
				ctx.drawImage(argo.img, argo.posX, argo.posY);
			},
			argo : {
				img : J('STU')('Asset').get('image', 'Level1_2Pic').getImage(),
				posX : 90,
				posY : 90
			}
		});
		
		this.level3Pic = J('LIB')('Renderable2D')({
			layer : 'gui',
			drawCB : function(ctx, argo) {
				ctx.globalAlpha = 1;
				ctx.drawImage(argo.img, argo.posX, argo.posY);
			},
			argo : {
				img : J('STU')('Asset').get('image', 'Level1_3Pic').getImage(),
				posX : 90,
				posY : 90
			}
		});
		
		this.levelSelectTitle = J('LIB')('Renderable2D')({
			layer : 'gui',
			drawCB : function(ctx, argo) {
				ctx.globalAlpha = 1;
				ctx.drawImage(argo.img, argo.posX, argo.posY);
			},
			argo : {
				img : J('STU')('Asset').get('image', 'levelSelectTitle').getImage(),
				posX : 90,
				posY : 10
			}
		});
		
		this.btnLevel1_1 = J('STU')('GUI').create('Button', {
			name : 'Level1_1',
			posX : 520,
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
				idle : J('STU')('Asset').get('image', 'btnLevel1_1'),
				mouseover : J('STU')('Asset').get('image', 'btnLevel1_1'),
				mousedown : J('STU')('Asset').get('image', 'btnLevel1_1')
			}
		});
		
		this.btnLevel1_2 = J('STU')('GUI').create('Button', {
			name : 'Level1_2',
			posX : 520,
			posY : 220,
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
				idle : J('STU')('Asset').get('image', 'btnLevel1_2'),
				mouseover : J('STU')('Asset').get('image', 'btnLevel1_2'),
				mousedown : J('STU')('Asset').get('image', 'btnLevel1_2')
			}
		});
		
		this.btnLevel1_3 = J('STU')('GUI').create('Button', {
			name : 'Level1_3',
			posX : 520,
			posY : 320,
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
				idle : J('STU')('Asset').get('image', 'btnLevel1_3'),
				mouseover : J('STU')('Asset').get('image', 'btnLevel1_3'),
				mousedown : J('STU')('Asset').get('image', 'btnLevel1_3')
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
		
		J('STU')('R2D').add(this.bgLevelSelect);
		J('STU')('R2D').add(this.levelSelectTitle);
		
		this.btnBack.show();
		this.btnLevel1_1.show();
		this.btnLevel1_2.show();
		this.btnLevel1_3.show();
		
	},
	updateCB : function() {
		this.btnBack.update();
		this.btnLevel1_1.update();
		this.btnLevel1_2.update();
		this.btnLevel1_3.update();
		
		if(this.btnLevel1_1.getCurrentState() == 1) {
			J('STU')('R2D').remove(this.level1Pic);
			J('STU')('R2D').remove(this.level2Pic);
			J('STU')('R2D').remove(this.level3Pic);
			J('STU')('R2D').add(this.level1Pic);
		} else if(this.btnLevel1_2.getCurrentState() == 1) {
			J('STU')('R2D').remove(this.level1Pic);
			J('STU')('R2D').remove(this.level2Pic);
			J('STU')('R2D').remove(this.level3Pic);
			J('STU')('R2D').add(this.level2Pic);
		} else if(this.btnLevel1_3.getCurrentState() == 1){
			J('STU')('R2D').remove(this.level1Pic);
			J('STU')('R2D').remove(this.level2Pic);
			J('STU')('R2D').remove(this.level3Pic);
			J('STU')('R2D').add(this.level3Pic);
		} else J('STU')('R2D').add(this.level1Pic); // main levelPic
	},
	destroyCB : function() {
		this.btnBack.destroy();
		this.btnLevel1_1.destroy();
		this.btnLevel1_2.destroy();
		this.btnLevel1_3.destroy();
		
		J('STU')('R2D').remove(this.bgLevelSelect);
		J('STU')('R2D').remove(this.levelSelectTitle);
		J('STU')('R2D').remove(this.level1Pic);
		J('STU')('R2D').remove(this.level2Pic);
		J('STU')('R2D').remove(this.level3Pic);
		this.bgLevelSelect = null;
		this.levelSelectTitle = null;
		this.level1Pic = null;
		this.level2Pic = null;
		this.level3Pic = null;
	}
}));