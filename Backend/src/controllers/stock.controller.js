let stockData = [
    {
        fullName: "Apple Inc.",
        image: "https://i.pinimg.com/736x/f3/b7/94/f3b79487cfff3bc75ffac37178523e7c.jpg",
        lastPrice: 230.98,
        symbol: "AAPL",
        timestamp: "24/10/2024, 6:16:08 pm",
        tradeConditions: "Regular Sale, Unknown(24), Rule 611 Exempt",
        volume: 10000
    },
    {
        fullName: "Alphabet Inc.",
        image: "https://media.wired.com/photos/5926ffe47034dc5f91bed4e8/master/pass/google-logo.jpg",
        lastPrice: 2901.88,
        symbol: "GOOGL",
        timestamp: "24/10/2024, 6:16:08 pm",
        tradeConditions: "Regular Sale, Rule 611 Exempt",
        volume: 8000
    },
    {
        fullName: "Amazon.com Inc.",
        image: "https://www.shutterstock.com/shutterstock/photos/2270561027/display_1500/stock-vector-amazon-logo-icon-logo-sign-art-design-symbol-famous-industry-jeff-bezos-corporate-text-isolated-2270561027.jpg",
        lastPrice: 3299.95,
        symbol: "AMZN",
        timestamp: "24/10/2024, 6:16:08 pm",
        tradeConditions: "Regular Sale, Rule 611 Exempt",
        volume: 12000
    },
    {
        fullName: "Microsoft Corporation",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
        lastPrice: 415.75,
        symbol: "MSFT",
        timestamp: "24/10/2024, 6:16:08 pm",
        tradeConditions: "Regular Sale",
        volume: 15000
    },
    {
        fullName: "NVIDIA Corporation",
        image: "https://s3.amazonaws.com/cms.ipressroom.com/219/files/20149/544a0d86f6091d6699000060_NVLogo_2D/NVLogo_2D_362acb00-8e1b-476b-9662-9fe138a4a920-prv.jpg",
        lastPrice: 875.32,
        symbol: "NVDA",
        timestamp: "24/10/2024, 6:16:08 pm",
        tradeConditions: "Regular Sale",
        volume: 9500
    },
    {
        fullName: "Meta Platforms Inc.",
        image: "https://cdn.pixabay.com/photo/2021/12/14/22/29/meta-6871457_1280.png",
        lastPrice: 485.65,
        symbol: "META",
        timestamp: "24/10/2024, 6:16:08 pm",
        tradeConditions: "Regular Sale",
        volume: 11000
    },
    {
        fullName: "Tesla, Inc.",
        image: "https://www.logo.wine/a/logo/Tesla%2C_Inc./Tesla%2C_Inc.-Logo.wine.svg",
        lastPrice: 245.20,
        symbol: "TSLA",
        timestamp: "24/10/2024, 6:16:08 pm",
        tradeConditions: "Regular Sale",
        volume: 13500
    },
    {
        fullName: "JPMorgan Chase & Co.",
        image: "https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_2/xcmxfdnrjp3ra61swsxe",
        lastPrice: 178.45,
        symbol: "JPM",
        timestamp: "24/10/2024, 6:16:08 pm",
        tradeConditions: "Regular Sale",
        volume: 7800
    },
    {
        fullName: "Netflix, Inc.",
        image: "",
        lastPrice: 625.88,
        symbol: "NFLX",
        timestamp: "24/10/2024, 6:16:08 pm",
        tradeConditions: "Regular Sale",
        volume: 6200
    },
    {
        fullName: "The Walt Disney Company",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Disney_wordmark.svg/1050px-Disney_wordmark.svg.png",
        lastPrice: 98.75,
        symbol: "DIS",
        timestamp: "24/10/2024, 6:16:08 pm",
        tradeConditions: "Regular Sale",
        volume: 8900
    },
    {
        fullName: "The Coca-Cola Company",
        image: "https://i.pinimg.com/originals/1e/c1/d2/1ec1d2ce366d1f603b1bde70ae508063.png",
        lastPrice: 59.32,
        symbol: "KO",
        timestamp: "24/10/2024, 6:16:08 pm",
        tradeConditions: "Regular Sale",
        volume: 5500
    },
    {
        fullName: "Intel Corporation",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/1200px-Intel_logo_%282006-2020%29.svg.png",
        lastPrice: 43.65,
        symbol: "INTC",
        timestamp: "24/10/2024, 6:16:08 pm",
        tradeConditions: "Regular Sale",
        volume: 9200
    },
    {
        fullName: "Advanced Micro Devices, Inc.",
        image: "https://w7.pngwing.com/pngs/790/800/png-transparent-amd-logo.png",
        lastPrice: 168.92,
        symbol: "AMD",
        timestamp: "24/10/2024, 6:16:08 pm",
        tradeConditions: "Regular Sale",
        volume: 10500
    },
    {
        fullName: "PayPal Holdings, Inc.",
        image: "https://cdn.pixabay.com/photo/2018/05/08/21/29/paypal-3384015_1280.png",
        lastPrice: 62.45,
        symbol: "PYPL",
        timestamp: "24/10/2024, 6:16:08 pm",
        tradeConditions: "Regular Sale",
        volume: 7100
    },
    {
        fullName: "Bank of America Corporation",
        image: "https://logos-world.net/wp-content/uploads/2020/11/Bank-of-America-Logo.png",
        lastPrice: 33.88,
        symbol: "BAC",
        timestamp: "24/10/2024, 6:16:08 pm",
        tradeConditions: "Regular Sale",
        volume: 8300
    },
    {
        fullName: "Adobe Inc.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Logo.png/1200px-Adobe_Corporate_Logo.png",
        lastPrice: 528.95,
        symbol: "ADBE",
        timestamp: "24/10/2024, 6:16:08 pm",
        tradeConditions: "Regular Sale",
        volume: 4800
    },
    {
        fullName: "Salesforce, Inc.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/1024px-Salesforce.com_logo.svg.png",
        lastPrice: 272.65,
        symbol: "CRM",
        timestamp: "24/10/2024, 6:16:08 pm",
        tradeConditions: "Regular Sale",
        volume: 6700
    },
    {
        fullName: "McDonald's Corporation",
        image: "https://logos-world.net/wp-content/uploads/2020/04/McDonalds-Logo.png",
        lastPrice: 267.82,
        symbol: "MCD",
        timestamp: "24/10/2024, 6:16:08 pm",
        tradeConditions: "Regular Sale",
        volume: 5200
    },
    {
        fullName: "Visa Inc.",
        image: "https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png",
        lastPrice: 245.75,
        symbol: "V",
        timestamp: "24/10/2024, 6:16:08 pm",
        tradeConditions: "Regular Sale",
        volume: 7600
    },
    {
        fullName: "Mastercard Incorporated",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/2560px-Mastercard-logo.svg.png",
        lastPrice: 401.32,
        symbol: "MA",
        timestamp: "24/10/2024, 6:16:08 pm",
        tradeConditions: "Regular Sale",
        volume: 6900
    },
    {
        fullName: "Oracle Corporation",
        image: "https://logos-world.net/wp-content/uploads/2020/09/Oracle-Logo.png",
        lastPrice: 112.45,
        symbol: "ORCL",
        timestamp: "24/10/2024, 6:16:08 pm",
        tradeConditions: "Regular Sale",
        volume: 5800
    },
    {
        fullName: "Cisco Systems, Inc.",
        image: "https://1000logos.net/wp-content/uploads/2016/11/Cisco-logo.png",
        lastPrice: 54.92,
        symbol: "CSCO",
        timestamp: "24/10/2024, 6:16:08 pm",
        tradeConditions: "Regular Sale",
        volume: 8400
    },
    {
        fullName: "Walmart Inc.",
        image: "https://1000logos.net/wp-content/uploads/2017/05/Walmart-Logo.png",
        lastPrice: 164.88,
        symbol: "WMT",
        timestamp: "24/10/2024, 6:16:08 pm",
        tradeConditions: "Regular Sale",
        volume: 7300
    }
];

const updateStockPrices = () => {
    stockData = stockData.map(stock => {
        const priceChange = (Math.random() * 0.1 - 0.05).toFixed(3);
        const newPrice = Math.max(1, (parseFloat(stock.lastPrice) + parseFloat(priceChange)).toFixed(3));
        return {
            ...stock,
            lastPrice: newPrice,
            timestamp: new Date().toLocaleString(),
        };
    });
};

setInterval(updateStockPrices, 1000);

const fetchStaticStocks = (req, res) => {
    try {
        res.status(200).json({
            message: 'Successfully fetched static stock data',
            stocks: stockData,
        });
    } catch (error) {
        console.error('Error fetching static stock data:', error);
        res.status(500).json({ error: 'Failed to fetch static stock data' });
    }
};


const setupWebSocket = (server) => {
    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log('New client connected');

        const intervalId = setInterval(() => {
            socket.emit('stockUpdate', stockData);
        }, 5000);

        socket.on('disconnect', () => {
            console.log('Client disconnected');
            clearInterval(intervalId);
        });
    });
};

export { fetchStaticStocks, setupWebSocket };