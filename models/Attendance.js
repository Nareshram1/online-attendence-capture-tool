const mongoose = require("mongoose");


const recordSchema = new mongoose.Schema({
    AttendanceRecord:String
});

const Attendance =mongoose.models.Attendance  || mongoose.model("Attendance", recordSchema);

export default Attendance