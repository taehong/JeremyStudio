/**
 * @author Jeremy Jeong
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'Play2d',
	initCB : function() {
		/*
		 * Local Variables
		 */
		var canvas = J('STU')('R2D').canvas('effect');
		
		/*
		 * Set Data
		 */
		this.characterMaskAngle = 0;
		this.characterPos = {
			x : 100,
			y : 100
		};
		this.stonePos = {
			x : 300,
			y : 350
		};
		J('STU')('Data').set('characterMaskAngle', this.characterMaskAngle);
		J('STU')('Data').set('characterPos', this.characterPos);
		J('STU')('Data').set('stonePos', this.stonePos);

		/*
		* Define Renderables
		*/
		// Renderable : Background Color
		this.bgColor = J('LIB')('Renderable2D')({
			layer : 'background',
			drawCB : function(ctx, argo) {
				ctx.fillStyle = argo.color;
				ctx.fillRect(0, 0, argo.width, argo.height);
			},
			argo : {
				color : '#ff00ff',
				width : canvas.width,
				height : canvas.height
			}
		});
		// Renderable : the map
		this.map = J('LIB')('TileMap')({
			aabb : J('MAT')('AABB2')({
				center : J('MAT')('Vec3')({
					x : canvas.width / 2,
					y : canvas.height / 2,
					w : 1
				}),
				half : J('MAT')('Vec3')({
					x : canvas.height / 2,
					y : canvas.height / 2 ,
					w : 0
				})
			}),
			number : 12
		});
		// Renderable : the vignette effect
		this.effectVignette = J('LIB')('Renderable2D')({
			layer : 'effect',
			drawCB : function(ctx, argo) {
				ctx.drawImage(argo.img, 0, 0);
			},
			argo : {
				img : J('STU')('Asset').get('image', 'maskImgVignette').getImage()
			}
		});
		// Renderable : the noise effect
		this.effectNoise = J('LIB')('Renderable2D')({
			layer : 'effect',
			drawCB : function(ctx, argo) {
				ctx.globalAlpha = 0.8;
				ctx.drawImage(argo.img, 0, 0);
				ctx.globalAlpha = 1.0;
			},
			argo : {
				img : J('STU')('Asset').get('image', 'maskImgNoise').getImage()
			}
		});
		// Renderable : the scanline effect
		this.effectScanline = J('LIB')('Renderable2D')({
			layer : 'effect',
			drawCB : function(ctx, argo) {
				ctx.globalAlpha = 0.4;
				ctx.drawImage(argo.img, 0, 0);
				ctx.globalAlpha = 1.0;
			},
			argo : {
				img : J('STU')('Asset').get('image', 'maskImgScanline').getImage()
			}
		});
		// Renderable : the character mask
		this.characterMask = J('LIB')('Renderable2D')({
			layer : 'game',
			drawCB : function(ctx, argo) {
				var characterPos = argo.getCharPos(), radius = argo.getRadius();
				ctx.globalCompositeOperation = 'source-over';
				ctx.globalAlpha = 0.5;
				ctx.fillStyle = '#000000';
				ctx.fillRect(0, 0, 730, 440);
				ctx.globalCompositeOperation = 'destination-out';
				ctx.globalAlpha = 1.0;
				ctx.fillStyle = '#ffffff';
				ctx.beginPath();
				ctx.arc(characterPos.x, characterPos.y, radius, 0, 2 * Math.PI);
				ctx.fill();
				ctx.globalCompositeOperation = 'source-over';
			},
			argo : {
				getCharPos : function() {
					return J('STU')('Data').get('characterPos') || {
						x : 0,
						y : 0
					};
				},
				getRadius : function() {
					return 30 + 1 * Math.sin(J('STU')('Data').get('characterMaskAngle') / 180 * Math.PI);
				}
			}
		});
		
		// Renderable : the girl sprite
		this.girlSpriteRenderable = J('LIB')('Renderable2D')({
			layer : 'game',
			drawCB : function(ctx, argo) {
				var characterPos = J('STU')('Data').get('characterPos');
				argo.sprite.drawFrame(ctx, characterPos.x, characterPos.y, argo.pivot);
			},
			argo : {
				sprite : J('STU')('Asset').get('sprite', 'GirlSprite').setCurrentSequence('walkFront'),
				pivot : JeremySprite.ePivotType.kCenter
			}
		});
		
		// Renderable : the stone image
		this.stoneImg = J('LIB')('Renderable2D')({
			layer : 'game',
			drawCB : function(ctx, argo) {
				var stonePos = J('STU')('Data').get('stonePos');
				ctx.drawImage(argo.img, stonePos.x, stonePos.y, 35, 35);
			},
			argo : {
				img : J('STU')('Asset').get('image', 'stoneImg').getImage(),
			}
		});
		
		/*
		 * Add Renderables
		 */
		J('STU')('R2D').add(this.bgColor);
		this.map.tiles.forEach(function(col, row, list, elem) {
			J('STU')('R2D').add(elem.renderable);
		});
		J('STU')('R2D').add(this.effectVignette);
		J('STU')('R2D').add(this.effectNoise);
		J('STU')('R2D').add(this.effectScanline);
		J('STU')('R2D').add(this.characterMask);
		J('STU')('R2D').add(this.girlSpriteRenderable);
		J('STU')('R2D').add(this.stoneImg);
		
	},
	updateCB : function() {
		J('STU')('Data').set('characterMaskAngle', this.characterMaskAngle += 3);
		//gameLoop();
	},
	destroyCB : function() {
	}
}));

/*
 * collision test
 */
	/*
	this.aabbs = {
		init : function (argo) {
			var stoneBox = J('MAT')('AABB2')({
					center : J('MAT')('Vec3')({
						x : argo.stonePos.x + 17.5,
						y : argo.stonePos.y + 17.5,
						w : 1
					}),
					half : J('MAT')('Vec3')({
						x : 17.5,
						y : 17.5,
						w : 0
					})
				});
			J('STU')('Data').set('stoneBox', stoneBox );
		},
		argo : {
			stonePos : J('STU')('Data').get('stonePos');
		}
		
	}
	*/
		
/*
 * Event Listener
 */

	window.addEventListener('keydown', function(e){
		switch(e.keyCode){
			
				case 37:
					if( J('STU')('Asset').get('sprite', 'GirlSprite').currentSequence === null || 
						J('STU')('Asset').get('sprite', 'GirlSprite').currentSequence !== J('STU')('Asset').get('sprite', 'GirlSprite').getSequence('walkLeft') ) 
						J('STU')('Asset').get('sprite', 'GirlSprite').setCurrentSequence('walkLeft');
					var pos = J('STU')('Data').get('characterPos');
					pos.x = pos.x - 1;
					J('STU')('Data').set('characterPos', pos);
					break;
					
				case 38:
					if( J('STU')('Asset').get('sprite', 'GirlSprite').currentSequence === null || 
						J('STU')('Asset').get('sprite', 'GirlSprite').currentSequence !== J('STU')('Asset').get('sprite', 'GirlSprite').getSequence('walkRear') )
						J('STU')('Asset').get('sprite', 'GirlSprite').setCurrentSequence('walkRear');
					var pos = J('STU')('Data').get('characterPos');
					pos.y = pos.y - 1;
					J('STU')('Data').set('characterPos', pos);
					break;
					
				case 39:
					if( J('STU')('Asset').get('sprite', 'GirlSprite').currentSequence === null || 
						J('STU')('Asset').get('sprite', 'GirlSprite').currentSequence !== J('STU')('Asset').get('sprite', 'GirlSprite').getSequence('walkRight') )
						J('STU')('Asset').get('sprite', 'GirlSprite').setCurrentSequence('walkRight');
					var pos = J('STU')('Data').get('characterPos');
					pos.x = pos.x + 1;
					J('STU')('Data').set('characterPos', pos);
					break;
					
				case 40:
					if( J('STU')('Asset').get('sprite', 'GirlSprite').currentSequence === null || 
						J('STU')('Asset').get('sprite', 'GirlSprite').currentSequence !== J('STU')('Asset').get('sprite', 'GirlSprite').getSequence('walkFront') )
						J('STU')('Asset').get('sprite', 'GirlSprite').setCurrentSequence('walkFront');
					var pos = J('STU')('Data').get('characterPos');
					pos.y = pos.y + 1;
					J('STU')('Data').set('characterPos', pos);
					break;
			}
		}, false);
