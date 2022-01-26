const request = require('supertest');
const { app } = require('../app');
const prisma = require('../prisma');


describe('PostsController', () => {
    it('should return 200 for valid request', async() => {
        const response = await request(app).get('/posts/')
            .send({
                initial_date: '01/01/2020',
                final_date: '01/01/2021',
                order_by: 'ups'
            })
        expect(response.status).toBe(200);
    })

    it('should return an array', async() => {
        const response = await request(app).get('/posts/')
            .send({
                initial_date: '01/01/2020',
                final_date: '01/01/2021',
                order_by: 'ups'
            })
        expect(Array.isArray(response.body)).toBe(true);
    })

    it('should return 400 for invalid request', async() => {
        const response = await request(app).get('/posts/')
            .send({
                initial_date: '01/01/2020',
                final_date: '13/01/2021',
                order_by: 'ups'
            })
        expect(response.status).toBe(400);
    })

    it('should have called prisma findMany', async() => {
        const spy = jest.spyOn(prisma.post, 'findMany');
        await request(app).get('/posts/')
            .send({
                initial_date: '01/01/2020',
                final_date: '01/01/2021',
                order_by: 'ups'
            })

        expect(spy).toHaveBeenCalled();
    })
})

describe('AuthorsController', () => {
    it('should return 200 for valid request', async() => {
        const response = await request(app).get('/authors/')
            .send({
                order_by: 'comments'
            })
        expect(response.status).toBe(200);
    })

    it('should return an array', async() => {
        const response = await request(app).get('/authors/')
            .send({
                order_by: 'comments'
            })
        expect(Array.isArray(response.body)).toBe(true);
    })

    it('should return 400 for invalid request', async() => {
        const response = await request(app).get('/authors/')
            .send({
                order_by: 'spicy'
            })
        expect(response.status).toBe(400);
    })

    it('should have called prisma groupBy', async() => {
        const spy = jest.spyOn(prisma.post, 'groupBy');
        await request(app).get('/authors/')
            .send({
                order_by: 'comments'
            })

        expect(spy).toHaveBeenCalled();
    })
})