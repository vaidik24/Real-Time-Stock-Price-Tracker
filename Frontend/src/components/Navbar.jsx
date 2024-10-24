import React from "react";
import { Home, BookmarkPlus, UserCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onNavigate }) => {
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = React.useState(
		localStorage.getItem("isLoggedIn") === "true"
	);

	const handleAuth = () => {
		if (isLoggedIn) {
			localStorage.removeItem("isLoggedIn");
			setIsLoggedIn(false);
			navigate("/");
		} else {
			onNavigate("profile");
		}
	};

	return (
		<nav className='flex items-center bg-slate-900 text-white px-6 py-4 shadow-lg fixed top-0 left-0 w-full z-50 border-b border-slate-700'>
			<img
				src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAVaE4zstHLlYfTpl5fr4FcUGJ4jvz-6J2wA&s'
				alt='Logo'
				className='w-10 h-10 mr-4'
			/>
			<div className='flex items-center gap-6 ml-auto'>
				<button
					onClick={() => onNavigate("home")}
					className='flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors'
				>
					<Home className='w-5 h-5 mr-2' />
					Home
				</button>

				<button
					onClick={() => onNavigate("watchlist")}
					className='flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors'
				>
					<BookmarkPlus className='w-5 h-5 mr-2' />
					Watchlist
				</button>

				<button
					onClick={handleAuth}
					className='flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors bg-red-800'
				>
					{isLoggedIn ? (
						<>
							<LogOut className='w-5 h-5 mr-2' />
							Logout
						</>
					) : (
						<>
							<UserCircle className='w-5 h-5 mr-2' />
							Login
						</>
					)}
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
