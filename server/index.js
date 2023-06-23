const express = require('express');
const morgan = require('morgan');
const dbConnect = require('./dbConnect');
const app = express();
const postsRouter = require('./routers/postsRouter')
const authRouter  = require('./routers/authRouter')
const userRouter = require('./routers/userRouter')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME ,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  

// middlewares
app.use(express.json({ limit: "20mb" }));
app.use(morgan('common'));
app.use(cookieParser());
app.use(cors({
    credentials : true,
    origin : 'http://localhost:3000'
}));
// app.use(bodyParser.json({limit: '10mb', extended: true}))

app.use('/auth',authRouter); // app.use(path, callback) app.use() function is used to mount the specified middleware function(s) at the path which is being specified
app.use('/posts',postsRouter);
app.use('/users',userRouter);
app.get("/" , (req,res) =>{
    res.status(200).send("OK from server");
})
dbConnect();
//
const PORT = 4040;

app.listen(PORT , ()=>{
    console.log(`listening on port ${PORT}`);
})