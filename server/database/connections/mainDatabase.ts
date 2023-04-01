import mongoose, {ConnectOptions} from "mongoose";


export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(
            "mongodb+srv://sebuszqo:kudsE4-qazcuk-quproz@cluster0.nvccqpd.mongodb.net/?retryWrites=true&w=majority",
            {
                dbName: "SmartWords",
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as ConnectOptions
        );
        console.log("Connected to MongoDB Atlas - SmartWords");
    } catch (err) {
        console.error("Error connecting to MongoDB Atlas - SmartWords", err);
    }
};