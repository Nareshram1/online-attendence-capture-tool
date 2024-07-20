import Attendance from "../../../models/Attendance";
import Student from "../../../models/Student";
import dbConnect from "../../../lib/dbConnect";
import Class from "../../../models/Class";

function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

export default async function handler(req, res) {
  const { method } = req;

  var months = {
    1: [],
    2: [],
    3: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
  };

  await dbConnect();

  // switch(method){
  //     case 'GET':

  // }
  // try {
  //   const cid = req.body.cid;
  //   console.log(cid)
  //   var classes = await Class.findById(req.body.cid);

  //   console.log(classes)

  //   var studentPromise = classes.students.map(async (stuId) => {
  //     var students = await Student.findById(stuId);
  //     return students;
  //   });

  //   var stuPromise = await Promise.all(studentPromise);
  //   var k=0
  //   var stuArray = JSON.parse(JSON.stringify(stuPromise));

  //   stuArray.sort(dynamicSort("rollNo"));

  //   console.log("STUARRAY")
  //   console.log(stuArray)

  //   var reports = await Attendance.find();
  //   reports = JSON.parse(JSON.stringify(reports));

  // //   reports.map((data) => {
  // //   // console.log(parseInt(data.AttendanceRecord.split("-")[1]));
  // //   // console.log(data.AttendanceRecord,data.data.RollNo)
  // //     var totalP = 0;
  // //     let k = 0;
  // //     for (let i = 0; i < stuArray.length; i++) {
        
  // //       let student = JSON.parse(JSON.stringify(stuArray[i]));
        
  // //         // for (let w = 0; w < data.data.RollNo.length; w++) {
  // //         // //  console.log('------------------>',student.rollNo,data.data.RollNo.includes(JSON.stringify(student.rollNo)),'-------------->')
  // //         //  console.log(data.data.RollNo) 
  // //         //  if (data.data.RollNo.includes(JSON.stringify(student.rollNo))) {
  // //         //     k++;
  // //         //     break
  // //         //     console.log("KV-------------->",k)
  // //         //   }


  // //           // totalP += k;
  // //           // stuArray[i]["counts"] = k;
      
  // //           // if (classes.totLec == 0) {
  // //           //   stuArray[i]["percent"] = 0;
  // //           // } else {
  // //           //   stuArray[i]["percent"] = ((k / classes.totLec) * 100)
  // //           //     .toFixed(2)
  // //           //     .toString();
  // //           // }
    
  // //         }

          

        
    
  // //       // months[parseInt(data.AttendanceRecord.split("-")[1])]=stuArray;

          
      


     
  // //     // let obj = { months: classes, stuArray: stuArray, totalPercent: totalPercent, totalP: totalP, prevClasses: resp[-2] }
     
        
       
  // //   });
   
  // } catch (e) {
  //   console.log(e);
  // }

  // console.log(months);

  try {

   
    var attendance = await Attendance.findOne({
      AttendanceRecord: req.body.date,
    });
    // console.log(attendance);
    attendance = JSON.parse(JSON.stringify(attendance));
    if (attendance.data.RollNo) {
      var studentPromise = attendance.data.RollNo.map(async (roll) => {
        try {
          var students = await Student.findOne({ rollNo: roll });
        } catch (e) {
          console.log("Not Found");
          console.error(e);
        }

        return students;
      });

      var stuPromise = await Promise.all(studentPromise);

      var StuArray = JSON.parse(JSON.stringify(stuPromise));

      var stuArray = [];

      StuArray.forEach((element) => {
        if (element) {
          stuArray.push(element);
        }
      });

      // console.log(stuArray);

      stuArray.sort(dynamicSort("rollNo"));

      res.status(200).json({ success: true, data: stuArray, months:months });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error });
  }
}
