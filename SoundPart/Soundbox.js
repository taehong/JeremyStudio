var bufferList = [];

JeremyStudio.Soundbox = {

	init: function() {
		console.log('Init: JeremyStudio.Soundbox');
		this.type = 'Soundbox';
		try {
			// Fix up for prefixing
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			this.context = new AudioContext();
		} catch(e) {
			alert('Web Audio API is not supported in this browser');
		}
		
		/**on iOS, Apple currently mutes all sound output until the first time a sound is played during a user interaction event**/

  		// create our permanent nodes
  		this.nodes = {
    		destination: this.context.destination,
    		masterGain: this.context.createGainNode(),
    		backgroundMusicGain: this.context.createGainNode(),
    		coreEffectsGain: this.context.createGainNode(),
    		effectGain1: this.context.createGainNode(),
    		effectGain2: this.context.createGainNode(),
    		effectGain3: this.context.createGainNode(),
    		clickedEffectsGain: this.context.createGainNode()
  		};

  		// and setup the graph
  		this.nodes.masterGain.connect( this.nodes.destination );
  		this.nodes.backgroundMusicGain.connect( this.nodes.masterGain );
  		this.nodes.coreEffectsGain.connect( this.nodes.masterGain );
  		this.nodes.effectGain1.connect( this.nodes.coreEffectsGain );
  		this.nodes.effectGain2.connect( this.nodes.coreEffectsGain );
  		this.nodes.effectGain3.connect( this.nodes.coreEffectsGain );
  		this.nodes.clickedEffectsGain.connect( this.nodes.coreEffectsGain );
  		
  		// load all sound files
  		bufferLoader = new BufferLoader(this.context, soundSources, function onLoad(bufferlist){
  			bufferList = bufferlist;
  			JeremyStudio.Soundbox.creatSource(bufferList);	
  		});
    	bufferLoader.load();
  		
	},
	
	creatSource : function (bufferList) { 
			// Create sources and connect gains
  			backgroundMusic = JeremyStudio.Soundbox.context.createBufferSource();
  			clickedEffect = JeremyStudio.Soundbox.context.createBufferSource();
  			effect1 = JeremyStudio.Soundbox.context.createBufferSource();
  			effect2 = JeremyStudio.Soundbox.context.createBufferSource();
  			effect3 = JeremyStudio.Soundbox.context.createBufferSource();
  			backgroundMusic.buffer = bufferList[0];
  			clickedEffect.buffer = bufferList[1];
  			//effect1.buffer = bufferList[2];
  			//effect2.buffer = bufferList[3];
  			//effect3.buffer = bufferList[4];
  			backgroundMusic.connect(JeremyStudio.Soundbox.nodes.backgroundMusicGain);
  			clickedEffect.connect(JeremyStudio.Soundbox.nodes.clickedEffectsGain);
  			effect1.connect(JeremyStudio.Soundbox.nodes.effectGain1);
  			effect2.connect(JeremyStudio.Soundbox.nodes.effectGain2);
  			effect3.connect(JeremyStudio.Soundbox.nodes.effectGain3);
	},

	play: function (source, effectNum) {
		if(source === 'BGM') {
			backgroundMusic = JeremyStudio.Soundbox.context.createBufferSource();
			backgroundMusic.buffer = bufferList[0];
			backgroundMusic.connect(JeremyStudio.Soundbox.nodes.backgroundMusicGain);
			var source = backgroundMusic, currTime = 0;
			//bgm fade in
			JeremyStudio.Soundbox.nodes.backgroundMusicGain.gain.linearRampToValueAtTime(0,currTime);
			JeremyStudio.Soundbox.nodes.backgroundMusicGain.gain.linearRampToValueAtTime(1,currTime+2);
			source.loop = true;
			source.noteOn(0);
			source.start(0);
			console.log('backgroundMusic is playing');
		}
		if(source === 'Click') {
			clickedEffect = JeremyStudio.Soundbox.context.createBufferSource();
			clickedEffect.buffer = bufferList[1];
			clickedEffect.connect(JeremyStudio.Soundbox.nodes.clickedEffectsGain);
			var source = clickedEffect;
			source.start(0);
			source.loop = false;
			console.log('ClickedSound playing');
		}
		if(source === 'Effect') {
			effect1 = JeremyStudio.Soundbox.context.createBufferSource();
  			effect2 = JeremyStudio.Soundbox.context.createBufferSource();
  			effect3 = JeremyStudio.Soundbox.context.createBufferSource();
  			//effect1.buffer = bufferList[2];
  			//effect2.buffer = bufferList[3];
  			//effect3.buffer = bufferList[4];
			effect1.connect(JeremyStudio.Soundbox.nodes.effectGain1);
  			effect2.connect(JeremyStudio.Soundbox.nodes.effectGain2);
  			effect3.connect(JeremyStudio.Soundbox.nodes.effectGain3);
  			var source;
  			if(effectNum === 1) source = effect1;
  			else if(effectNum === 2) source = effect2;
  			else if(effectNum === 3) source = effect3;
			source.start(0);
			source.loop = false;
			console.log( effect, " is playing");
		}
		
	},
	
	scaleVolume: function (gain, degree) {
		if(gain === 'BGM') {
			JeremyStudio.Soundbox.nodes.backgroundMusicGain.gain.value = parseInt(degree);
			console.log('Volume '+100*parseInt(degree));
		}
		if(gain === 'EFFECTS') {
			JeremyStudio.Soundbox.nodes.coreEffectsGain.value = parseInt(degree);
			console.log('Volume '+100*parseInt(degree));
		}
		if(gain === 'MAIN') {
			JeremyStudio.Soundbox.nodes.masterGain.value = parseInt(degree);
			console.log('Volume '+100*parseInt(degree));
		}
	},
	// TODO : Edit
	resume: function (source) {
		if(source === 'BGM') {
			JeremyStudio.Soundbox.nodes.backgroundMusicGain.connect(JeremyStudio.Soundbox.nodes.masterGain);
			console.log('BGM is resumed');
		}
	},
	// TODO : Edit
	pause: function (source) {
		if(source === 'BGM') {
			JeremyStudio.Soundbox.nodes.backgroundMusicGain.disconnect();
			console.log('BGM is paused');
		}
	},
	// TODO : Edit
	stop: function (source) {
		if(source === 'BGM') { 
			backgroundMusic.noteOff(0);
			backgroundMusic.stop(0);
			console.log('BGM is stopped');
		}
	},

	effectsCrossFade: function (element) {
		if(!effect1.start(0) || !effect2.start(0)) return;
		var x = parseInt(element.value) / parseInt(element.max);
		var gain1 = Math.cos(x * 0.5 * Math.PI);
		var gain2 = Math.cos((1.0 - x) * 0.5 * Math.PI);
		this.nodes.effectGain1.gain.value = gain1;
		this.nodes.effectGain2.gain.value = gain2;

	}
}
	

	//EventListener
	window.addEventListener('webkitvisibilitychange', function(e) {
		if (document.webkitHidden) {
			var node = JeremyStudio.Soundbox.nodes
			if(node.masterGain.disconnect()) return;
			else node.masterGain.disconnect();

		} else {
			node.masterGain.connect(this.nodes.destination);
		}
	}); 
