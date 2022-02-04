import './App.css';

function mockAPIcall() {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ title: 'React POST Request Example' }),
	};
	fetch('https://reqres.in/api/posts', requestOptions);

  
}

function App() {
	return (
		<div className="Project-header">
			<input
				type="email"
				class="form-control"
				id="exampleInputEmail1"
				aria-describedby="emailHelp"
				placeholder="Enter email"
			/>
			<input
				type="password"
				class="form-control"
				id="exampleInputPassword1"
				placeholder="Password"
			/>
			<br />
			<button type="button" class="btn btn-primary" onClick={mockAPIcall()}>
				Login
			</button>
		</div>
	);
}

export default App;
