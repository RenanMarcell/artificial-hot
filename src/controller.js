const { isValidDate } = require('./validators');
const prisma = require('./prisma');

class PostsController {
    async handle(request, response) {
        const { 
            initial_date: initial_date_string, 
            final_date: final_date_string,
             order_by 
        } = request.body;

        if(!isValidDate(initial_date_string) || !isValidDate(final_date_string)) {
            throw new Error('Initial or final date is invalid.')
        }

        const initial_date = new Date(initial_date_string + ' 00:00:00.000Z');
        const final_date = new Date(final_date_string + ' 00:00:00.000Z');

        if(initial_date > final_date) {
            throw new Error('Initial date is more recent than final date.')
        }
        if(order_by != 'ups' && order_by != 'comments') {
            throw new Error('Invalid order_by filter.')
        }

        final_date.setUTCDate(final_date.getUTCDate() + 1);
        
        const posts = await prisma.post.findMany({
            where: {
                created_at: {
                    gte: initial_date,
                    lt: final_date
                }
            },
            orderBy: {
                [order_by]: 'desc'
            },
        })
        return response.json(posts);
    }
}


class AuthorsController {
    async handle(request, response) {
        const { order_by } = request.body;
        if(order_by != 'ups' && order_by != 'comments') {
            throw new Error('Invalid order_by filter.')
        }
        
        const authors = await prisma.post.groupBy({
            by: ['author'],
            _sum: {
                [order_by]: true,
            }
        })
        for (var i = 0; i < authors.length; i++) {
            authors[i][order_by] = authors[i]['_sum'][order_by]
            delete authors[i]['_sum']
        }
        return response.json(
            authors.sort((a, b) => {
                return b[order_by] - a[order_by];
            })
        );
    }
}

module.exports = {
    PostsController,
    AuthorsController
}