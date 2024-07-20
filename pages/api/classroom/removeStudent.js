import dbConnect from "../../../lib/dbConnect";
import Attendance from "../../../models/Attendance";
import Class from "../../../models/Class";
import Student from "../../../models/Student";


export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();



  const { sid,cid } = req.body;


  try {

    var classes = await Class.findById( cid );

    // console.log(classes)

    var student1 = JSON.parse(JSON.stringify(classes.students))
    
    const index = student1.indexOf(sid)
    if (index > -1) { // only splice array when item is found
        student1.splice(index, 1); // 2nd parameter means remove one item only
      }
    
  


    await Class.findByIdAndUpdate(cid,{students:student1})

    res.status(200).json({ success: true, message:'Success' });

    
  } catch(error) {
    res.status(400).json({ success: false, msg: "Error",error:error });
    console.log("ERROR------>"+error)
  }
}
