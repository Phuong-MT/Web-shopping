const stripe = require("../config/stripe");

export const createCheckoutSession = (amount) =>new Promise(async (resolve, reject) => {
    try {
        const response = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "vnd",
                        product_data: {
                            name: "WEB_SHOPPING",
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/complete`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed.',
            response 
        })
    } catch (error) {
        reject(error)
    }
}) 
