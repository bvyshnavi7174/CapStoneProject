const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const dbConfig = require('./config/db.config');
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB:', err));

// Routes
// Add this line to your existing server.js
app.use('/api/books', require('./routes/book.routes'));

app.use('/api/users', require('./routes/user.routes'));

app.use('/api/cart', require('./routes/cart.routes'));



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
