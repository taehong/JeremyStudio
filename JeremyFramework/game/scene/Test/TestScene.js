/**
 * @Context SplashScreenDigitalMedia
 * @author Jeremy Jeong
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'TestScene',
	initCB : function() {
		this.quadtree = J('DAT')('Quadtree')({
			capacity : 1,
			area : J('MAT')('Rectangle')({
				x : 0,
				y : 0,
				w : 720,
				h : 480
			})
		});
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
			quadtree.insert(J('MAT')('Vector3')({
				x : e.offsetX,
				y : e.offsetY,
				w : 1
			}));
			console.log('Left Top >> ',quadtree.queryRange(J('MAT')('Rectangle')({
				x : 0,
				y : 0,
				w : 360,
				h : 240
			})));
			console.log('Right Top >> ',quadtree.queryRange(J('MAT')('Rectangle')({
				x : 360,
				y : 0,
				w : 360,
				h : 240
			})));
			console.log('Left Bottom >> ',quadtree.queryRange(J('MAT')('Rectangle')({
				x : 0,
				y : 240,
				w : 360,
				h : 240
			})));
			console.log('Right Bottom >> ',quadtree.queryRange(J('MAT')('Rectangle')({
				x : 360,
				y : 240,
				w : 360,
				h : 240
			})));
		});
	},
	updateCB : function() {

	},
	destroyCB : function() {
	}
}));

