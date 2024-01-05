import Attendance from "../../../models/Attendance";
import Student from "../../../models/Student";
import dbConnect from "../../../lib/dbConnect";
import Class from "../../../models/Class";

export default async function handler(req, res) {
  let cid = req.body.cid || '63c6cf9216f7067d326af664';

  var Months = {
    1: [[],[]],
    2: [[],[]],
    3: [[],[]],
    4:[[],[]],
    5: [[],[]],
    6: [[],[]],
    7: [[],[]],
    8: [[],[]],
    9: [[],[]],
    10: [[],[]],
    11: [[],[]],
    12: [[],[]],
  };



  var attendance = JSON.parse(JSON.stringify(await Attendance.find()));
  
  var records = [];
  var flag = false;

  var months = [];

  attendance.map((record)=>{
    if(!months.includes(parseInt(record.AttendanceRecord.split("-")[1]))){
        months.push(parseInt(record.AttendanceRecord.split("-")[1]))
    }
  })

  console.log(months)

  var students = await Class.findById(cid);
  var rollPromise = await students.students.map(async (student) => {
    var temp = await Student.findById(student);
    return JSON.parse(JSON.stringify(temp));
  });

  var rollArray = await Promise.all(rollPromise);



  months.map((month)=>{
    rollArray.map((student)=>{
        var k=0;
        var days= -1;
        attendance.map((record)=>{
           
            if(parseInt(record.AttendanceRecord.split("-")[1])==month){
                days++;
                if(record.data.RollNo.includes(JSON.stringify(student.rollNo)) && record.data.Class == cid){
                    k++;
                }
            }
        })
        if(records.length - k<3){
            student.regular = true;
        }
        student.present = k;
        student.days = days;
        console.log((k/days))
        student.percentage = parseFloat((k / days)*100).toFixed(2);
        if(parseFloat(student.percentage)>=5){
            Months[month][0].push(student);
        }
        else{
            Months[month][1].push(student);
        }  
    })
  })

  var result = { data: Months };

  res.status(200).send(JSON.stringify(result));
}
