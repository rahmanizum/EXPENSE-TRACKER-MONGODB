//Starting of app.js file
const express = require('express');
const cors = require('cors');
require('dotenv').config();


const PORT = process.env.PORT;
const {MongoConnect} = require('./util/database')

// const Expenses = require('./models/expenses');
// const User = require('./models/users');
// const Orders = require('./models/orders');
// const Forgotpasswords = require('./models/forgotpasswords');
// const Downloads = require('./models/downloads');

const mainPageRouter = require('./routes/mainpage');
// const userRouter = require('./routes/user');
// const expenseRouter = require('./routes/expenses');
// const purchaseRouter = require('./routes/purchase');
// const premiumRouter = require('./routes/premium');
// const passwordRouter = require('./routes/password');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

app.use(mainPageRouter)
// app.use('/user',userRouter);
// app.use('/purchase',purchaseRouter);
// app.use('/expenses',expenseRouter);
// app.use('/premium',premiumRouter);
// app.use('/password',passwordRouter);

async function initiate(){
    try {
        await MongoConnect();
        app.listen(PORT,()=>{
            console.log(`Server is running at ${PORT}`);
        });       
    } catch (error) {
        console.log(error);
    }
}
initiate();
