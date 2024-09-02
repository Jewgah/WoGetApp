/* eslint-disable no-unsafe-finally */
export const emailValidation = (value) =>
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
		value
	);
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

export const phoneValidation = (value) =>
	/^(\+33|0033|0)(1|2|3|4|5|9|6|7|9)[0-9]{8}$/.test(value);
export const urlValidation = (value) => {
	let returnValue = true;
	try {
		new URL(value);
	} catch (e) {
		returnValue = false;
	} finally {
		return returnValue;
	}
	// eslint-disable-next-line no-unreachable
	return false;
};
export const equalTo = (value1, value2) => value1 === value2;
export const isRequired = (value) => value !== null && value !== "" && value;
export const isNumber = (value) => !isNaN(value) && value !== "";
export const minLength = (value, length) => value.length >= length;
export const maxLength = (value, length) =>
	value.length <= length && value !== "";
export const range = (value, min, max) => min <= value && value <= max;
export const minValue = (value, min) => min <= value;
export const maxValue = (value, max) => max >= value;

export const capitalize = (s) => {
	if (typeof s !== "string") return "";
	return s.charAt(0).toUpperCase() + s.slice(1);
};
export const upperCase = (s) => {
	if (typeof s !== "string") return "";
	return s.toUpperCase();
};

export const toFormData = (data_current) => {
	let formData = new FormData();

	for (let dataKey in data_current) {
		if (dataKey === "preview") {
			// append nested object
			for (let previewKey in data_current[dataKey]) {
				formData.append(
					`preview[${previewKey}]`,
					data_current[dataKey][previewKey]
				);
			}
		} else {
			formData.append(dataKey, data_current[dataKey]);
		}
	}
	return formData;
};

export const isEmpty = (obj) => {
	return Object.keys(obj).length === 0;
};
export function getDaysArray(start, end) {
	for (
		var arr = [], dt = new Date(start);
		dt <= new Date(end);
		dt.setDate(dt.getDate() + 1)
	) {
		arr.push(new Date(dt).toDateString());
	}
	return arr;
}
