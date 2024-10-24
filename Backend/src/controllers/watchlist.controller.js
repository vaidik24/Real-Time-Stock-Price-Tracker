import { Watchlist } from "../models/watchlist.model.js";
import { ApiError } from "../utils/apiError.util.js";
import { ApiResponse } from "../utils/apiResponse.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";

const getWatchlist = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(404, "User not found");
  }

  const watchlist = await Watchlist.findOne({ user: userId }).populate("stocks");
  if (!watchlist) {
    throw new ApiError(404, "Watchlist not found");
  }

  res.status(200).json(
    new ApiResponse(200, watchlist, "Watchlist has been fetched successfully")
  );
});

const addStock = asyncHandler(async (req, res) => {
  const { stocks } = req.body;
  const userId = req.user?._id;

  // Validate required fields
  if (!userId) {
    throw new ApiError(401, "Authentication required");
  }
  if (!Array.isArray(stocks) || stocks.length === 0) {
    throw new ApiError(400, "Valid stocks array is required");
  }

  try {
    const watchlist = await Watchlist.findOne({ user: userId });

    // Prepare stocks to add
    const newStocks = stocks.map(stock => ({
      symbol: stock.symbol.toUpperCase(),
      companyName: stock.companyName || "",
      addedAt: new Date(),
    }));

    // Check for duplicates
    const existingSymbols = watchlist?.stocks.map(stock => stock.symbol);
    const stocksToAdd = newStocks.filter(stock => !existingSymbols.includes(stock.symbol));

    if (stocksToAdd.length === 0) {
      throw new ApiError(400, "All stocks already exist in the watchlist");
    }

    // Add new stocks to the user's watchlist
    const updatedWatchlist = await Watchlist.findOneAndUpdate(
      { user: userId },
      { $push: { stocks: { $each: stocksToAdd } } },
      { new: true, upsert: true, runValidators: true }
    ).populate("stocks");

    return res.status(200).json(
      new ApiResponse(
        200,
        updatedWatchlist,
        "Stocks successfully added to watchlist"
      )
    );
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, `Failed to add stocks to watchlist: ${error.message}`);
  }
});

const removeStock = asyncHandler(async (req, res) => {
  const { symbol } = req.body; // Expect stock symbol in the request body
  const userId = req.user?._id;

  // Validate required fields
  if (!userId) {
    throw new ApiError(401, "Authentication required");
  }
  if (!symbol || typeof symbol !== "string") {
    throw new ApiError(400, "Valid stock symbol is required");
  }

  try {
    // Find user's watchlist and remove the stock by symbol
    const updatedWatchlist = await Watchlist.findOneAndUpdate(
      { user: userId },
      {
        $pull: {
          stocks: { symbol: symbol.toUpperCase() },
        },
      },
      {
        new: true,
      }
    ).populate("stocks");

    if (!updatedWatchlist) {
      throw new ApiError(404, "Watchlist not found");
    }

    // Check if the stock was actually removed
    const stockExists = updatedWatchlist.stocks.some(
      (stock) => stock.symbol === symbol.toUpperCase()
    );

    if (stockExists) {
      throw new ApiError(404, "Stock not found in watchlist");
    }

    return res.status(200).json(
      new ApiResponse(200, updatedWatchlist, "Stock successfully removed from watchlist")
    );
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      `Failed to remove stock from watchlist: ${error.message}`
    );
  }
});

const createWatchlist = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Authentication required");
  }

  try {
    const existingWatchlist = await Watchlist.findOne({ user: userId });

    if (existingWatchlist) {
      throw new ApiError(400, "Watchlist already exists for this user");
    }

    const newWatchlist = new Watchlist({
      user: userId,
      stocks: [],
    });

    await newWatchlist.save();

    return res.status(201).json(
      new ApiResponse(201, newWatchlist, "Watchlist successfully created")
    );
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, `Failed to create watchlist: ${error.message}`);
  }
});

const deleteWatchlist = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Authentication required");
  }

  try {
    const deletedWatchlist = await Watchlist.findOneAndDelete({ user: userId });

    if (!deletedWatchlist) {
      throw new ApiError(404, "Watchlist not found");
    }

    return res.status(200).json(new ApiResponse(200, null, "Watchlist successfully deleted"));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, `Failed to delete watchlist: ${error.message}`);
  }
});

export {
  addStock,
  createWatchlist,
  deleteWatchlist,
  getWatchlist,
  removeStock,
};
