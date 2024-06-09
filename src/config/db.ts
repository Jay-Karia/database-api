import * as mongoose from 'mongoose'

const connectDB = async () => {
    try {
        if (Bun.env.MONGO_URI !== undefined) {
            const connect = await mongoose.connect(Bun.env.MONGO_URI, {
                autoIndex: true,
            })
            console.log(`MongoDB Connected: ${connect.connection.host}`)
        }
    } catch (err: any) {
        console.error(`Error: ${err.message}`)
        process.exit(1)
    }
}

export default connectDB