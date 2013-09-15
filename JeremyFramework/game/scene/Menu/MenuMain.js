/**
 * @author JongMin Park
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'MenuMain',
	initCB : function() {
		
		J('STU')('Data').set('mousePos', J('MAT')('Vec3')({
			x:0,
			y:0,
			w:1
		}));
		J('STU')('Data').set('mouseClick', false);
		
		
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
		
		this.btnStart = J('STU')('GUI').create('Button', {
			name : 'Start',
			posX : 535,
			posY : 50,
			actionCB : function(argo) {
				J('STU')('Scene').setNext("EditorMain");
				if (J('STU')('Scene').getNext().name === "EditorMain")
					J('STU')('Scene').playNext();
			},
			actionArgo : null,
			updateCB:function() {
				console.log(
				);
			},
			updateArgo : null,
			assets : {
				idle : J('STU')('Asset').get('image', 'btnStart'),
				mouseover : J('STU')('Asset').get('image', 'btnStart_MouseDown'),
				mousedown : J('STU')('Asset').get('image', 'btnStart_MouseUp')
			}
		});
		
		this.btnCredit = J('STU')('GUI').create('Button', {
			name : 'Credit',
			posX : 535,
			posY : 350,
			actionCB : function(argo) {
				J('STU')('Scene').setNext("MenuCredit");
				if (J('STU')('Scene').getNext().name === "MenuCredit")
					J('STU')('Scene').playNext();
			},
			actionArgo : null,
			updateCB : function() {
			},
			updateArgo : null,
			assets : {
				idle : J('STU')('Asset').get('image', 'btnCredit'),
				mouseover : J('STU')('Asset').get('image', 'btnCredit_MouseDown'),
				mousedown : J('STU')('Asset').get('image', 'btnCredit_MouseUp')
			}
		});

		this.btnHelp = J('STU')('GUI').create('Button', {
			name : 'Help',
			posX : 535,
			posY : 250,
			actionCB : function(argo) {
				J('STU')('Scene').setNext("MenuHelp");
				if (J('STU')('Scene').getNext().name === "MenuHelp")
					J('STU')('Scene').playNext();
			},
			actionArgo : null,
			updateCB : function() {
			},
			updateArgo : null,
			assets : {
				idle : J('STU')('Asset').get('image', 'btnHelp'),
				mouseover : J('STU')('Asset').get('image', 'btnHelp_MouseDown'),
				mousedown : J('STU')('Asset').get('image', 'btnHelp_MouseUp')
			}
		});

		this.btnStory = J('STU')('GUI').create('Button', {
			name : 'Story',
			posX : 535,
			posY : 150,
			actionCB : function(argo) {
				J('STU')('Scene').setNext("MenuStory");
				if (J('STU')('Scene').getNext().name === "MenuStory")
					J('STU')('Scene').playNext();
			},
			actionArgo : null,
			updateCB : function() {
			},
			updateArgo : null,
			assets : {
				idle : J('STU')('Asset').get('image', 'btnStory'),
				mouseover : J('STU')('Asset').get('image', 'btnStory_MouseDown'),
				mousedown : J('STU')('Asset').get('image', 'btnStory_MouseUp')
			}
		}); 


		
		J('STU')('R2D').add(this.bgMenuMain);
		this.btnStart.show();
		this.btnCredit.show();
		this.btnHelp.show();
		this.btnStory.show();
		
	},
	updateCB : function() {
		this.btnStart.update();
		this.btnCredit.update();
		this.btnHelp.update();
		this.btnStory.update();
	},
	destroyCB : function() {
		J('STU')('R2D').remove(this.bgMenuMain);
		this.btnStart.destroy();
		this.btnCredit.destroy();
		this.btnHelp.destroy();
		this.btnStory.destroy();

		this.bgMenuMain = null;
	}
}));


	/* event listener */
		J('STU')('Event').set('onMouseMove', '#jeremy', 'mousemove', function(e) {
			J('STU')('Data').set('mousePos', J('MAT')('Vec3')({
				x : e.offsetX,
				y : e.offsetY,
				w : 1
			}));
		});
		J('STU')('Event').bind('onMouseMove');
		
		J('STU')('Event').set('onMouseDownButton', '#jeremy', 'mousedown', function(e) {
			var selected = null;
			__CollisionManager.colliders.forEach(function(elem) {
				if (elem.isSelected(J('MAT')('Vec3')({
					x : e.clientX,
					y : e.clientY,
					w : 1
				}))) {
					selected = elem;
				}
			});
			if (selected) {
				J('STU')('Data').set('mouseClick', true);
			}
		});
		J('STU')('Event').bind('onMouseDownButton');
		
		J('STU')('Event').set('onMouseUpButton', '#jeremy', 'mouseup', function(e) {
			var selected = null;
			__CollisionManager.colliders.forEach(function(elem) {
				if (elem.isSelected(J('MAT')('Vec3')({
					x : e.clientX,
					y : e.clientY,
					w : 1
				}))) {
					selected = elem;
				} else J('STU')('Data').set('mouseClick', false);
			});
			if (selected) {
				J('STU')('Data').set('mouseClick', false);
				J('STU')('GUI').get(selected.id).doAction();
			}
		});
		J('STU')('Event').bind('onMouseUpButton');
		
		

