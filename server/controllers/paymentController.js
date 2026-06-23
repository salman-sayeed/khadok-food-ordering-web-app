const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

// @desc  Create Stripe checkout session
// @route POST /api/payment/create-checkout-session
const createCheckoutSession = async (req, res) => {
  try {
    const { items, orderId } = req.body;

    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `http://localhost:5173/order-confirmation?orderId=${orderId}`,
      cancel_url: `http://localhost:5173/dashboard`,
      metadata: { orderId }
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Payment session failed' });
  }
};

//Stripe webhook — mark order as paid
// POST /api/payment/webhook
const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata.orderId;

    await Order.findByIdAndUpdate(orderId, { paymentStatus: 'paid', status: 'preparing' });
  }

  res.json({ received: true });
};

module.exports = { createCheckoutSession, handleWebhook };