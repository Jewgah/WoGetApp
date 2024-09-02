import React, { useEffect } from 'react';
/* eslint-disable no-mixed-spaces-and-tabs */

import './MultipleImageUpload.css';

const MultipleImageUpload = ({selectedFiles, setSelectedFiles}) => {
	const [file,setFile] = React.useState(null);
	useEffect(() => {
		onChange();
	},[file]);

	const handleImageAsFile = (e) => {
		e.preventDefault();
		const reader = new FileReader();
		const file = e.target.files[0];
		if (reader !== undefined && file !== undefined) {
		  reader.onloadend = () => {
			setFile(file)
		  }
		  reader.readAsDataURL(file);
		}
	   }
  
	  const _handleReaderLoaded = (readerEvt) => {
		let binaryString = readerEvt.target.result;
		setSelectedFiles([...selectedFiles,btoa(binaryString)]);
	  }

	  const onChange = () => {
		if (file) {
		  const reader = new FileReader();
		  reader.onload = _handleReaderLoaded
		  reader.readAsBinaryString(file)
		}
	  }


	const renderPhotos = (source) => {
		return source.map((photo) => {
			return <img  src={`data:image/jpeg;base64,${photo}`} alt="" key={photo} className="multiple_pictures" />;
		});
	};

	return (
		<div className="MultipleImageUpload">
			<div className="heading"> </div>
			<div>
				<input type="file" id="file" multiple onChange={handleImageAsFile} accept="image/*" />
				<div className="label-holder">
					
					<label htmlFor="file" className="label">
						Upload Images
					</label>
				</div>
				<div className="result">{renderPhotos(selectedFiles)}</div>
			</div>
		</div>
	);
};

export default MultipleImageUpload;
