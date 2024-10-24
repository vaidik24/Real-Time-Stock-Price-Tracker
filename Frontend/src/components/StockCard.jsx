import React from "react";
import { Plus, Trash2 } from "lucide-react";

const StockCard = ({ stock, onAddToWatchlist, inWatchlist }) => {
	return (
		<div className='bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:bg-slate-750 transition-all duration-200'>
			<div className='p-4'>
				<div className='relative h-48 rounded-lg overflow-hidden mb-4 bg-slate-700'>
					<img
						alt={stock.fullName}
						className='object-cover object-center w-full h-full'
						src={stock.image}
					/>
				</div>
				<div className='space-y-2'>
					<p className='text-slate-400 text-xs tracking-wider uppercase'>
						{stock.category}
					</p>
					<div className='flex justify-between items-center'>
						<h3 className='text-white font-medium'>
							{stock.fullName}
						</h3>
						<span className='text-green-400 font-semibold'>
							$
							{stock.lastPrice?.toFixed(
								3
							)}
						</span>
					</div>
					<button
						onClick={() =>
							onAddToWatchlist(stock)
						}
						className={`w-full mt-2 flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
							inWatchlist
								? "bg-red-500 hover:bg-red-600 text-white"
								: "bg-slate-700 hover:bg-slate-600 text-white"
						}`}
					>
						{inWatchlist ? (
							<>
								<Trash2 className='w-4 h-4 mr-2' />
								Remove
							</>
						) : (
							<>
								<Plus className='w-4 h-4 mr-2' />
								Add to Watchlist
							</>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default StockCard;
