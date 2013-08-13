//Bloom
//Film
//Bleach
//Vignette
//HBlur
//VBlur
<script src="js/shaders/VerticalBlurShader.js"></script>
<script src="js/shaders/VignetteShader.js"></script>
<script src="js/shaders/BleachBypassShader.js"></script>
<script src="js/shaders/FilmShader.js"></script>
<script src="js/shaders/HorizontalBlurShader.js"></script>

<script src="js/postprocessing/BloomPass.js"></script>
<script src="js/postprocessing/FilmPass.js"></script>
<script src="js/postprocessing/EffectComposer.js"></script>
<script src="js/postprocessing/RenderPass.js"></script>
<script src="js/postprocessing/TexturePass.js"></script>
<script src="js/postprocessing/ShaderPass.js"></script>

composer4 = new THREE.EffectComposer( renderer, new THREE.WebGLRenderTarget( rtWidth, rtHeight, rtParameters ) );
composer4.addPass( renderScene );
// composer4.addPass( renderMask );
composer4.addPass( effectBloom );
composer4.addPass( effectFilm );
composer4.addPass( effectBleach );	
// composer4.addPass( clearMask );
composer4.addPass( effectVignette );


var shaderBleach = THREE.BleachBypassShader;
var shaderVignette = THREE.VignetteShader;

var effectBleach = new THREE.ShaderPass( shaderBleach );
var effectVignette = new THREE.ShaderPass( shaderVignette );

effectBleach.uniforms[ "opacity" ].value = 0.95;
effectVignette.uniforms[ "offset" ].value = 0.95;
effectVignette.uniforms[ "darkness" ].value = 1.6;

var effectBloom = new THREE.BloomPass( 0.5 );
var effectFilm = new THREE.FilmPass( 0.35, 0.025, 648, false );

var effectHBlur = new THREE.ShaderPass( THREE.HorizontalBlurShader );
var effectVBlur = new THREE.ShaderPass( THREE.VerticalBlurShader );
effectHBlur.uniforms[ 'h' ].value = 2 / ( width / 2 );
effectVBlur.uniforms[ 'v' ].value = 2 / ( height / 2 );

//effectFilm.renderToScreen = true;
//effectFilmBW.renderToScreen = true;
//effectDotScreen.renderToScreen = true;
// effectBleach.renderToScreen = true;
effectVignette.renderToScreen = true;
//effectCopy.renderToScreen = true;