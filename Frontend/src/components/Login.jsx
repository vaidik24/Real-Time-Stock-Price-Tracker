import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		localStorage.setItem("isLoggedIn", "true");
		navigate("/home");
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-slate-900'>
			<div className='bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-slate-700'>
				<h1 className='text-2xl font-bold text-center mb-6 text-white'>
					Login
				</h1>

				<form
					onSubmit={handleSubmit}
					className='space-y-6'
				>
					<div className='space-y-2'>
						<label
							htmlFor='email'
							className='block text-sm font-medium text-slate-200'
						>
							Email
						</label>
						<input
							id='email'
							type='email'
							value={email}
							onChange={(e) =>
								setEmail(
									e.target
										.value
								)
							}
							placeholder='Enter your email'
							required
							className='w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md 
                       text-white placeholder-slate-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500'
						/>
					</div>

					<div className='space-y-2'>
						<label
							htmlFor='password'
							className='block text-sm font-medium text-slate-200'
						>
							Password
						</label>
						<input
							id='password'
							type='password'
							value={password}
							onChange={(e) =>
								setPassword(
									e.target
										.value
								)
							}
							placeholder='Enter your password'
							required
							className='w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md 
                       text-white placeholder-slate-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500'
						/>
					</div>

					<button
						type='submit'
						className='w-full bg-blue-600 text-white py-2 px-4 rounded-md 
                     hover:bg-blue-700 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2 
                     transition duration-200
                     focus:ring-offset-slate-800'
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
