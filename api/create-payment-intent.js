require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Usar la clave secreta de Stripe desde el archivo .env

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { amount } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
};
