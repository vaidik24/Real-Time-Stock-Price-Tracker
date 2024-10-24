import React from "react";
import StockCard from "./StockCard";

const Hero = ({ stocks, watchlist, onAddToWatchlist }) => {
	return (
		<div className='container mx-auto px-4'>
			<h1 className='text-3xl font-bold mb-4'>
				Featured Stocks
			</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
				{stocks.map((stock) => (
					<StockCard
						key={stock.symbol}
						stock={stock}
						onAddToWatchlist={
							onAddToWatchlist
						}
						inWatchlist={watchlist.some(
							(item) =>
								item.symbol ===
								stock.symbol
						)}
					/>
				))}
			</div>
		</div>
	);
};

export default Hero;
