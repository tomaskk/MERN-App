const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let User = new Schema({
  person_name: {
    type: String
  },
  person_lastname: {
    type: String
  },
  city: {
    type: String
  },
  person_address: {
    type: String
  },
  zip_code: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  }
},{
    collection: 'Users'
});
mongoose.set('useAndModify', false);
module.exports = mongoose.model('User', User);