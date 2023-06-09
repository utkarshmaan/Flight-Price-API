const express = require('express');
const cors = require('cors');

const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());

// Flight prices data
const flightPrices = {
  Delhi: {
        Jaipur: {
          indigo: '₹1614',
          airAsia: '₹1869',
          vistara: '₹2133',
        },
        Mumbai: {
          indigo: '₹2987',
          airAsia: '₹2578',
          vistara: '₹2854',
        },
        Kolkata: {
            indigo: '₹3987',
            airAsia: '₹3578',
            vistara: '₹3654',
          },
        // ...
      },
      Mumbai: {
        Delhi: {
          indigo: '₹2765',
          airAsia: '₹2378',
          vistara: '₹2654',
        },
        Kolkata: {
          indigo: '₹3254',
          airAsia: '₹2865',
          vistara: '₹3154',
        },
        Jaipur: {
            indigo: '₹2614',
            airAsia: '₹2869',
            vistara: '₹2133',
          },
        
      },
      Jaipur: {
        Delhi: {
          indigo: '₹614',
          airAsia: '₹869',
          vistara: '₹933',
        },
        Mumbai: {
          indigo: '₹987',
          airAsia: '₹578',
          vistara: '₹854',
        },
        Kolkata: {
            indigo: '₹4987',
            airAsia: '₹4578',
            vistara: '₹4654',
          },
      },
    };
app.get('/flight-prices', (req, res) => {
  const { source, destination } = req.query;

  if (!source || !destination) {
    return res.status(400).json({ error: 'Missing source or destination' });
  }

  const sourcePrices = flightPrices[source];

  if (!sourcePrices || !sourcePrices[destination]) {
    return res.status(404).json({ error: 'Flight prices not found' });
  }

  const prices = sourcePrices[destination];

  res.json(prices);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

