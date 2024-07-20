const mongoose = require("mongoose");

let alphabets = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";

const classSchema = new mongoose.Schema({
  code:{type:String,required:true},
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  handledBy: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required:true
  },
  students: [    {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required:false
    }
  ],
  commonTo:{
    type:Array,
  },
  courseType:{
    type:String
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  totLec: {
    type: Number,
    required: false,
    default:0
  },
  semester:{
    type:String,
  },
  year:{
    type:String,
  },
  classCode:{
    type:String,
    required:false,
    default:function generateCode() {
      code=''
      for(i=0;i<8;i++){
        r=Math.floor(Math.random() * 10);
        if(r<6){
          code=code+alphabets[Math.floor(Math.random() * alphabets.length)]
        }
        else{
          code=code+Math.floor(Math.random() * 10);
        }
      }
      return code;
    }
  },
});

module.exports = mongoose.models.Class || mongoose.model("Class", classSchema);

