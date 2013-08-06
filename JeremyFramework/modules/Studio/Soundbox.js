/**
 * @author Jeremy
 */
var __Soundbox = {
	init : function() {
		console.log('Init: JeremyStudio.Soundbox');
		__Soundbox.type = 'Soundbox';
	}
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyStudio') : undefined);
	if (target) {
		target.addModule('Soundbox', __Soundbox);
		target.addInterface('Sound', {
		});
	}
})();