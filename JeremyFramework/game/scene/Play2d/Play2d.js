/**
 * @author Jeremy Jeong
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'Play2d',
	initCB : function() {
		var canvas = J('STU')('R2D').canvas('effect');
		this.map = J('LIB')('TileMap')({
			aabb : J('MAT')('AABB2')({
				center : J('MAT')('Vec3')({
					x : canvas.width / 2,
					y : canvas.height / 2,
					w : 1
				}),
				half : J('MAT')('Vec3')({
					x : canvas.height / 2,
					y : canvas.height / 2,
					w : 0
				})
			}),
			number : 12
		});
		console.log(this.map);
		this.effectVignette = J('LIB')('Renderable2D')({
			layer : 'effect',
			drawCB : function(ctx, argo) {
				ctx.drawImage(argo.img, 0, 0);
			},
			argo : {
				img : J('STU')('Asset').get('image', 'maskImgVignette').getImage()
			}
		});
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
		this.characterMask = J('LIB')('Renderable2D')({
			layer : 'game',
			drawCB : function(ctx, argo) {
				var mousePos = J('STU')('Data').get('mousePos') || {
					x : 0,
					y : 0
				}, radius = argo.getRadius();
				ctx.globalCompositeOperation = 'source-over';
				ctx.globalAlpha = 0.5;
				ctx.fillStyle = '#000000';
				ctx.fillRect(0, 0, 730, 440);
				ctx.globalCompositeOperation = 'destination-out';
				ctx.globalAlpha = 1.0;
				ctx.fillStyle = '#ffffff';
				ctx.beginPath();
				ctx.arc(mousePos.x, mousePos.y, radius, 0, 2 * Math.PI);
				ctx.fill();
				ctx.globalCompositeOperation = 'source-over';
			},
			argo : {
				getRadius : function() {
					return 30 + 5 * Math.sin(J('STU')('Data').get('characterMaskAngle') / 180 * Math.PI);
				}
			}
		});
		$('#jeremy').bind('mousemove', function(e) {
			J('STU')('Data').set('mousePos', {
				x : e.offsetX,
				y : e.offsetY
			});
		});
		this.map.tiles.forEach(function(col, row, list, elem) {
			J('STU')('R2D').add(elem.renderable);
		});
		J('STU')('R2D').add(this.effectVignette);
		J('STU')('R2D').add(this.effectNoise);
		J('STU')('R2D').add(this.effectScanline);
		J('STU')('R2D').add(this.characterMask);
		this.characterMaskAngle = 0;
		J('STU')('Data').set('characterMaskAngle', this.characterMaskAngle);

		this.girlSprite = J('STU')('Asset').get('sprite', 'GirlSprite').setCurrentSequence('walkFront');
		this.girlSpriteRenderable = J('LIB')('Renderable2D')({
			layer : 'game',
			drawCB : function(ctx, argo) {
				argo.sprite.drawFrame(ctx, argo.posX, argo.posY, argo.pivot);
			},
			argo : {
				sprite : this.girlSprite,
				posX : 100,
				posY : 100,
				pivot : JeremySprite.ePivotType.kCenter
			}
		});
		J('STU')('R2D').add(this.girlSpriteRenderable);
	},
	updateCB : function() {
		J('STU')('Data').set('characterMaskAngle', this.characterMaskAngle += 3);
	},
	destroyCB : function() {
	}
}));
