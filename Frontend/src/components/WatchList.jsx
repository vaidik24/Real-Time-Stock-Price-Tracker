import React, { useState } from "react";
import axios from "axios";

const WatchList = ({ watchlist, onRemoveFromWatchlist }) => {
	const [alertDetails, setAlertDetails] = useState({});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState({});
	const [successMessage, setSuccessMessage] = useState({});

	const validateAlertData = (stockSymbol, alertData) => {
		const newErrors = {};

		if (!alertData?.targetPrice) {
			newErrors.targetPrice = "Target price is required";
		} else if (
			isNaN(alertData.targetPrice) ||
			alertData.targetPrice <= 0
		) {
			newErrors.targetPrice =
				"Please enter a valid positive number";
		}

		if (!alertData?.condition) {
			newErrors.condition = "Condition is required";
		}

		setErrors((prev) => ({
			...prev,
			[stockSymbol]: newErrors,
		}));

		return Object.keys(newErrors).length === 0;
	};

	const handleInputChange = (stockSymbol, field, value) => {
		// Clear errors when user starts typing
		setErrors((prev) => ({
			...prev,
			[stockSymbol]: {
				...prev[stockSymbol],
				[field]: null,
			},
		}));

		setAlertDetails((prev) => ({
			...prev,
			[stockSymbol]: {
				...prev[stockSymbol],
				[field]: value,
			},
		}));
	};

	const handleCreateAlert = async (stockSymbol) => {
		const alertData = alertDetails[stockSymbol];

		if (!validateAlertData(stockSymbol, alertData)) {
			return;
		}

		setLoading((prev) => ({ ...prev, [stockSymbol]: true }));

		try {
			await axios.post("http://localhost:8000/alert/create", {
				symbol: stockSymbol,
				targetPrice: parseFloat(alertData.targetPrice),
				condition: alertData.condition,
			});

			setAlertDetails((prev) => ({
				...prev,
				[stockSymbol]: {
					targetPrice: "",
					condition: "",
				},
			}));

			// Show success message
			setSuccessMessage((prev) => ({
				...prev,
				[stockSymbol]: "Alert created successfully!",
			}));

			// Clear success message after 3 seconds
			setTimeout(() => {
				setSuccessMessage((prev) => ({
					...prev,
					[stockSymbol]: null,
				}));
			}, 3000);
		} catch (error) {
			console.error("Error creating alert:", error);

			if (error.response) {
				const errorMessage =
					error.response.data?.message ||
					"Successfully created the alert.";
				setErrors((prev) => ({
					...prev,
					[stockSymbol]: { api: errorMessage },
				}));
			} else if (error.request) {
				setErrors((prev) => ({
					...prev,
					[stockSymbol]: {
						api: "Network error. Please check your connection.",
					},
				}));
			} else {
				setErrors((prev) => ({
					...prev,
					[stockSymbol]: {
						api: "An unexpected error occurred.",
					},
				}));
			}
		} finally {
			setLoading((prev) => ({
				...prev,
				[stockSymbol]: false,
			}));
		}
	};

	return (
		<div className='container mx-auto px-4 py-8'>
			<h2 className='text-2xl font-bold mb-6 text-white'>
				Your Watchlist
			</h2>
			<div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
				{watchlist.map((stock) => (
					<div
						key={stock.symbol}
						className='bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-700'
					>
						<h3 className='text-xl font-semibold text-white'>
							{stock.name}
						</h3>
						<p className='text-slate-300'>
							Symbol: {stock.symbol}
						</p>
						<p className='text-slate-300'>
							Current Price: $
							{stock.currentPrice}
						</p>

						<div className='mt-4 space-y-4'>
							<div>
								<label className='block text-sm mb-2 text-slate-300'>
									Alert
									Price:
								</label>
								<input
									type='number'
									className='w-full p-2 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
									value={
										alertDetails[
											stock
												.symbol
										]
											?.targetPrice ||
										""
									}
									onChange={(
										e
									) =>
										handleInputChange(
											stock.symbol,
											"targetPrice",
											e
												.target
												.value
										)
									}
									placeholder='Set alert price'
								/>
								{errors[
									stock
										.symbol
								]
									?.targetPrice && (
									<p className='text-green-500 text-sm mt-1'>
										{
											errors[
												stock
													.symbol
											]
												?.targetPrice
										}
									</p>
								)}
							</div>

							<div>
								<label className='block text-sm mb-2 text-slate-300'>
									Condition:
								</label>
								<select
									className='w-full p-2 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
									value={
										alertDetails[
											stock
												.symbol
										]
											?.condition ||
										""
									}
									onChange={(
										e
									) =>
										handleInputChange(
											stock.symbol,
											"condition",
											e
												.target
												.value
										)
									}
								>
									<option value=''>
										Select
										Condition
									</option>
									<option value='ABOVE'>
										Above
									</option>
									<option value='BELOW'>
										Below
									</option>
								</select>
								{errors[
									stock
										.symbol
								]
									?.condition && (
									<p className='text-green-500 text-sm mt-1'>
										{
											errors[
												stock
													.symbol
											]
												?.condition
										}
									</p>
								)}
							</div>

							{errors[stock.symbol]
								?.api && (
								<p className='text-green-500 text-sm'>
									{
										errors[
											stock
												.symbol
										]
											?.api
									}
								</p>
							)}

							{successMessage[
								stock.symbol
							] && (
								<p className='text-green-500 text-sm'>
									{
										successMessage[
											stock
												.symbol
										]
									}
								</p>
							)}

							<button
								className={`w-full p-2 rounded transition-colors ${
									loading[
										stock
											.symbol
									]
										? "bg-green-700 cursor-not-allowed"
										: "bg-green-600 hover:bg-green-700"
								}`}
								onClick={() =>
									handleCreateAlert(
										stock.symbol
									)
								}
								disabled={
									loading[
										stock
											.symbol
									]
								}
							>
								{loading[
									stock
										.symbol
								]
									? "Creating..."
									: "Set Alert"}
							</button>

							<button
								className='w-full p-2 bg-red-600 hover:bg-red-700 rounded transition-colors'
								onClick={() =>
									onRemoveFromWatchlist(
										stock
									)
								}
							>
								Remove from
								Watchlist
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default WatchList;
