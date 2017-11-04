
const studentRoutes = require('./routes');
module.exports = function(app, db) {
  studentRoutes(app, db);
};
