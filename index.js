import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { application } from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

let dataConnection = mongoose.connect(
  "mongodb://localhost:27017/StudentOnlineREport",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Data Base is connected");
  }
);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

//new Student Schema
const studentDetailsSchema = new mongoose.Schema({
  studentName: String,
  studentEmail: String,
  studentStandard: String,
  studentRollNo: String,

  englishTermOneMarks: Number,
  hindiTermOneMarks: Number,
  scienceTermOneMarks: Number,
  socialScienceTermOneMarks: Number,
  mathTermOneMarks: Number,
  totalTermOneMarks: Number,

  englishTermTwoMarks: Number,
  hindiTermTwoMarks: Number,
  scienceTermTwoMarks: Number,
  socialScienceTermTwoMarks: Number,
  mathTermTwoMarks: Number,
  totalTermTwoMarks: Number,

  englishTermThreeMarks: Number,
  hindiTermThreeMarks: Number,
  scienceTermThreeMarks: Number,
  socialScienceTermThreeMarks: Number,
  mathTermThreeMarks: Number,
  totalTermThreeMarks: Number,
});
//teacher Schema
const teacherSchema = new mongoose.Schema({
  teacherNo: String,
  teacherName: String,
  teacherMobileNo: Number,
  teacherEmailId: String,
});
const parentSchema = new mongoose.Schema({
  parentName: String,
  studentRollNo: String,
  mobilenumber: Number,
  parentEmail: String,
});

const User = new mongoose.model("user", userSchema);

const studentDetails = new mongoose.model(
  "studentDetails",
  studentDetailsSchema
);
const Teacherinfo = new mongoose.model("teacher", teacherSchema);
const ParentInfo = new mongoose.model("parent", parentSchema);

//Login user
app.post("/login", function (req, res) {
  var { email, password, id } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        console.log("Login suceessfull", user);
        res.send({ message: "Login Sucessfull", user: user });

        console.log("user id", email);
      } else {
        console.log("password didn't match ");
        res.send({ message: "password didn't match", user: user });
      }
    } else {
      console.log("User is not Register");
      res.send({ message: "user not Register" });
    }
  });
});

//Register new user (School Admin)
app.post("/register", function (req, res) {
  console.log(req.body);
  const { name, email, password } = req.body;
  //if user already present
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      console.log("message: user already register");
      res.send({ message: "user already register" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "sucessfully Register" });
        }
      });
    }
  });
});

//New Schema for Student Data Base

app.post("/addStudent", function (req, res) {
  const {
    studentName,
    studentEmail,
    studentStandard,
    studentRollNo,
    englishTermOneMarks,
    hindiTermOneMarks,
    scienceTermOneMarks,
    socialScienceTermOneMarks,
    mathTermOneMarks,
    totalTermOneMarks,
    englishTermTwoMarks,
    hindiTermTwoMarks,
    scienceTermTwoMarks,
    socialScienceTermTwoMarks,
    mathTermTwoMarks,
    totalTermTwoMarks,
    englishTermThreeMarks,
    hindiTermThreeMarks,
    scienceTermThreeMarks,
    socialScienceTermThreeMarks,
    mathTermThreeMarks,
    totalTermThreeMarks,
  } = req.body;

  studentDetails.findOne({ studentRollNo: studentRollNo }, (err, student) => {
    if (student) {
      console.log("message: user already register");
      res.send({ message: "user already register" });
    } else {
      const student = new studentDetails({
        studentName,
        studentEmail,
        studentStandard,
        studentRollNo,
        englishTermOneMarks,
        hindiTermOneMarks,
        scienceTermOneMarks,
        socialScienceTermOneMarks,
        mathTermOneMarks,
        totalTermOneMarks,
        englishTermTwoMarks,
        hindiTermTwoMarks,
        scienceTermTwoMarks,
        socialScienceTermTwoMarks,
        mathTermTwoMarks,
        totalTermTwoMarks,
        englishTermThreeMarks,
        hindiTermThreeMarks,
        scienceTermThreeMarks,
        socialScienceTermThreeMarks,
        mathTermThreeMarks,
        totalTermThreeMarks,
      });
      student.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "sucessfully ADD" });
        }
      });
    }
  });
});

app.post("/addTeacher", function (req, res) {
  const { teacherNo, teacherName, teacherMobileNo, teacherEmailId } = req.body;
  Teacherinfo.findOne(
    { teacherEmailId: teacherEmailId },

    (err, teacher) => {
      if (teacher) {
        console.log("teacher is already present ");
        res.send({ message: "teacher is already present" });
      } else {
        const teacher = new Teacherinfo({
          teacherNo,
          teacherName,
          teacherMobileNo,
          teacherEmailId,
        });
        teacher.save((err) => {
          if (err) {
            res.send(err);
          } else {
            res.send({ message: "sucessfully ADD" });
          }
        });
      }
    }
  );
});

//add Parent--***
app.post("/addParent", function (req, res) {
  const { parentName, studentRollNo, mobilenumber, parentEmail } = req.body;
  ParentInfo.findOne({ parentEmail: parentEmail }, (err, parent) => {
    if (parent) {
      console.log("Parent Data is already present");
      res.send({ message: "Parent is already add" });
    } else {
      const parent = new ParentInfo({
        parentName,
        studentRollNo,
        mobilenumber,
        parentEmail,
      });
      parent.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Sucessfully  ADD  Parent" });
        }
      });
    }
  });
});

//get teacher's Data

app.get("/addTeacher", async (req, res) => {
  Teacherinfo.find({}, (err, data) => {
    console.log("Teacher Data", data);
    res.send(data);
  });
});

//get Parent Data
app.get("/addParent", async (req, res) => {
  ParentInfo.find({}, (err, data) => {
    console.log("Parent Data", data);
    res.send(data);
  });
});

//get Student's Data
app.get("/addStudent", async (req, res) => {
  studentDetails.find({}, (err, data) => {
    console.log("Add Student", data);
    res.send(data);
  });
});

//get user profile
app.get("/loginUser", async (req, res) => {
  var id = "625d830726be2de950722e42";
  User.findById(id, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("data :", data);
      res.send(data);
    }
  });
});

//Delete the Student data
app.delete("/student/:id", async (req, res) => {
  try {
    const deleteStudent = await studentDetails.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(400).send();
    }
    res.send(deleteStudent);
  } catch (e) {
    res.status(500).send(e);
  }
});

//delete the teacher data
app.delete("/teacher/:id", async (req, res) => {
  try {
    const deleteTeacher = await Teacherinfo.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(400).send();
    }
    res.send(deleteTeacher);
  } catch (e) {
    res.status(500).send(e);
  }
});

//update single Student  Data

app.put("/studentUpdate/:id", async (req, res) => {
  let result = await studentDetails.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

//update single teacher data
app.put("/teacherUpdate/:id", async (req, res) => {
  const updateTeacherInfo = await Teacherinfo.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(updateTeacherInfo);
});

app.get("/studentInfo/:id", async (req, res) => {
  const studentData = await studentDetails.findOne({ _id: req.params.id });
  if (studentData) {
    res.send(studentData);
  } else {
    res.send({ message: "No record Found " });
  }
});

//getting single Teacher data
app.get("/teacherInfo/:id", async (req, res) => {
  const teacherData = await Teacherinfo.findOne({ _id: req.params.id });
  if (teacherData) {
    res.send(teacherData);
  } else {
    res.send({ message: "No record Found " });
  }
});

//getting user profile (dynamic)
app.get("/profile/:id", async (req, res) => {
  const UserProfileData = await User.findOne({ email: req.params.email });
  if (UserProfileData) {
    res.send(UserProfileData);
  } else {
    res.send({ message: "No record Found " });
  }
});

/* Search API for the Student  */
app.get("/StudentSearch/:key", async (req, resp) => {
  let StudentSearch = await studentDetails.find({
    $or: [{ studentName: { $regex: req.params.key } }],
  });
  console.log("Student Search Result ", StudentSearch);
  resp.send(StudentSearch);
});

app.post("/teacherLogin", async (req, res) => {
  console.log(req.body);
  if (req.body.teacherEmailId && req.body.teacherNo) {
    let TeacherLogin = await Teacherinfo.findOne(req.body);
    if (TeacherLogin) {
      res.send(TeacherLogin);
    } else {
      res.send({ message: "No User Found " });
    }
  } else {
    res.send({ message: "No User Found " });
  }
});

app.post("/parentLogin", async (req, res) => {
  if (req.body.studentRollNo && req.body.parentEmail) {
    let ParentLogin = await ParentInfo.findOne(req.body);
    if (ParentLogin) {
      res.send(ParentLogin);
    } else {
      res.send({ message: "No User Found " });
    }
  } else {
    res.send({ message: "No User Found " });
  }
});

/*Search API for the Teacher  search */
app.get("/TeacherSearch/:key", async (req, res) => {
  console.log("what kind of data is pass", req.params.key);
  let TeacherSearch = await Teacherinfo.find({
    $or: [{ teacherName: { $regex: req.params.key } }],
  });
  res.send(TeacherSearch);
});

app.listen(8085, () => {
  console.log(" Running on the localhost:8085");
});
