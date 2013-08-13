/**
 * @author Jeremy Jeong
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
    name : 'Play2d',
    initCB : function() {
        this.map = J('LIB')('TileMap')({
            size:20,
            number:10
        });
        console.log(this.map);
        this.effectVignette = J('LIB')('Renderable2D')({
            layer:'effect',
            drawCB: function(ctx, argo) {
                ctx.drawImage(argo.img, 0, 0);
            },
            argo:{
                img: J('STU')('Asset').get('image', 'maskImgVignette').getImage()
            }
        });
        this.effectNoise = J('LIB')('Renderable2D')({
            layer:'effect',
            drawCB: function(ctx, argo) {
                ctx.drawImage(argo.img, 0, 0);
            },
            argo:{
                img: J('STU')('Asset').get('image', 'maskImgNoise').getImage()
            }
        });
        J('STU')('R2D').add(this.effectVignette);
        J('STU')('R2D').add(this.effectNoise);
    },
    updateCB : function() {
    },
    destroyCB : function() {
    }
}));