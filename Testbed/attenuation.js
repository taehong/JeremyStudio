var sum = 0;
for (var x = 0, prec = 6; x <= prec; x += 1) {
	console.log(JSON.stringify({
		x : x,
		y : smoothAttenuation(x, prec)
	}));
}
console.log(sum);

function smoothAttenuation(rad, precision) {
	return 0.5 * Math.cos(x * (180 / precision) * Math.PI / 180) + 0.5;
}