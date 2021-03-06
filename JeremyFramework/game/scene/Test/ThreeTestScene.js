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
            renderer : new THREE.WebGLRenderer({
                antialias : false
            }),
            camera : new THREE.OrthographicCamera(-720, 720, 480, -480, 0.01, 10000),
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
                return entity;
            }
        };

        this.jThree.renderer.setSize(WIDTH, HEIGHT);
        this.jThree.renderer.setClearColor(0x000000, 1);
        this.jThree.renderer.autoClear = false;
        this.jThree.renderer.gammaInput = true;
        this.jThree.renderer.gammaOutput = true;
        this.jThree.renderer.physicallyBasedShading = true;
        this.jThree.renderer.shadowMapEnabled = true;

        var shaderBleach = THREE.BleachBypassShader;
        var shaderVignette = THREE.VignetteShader;

        var effectBleach = new THREE.ShaderPass(shaderBleach);
        var effectVignette = new THREE.ShaderPass(shaderVignette);

        effectBleach.uniforms["opacity"].value = 0.95;
        effectVignette.uniforms["offset"].value = 0.95;
        effectVignette.uniforms["darkness"].value = 1.6;

        var effectBloom = new THREE.BloomPass(0.5);
        var effectFilm = new THREE.FilmPass(0.35, 0.025, 648, false);

        var effectHBlur = new THREE.ShaderPass(THREE.HorizontalBlurShader);
        var effectVBlur = new THREE.ShaderPass(THREE.VerticalBlurShader);
        effectHBlur.uniforms['h'].value = 2 / (WIDTH / 2 );
        effectVBlur.uniforms['v'].value = 2 / (HEIGHT / 2 );

        //effectFilm.renderToScreen = true;
        // effectBleach.renderToScreen = true;
        effectVignette.renderToScreen = true;
        var rtParameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat, stencilBuffer: true };

        var composer = new THREE.EffectComposer(this.jThree.renderer, new THREE.WebGLRenderTarget(720, 480, rtParameters));
        // composer.addPass(renderScene);
        // composer4.addPass( renderMask );
        composer.addPass(effectBloom);
        composer.addPass(effectFilm);
        composer.addPass(effectBleach);
        // composer4.addPass( clearMask );
        composer.addPass(effectVignette);
        
        this.comp = composer;

        var cubeGeometry = new THREE.CubeGeometry(48, 48, 48, 4, 4, 4);
        var cubeMaterial = new THREE.MeshLambertMaterial({
            color : 0xCC0000
        });
        var count = 20;
        for (var i = 0, iIter = count; i < iIter; i++) {
            for (var j = 0, jIter = count; j < jIter; j++) {
                var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                cube.receiveShadow = true;
                cube.translateX(49 * i - 49 / 2 * (iIter - 1));
                cube.translateZ(49 * j - 49 / 2 * (iIter - 1));
                this.jThree.set('model', 'cube' + i * iIter + j, cube);
                this.jThree.scene.add(cube);
            }
        }
        var light = new THREE.SpotLight(0xffffff, 1, 0, Math.PI, 1);
        light.castShadow = true;
        light.shadowCameraNear = 0.01;
        light.shadowCameraFar = 1000;
        light.shadowCameraFov = 50;
        light.shadowCameraVisible = true;
        light.shadowBias = 0.0001;
        light.shadowDarkness = 0.5;
        light.shadowMapWidth = 1024;
        light.shadowMapHeight = 1024;

        this.jThree.set('light', 'pointLight', light);
        this.jThree.setPosition('light', 'pointLight', 0, 48 * 2, 0);

        this.jThree.camera.position.set(480, 480, 480);
        this.jThree.camera.lookAt(new THREE.Vector3(0, 0, 0));

        var sphere = new THREE.Mesh(new THREE.SphereGeometry(30, 16, 16), new THREE.MeshLambertMaterial({
            color : 0xCC0000
        }));
        sphere.castShadow = true;

        this.jThree.scene.add(this.jThree.set('model', 'sphere', sphere));
        this.jThree.setPosition('model', 'sphere', 0, 64, 0);

        this.jThree.scene.add(this.jThree.camera);
        this.jThree.scene.add(this.jThree.lights.pointLight);
        this.jThree.scene.add(new THREE.AxisHelper(720));

        $('#jeremy').append(this.jThree.renderer.domElement).css('background-color', 'black');

        window.JThree = this.jThree;
        this.angle = 0;
    },
    updateCB : function() {
        var spot = this.jThree.setPosition('light', 'pointLight', 240 * Math.sin((this.angle += 2) * Math.PI / 180), 256, 0);
        spot.target.position.set(spot.position.x, 0, spot.position.z);
        this.jThree.renderer.clear();
        this.jThree.renderer.render(this.jThree.scene, this.jThree.camera);
        // this.comp.render(0.01);
    },
    destroyCB : function() {
    }
}));
