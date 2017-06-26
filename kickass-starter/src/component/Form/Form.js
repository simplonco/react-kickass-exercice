import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Form = (props) => {

	const renderInputs = () => {
		const { inputs } = props;

		return (
			inputs.map((inputItem, index) => {
				if (inputItem.textarea) {
					return (
						<div key={index}>
							<label htmlFor={inputItem.name}>{inputItem.label}</label>
							<textarea
								name={inputItem.name}
								value={inputItem.value}
								onChange={(e) => props.handleFormChange(e)} />
						</div>
					)
				}
				return (
					<div key={index}>
						<label htmlFor={inputItem.name}>{inputItem.label}</label>
						<input type={inputItem.type}
							name={inputItem.name}
							value={inputItem.value}
							onChange={(e) => props.handleFormChange(e)} />
					</div>
				)
			})
		);
	}


	return (

		<div className="container-center">
			<div className="sub-container user-info">
				<h3>{props.title}</h3>
				{renderInputs()}
				<button
					onClick={() => props.handleFormSubmit()}
				>
					{props.buttonText}
				</button>
			</div>
		</div>
	);
}

Form.propTypes = {
	title: PropTypes.string,
	buttonText: PropTypes.string,
	handleFormChange: PropTypes.func.isRequired,
	handleFormSubmit: PropTypes.func.isRequired,
	inputs: PropTypes.array.isRequired,
}

Form.defaultProps = {
	title: "Form :",
	buttonText: "Go",
}

export default Form;
