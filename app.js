const path = require('path');

const express = require("express");
const csrf = require('csurf');
const expressSession = require('express-session');

const createSessionConfig = require('./config/session');
const db = require('./data/database');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddlware = require('./middlewares/error-handle');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const protectRoutesMiddlware = require('./middlewares/protect-routes');
const cartMiddleware = require('./middlewares/cart');
const authRoutes = require("./routes/auth.routes");
const productsRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.routes');
const cartRoutes = require('./routes/cart.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use('/products/assets', express.static('product-data'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(cartMiddleware);

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use('/cart', cartRoutes);
app.use(protectRoutesMiddlware);
app.use('/admin',adminRoutes);

app.use(errorHandlerMiddlware);

db.connectToDatabase().then(function () {
   app.listen(3000); 
})
.catch(function (error) {
    console.log('Failed to connect to the database!');
    console.log(error);
});

