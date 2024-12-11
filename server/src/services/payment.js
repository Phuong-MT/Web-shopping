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
export 
const exportPayments = async (req, res) =>new Promise(async(resolve, reject) => {
    
    try {
        const payments = await stripe.paymentIntents.list({
            limit: 100, // Số giao dịch muốn lấy (tối đa 100)
        });

        // Tạo file CSV từ danh sách giao dịch
        const response = payments.data.map((payment) => ({
            id: payment.id,
            amount: payment.amount,
            currency: payment.currency.toUpperCase(),
            status: payment.status,
            description: payment.description,
            created: new Date(payment.created * 1000).toISOString(),
        }));
        resolve({
            err : response? 0 : 1,
            msg: response? 'OK' : 'Failed',
            response
        })
    } catch (error) {
        reject(error)
    }
})

