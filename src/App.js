import { useState } from 'react';
import { questions } from './data';

import './App.css';

function App() {
	const [apiCallFailed, setApiCallFailed] = useState(false);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title: 'React POST Request Example' }),
			};
			let resp = await fetch('https://reqres.in/api/posts', requestOptions);
			if (resp.ok) {
				resp = await resp.json();
				setFormSubmitted(true);
			} else {
				setApiCallFailed(true);
			}
			console.log('respp==>>', resp);
		} catch (err) {
			console.log('an eerr occured==>>', err);
		}
	};

  const handleOptionSelect = () => {

  }

	const currentQuestion = questions[currentQuestionIndex];

	return (
		<div className="Project-header">
			{formSubmitted ? (
				currentQuestion && (
					<div>
						<p>Question: {currentQuestion.question} =</p>
						<h1>Answers:</h1>
						{currentQuestion.options.map((option, i) => (
							<div>
								<input type="radio" onChange={handleOptionSelect} value={option} name={`question${i}`} />{' '}
								{option}
							</div>
						))}
					</div>
				)
			) : (
				<div>
					<form onSubmit={handleFormSubmit}>
						<input
							type="email"
							className="form-control"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
							placeholder="Enter email"
						/>
						<input
							type="password"
							className="form-control"
							id="exampleInputPassword1"
							placeholder="Password"
						/>
						<br />
						<button className="btn btn-primary">Login</button>
					</form>
				</div>
			)}

			{apiCallFailed && <h1>API call failed!</h1>}
		</div>
	);
}

export default App;
