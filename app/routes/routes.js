var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var cors = require('cors');

var option = {
    server: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 50000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 50000
        }
    }
};

var mongoURI = process.env.MONGODB_URI;

module.exports = function(app, db) {
mongoose.connect('mongodb://shalom1:64387605@ds249605.mlab.com:49605/schooldata');

var Schema = mongoose.Schema;

var studentSchema = new Schema({
	firstname: { type: String, required: true, unique: true },
	lastname: { type: String, required: true },
	class: String,
	Grade: String
});


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var Student = mongoose.model('Student', studentSchema);

app.get('/students',(req,res,next) => {
	Student.find({}, function(err, students) {
	  if (err) throw err;

		res.send(students);
	});
});



  app.get('/students/:id', (req, res,next) => {
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



  app.post('/students', (req, res, next) => {
    const student = { Firstname: req.body.fname, Lastname: req.body.lname, Class: req.body.class , Grade: req.body.grade};
    db.collection('students').insert(student, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });




  app.put('/students/:id', (req, res, next) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
		const student = { Firstname: req.body.fname, Lastname: req.body.lname, Class: req.body.class , Grade: req.body.grade};
		db.collection('students').update(details, student, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(student);
      }
    });
  });



  app.delete('/students/:id', (req, res, next) => {
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
