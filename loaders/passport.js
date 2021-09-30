const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const createError = require('http-errors');
const pool = require('../db');

module.exports = (app) => {

  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Method to serialize cookie to the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Method to deserialize cookie from the session
  passport.deserializeUser((id, done) => {
    done(null, { id });
  });
  

  // Set up local strategy
    passport.use(new LocalStrategy({usernameField: 'email'},
      async (email, password, done) => {
        try {
          let user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

          // Return user object if exists, set as null if it doesn't
          if(user.rows.length){
            user = user.rows[0];
          } else {
            user = null;
          }

          // Create error if no user
          if(!user){
            throw createError(401, 'Incorrect username or password');
          }

          // Check password against the user
          if(user.password !== password) {
            throw createError(401, 'Incorrect username or password');
          }

          return done(null, user);
        } catch(err) {
          return done(err);
        }
      }
    ));

    return passport;
}