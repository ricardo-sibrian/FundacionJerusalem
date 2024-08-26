const Stripe = require('stripe');
const stripe = Stripe('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'); // Reemplaza con tu clave secreta de Stripe

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
