import React, { useEffect } from "react";
import PostService from "../../services/Api/Controllers/PostService.js";
import Card from "../../components/Card/Card.tsx";
import Banner from "../../components/Banner/Banner.tsx";
import BannerCard from "../../components/BannerCard/BannerCard.tsx";

import ImageCard_1 from "../../../src/assets/images/Card_1.png";
import ImageCard_2 from "../../../src/assets/images/Card_2.png";
import ImageCard_3 from "../../../src/assets/images/Card_3.png";
import "./Home.css";

import { useNavigate } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

export default function Home() {
	let navigate = useNavigate();

	function handleClick(id) {
		navigate(`/product/${id}`);
	}

	const [isLoading, setIsLoading] = React.useState(true);
	const [allPosts, setAllPosts] = React.useState([]);

	useEffect(() => {
		const getdata = () => {
			PostService.getAllPosts()
				.then((res) => setAllPosts(res))
				.finally(() => {
					setIsLoading(false);
				})
				.catch((err) => {
					console.log(err);
					alert("Error while fetching data");
				});
		};
		if (isLoading) {
			getdata();
		}
	}, [isLoading]);

	return (
		<>
			<Banner />
			<div className="home__section">
				<BannerCard
					src={ImageCard_1}
					title="Professional Experiences"
					description="Plan a meeting with your co-workers "
				/>
				<BannerCard
					src={ImageCard_2}
					title="Work With Team"
					description="Share a workspace with some friends."
				/>
				<BannerCard
					src={ImageCard_3}
					title="Manage your work"
					description="Comfortable professional places to plan meetings."
				/>
			</div>
			<h1 className="recent_post_title"> Recent Posts </h1>
			<div className="home__section">
				{!isLoading ? (
					allPosts.map((post, key) => (
						<Card
							key={key}
							post={post}
							onClick={() => handleClick(post._id)}
						/>
					))
				) : (
					<LoadingPage />
				)}
			</div>
		</>
	);
}
