import ApiService from "../ApiService";
import AuthService from "./AuthService";
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

class PostService {
	static createNewPost(body) {
		return ApiService.post("api/post/new", body, AuthService.getToken());
	}

	static searchPost(body) {
		return ApiService.post("api/post/search", body, AuthService.getToken());
	}
	static getAllPosts() {
		return ApiService.get(
			"api/post/getAllPosts",
			"",
			AuthService.getToken()
		);
	}

	static getPostById(body) {
		return ApiService.post(
			"api/post/getByID",
			body,
			AuthService.getToken()
		);
	}

	static getMyPost() {
		return ApiService.get("api/post/getMyPost", "", AuthService.getToken());
	}
	static deleteById(body) {
		return ApiService.delete(
			"api/post/deleteById",
			body,
			AuthService.getToken()
		);
	}
}

export default PostService;
