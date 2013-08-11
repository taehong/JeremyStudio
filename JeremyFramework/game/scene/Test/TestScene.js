/**
 * @Context SplashScreenDigitalMedia
 * @author Jeremy Jeong
 */

// TODO: Event 처리부분 완성하기
// TODO: CollisionManager를 통해서 충돌을 처리하도록 하기 --> Quadtree와 BST를 CollisionManager에 붙이기!!
J('STU')('Context').add(J('LIB')('SceneContext')({
    name : 'TestScene',
    initCB : function() {
        if (this.quadtreeDrawing) {
            J('STU')('R2D').remove(this.quadtreeDrawing);
        }
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
        for (var i = 0; i < 125; i++) {
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
        J('STU')('Data').set('TestQuadtree', this.quadtree);
        this.quadtreeDrawing = J('LIB')('Renderable2D')({
            layer : 'effect',
            drawCB : function(ctx, argo) {
                argo.quadtree.drawCB(ctx, argo);
            },
            argo : {
                quadtree : J('STU')('Data').get('TestQuadtree'),
                aabb : {
                    color : "#ff0000"
                },
                item : {
                    color : "#0000ff",
                    size : 2 // for point
                }
            }
        });
        J('STU')('R2D').add(this.quadtreeDrawing);
        $('#jeremy').bind('click', function(e) {
            var point = J('MAT')('Vec3')({
                x : e.offsetX,
                y : e.offsetY,
                w : 1
            }), quadtree = J('STU')('Data').get('TestQuadtree'), retrieved = quadtree.retrieve(point), selected = [];
            console.log('Point >> ', point);
            console.log('Retrieved >> ', retrieved);
            var bst = J('DAT')('BST')({});
            retrieved.forEach(function(elem) {
                var key = (point.x - elem.center.x) * (point.x - elem.center.x) + (point.y - elem.center.y) * (point.y - elem.center.y);
                bst.insert(key, elem);
                if (elem.isContaining(point)) {
                    selected.push(elem);
                }
            });
            console.log(bst);
            // bst.traverseMinToMax(function(node, argo) {
                // console.log(node.key, node.valueList);
                // if (node.valueList[0].isContaining(argo.point)) {
                    // console.log('Selected >> ', node.valueList[0]);
                // }
            // }, {
                // point : point
            // });
            console.log(J('DAT')('Traversal')().inorderNR(bst.left, function(node, argo) {
                console.log(node.key, node.valueList);
                if (node.valueList[0].isContaining(argo.point)) {
                    console.log('Selected >> ', node.valueList[0]);
                    return true;
                }
            }, {
                point : point
            }));
            console.log(J('DAT')('Traversal')().preorderNR(bst.right, function(node, argo) {
                console.log(node.key, node.valueList);
                if (node.valueList[0].isContaining(argo.point)) {
                    console.log('Selected >> ', node.valueList[0]);
                }
            }, {
                point : point
            }));
        });
    },
    updateCB : function() {

    },
    destroyCB : function() {
    }
}));