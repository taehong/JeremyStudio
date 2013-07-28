/**
 * @author Jeremy
 */
var __RequestManager = {
	init : function() {
		console.log('Init: JeremyStudio.RequestManager');
		this.type = 'RequestManager';
	},
	/*
	 * @argo.method: 'get' or 'post',
	 * @argo.url: url string,
	 * @argo.data: data to be send
	 * @argo.dataType: 'json', 'script', etc. (the type of response)
	 * @argo.onSuccess: success callback
	 * @argo.onFailure: failure callback
	 */
	request : function(argo) {
		var ajaxArgo = {
			type : argo.method,
			url : argo.url,
			dataType : argo.dataType
		};
		if (argo.data) {
			ajaxArgo.data = argo.data;
		}
		$.ajax(ajaxArgo).done(function(res) {
			argo.onSuccess(res);
		}).fail(function(jqXHR, textStatus) {
			console.log("Request failed: " + textStatus);
			if (argo.onFailure) {
				argo.onFailure(jqXHR, textStatus);
			}
		});
	}
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyStudio') : undefined);
	if (target) {
		target.addModule('RequestManager', __RequestManager);
		target.addInterface('Request', {
			request : __RequestManager.request
		});
	}
})();