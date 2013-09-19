/**
 * @author Jeremy
 */
J('STU')('Object').set('Creator', 'Switch', function(argo) {
	this.name = argo.name;
	this.isOn = false;
	this.actionCB = argo.actionCB;
});
