/**
 * @Context SplashScreenDigitalMedia
 * @author Jeremy Jeong
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'TestScene',
	initCB : function() {
		this.quadtree = J('DAT')('Quadtree')({
			capacity : 1,
			aabb : J('MAT')('AABB2')({
				center : J('MAT')('Vec3')({
					x : 360,
					y : 240,
					w : 1
				}),
				half : J('MAT')('Vec3')({
					x : 360,
					y : 240,
					w : 0
				})
			})
		});
		for(var i = 0; i < 100; i++) {
            this.quadtree.insert(J('MAT')('Vec3')({
                x : Math.random() * 720,
                y : Math.random() * 480,
                w : 1
            }));
        }
		console.log(this.quadtree);
		this.quadtreeDrawing = J('LIB')('Renderable2D')({
			layer : 'effect',
			drawCB : function(ctx, argo) {
				argo.quadtree.drawCB(ctx, argo);
			},
			argo : {
				quadtree : this.quadtree,
				aabb : {
					color : "#ff0000"
				},
				item : {
					color : "#0000ff",
					size : 2
				}
			}
		});
		J('STU')('Data').set('TestQuadtree', this.quadtree);
		J('STU')('R2D').add(this.quadtreeDrawing);
		$('#jeremy').bind('click', function(e) {
			var quadtree = J('STU')('Data').get('TestQuadtree');
			quadtree.insert(J('MAT')('Vec3')({
				x : e.offsetX,
				y : e.offsetY,
				w : 1
			}));
			console.log('Left Top >> ', quadtree.queryRange(J('MAT')('AABB2')({
				center: J('MAT')('Vec3')({
				    x:360,
				    y:240,
				    w:1
				}),
				half: J('MAT')('Vec3')({
                    x:360,
                    y:240,
                    w:0
                })
			})));
		});
		
	},
	updateCB : function() {

	},
	destroyCB : function() {
	}
}));