const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const Joi = require('joi');
const cors = require('cors');
const bodyParser = require('body-parser');
const { validateSignIn, validateSignUp } = require('./middlewares/joiValidation');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://127.0.0.1:27017/GSusers', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));


app.post('/api/register', (req, res, next) => {
    if (req.session.token) {
      console.log("l'utilisateur est déjà connecté");
      return res.sendStatus(403);
    }
  
    next();
  }, validateSignUp, (req, res) => {
    console.log(req.body);
    const newUser = req.body;
    const User = require('./models/users');
    let responseSent = false;
  
    User.findOne({ email: newUser.email })
      .then((existingUser) => {
        if (existingUser) {
          if (responseSent) return;
          responseSent = true;
          return res.sendStatus(409);
        } else {
          const user = new User(newUser);
          return user.save();
        }
      })
      .then(() => {
        if (responseSent) return;
        responseSent = true;
        return res.sendStatus(201);
      })
      .catch((err) => {
        console.log("hey");
        if (responseSent) return;
        responseSent = true;
        console.error(err);
        return res.sendStatus(500);
      })
      .finally(() => {
        return;
      });
  });
  
  app.post('/api/login', (req, res) => {
    if (req.session.token) {
      return res.sendStatus(403);
    }
  
    const { email, password } = req.body;
    const User = require('./models/users');
    User.findOne({ email, password })
      .then((user) => {
        console.log(user);
        if (user) {
          const token = generateToken(user);
          req.session.token = token;
          res.json({ token, userId: user._id  });
        } else {
          res.sendStatus(401);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  });
  
  app.post('/api/logout', (req, res) => {
    const token = req.header('Authorization');
    if (token) {
      const tokenValue = token.replace('Bearer ', '');
      jwt.verify(tokenValue, 'secret-key', (err, decoded) => {
        if (err) {
          console.log("Le token n'est pas valide");
          return res.sendStatus(401);
        } else {
          console.log("Le token est valide");
  
          req.session.destroy((error) => {
            if (error) {
              console.error(error);
              return res.sendStatus(500);
            } else {
              return res.sendStatus(200);
            }
          });
        }
      });
    } else {
      console.log("Il n'y a pas de token");
      return res.sendStatus(401);
    }
  });

  function generateToken(user) {
    const token = jwt.sign({ username: user.username }, 'secret-key');
    return token;
  }
  
  app.post('/api/checkToken', (req, res) => {
    const token = req.header('Authorization');
  
    if (token) {
      const tokenValue = token.replace('Bearer ', '');
  
      jwt.verify(tokenValue, 'secret-key', (err, decoded) => {
        if (err) {
          console.log("Le token n'est pas valide");
          res.json({ tokenValid: false });
        } else {
          console.log("Le token est valide");
          res.json({ tokenValid: true });
        }
      });
    } else {
      console.log("Il n'y a pas de token");
      res.json({ tokenValid: false });
    }
  });

  app.post('/api/update-user', (req, res) => {
    const token = req.header('Authorization');
    if (token) {
      const tokenValue = token.replace('Bearer ', '');
      jwt.verify(tokenValue, 'secret-key', (err, decoded) => {
        if (err) {
          console.log("Le token n'est pas valide");
          return res.sendStatus(401);
        } else {
          console.log("Le token est valide");
  
          const newFirstName = req.body.newFName;
          const newLastName = req.body.newLName;
          const newEmail = req.body.newEmail;
          const userId = req.body.userId;
  
          const User = require('./models/users');
          User.findByIdAndUpdate(userId, { firstName: newFirstName, lastName: newLastName, email: newEmail }, { new: true })
            .then((user) => {
              if (user) {
                const updatedToken = generateToken(user);
                req.session.token = updatedToken;
                res.json({ token: updatedToken });
              } else {
                res.sendStatus(404);
              }
            })
            .catch((err) => {
              console.error(err);
              res.sendStatus(500);
            });
        }
      });
    } else {
      console.log("Il n'y a pas de token");
      return res.sendStatus(401);
    }
  });
  
  
  app.post('/api/update-password', (req, res) => {
    const token = req.header('Authorization');
    if (token) {
      const tokenValue = token.replace('Bearer ', '');
      jwt.verify(tokenValue, 'secret-key', (err, decoded) => {
        if (err) {
          console.log("Le token n'est pas valide");
          return res.sendStatus(401);
        } else {
          console.log("Le token est valide");
  
          const newPassword = req.body.newPassword;
          const userId = req.body.userId;
  
          const User = require('./models/users');
          User.findByIdAndUpdate(userId, { password: newPassword }, { new: true })
            .then((user) => {
              if (user) {
                const updatedToken = generateToken(user);
                req.session.token = updatedToken;
                res.json({ token: updatedToken });
              } else {
                res.sendStatus(404);
              }
            })
            .catch((err) => {
              console.error(err);
              res.sendStatus(500);
            });
        }
      });
    } else {
      console.log("Il n'y a pas de token");
      return res.sendStatus(401);
    }
  });
  
  app.post('/api/me', (req, res) => {
    console.log("hey");
    const token = req.header('Authorization');
    if (token) {
      const tokenValue = token.replace('Bearer ', '');
      jwt.verify(tokenValue, 'secret-key', (err, decoded) => {
        if (err) {
          console.log("Le token n'est pas valide");
          return res.sendStatus(401);
        } else {
          console.log("Le token est valide");
  
          const userId = req.body.userId;
          const User = require('./models/users');
          User.findById(userId)
            .then((user) => {
              if (user) {
                res.json({
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  password: user.password
                });
              } else {
                res.sendStatus(404);
              }
            })
            .catch((err) => {
              console.error(err);
              res.sendStatus(500);
            });
        }
      });
    } else {
      console.log("Il n'y a pas de token");
      return res.sendStatus(401);
    }
  });
  
  
  
  app.post('/api/delete-user', (req, res) => {
    const userId = req.body.userId;
    const token = req.header('Authorization');
  
    if (token) {
      const tokenValue = token.replace('Bearer ', '');
      jwt.verify(tokenValue, 'secret-key', (err, decoded) => {
        if (err) {
          console.log("Le token n'est pas valide");
          return res.sendStatus(401);
        } else {
          console.log("Le token est valide");
          console.log(userId);
          const User = require('./models/users');
          User.findByIdAndRemove(userId)
            .then(deletedUser => {
              if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
              }
  
              req.session.destroy((error) => {
                if (error) {
                  console.error(error);
                  return res.sendStatus(500);
                }
  
                return res.status(200).json({ message: 'User deleted' });
              });
            })
            .catch(err => {
              console.error(err);
              res.status(500).json({ message: 'Internal server error' });
            });
        }
      });
    } else {
      console.log("Il n'y a pas de token");
      return res.sendStatus(401);
    }
  });
  

  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
  
