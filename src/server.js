const cron = require('node-cron');

const { app } = require('./app');
const scheduled_job = require('./scheduled');

const PORT = process.env.PORT || 3000;

cron.schedule("0 0 0 * * *", async () => {
    await scheduled_job()
});

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
