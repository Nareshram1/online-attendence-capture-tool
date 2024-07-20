import dbConnect from "../../../lib/dbConnect";
import Attendance from "../../../models/Attendance";
import Class from "../../../models/Class";
import Student from "../../../models/Student";


export default async function handler(req, res) {

  await dbConnect();

  const { cid } = req.query;

    function dynamicSort(property) {
    let sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      let result;
      if (a[property] < b[property]) {
        result = -1;
      } else if (a[property] > b[property]) {
        result = 1;
      } else {
        result = 0;
      }
      return result * sortOrder;
    }
  }

  try {

    let classes = await Class.findById( cid );

    let studentPromise = classes.students.map(async (stuId) => {
     
      let students = await Student.findById(stuId);
   
      return students;
    });

    let stuPromise = await Promise.all(studentPromise);

    let stuArray = JSON.parse(JSON.stringify(stuPromise));

    classes = JSON.parse(JSON.stringify(classes))


    stuArray.sort(dynamicSort("rollNo"));

    

    let resp = await Attendance.find({ "data.Class": cid });

   
  //  console.log("---------------------RESPONE---------------------",JSON.parse(JSON.stringify(resp))[resp.length-2])

   let prevClass = JSON.parse(JSON.stringify(resp))[resp.length-2]
  

    let response = JSON.parse(JSON.stringify(resp));

    

    let totalP = 0;

    for (let student of stuArray) {
      let k = 0;
      console.log(student.rollNo);
      console.log(prevClass.data.RollNo.includes(student.rollNo));
      if (prevClass.data.RollNo.includes(String(student.rollNo))) {
        student["regular"] = true;
      } else {
        student["regular"] = false;
      }
      for (let resp of response) {
        for (let rollNo of resp.data.RollNo) {
          if (student.rollNo == rollNo) {
            k++;
          }
        }
      }
      totalP += k;
      student["counts"] = k;
      if (classes.totLec == 0) {
        student["percent"] = 0;
      } else {
        student["percent"] = ((k / classes.totLec) * 100).toFixed(2).toString();
      }
    }
    classes.studentDetails = stuArray;
    
    
    let totalPercent;
    if (classes.totLec == 0) {
      totalPercent = 0;
    } else {
      totalPercent = ((totalP / (classes.totLec * stuArray.length)) * 100)
        .toFixed(2)
        .toString();
    }
        
    let obj = { classroom: classes, stuArray: stuArray, totalPercent: totalPercent, totalP: totalP, prevClasses: resp[-2] }
    const students = await Student.find({department:'B.Tech Information Technology'})   

    students.sort(dynamicSort("rollNo"));
    
    res.status(200).json({ success: true, data: [obj,students] });

    
  } catch(error) {
    res.status(400).json({ success: false, msg: "Invalid Class Code",error:error });
    console.log("ERROR------>"+error)
  }
}
