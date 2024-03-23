const mongoose = require('mongoose');

const connectToMongoDB = async () => {
	if (!process.env.MONGO_URL) {
		throw new Error("Mongodb Url must be defined to connect to Database")
	}
	try {
		await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('connected to mongoDB');
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}
export default connectToMongoDB;
