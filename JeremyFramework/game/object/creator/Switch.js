/**
 * @author Jeremy
 */
/*
 * argo.name
 * argo.actionCB
 * argo.actionArgo
 */
J('STU')('Object').set('Creator', 'Switch', function(argo) {
	this.name = argo.name;
	this.isOn = false;
	this.actionCB = argo.actionCB;
	this.actionArgo = argo.actionArgo;
	this.doAction = function() {
		(this.actionCB)(this.actionArgo);
	};
});
