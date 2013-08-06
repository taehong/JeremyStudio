var 
JeremyStudio.Soundbox = {

	
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
