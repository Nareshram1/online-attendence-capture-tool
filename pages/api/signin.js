
import dbConnect from '../../lib/dbConnect'
import User from '../../models/User'
import bcrypt from 'bcrypt';
import Faculty from '../../models/Faculty';

User


export default async function handler (req,res){

    const {method} = req
    
    await dbConnect()

    // switch(method){
    //     case 'GET':

    // }
    if(method == 'POST'){
    try {
        console.log("-----------------------------------")
        console.log("User: "+req.body.uid)
        console.log("-----------------------------------")
        const user = await User.findOne({uid: req.body.uid});
        console.log(user)
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                if(user.isFaculty){
                    const FacultyDetails = await Faculty.findOne({fid:req.body.uid})
                    res.status(200).send({
                        _id: user.id,
                        userDetails:FacultyDetails,
                        fid: user.userId,
                        // token:generateToken(user)
                    })
                }
            }else if(user.isStudent){
                const StudentDetails = await Student.findOne({fid:req.body.uid})
                    res.status(200).send({
                        _id: user.id,
                        userDetails:StudentDetails,
                        fid: user.userId,
                        // token:generateToken(user)
                    })
            }else{
                res.status(401).send({message: 'Invalid uid or password'})
            }
        }
      } catch (error) {
        res.status(400).send(error)
      }
    }else{
        const user  = await User.find({uid:1905})

        res.send(user)
    }
}