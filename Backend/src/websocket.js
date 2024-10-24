import WebSocket from 'ws';
import { Watchlist } from './models/watchlist.model.js';

const MAX_RETRIES = 100;
const RECONNECT_DELAY = 10000;

const startWebSocket = async (userId) => {
  const socket = createWebSocket(userId);
  let retries = 0;

  socket.addEventListener('open', () => {
    console.log('WebSocket is connected.');
    subscribeToStocks(socket, userId);
  });

  socket.addEventListener('close', () => {
    console.log('WebSocket connection closed.');
    if (retries < MAX_RETRIES) {
      setTimeout(() => {
        console.log('Attempting to reconnect...');
        retries++;
        startWebSocket(userId); // Reconnect
      }, RECONNECT_DELAY);
    } else {
      console.error('Max reconnection attempts reached.');
    }
  });

  socket.addEventListener('error', (error) => {
    console.error('WebSocket encountered an error:', error.message);
  });

  socket.addEventListener('message', (event) => {
    console.log('Received message from server.');
    handleMessage(event.data);
  });
};

const createWebSocket = (userId) => {
  return new WebSocket('wss://ws.finnhub.io?token=csd2tehr01qpohrscjngcsd2tehr01qpohrscjo0');
};

const subscribeToStocks = async (socket, userId) => {
  const stocks = await fetchWatchlistStocks(userId);
  stocks.forEach(stock => {
    socket.send(JSON.stringify({ type: 'subscribe', symbol: stock.symbol }));
    console.log(`Subscribed to: ${stock.symbol}`);
  });
};

const handleMessage = (data) => {
  const parsedData = JSON.parse(data);
  if (parsedData.data) {
    parsedData.data.forEach(item => {
      const tradeData = {
        Symbol: item.s,
        Price: item.p,
        Timestamp: new Date(item.t).toLocaleString(),
        Volume: item.v,
        Conditions: getConditionDescriptions(item.c)
      };
      console.log('Trade update:', tradeData);
      // Save tradeData to the database if needed
    });
  }
};

// Fetch watchlist stocks based on userId
async function fetchWatchlistStocks(userId) {
  try {
    const watchlist = await Watchlist.findOne({ user: userId }).populate('stocks');
    return watchlist ? watchlist.stocks : [];
  } catch (error) {
    console.error('Error fetching watchlist stocks:', error);
    return [];
  }
}

export { startWebSocket };
