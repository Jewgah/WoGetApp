import ApiService from "../ApiService";
import AuthService from "./AuthService";
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

class BookedService {
	static bookedNew(body) {
		console.log(body);
		return ApiService.post("api/booked/new", body, AuthService.getToken());
	}

	static getAllBooked() {
		return ApiService.get(
			"api/booked/getAllBooked",
			"",
			AuthService.getToken()
		);
	}
	static getMyBooked() {
		return ApiService.get(
			"api/booked/getMyBooked",
			"",
			AuthService.getToken()
		);
	}
	static updateRate(body) { 
		return ApiService.post(
			"api/booked/updateRate",
			body,
			AuthService.getToken()
		);
	}
}

export default BookedService;
