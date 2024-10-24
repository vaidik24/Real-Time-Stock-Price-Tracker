import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import HomePage from "./pages/HomePage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/home' element={<HomePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
