const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const userSchema = new Schema({

    email:{type:String, unique:true},
    password:String,
    firstName:String,
    lastName:String

}, {timestamps:true});

const adminSchema = new Schema({

    email:{type:String, unique:true},
    password:String,
    firstName:String,
    lastName:String

}, {timestamps:true});



const courseSchema = new Schema({

    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:ObjectId

}, {timestamps:true})


const purchaseSchema = new Schema({

    courseId:ObjectId,
    userId:ObjectId,
})

const UserModel = mongoose.model('Users', userSchema);
const AdminModel = mongoose.model('admins', adminSchema);
const CourseModel = mongoose.model('courses', courseSchema);
const PurchaseModel = mongoose.model('purchases',purchaseSchema);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel
}


