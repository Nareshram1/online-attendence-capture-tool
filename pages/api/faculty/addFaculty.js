import Faculty from "../../../models/Faculty.js";
import User from "../../../models/User.js";
import Student from "../../../models/Student.js";

export default async function handler(req, res) {
  if (req == "POST") {
    try {
      const oldUser = await User.findOne({ uid: req.body.uid });
      if (!oldUser) {
        const user = new User({
          uid: req.body.uid,
          password: bcrypt.hashSync(process.env.hashSecret, 8),
        });
        const createdUser = await user.save();
        if (req.body.isFaculty) {
          const faculty = new Faculty({
            facultyId: req.body.uid,
            name: req.body.name,
            department: req.body.department,
            profileUrl: req.body.profileUrl,
          });
          const createdFaculty = await faculty.save();
          res.send({
            _id: createdFaculty._id,
            fid: createdFaculty.facultyId,
            name: createdFaculty.name,
          });
        } else {
          const student = new Student({
            name: req.body.name,
            department: req.body.department,
            batch: req.body.batch,
            rollNo: req.body.rollNo,
            email: req.body.email,
            year: req.body.year,
            semester: req.body.semester,
          });
          const createdStudent = student.save();
          res.send({
            _id: createdStudent._id,
            rollNo: createdStudent.rollNo,
            name: createdStudent.name,
          });
        }
      } else {
        res.status(210).send("User Already Exists");
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }else{
    res.send("This API endpoint support only post requests")
  }
}
