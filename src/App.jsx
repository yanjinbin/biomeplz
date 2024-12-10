import { useState } from "react";
import "@/App.css";
import ids from "virtual:svg-icons-names";

function App() {
	const [_count, _setCount] = useState(0);

	return (
		<div>
			<h1>List of todos</h1>
			{console.table(ids)}
		</div>
	);

	/*return (
		<>
			<h1>Vite + React</h1>
			<div className="card">
				<button
					type={"button"}
					onClick={() => {
						setCount((count) => count + 1);
						console.log("===>\t", ids);
					}}
				>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.jsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);*/
}

export default App;
