import dbConnect from "../../../lib/dbConnect";
import Attendance from "../../../models/Attendance";
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

  await dbConnect();



  const { sid,cid } = req.body;


  try {

    var classes = await Class.findById( cid );

    // console.log(classes)

    var student1 = JSON.parse(JSON.stringify(classes.students))
    
    student1.push(sid)

    
    student1.sort(dynamicSort("rollNo"));
  


    await Class.findByIdAndUpdate(cid,{students:student1})

    res.status(200).json({ success: true, message:'Success' });

    
  } catch(error) {
    res.status(400).json({ success: false, msg: "Error",error:error });
    console.log("ERROR------>"+error)
  }
}
