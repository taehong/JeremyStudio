var bufferList = [];

JeremyStudio.Soundbox = {

	init: function() {
		var effectCount;
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
    		clickedEffectsGain: this.context.createGainNode(),
    		effectGain: new Array()
  		};

  		// and setup the graph
  		this.nodes.masterGain.connect( this.nodes.destination );
  		this.nodes.backgroundMusicGain.connect( this.nodes.masterGain );
  		this.nodes.coreEffectsGain.connect( this.nodes.masterGain );
  		this.nodes.clickedEffectsGain.connect( this.nodes.coreEffectsGain );
  		
  		// load all sound files
  		bufferLoader = new BufferLoader(this.context, soundSources, function onLoad(bufferlist){
  			bufferList = bufferlist;	
  		});
    	bufferLoader.load();
  		
	},
	
	play: function (source, effectNum) {
		
		if(source === 'BGM') {
			backgroundMusic = JeremyStudio.Soundbox.context.createBufferSource();
			backgroundMusic.buffer = bufferList[0];
			backgroundMusic.connect(JeremyStudio.Soundbox.nodes.backgroundMusicGain);
			var source = backgroundMusic, currTime = 0;
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
			for(var i = 0; i < effectCount; i++) {
  				effect = [];
  				effect[i] = JeremyStudio.Soundbox.context.createBufferSource();
  				JeremyStudio.Soundbox.nodes.effectGain[i] = JeremyStudio.Soundbox.context.createGainNode();
  				effect[i] = bufferList[i+2];
  				effect[i].connect(JeremyStudio.Soundbox.nodes.effectGain[i]);
  				JeremyStudio.Soundbox.nodes.effectGain[i].connect( this.nodes.coreEffectsGain );
  			}
  			var source = effect[parseInt(effectNum)];
			source.start(0);
			source.loop = false;
			console.log(source, " is playing");
		}
		
	},
	
	scaleVolume: function (gain, degree) {
		
		if(gain === 'BGM') {
			JeremyStudio.Soundbox.nodes.backgroundMusicGain.gain.value = degree;
			console.log('BGM Volume '+100*degree);
		}
		
		if(gain === 'EFFECTS') {
			JeremyStudio.Soundbox.nodes.coreEffectsGain.value = degree; //include Clicked Sound
			console.log('EFFECTS Volume '+100*degree);
		}
		
		if(gain === 'MAIN') {
			JeremyStudio.Soundbox.nodes.masterGain.value = degree;
			console.log('MAIN Volume '+100*degree);
		}
		
	},

	resume: function (source) {
		if(source === 'BGM') {
			JeremyStudio.Soundbox.nodes.backgroundMusicGain.connect(JeremyStudio.Soundbox.nodes.masterGain);
			console.log('BGM is resumed');
		}
		/*
		if(source === 'EFFECTS') {
			JeremyStudio.Soundbox.nodes.coreEffectsGain.connect(JeremyStudio.Soundbox.nodes.masterGain);
			console.log('EFFECTS is resumed');
		}
		*/
		if(source === 'MAIN') {
			JeremyStudio.Soundbox.nodes.masterGain.connect(JeremyStudio.Soundbox.nodes.masterGain);
			console.log('BGM is resumed');
		}
	},
	
	pause: function (source) {
		if(source === 'BGM') {
			JeremyStudio.Soundbox.nodes.backgroundMusicGain.disconnect();
			console.log('BGM is paused');
		}
		/*
		if(source === 'EFFECTS') { 
			JeremyStudio.Soundbox.nodes.coreEffectsGain.disconnect();
			console.log('EFFECTS is resumed');
		}
		*/
		if(source === 'MAIN') {
			JeremyStudio.Soundbox.nodes.masterGain.disconnect();
			console.log('MAIN resumed');
		}
	},

	stop: function (source) {
		if(source === 'BGM') { 
			backgroundMusic.noteOff(0);
			backgroundMusic.stop(0);
			console.log('BGM is stopped');
		}
		if(source === 'EFFECTS') {
			for(var i = 0; i < effectCount; i++) {
  				effect[i].noteOff(0);
  				effect[i].stop(0);
  			}
  			clickedEffect.noteOff(0);
  			clickedEffect.stop(0);
			console.log('EFFECTS is stopped');
		}
		if(source === 'MAIN') { 
			backgroundMusic.noteOff(0);
			backgroundMusic.stop(0);
			console.log('MAIN stopped');
		}
		
	},
	
	addEffect: function (num) {
		effectCount = num;
	},


	/*
	effectsCrossFade: function (element) {
		if(!effect1.start(0) || !effect2.start(0)) return;
		var x = parseInt(element.value) / parseInt(element.max);
		var gain1 = Math.cos(x * 0.5 * Math.PI);
		var gain2 = Math.cos((1.0 - x) * 0.5 * Math.PI);
		this.nodes.effectGain1.gain.value = gain1;
		this.nodes.effectGain2.gain.value = gain2;

	}
	*/
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
