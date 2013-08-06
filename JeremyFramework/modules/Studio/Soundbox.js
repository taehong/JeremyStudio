/**
 * @author Jeremy
 */
var __Soundbox = {
	bufferList : [],
	init : function() {
		console.log('Init: JeremyStudio.Soundbox');
		__Soundbox.type = 'Soundbox';
		console.log(Jeremy.getConfig('sound'));
		try {
			// Fix up for prefixing
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			__Soundbox.context = new AudioContext();
		} catch(e) {
			alert('Web Audio API is not supported in this browser');
		}
		/**on iOS, Apple currently mutes all sound output until the first time a sound is played during a user interaction event**/
		// create our permanent nodes
		__Soundbox.nodes = {
			destination : __Soundbox.context.destination,
			masterGain : __Soundbox.context.createGainNode(),
			backgroundMusicGain : __Soundbox.context.createGainNode(),
			coreEffectsGain : __Soundbox.context.createGainNode(),
			effectGain1 : __Soundbox.context.createGainNode(),
			effectGain2 : __Soundbox.context.createGainNode(),
			effectGain3 : __Soundbox.context.createGainNode(),
			clickedEffectsGain : __Soundbox.context.createGainNode()
		};
		// and setup the graph
		__Soundbox.nodes.masterGain.connect(__Soundbox.nodes.destination);
		__Soundbox.nodes.backgroundMusicGain.connect(__Soundbox.nodes.masterGain);
		__Soundbox.nodes.coreEffectsGain.connect(__Soundbox.nodes.masterGain);
		__Soundbox.nodes.effectGain1.connect(__Soundbox.nodes.coreEffectsGain);
		__Soundbox.nodes.effectGain2.connect(__Soundbox.nodes.coreEffectsGain);
		__Soundbox.nodes.effectGain3.connect(__Soundbox.nodes.coreEffectsGain);
		__Soundbox.nodes.clickedEffectsGain.connect(__Soundbox.nodes.coreEffectsGain);

		// load all sound files
		bufferLoader = new BufferLoader(__Soundbox.context, soundSources, function onLoad(bufferlist) {
			bufferList = bufferlist;
			__Soundbox.creatSource(bufferList);
		});
		bufferLoader.load();

	},
	creatSource : function(bufferList) {
		// Create sources and connect gains
		// for (clipName in config) {
			// __Soundbox.audioClips[clipName] = __Soundbox.context.createBufferSource()
		// }
		backgroundMusic = __Soundbox.context.createBufferSource();
		clickedEffect = __Soundbox.context.createBufferSource();
		effect1 = __Soundbox.context.createBufferSource();
		effect2 = __Soundbox.context.createBufferSource();
		effect3 = __Soundbox.context.createBufferSource();
		backgroundMusic.buffer = bufferList[0];
		clickedEffect.buffer = bufferList[1];
		//effect1.buffer = bufferList[2];
		//effect2.buffer = bufferList[3];
		//effect3.buffer = bufferList[4];
		backgroundMusic.connect(__Soundbox.nodes.backgroundMusicGain);
		clickedEffect.connect(__Soundbox.nodes.clickedEffectsGain);
		effect1.connect(__Soundbox.nodes.effectGain1);
		effect2.connect(__Soundbox.nodes.effectGain2);
		effect3.connect(__Soundbox.nodes.effectGain3);
	},

	play : function(source, effectNum) {
		if (source === 'BGM') {
			backgroundMusic = __Soundbox.context.createBufferSource();
			backgroundMusic.buffer = bufferList[0];
			backgroundMusic.connect(__Soundbox.nodes.backgroundMusicGain);
			var source = backgroundMusic, currTime = 0;
			//bgm fade in
			__Soundbox.nodes.backgroundMusicGain.gain.linearRampToValueAtTime(0, currTime);
			__Soundbox.nodes.backgroundMusicGain.gain.linearRampToValueAtTime(1, currTime + 2);
			source.loop = true;
			source.noteOn(0);
			source.start(0);
			console.log('backgroundMusic is playing');
		}
		if (source === 'Click') {
			clickedEffect = __Soundbox.context.createBufferSource();
			clickedEffect.buffer = bufferList[1];
			clickedEffect.connect(__Soundbox.nodes.clickedEffectsGain);
			var source = clickedEffect;
			source.start(0);
			source.loop = false;
			console.log('ClickedSound playing');
		}
		if (source === 'Effect') {
			effect1 = __Soundbox.context.createBufferSource();
			effect2 = __Soundbox.context.createBufferSource();
			effect3 = __Soundbox.context.createBufferSource();
			//effect1.buffer = bufferList[2];
			//effect2.buffer = bufferList[3];
			//effect3.buffer = bufferList[4];
			effect1.connect(__Soundbox.nodes.effectGain1);
			effect2.connect(__Soundbox.nodes.effectGain2);
			effect3.connect(__Soundbox.nodes.effectGain3);
			var source;
			if (effectNum === 1)
				source = effect1;
			else if (effectNum === 2)
				source = effect2;
			else if (effectNum === 3)
				source = effect3;
			source.start(0);
			source.loop = false;
			console.log(effect, " is playing");
		}
	},
	scaleVolume : function(gain, degree) {
		if (gain === 'BGM') {
			__Soundbox.nodes.backgroundMusicGain.gain.value = parseInt(degree);
			console.log('Volume ' + 100 * parseInt(degree));
		}
		if (gain === 'EFFECTS') {
			__Soundbox.nodes.coreEffectsGain.value = parseInt(degree);
			console.log('Volume ' + 100 * parseInt(degree));
		}
		if (gain === 'MAIN') {
			__Soundbox.nodes.masterGain.value = parseInt(degree);
			console.log('Volume ' + 100 * parseInt(degree));
		}
	},
	// TODO : Edit
	resume : function(source) {
		if (source === 'BGM') {
			__Soundbox.nodes.backgroundMusicGain.connect(__Soundbox.nodes.masterGain);
			console.log('BGM is resumed');
		}
	},
	// TODO : Edit
	pause : function(source) {
		if (source === 'BGM') {
			__Soundbox.nodes.backgroundMusicGain.disconnect();
			console.log('BGM is paused');
		}
	},
	// TODO : Edit
	stop : function(source) {
		if (source === 'BGM') {
			backgroundMusic.noteOff(0);
			backgroundMusic.stop(0);
			console.log('BGM is stopped');
		}
	},
	effectsCrossFade : function(element) {
		if (!effect1.start(0) || !effect2.start(0))
			return;
		var x = parseInt(element.value) / parseInt(element.max);
		var gain1 = Math.cos(x * 0.5 * Math.PI);
		var gain2 = Math.cos((1.0 - x) * 0.5 * Math.PI);
		__Soundbox.nodes.effectGain1.gain.value = gain1;
		__Soundbox.nodes.effectGain2.gain.value = gain2;
	}
};
// (function() {
	// var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyStudio') : undefined);
	// if (target) {
		// target.addModule('Soundbox', __Soundbox);
		// target.addInterface('Sound', {
			// buffers : __Soundbox.bufferList,
			// play : __Soundbox.play,
			// pause : __Soundbox.pause,
			// stop : __Soundbox.stop,
			// resume : __Soundbox.resume
		// });
	// }
// })();