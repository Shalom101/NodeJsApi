var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
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


