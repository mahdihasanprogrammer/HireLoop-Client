import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID={
    "seeker_pro": "price_1ThL2DBLgX7dxFJxttKv71Yo",
    "seeker_premium" : "price_1ThNBtBLgX7dxFJx9v9uq0Xp",
    "recruiter_growth" : "price_1ThNEgBLgX7dxFJxWHmOCq0y",
    "recruiter_enterprise" : "price_1ThNGLBLgX7dxFJxkRBmZxHE"
}