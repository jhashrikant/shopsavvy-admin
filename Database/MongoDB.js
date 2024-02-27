const mongoose = require('mongoose');

const connectToMongoDB = async () => {
    console.log('sss',process.env.MONGO_URL);
    try {
        console.log('trying to connect to DB', 'line6');
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connected to mongoDB');
    } catch (error) {
        console.log('catch block ran line15')
        console.log('line11 error', error)
    }
}
export default connectToMongoDB;
