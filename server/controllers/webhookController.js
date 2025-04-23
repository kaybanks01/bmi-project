const dotenv = require('dotenv');
dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_SECRET);


const endpointSecret = process.env.ENDPOINT_SECRET;

exports.handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log('Webhook verified');
    } catch (err) {
        console.log('Webhook Error:', err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        const customer =  await stripe.customers.retrieve(session.customer);
        const cartId = customer.metadata.cartId;
    
        

        try {
            await order.save();
          
        } catch (error) {
            console.log('Error saving order:', error);
        }

        res.send().end();
    }};