import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema({
   facultyId:String,
   name:String,
   department:String,
   designation:String,
   profileUrl:String
});






const Faculty  = mongoose.models.Faculty ||mongoose.model('Faculty',facultySchema);

export default Faculty;

