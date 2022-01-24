const axios = require('axios');
const { PostsController } = require('./controller');
const prisma = require('./prisma');

async function scheduled_job() {
    console.log('Scheduled job started.');
    hot_posts = []
    try{
        const response = await axios.get('https://api.reddit.com/r/artificial/hot.json')
        const posts = response['data']['data']['children']
        for (var i = 0; i < posts.length; i++) {
            hot_posts.push(
                {
                    'title': posts[i]['data']['title'],
                    'author': posts[i]['data']['author'],
                    'created_at': new Date(posts[i]['data']['created_utc'] * 1000),
                    'ups': posts[i]['data']['ups'],
                    'comments': posts[i]['data']['num_comments']
                }
            )
        }

        for (var i = 0; i < hot_posts.length; i++) {
            const postExists = await prisma.post.findFirst({
                where: {
                    AND: [
                        { title: hot_posts[i]['title'] },
                        { created_at: hot_posts[i]['created_at'] }
                    ]
                }
            })
            if(postExists){
                await prisma.post.update({
                    where: {
                        id: postExists.id
                    },
                    data: hot_posts[i]
                })
                continue
            }
            await prisma.post.create({
                data: hot_posts[i]
            });
        }
        console.log('Scheduled job completed successfully.')
    } catch (e) {
        console.error('There was an error while running the schedule job. Error:', e)
    }
}

module.exports = scheduled_job