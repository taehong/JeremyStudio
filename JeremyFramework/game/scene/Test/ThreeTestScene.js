/**
 * @author Jeremy Jeong
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
    name : 'ThreeTestScene',
    initCB : function() {
        var WIDTH = 720, HEIGHT = 480;
        var VIEW_ANGLE = 45, ASPECT = WIDTH / HEIGHT, NEAR = 0.1, FAR = 10000;

        /*
         * JEREMY : Things
         */
        this.jThree = {
            renderer : new THREE.WebGLRenderer(),
            camera : new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR),
            scene : new THREE.Scene(),
            models : {},
            lights : {},
            setPosition : function(type, name, x, y, z) {
                var target = this.get(type, name);
                if (target.position) {
                    target.position.set(x, y, z);
                }
                return target;
            },
            get : function(type, name) {
                var retVal = null;
                switch(type) {
                    case 'model':
                        retVal = this.models[name];
                        break;
                    case 'light':
                        retVal = this.lights[name];
                        break;
                }
                return retVal;
            },
            set : function(type, name, entity) {
                switch(type) {
                    case 'model':
                        this.models[name] = entity;
                        break;
                    case 'light':
                        this.lights[name] = entity;
                        break;
                }
            }
        };

        var radius = 50, segments = 16, rings = 16;
        this.jThree.set('model', 'sphere', new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), new THREE.MeshLambertMaterial({
            color : 0xCC0000
        })));

        this.jThree.set('light', 'pointLight', new THREE.PointLight(0xFFFFFF));
        this.jThree.setPosition('light', 'pointLight', 10, 50, 130);

        this.jThree.camera.position.z = 300;
        this.jThree.renderer.setSize(WIDTH, HEIGHT);
        $('#jeremy').append(this.jThree.renderer.domElement);

        this.jThree.scene.add(this.jThree.models.sphere);
        this.jThree.scene.add(this.jThree.camera);
        this.jThree.scene.add(this.jThree.lights.pointLight);
        this.jThree.renderer.render(this.jThree.scene, this.jThree.camera);
    },
    updateCB : function() {

    },
    destroyCB : function() {
    }
}));
