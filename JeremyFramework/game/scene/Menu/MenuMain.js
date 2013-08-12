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
            posX : 580,
            posY : 150,
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
            posX : 580,
            posY : 400,
            action : function(argo) {
                J('STU')('Scene').setNext('MenuCredit');
                J('STU')('Scene').playNext();
            },
            argo : null
        });
        this.btnHelp = J('STU')('GUI').create('Button', {
            name : 'Help',
            asset : 'btnHelp',
            posX : 580,
            posY : 300,
            action : function(argo) {
                J('STU')('Scene').setNext('MenuHelp');
                J('STU')('Scene').playNext();
            },
            argo : null
        });
        J('STU')('R2D').add(this.bgMenuMain);
        this.btnStart.show();
        this.btnCredit.show();
        this.btnHelp.show();
        J('STU')('Event').set('onClickButton', '#jeremy', 'click', function(e) {
            var selected = null;
            __CollisionManager.colliders.forEach(function(elem) {
                if (elem.isSelected(J('MAT')('Vec3')({
                    x : e.offsetX,
                    y : e.offsetY,
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

    },
    destroyCB : function() {
        J('STU')('R2D').remove(this.bgMenuMain);
        this.btnStart.destroy();
        this.btnCredit.destroy();
        this.btnHelp.destroy();

        this.bgMenuMain = null;
        this.btnCredit = null;
        this.btnHelp = null;
    }
}));
