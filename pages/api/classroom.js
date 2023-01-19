
import dbConnect from '../../lib/dbConnect'
import Class from '../../models/Class'



export default async function handler (req,res){

    const {method} = req
    
    await dbConnect()

    // switch(method){
    //     case 'GET':

    // }

    try {
    
        const  classes = await Class.find({conductedBy:req.body.fid})
        console.log(req)
        res.status(200).json({ success: true, data: classes })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false,error:error })
      }
}