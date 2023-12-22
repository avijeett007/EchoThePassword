require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

const passportSetup = require('./config/passport-setup');
const passport = require('passport');
const session = require('express-session');

app.use(session({
    secret: 'd6698bf2510005a46b933f9caae0234ae4628ea0ab4ebffa56dd40600778cd8ace974b6609745a076b427c8af1f56be5c0388d5910a9a4ad8529f91aa82cb4ef' || 'SESSION_COOKIE_KEY',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passwordRoutes = require('./routes/password-routes');

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/password', passwordRoutes);

const twoFactorAuthRoutes = require('./routes/twoFactorAuthRoutes');
app.use('/2fa', twoFactorAuthRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
