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
    },
    updateCB : function() {
    },
    destroyCB : function() {
    }
}));