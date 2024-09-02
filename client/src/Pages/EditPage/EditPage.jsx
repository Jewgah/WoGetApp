import React, { useEffect, useState } from "react";
import EditPost from "../../components/EditPost/EditPost";
import { useNavigate, useParams } from "react-router-dom";
import PostService from "../../services/Api/Controllers/PostService";
import { isEmpty } from "../../lib/outilsForms";

function EditPage() {
	let { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [post, setPost] = useState({});

	const nav = useNavigate();

	useEffect(() => {
		const getdata = () => {
			setIsLoading(false);
			PostService.getPostById({ id })
				.then((res) => setPost(res))
				.catch(() => nav("/notFoundPage"));
		};
		if (isLoading) {
			getdata();
		}
	}, [isLoading]);

	if (isLoading && !isEmpty(post)) {
		return <div>Loading...</div>;
	}

	if (isLoading && !isEmpty(post)) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<EditPost post={post} user={post.postUser} />
		</>
	);
}

export default EditPage;
