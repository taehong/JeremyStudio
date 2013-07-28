/**
 * @author Jeremy
 */
function start() {
	J('STD')('Request').request({
		method:'get',
		url:'game/config/layer.json',
		dataType:'json',
		onSuccess: function (res) {
			console.log(res);
		}
	});
}