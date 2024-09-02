import React, { useEffect, useState } from "react";
import "./ProductsPage.css";
import Carousel from "../../components/Carousel/Carousel";
import { useNavigate, useParams } from "react-router-dom";
import PostService from "../../services/Api/Controllers/PostService";
import { isEmpty } from "../../lib/outilsForms";
// import CircularProgress from '@mui/material/CircularProgress';
import LoadingPage from "../../components/LoadingPage/LoadingPage";

function ProductsPage() {
	let { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [post, setPost] = useState({});
	const nav = useNavigate();

	useEffect(() => {
		const getdata = () => {
			PostService.getPostById({ id })
				.then((res) => setPost(res))
				.finally(() => setIsLoading(false))
				.catch(() => nav("/notFoundPage"));
		};
		if (isLoading) {
			getdata();
		}
	}, [isLoading]);

	if (isLoading && !isEmpty(post)) {
		return <LoadingPage />;
	}

	// if (loading) return <LoadingPage  />;
	if (isLoading && !isEmpty(post)) {
		return <LoadingPage />;
	}
	return (
		<>
			<h1 className="title_product">{post.title}</h1>
			<Carousel post={post} user={post?.postUser} />
		</>
	);
}

export default ProductsPage;
