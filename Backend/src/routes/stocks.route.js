// stockRoutes.js
import express from 'express';
import { fetchStaticStocks } from '../controllers/stock.controller.js'; // Adjust path accordingly

const stockRoutes = express.Router();

// Route to get static stock data
stockRoutes.get('/', fetchStaticStocks);

export { stockRoutes };
