const {getInstance} = require('../db/mongodb');
const mongoCreds = require('../db/config')().getMongoCredntails()
const tableName = mongoCreds.table
const databaseName = mongoCreds.database

const candidates = [
  {name: 'Bibi Habibi', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Benjamin_Netanyahu_2018.jpg'},
  {name: 'Benny Gantz', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Benny_Gantz_2019.jpg'},
  {name: 'Chuck Norris', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Chuck_Norris_May_2015.jpg'}
];

const getCandidates = async(req, res, next) => {
  try {
    const mongo = await getInstance();
    const database = await mongo.db(databaseName);
    const collection = await database.collection(tableName);
    
    const docs = 
      await collection
        .aggregate([
          { $group: {_id: '$data.event.name', votes: { $sum: 1 } } }
        ])
        .toArray()

    const mapCandidateToVote = docs.reduce((acc, doc) => ({
      ...acc, [doc._id]: doc.votes
    }), {});
    
    console.log(docs)
    console.log(mapCandidateToVote)
    const result = candidates.map(candidate => {
      return {...candidate, votes: mapCandidateToVote[candidate.name] || 0}
    })

    console.log(result);
    res.status(200).send(result);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = getCandidates;
