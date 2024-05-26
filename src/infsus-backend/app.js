const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const zastupnikRoutes = require('./routes/zastupnikRoutes');
const izbornaJedinicaRoutes = require('./routes/izbornaJedinicaRoutes');
const politickaStrankaRoutes = require('./routes/politickaStrankaRoutes');
const vrstaPolitickaStrankaRoutes = require('./routes/vrstaPolitickeStrankeRoutes');

const sequelize = require('./config/testdb');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/zastupnici', zastupnikRoutes);
app.use('/api/izborneJedinice', izbornaJedinicaRoutes);
app.use('/api/politickeStranke', politickaStrankaRoutes);
app.use('/api/vrstaPolitickeStranke', vrstaPolitickaStrankaRoutes);

const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})

module.exports = app;