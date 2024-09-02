import React from "react";
import "./Card.css";
function Card({ post, onClick }) {
	return (
		<div className="card" onClick={onClick}>
			<img src={`data:image/png;base64,${post.pictures[0]}`} />
			<div className="card__info">
				<h2>{post.title}</h2>
				<h3>{post.description}</h3>
				<h4>₪ {post.pricebyday} / Day</h4>
			</div>
		</div>
	);
}
export default Card;
