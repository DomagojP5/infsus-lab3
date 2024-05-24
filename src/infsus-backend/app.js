const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const zastupnikRoutes = require('./routes/zastupnikRoutes');
const izbornaJedinicaRoutes = require('./routes/izbornaJedinicaRoutes');
const politickaStrankaRoutes = require('./routes/politickaStrankaRoutes');

const sequelize = require('./config/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/zastupnik', zastupnikRoutes);
app.use('/api/izbornaJedinica', izbornaJedinicaRoutes);
app.use('/api/politickaStranka', politickaStrankaRoutes);

const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})