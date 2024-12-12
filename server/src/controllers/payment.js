import * as services from '../services/payment'

export const checkout = async(req, res) =>{
    const { amount } = req.body;
    if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid amount." });
    }
    try {
        const response = await services.createCheckoutSession(amount)
        // console.log(response.response.url)
        res.status(200).json(response.response.url);
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg: 'Faild at payment controller: '+error
        })
    }
} 
export const exportPayments = async(req, res) =>{
    try {
        const response = await services.exportPayments()
        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg: 'Faild at payment controller: '+error
        })
    }
} 