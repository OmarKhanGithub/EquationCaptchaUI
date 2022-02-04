import { useState } from 'react';
import { questions } from './data';

import './App.css';

function App() {
	const [apiCallFailed, setApiCallFailed] = useState(false);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState({});

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

	const currentQuestion = questions[currentQuestionIndex];

	const handleOptionSelect = async (e) => {
		const { value } = e.target;
		setSelectedAnswers((prevState) => ({
			...prevState,
			[currentQuestionIndex]: value,
		}));
		const { answerIndex, options } = currentQuestion;
		try {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					question: currentQuestion,
					selectedAnswer: value,
				}),
			};
			let resp = await fetch('http://localhost:3001/answers', requestOptions);
			resp = await resp.json();
			if (options[answerIndex] == value) {
				alert('Correct Answer!!!');
			} else {
				alert('Wrong Answer, try again!!!');
				setCurrentQuestionIndex((currentIndex) => currentIndex + 1);
				setSelectedAnswers({});
			}
			console.log('respp2==>>', resp);
		} catch (err) {
			console.log('an error occured', err);
		}
	};

	return (
		<div className="Project-header">
			{formSubmitted ? (
				currentQuestion ? (
					<div>
						<p>Question: {currentQuestion.question} =</p>
						<h1>Answers:</h1>
						{currentQuestion.options.map((option, i) => (
							<div>
								<input
									type="radio"
									onChange={handleOptionSelect}
									value={option}
									name={`question${i}`}
									checked={selectedAnswers[i] === option}
								/>{' '}
								{option}
							</div>
						))}
					</div>
				) : (
					<h1>You have exceeded maximum limit of attempts</h1>
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
