const express = require('express');
const cors = require('cors');
const pricingRoutes = require('./routes/pricingRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', pricingRoutes);

const PORT = process.env.PORT || 5001;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
