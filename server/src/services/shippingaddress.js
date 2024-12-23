import { response } from 'express'
import db from '../models'
import { Model } from 'sequelize';
import { v4 } from 'uuid'

export const PostShippingAddressService = (UserId ,payload) => new Promise(async (resolve, reject) => {
    const { name,phone,address} = payload;
    try {
        const response = await db.ShippingAddress.create({ 
            userId: UserId,
            addressLine2: address.address,
            city: address.city,
            addressLine1: address.district,
            fullName: name,
            phoneNumber: phone,
            status:'await',
            postalCode: v4(),
         });
         resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to post PostShippingAddressService.',
            response
         })
    } catch (error) {
        reject(error)
    }
})