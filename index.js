const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const routes = require('./routes/index');
const { handleResponse } = require('./helpers/responseHelper');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.all('*', (req, res) => {
  return handleResponse(res, 404, { message: 'API Not Found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
