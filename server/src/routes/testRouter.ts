import { Hono, type Context } from "hono";

const testRouter = new Hono()
    .get('/', async (c: Context) => {
     
        const res = c.json({'test': 'test'}) 
        
        return res
    })

export default testRouter