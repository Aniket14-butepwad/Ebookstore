require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const stripe = Stripe(process.env.STRIPE_SECRET_KEY=sk_test_51SE9bgKGO0zxgYFzc4Yf9lGbMxpIFrMwPEnck4FQt3qioWyeVWowjxBJGZRew0qUjCv9NJwTaqE9UkC39PxTmcXr00XcdPK2ym); // sk_test_XXXX

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // paise
      currency: 'inr',
      automatic_payment_methods: { enabled: true }
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
