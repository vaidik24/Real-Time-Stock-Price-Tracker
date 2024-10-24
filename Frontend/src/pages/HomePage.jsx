import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import WatchList from "../components/WatchList";
import axios from "axios";

const HomePage = () => {
	const [currentPage, setCurrentPage] = useState("home");
	const [watchlist, setWatchlist] = useState([]);
	const [stocks, setStocks] = useState([]);

	const fetchStocks = async () => {
		try {
			const response = await axios.get(
				"http://localhost:8000/stocks"
			);
			setStocks(response.data.stocks);
			updateWatchlistPrices(response.data.stocks);
		} catch (error) {
			console.error("Error fetching stocks:", error);
		}
	};

	const updateWatchlistPrices = (fetchedStocks) => {
		setWatchlist((prevWatchlist) =>
			prevWatchlist.map((watchlistStock) => {
				const updatedStock = fetchedStocks.find(
					(stock) =>
						stock.symbol ===
						watchlistStock.symbol
				);
				return updatedStock
					? {
							...watchlistStock,
							lastPrice: updatedStock.lastPrice,
					  }
					: watchlistStock;
			})
		);
	};

	useEffect(() => {
		fetchStocks();

		const interval = setInterval(() => {
			fetchStocks();
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	const handleAddToWatchlist = (stock) => {
		if (watchlist.some((item) => item.symbol === stock.symbol)) {
			setWatchlist((prevWatchlist) =>
				prevWatchlist.filter(
					(item) => item.symbol !== stock.symbol
				)
			);
		} else {
			setWatchlist((prevWatchlist) => [
				...prevWatchlist,
				stock,
			]);
		}
	};

	return (
		<div className='min-h-screen bg-slate-900 text-white'>
			<Navbar onNavigate={setCurrentPage} />

			<main className='pt-20'>
				{currentPage === "home" && (
					<Hero
						stocks={stocks}
						watchlist={watchlist}
						onAddToWatchlist={
							handleAddToWatchlist
						}
					/>
				)}

				{currentPage === "watchlist" && (
					<WatchList
						watchlist={watchlist}
						onRemoveFromWatchlist={
							handleAddToWatchlist
						}
					/>
				)}

				{currentPage === "profile" && (
					<div className='container mx-auto px-4 py-8'>
						<h2 className='text-2xl font-bold mb-6'>
							Profile
						</h2>
						<div className='bg-slate-800 border border-slate-700 rounded-lg p-6'>
							<p className='text-slate-400'>
								Profile content
								would go here...
							</p>
						</div>
					</div>
				)}
			</main>
		</div>
	);
};

export default HomePage;
