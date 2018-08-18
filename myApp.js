/**********************************************
* 3. FCC Mongo & Mongoose Challenges
* ==================================
***********************************************/

/** # MONGOOSE SETUP #
/*  ================== */

/** 1) Install & Set up mongoose */

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

/** # SCHEMAS and MODELS #

/** 2) Create a 'Person' Model */

// - Person Prototype -
// --------------------
// name : string [required]
// age :  number
// favoriteFoods : array of strings (*)

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {type:String, required: true},
  age: {type: Number},
  favoriteFoods: {type: Array}
})

const Person = mongoose.model('Person', personSchema);

/** # [C]RUD part I - CREATE #
/*  ========================== */

/** 3) Create and Save a Person */

var createAndSavePerson = function(done) {
  const myPerson = new Person({
    name: "Diana",
    age: 29,
    favoriteFoods: ['carne', 'chicharritas', 'camarones']
  })
  
  myPerson.save((err, data) => {
    if(err){
      return done(err);
    }
    return done(null, data);
  })
};

/** 4) Create many People with `Model.create()` */

var createManyPeople = function(arrayOfPeople, done) {
    Person.create(arrayOfPeople, (err, data)=>{
      if(err){
        return done(err);
      }
      return done(null, data);
    });
};

/** # C[R]UD part II - READ #
/*  ========================= */

/** 5) Use `Model.find()` */

var findPeopleByName = function(personName, done) {
  Person.find({name: personName}, (err, data) => {
    if(err){
        return done(err);
      }
    return done(null, data);
  })
};

/** 6) Use `Model.findOne()` */

var findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if(err){
        return done(err);
      }
    return done(null, data);
  }) 
};

/** 7) Use `Model.findById()` */

var findPersonById = function(personId, done) {
  Person.findById({_id: personId}, (err, data) => {
    if(err){
        return done(err);
      }
    return done(null, data);
  }) 
};

/** # CR[U]D part III - UPDATE # 
/*  ============================ */

/** 8) Classic Update : Find, Edit then Save */

var findEditThenSave = function(personId, done) {
  var foodToAdd = 'hamburger';
  
  Person.findById({_id: personId}, (err, personFound) => {
    if(err){
        return done(err);
      }
    personFound.favoriteFoods.push(foodToAdd);
    personFound.save((error, data) => {
      if(err){
        return done(error);
      }
      return done(null, data);
    })
  }) 
};

/** 9) New Update : Use `findOneAndUpdate()` */

var findAndUpdate = function(personName, done) {
  var ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age:20}, {new: true}, (err, data) => {
    if(err){
        return done(err);
      }
    return done(null, data);
  })
};

/** # CRU[D] part IV - DELETE #
/*  =========================== */

/** 10) Delete one Person */

var removeById = function(personId, done) {
  Person.findByIdAndRemove({_id: personId}, (err, data) => {
    if(err){
        return done(err);
      }
    return done(null, data);
  })
};

/** 11) Delete many People */

var removeManyPeople = function(done) {
  var nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => {
    if(err){
        return done(err);
      }
    return done(null, data);
  })
};

/** # C[R]UD part V -  More about Queries # 
/*  ======================================= */

/** 12) Chain Query helpers */

// If you don't pass the `callback` as the last argument to `Model.find()`
// (or to the other similar search methods introduced before), the query is
// not executed, and can even be stored in a variable for later use.
// This kind of object enables you to build up a query using chaining syntax.
// The actual db search is executed when you finally chain
// the method `.exec()`, passing your callback to it.

var queryChain = function(done) {
  var foodToSearch = "burrito";
  const query = Person.find({favoriteFoods: foodToSearch})
        .sort({name: 1})
        .limit(2)
        .select({age: 0})
  
  query.exec((err, data) => {
    if(err){
      return done(err);
    }
    return done(null, data);
  })
};


//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
