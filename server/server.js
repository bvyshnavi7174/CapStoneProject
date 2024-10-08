const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const dbConfig = require('./config/db.config');
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB:', err));


app.use('/api/books', require('./routes/book.routes'));
app.use('/api/users', require('./routes/user.routes'));
const orderRoutes = require('./routes/order.routes'); 


app.use('/api/order', orderRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
