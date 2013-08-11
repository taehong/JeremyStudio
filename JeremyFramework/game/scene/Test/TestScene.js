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
        for (var i = 0; i < 100; i++) {
            this.quadtree.insertAABB(J('MAT')('AABB2')({
                center : J('MAT')('Vec3')({
                    x : 360 + Math.random() * 360,
                    y : 240 + Math.random() * 240,
                    w : 1
                }),
                half : J('MAT')('Vec3')({
                    x : 5,
                    y : 5,
                    w : 0
                })
            }));
            this.quadtree.insertAABB(J('MAT')('AABB2')({
                center : J('MAT')('Vec3')({
                    x : 360 - Math.random() * 360,
                    y : 240 + Math.random() * 240,
                    w : 1
                }),
                half : J('MAT')('Vec3')({
                    x : 5,
                    y : 5,
                    w : 0
                })
            }));
            this.quadtree.insertAABB(J('MAT')('AABB2')({
                center : J('MAT')('Vec3')({
                    x : 360 + Math.random() * 360,
                    y : 240 - Math.random() * 240,
                    w : 1
                }),
                half : J('MAT')('Vec3')({
                    x : 5,
                    y : 5,
                    w : 0
                })
            }));
            this.quadtree.insertAABB(J('MAT')('AABB2')({
                center : J('MAT')('Vec3')({
                    x : 360 - Math.random() * 360,
                    y : 240 - Math.random() * 240,
                    w : 1
                }),
                half : J('MAT')('Vec3')({
                    x : 5,
                    y : 5,
                    w : 0
                })
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
                    size : 2 // for point
                }
            }
        });
        J('STU')('Data').set('TestQuadtree', this.quadtree);
        J('STU')('R2D').add(this.quadtreeDrawing);
        // $('#jeremy').bind('click', function(e) {
        // var quadtree = J('STU')('Data').get('TestQuadtree');
        // quadtree.insert(J('MAT')('Vec3')({
        // x : e.offsetX,
        // y : e.offsetY,
        // w : 1
        // }));
        // console.log('Left Top >> ', quadtree.queryRange(J('MAT')('AABB2')({
        // center: J('MAT')('Vec3')({
        // x:360,
        // y:240,
        // w:1
        // }),
        // half: J('MAT')('Vec3')({
        // x:360,
        // y:240,
        // w:0
        // })
        // })));
        // });
        $('#jeremy').bind('click', function(e) {
            var point = J('MAT')('Vec3')({
                x : e.offsetX,
                y : e.offsetY,
                w : 1
            }), quadtree = J('STU')('Data').get('TestQuadtree'), retrieved = quadtree.retrieve(point), selected = [];
            console.log('Point >> ', point);
            console.log('Retrieved >> ', retrieved);
            retrieved.forEach(function(elem) {
                if (elem.isContaining(point)) {
                    selected.push(elem);
                }
            });
            console.log('Selected >> ', selected);
        });
    },
    updateCB : function() {

    },
    destroyCB : function() {
    }
}));
