
import Attendance from '../../../models/Attendance'
import Student from '../../../models/Student'
import dbConnect from '../../../lib/dbConnect'




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


export default async function handler (req,res){

    const {method} = req
    
    await dbConnect()

    // switch(method){
    //     case 'GET':

    // }

    try {
    
        var  attendance = await Attendance.findOne({AttendanceRecord:req.body.date})
        console.log(attendance)
       attendance = JSON.parse(JSON.stringify(attendance))
       if(attendance.data.RollNo){
        
        var studentPromise  = attendance.data.RollNo.map(async (roll)=>{
            
            try{
                var students = await Student.findOne({rollNo:roll})
               
            }
            catch(e){
                console.log("Not Found")
                console.error(e)

            }
        
            return students
    

           
        })

        var stuPromise = await Promise.all(studentPromise)

        var StuArray = JSON.parse(JSON.stringify(stuPromise))

        var stuArray = []

        StuArray.forEach(element => {
            if(element){
                stuArray.push(element)
            }
        });

        console.log(stuArray)

        stuArray.sort(dynamicSort("rollNo"))





        res.status(200).json({ success: true, data: stuArray })

       }
        

        
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false,error:error })
      }
}