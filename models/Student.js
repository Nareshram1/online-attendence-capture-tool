import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name:String,
    department:String,
    batch:Number,
    rollNo:Number,
    email:String,
    year:Number,
    semester:Number
});






const Student =mongoose.models.Student  || mongoose.model('Student',studentSchema);

export default Student;


