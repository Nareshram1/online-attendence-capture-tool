import Attendance from "../../../models/Attendance";
import Student from "../../../models/Student";
import dbConnect from "../../../lib/dbConnect";
import Class from "../../../models/Class";

export default async function handler(req, res) {
  let start_date = new Date(req.body.start_date) || new Date('2023-02-01T18:30:00.000Z');
  let end_date = req.body.end_date || '13-2-23';
  let cid = req.body.cid || '63c6cf9216f7067d326af664';

  console.log(start_date,end_date,cid)

  var attendance = await Attendance.find();
  var records = [];
  var flag = false;
  attendance.map((record) => {
    if (new Date(record.AttendanceRecord) >= start_date) {
      flag = !flag;
      records.push(JSON.parse(JSON.stringify(record)));
    }
    if ((flag)) {
      if (record.AttendanceRecord == end_date) {
        records.push(JSON.parse(JSON.stringify(record)));
        return;
      } else {
        records.push(JSON.parse(JSON.stringify(record)));
      }
    }
  });

  var students = await Class.findById(cid);
  var rollPromise = await students.students.map(async (student) => {
    var temp = await Student.findById(student);
    return JSON.parse(JSON.stringify(temp));
  });

  var rollNoArray = await Promise.all(rollPromise);

  var report = [];
  var lacking = [];
  // console.log(Object.keys(records[0]),typeof(records[0]))
  rollNoArray.map((student) => {
    var k = 0;


    records.map((record) => {
      // console.log(typeof(rollNo),typeof(record.data.RollNo[0]))
      if (record.data.RollNo.includes(JSON.stringify(student.rollNo))) {
        k++;
      }
    });
    if(records.length - k<3){
        student.regular = true;
    }
    student.present = k;
    student.days = records.length;
    student.percentage = parseFloat((k / records.length) * 100).toFixed(2);
    if(parseFloat(student.percentage)>=50){
    report.push(student);
    }
    else{
        lacking.push(student)
    }
  });

  var result = { noOfDays: records.length, data: [report,lacking] };

  res.status(200).send(JSON.stringify(result));
}
