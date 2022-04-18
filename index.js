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

const studentSchema = new mongoose.Schema({
  studentName: String,
  studentEmail: String,
  studentStandard: String,
  studentRollNo: Number,
});
const teacherSchema = new mongoose.Schema({
  teacherNo: String,
  teacherName: String,
  teacherMobileNo: Number,
  teacherEmailId: String,
});
const parentSchema = new mongoose.Schema({
  parentName: String,
  studentRollNo: Number,
  mobilenumber: Number,
  parentEmail: String,
});

const User = new mongoose.model("user", userSchema);
const Studentinfo = new mongoose.model("student", studentSchema);
const Teacherinfo = new mongoose.model("teacher", teacherSchema);
const ParentInfo = new mongoose.model("parent", parentSchema);

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/login", function (req, res) {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        console.log("Login suceessfull", user);
        res.send({ message: "Login Sucessfull", user: user });
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

app.post("/addStudent", function (req, res) {
  const { studentName, studentEmail, studentStandard, studentRollNo } =
    req.body;
  Studentinfo.findOne({ studentEmail: studentEmail }, (err, student) => {
    if (student) {
      console.log("message: user already register");
      res.send({ message: "user already register" });
    } else {
      const student = new Studentinfo({
        studentName,
        studentEmail,
        studentStandard,
        studentRollNo,
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
  Teacherinfo.findOne({ teacherEmailId: teacherEmailId }, (err, teacher) => {
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
  });
});

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

app.get("/addTeacher", async (req, res) => {
  Teacherinfo.find({}, (err, data) => {
    console.log("Teacher Data", data);
    res.send(data);
  });
});

app.get("/addParent", async (req, res) => {
  ParentInfo.find({}, (err, data) => {
    console.log("Parent Data", data);
    res.send(data);
  });
});

app.get("/addStudent", async (req, res) => {
  Studentinfo.find({}, (err, data) => {
    console.log("Add Student", data);
    res.send(data);
  });
});

app.get("/loginUser", async (req, res) => {
  User.find({}, (err, user) => {
    console.log("Login suceessfull", user);
    res.send(user);
  });
});

app.listen(8085, () => {
  console.log(" Running on the localhost:8085");
});
