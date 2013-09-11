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
		this.btnStart = J('STU')('GUI').create('Button', {
			name : 'Start',
			asset : 'btnStart',
			posX : 535,
			posY : 50,
			action : function(argo) {
				// J('STU')('Scene').setNext('MenuStart');
				// J('STU')('Scene').playNext();
				J('STU')('Scene').playPrev();
				alert("Start Button");
			},
			argo : null
		});
		this.btnCredit = J('STU')('GUI').create('Button', {
			name : 'Credit',
			asset : 'btnCredit',
			posX : 535,
			posY : 350,
			action : function(argo) {
				J('STU')('Scene').setNext('MenuCredit');
				J('STU')('Scene').playNext();
			},
			argo : null
		});
		this.btnHelp = J('STU')('GUI').create('Button', {
			name : 'Help',
			asset : 'btnHelp',
			posX : 535,
			posY : 250,
			action : function(argo) {
				J('STU')('Scene').setNext("MenuHelp");
				if (J('STU')('Scene').getNext().name === "MenuHelp")
					J('STU')('Scene').playNext();
			},
			argo : null,
			updateCB : function(argo, btn) {
				var mousePos = J('STU')('Data').get('mousePos'), collider = J('STU')('Collision').search(btn.collider);
				if (collider.isSelected(mousePos)) {
					console.log('mouseover!!');
				}
			},
			updateArgo : null
		});
		this.btnStory = J('STU')('GUI').create('Button', {
			name : 'Story',
			asset : 'btnStory',
			posX : 535,
			posY : 150,
			action : function(argo) {
				J('STU')('Scene').setNext('MenuStory');
				J('STU')('Scene').playNext();
			},
			argo : null
		});
		J('STU')('R2D').add(this.bgMenuMain);
		this.btnStart.show();
		this.btnCredit.show();
		this.btnHelp.show();
		this.btnStory.show();
		//TODO: MOUSEOVER MOUSEOUT

		J('STU')('Event').set('onClickButton', '#jeremy', 'click', function(e) {
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
				J('STU')('GUI').get(selected.id).doAction();
			}
		});
		J('STU')('Event').bind('onClickButton');

		J('STU')('Data').set('mousePos', J('MAT')('Vec3')({
			x : 0,
			y : 0,
			w : 1
		}));
		J('STU')('Event').set('onMouseMove', '#jeremy', 'mousemove', function(e) {
			J('STU')('Data').set('mousePos', J('MAT')('Vec3')({
				x : e.offsetX,
				y : e.offsetY,
				w : 1
			}));
		});
		J('STU')('Event').bind('onMouseMove');

		/*
		 * added Event - Mouse Over
		 */
		J('STU')('Event').set('mouseOverButton', '#jeremy', 'mouseover', function(e) {
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
				console.log("aaaa");
				//J('STU')('GUI').get(selected.id).doAction();
			}
		});
		J('STU')('Event').bind('mouseOverButton');

		// J('STU')('R2D').add(J('LIB')('Renderable2D')({
		// layer : 'effect',
		// drawCB : function(ctx, argo) {
		// argo.quadtree.drawCB(ctx, argo);
		// },
		// argo : {
		// quadtree : __CollisionManager.quadtree,
		// aabb : {
		// color : "#ff0000"
		// },
		// item : {
		// color : "#0000ff",
		// size : 2 // for point
		// }
		// }
		// }));
	},
	updateCB : function() {
		this.btnHelp.update();
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
