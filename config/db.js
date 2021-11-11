const mongoose = require('mongoose')


const connectDB = async () => {
  try {
   const cxn = await mongoose.connect(process.env.DB_URI,
    {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
    })
    console.log(`MongoDB Connected: ${cxn.connection.host}`)
  } catch (error) {
    console.log(error.message) 
    process.exit(1)
  }
}
 


  
module.exports = connectDB

