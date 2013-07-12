/**
 * @author JeremyJeong
 */
JeremyStudio.LayerConfig = {
	init: function () {
		console.log('Init: JeremyStudio.LayerConfig');
		this.type = 'LayerConfig';
		this.width = 720;
		this.height = 480;
		this.left = '0px';
		this.top = '0px';		
	},
	layerConfig2D:{
		target: '#GameArea',
		layer: {
			gui: {
				id: 'gui',
				zIndex: -1
			},
			effect: {
				id: 'effect',
				zIndex: -2
			}
		}
	},
	layerConfig3D:{
		target: '#GameArea',
		layer: {
			game: {
				id: 'game',
				zIndex: -2
			}
		}
	}
};