export function getAverage(arry) {
	// check if array
	if (!(Object.prototype.toString.call(arry) === "[object Array]")) {
		return 0;
	}
	var sum = 0,
		count = 0;
	sum = arry.reduce(function (previousValue, currentValue) {
		if (isFinite(currentValue)) {
			count++;
			return previousValue + parseFloat(currentValue);
		}
		return previousValue;
	}, sum);
	return count ? sum / count : 0;
}
export function  getDaysArray (start, end) {
    for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt).toDateString());
    }
    return arr;
};
export function sortByRate(posts) {
	const filter = posts.sort((a, b) => getAverage(b.rate) - getAverage(a.rate))
	return filter
}