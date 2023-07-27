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
app.use(express.static('public'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

const guitarSchema = new mongoose.Schema({
  name: String,
  bio: String,
  price: Number,
  image: String
});

const accSchema = new mongoose.Schema({
  name: String,
  bio: String,
  price: Number,
  image: String
});

const orderSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      itemName: String,
      quantity: { type: Number, default: 1 }
    }
  ],
  total: Number
});

const Order = mongoose.model('Order', orderSchema);

const Guitar = mongoose.model('Guitar', guitarSchema);
const Accessories = mongoose.model('Accessories', accSchema);


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
          const newAdress = req.body.newAdress;
  
          const User = require('./models/users');
          User.findByIdAndUpdate(userId, { firstName: newFirstName, lastName: newLastName, email: newEmail, adress: newAdress }, { new: true })
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
                  password: user.password,
                  adress: user.adress
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
  



  // PRODUCTS

  app.post('/api/addGuitar', (req, res) => {
    const product = new Guitar({
      name: req.body.name,
      bio: req.body.bio,
      price: req.body.price,
      image: req.body.image
    });
  
    product.save()
      .then(savedProduct => {
        res.status(201).json(savedProduct);
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to create product' });
      });
  });

  app.post('/api/addAccessories', (req, res) => {
    const product = new Accessories({
      name: req.body.name,
      bio: req.body.bio,
      price: req.body.price,
      image: req.body.image
    });
  
    product.save()
      .then(savedProduct => {
        res.status(201).json(savedProduct);
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to create product' });
      });
  });

  app.get('/api/guitars', (req, res) => {
    const searchQuery = req.query.search;
    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'i');
      Guitar.find({ name: regex })
        .then(guitars => {
          res.json(guitars);
        })
        .catch(error => {
          res.status(500).json({ error: 'Failed to fetch guitars' });
        });
    } else {
      Guitar.find({})
        .then(guitars => {
          res.json(guitars);
        })
        .catch(error => {
          res.status(500).json({ error: 'Failed to fetch guitars' });
        });
    }
  });
  
  
  app.get('/api/guitars/:id', (req, res) => {
    const guitarId = req.params.id;
    Guitar.findById(guitarId)
      .then(guitar => {
        if (!guitar) {
          return res.status(404).json({ error: 'Guitar not found' });
        }
        res.json(guitar);
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to fetch guitar' });
      });
  });

  app.get('/api/accessories', (req, res) => {
    const searchQuery = req.query.search;
    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'i');
      Accessories.find({ name: regex })
        .then(accessories => {
          res.json(accessories);
        })
        .catch(error => {
          res.status(500).json({ error: 'Failed to fetch accessories' });
        });
    } else {
      Accessories.find({})
        .then(accessories => {
          res.json(accessories);
        })
        .catch(error => {
          res.status(500).json({ error: 'Failed to fetch accessories' });
        });
    }
  });

  app.get('/api/accessories/:id', (req, res) => {
    const accessoryId = req.params.id;
    Accessories.findById(accessoryId)
      .then(accessory => {
        if (!accessory) {
          return res.status(404).json({ error: 'accessory not found' });
        }
        res.json(accessory);
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to fetch accessory' });
      });
  });


  app.post('/api/addOrder', (req, res) => {
    const { userId, items, total } = req.body;
    
    const order = new Order({
      user: userId,
      items: items,
      total: total,
    });
  
    order.save()
      .then(savedOrder => {
        res.status(201).json(savedOrder);
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to create order' });
      });
  });

  app.get('/api/orders', (req, res) => {
    Order.find({})
      .then(orders => {
        res.json(orders);
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to fetch orders' });
      });
  });

  app.get('/api/orders/:userId', (req, res) => {
    const userId = req.params.userId;
    Order.find({ user: userId }) 
      .then(orders => {
        res.json({ orders });
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to fetch orders' });
      });
  });

  


  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
  