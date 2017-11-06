var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
const cors 			 = require('cors');

module.exports = function(app, db) {


const mongoose = require('mongoose');
mongoose.connect('mongodb://shalom:64387605@ds159330.mlab.com:59330/school_management');
	var Schema = mongoose.Schema;
	var studentSchema = new Schema({
	  studentNo: Number,
	  firstname: { type: String, required: true, unique: true },
	  lastname: { type: String, required: true },
	  class: String
  });

	

  app.get('/students/',(req,res) => {

  	var Student = mongoose.model('Student', studentSchema);
	module.exports = Student;

	Student.find({}, function(err, students) {
  if (err) throw err;

  console.log(students);

  res.send(students);

  })
});


	app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials" ,"true");
  next();
});



  app.get('/students/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('students').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });



  app.post('/students', (req, res) => {
    const student = { studentNo: req.body.no, firstname: req.body.fname, lastname: req.body.lname, class: req.body.class};
    db.collection('students').insert(student, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });




  app.put('/students/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const student = { studentNo: req.body.no, firstname: req.body.fname, lastname: req.body.lname, class: req.body.class };
    db.collection('students').update(details, student, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(student);
      }
    });
  });



  app.delete('/students/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('students').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('student ' + id + ' deleted!');
      }
    });
  });
};


