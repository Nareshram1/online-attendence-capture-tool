import dbConnect from "../../../lib/dbConnect.js";
import Class from "../../../models/Class.js";
import Student from "../../../models/Student.js";


export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  const { cid } = req.query;

  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

  try {

    var classes = await Class.findOne({ _id: cid });

    let studentPromise = classes.students.map(async (stuId) => {
     
      let students = await Student.findById(stuId);
   
      return students;
    });

    let stuPromise = await Promise.all(studentPromise);

    let stuArray = JSON.parse(JSON.stringify(stuPromise));

    var classes = JSON.parse(JSON.stringify(classes))


    stuArray.sort(dynamicSort("rollNo"));

    

    let resp = await Attendance.find({ "data.Class": cid });

    let response = JSON.parse(JSON.stringify(resp));

    let totalP = 0;

    for (let i = 0; i < stuArray.length; i++) {
      console.log("-----step1")
      let k = 0;
      let student = stuArray[i];
      for (let j = 0; j < response.length; j++) {
      console.log("-----step2")

        for (let w = 0; w < response[j].data.RollNo.length; w++) {
          if (student.rollNo == response[j].data.RollNo[w]) {
      console.log("-----step3")

            k++;
          }
        }

      }

      totalP += k;
      stuArray[i]["counts"] = k;
      console.log(stuArray,"UPDATED")

      if (classes.totLec == 0) {
        stuArray[i]["percent"] = 0;
        
      } else {
        stuArray[i]["percent"] = ((k / classes.totLec) * 100)
          .toFixed(2)
          .toString();
        
      }
  
      
    }

    
    

    

    classes.studentDetails = stuArray;
    
    
    if (classes.totLec == 0) var totalPercent = 0;
    else
      var totalPercent = ((totalP / (classes.totLec * stuArray.length)) * 100)
        .toFixed(2)
        .toString();
        
      let obj = { classroom: classes, stuArray: stuArray, totalPercent: totalPercent, totalP: totalP }
        
    res.status(200).json({ success: true, data: obj });

    
  } catch(error) {
    res.status(400).json({ success: false, msg: "Invalid Class Code",error:error });
    console.log("ERROR------>"+error)
  }
}
