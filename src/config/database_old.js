const { MongoClient } = require("mongodb");
const url = "mongodb+srv://barathbaisetty:7jXCFMDQwCreAGML@devtindermongo.wslqy.mongodb.net/?retryWrites=true&w=majority&appName=DevTinderMongo";
const client = new MongoClient(url);

// Database Name
const dbName = 'DevTinder';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('User');

  //Insert document
  const data = {
    firstName: "Suresh", lastName: "Pisupati", city: "Hyderabad", phoneNumber: "998899889"
  }
  const insertResult = await collection.insertMany([data]);
console.log('Inserted documents =>', insertResult);
  //Reading
  const findResult = await collection.find({}).toArray();
console.log('Found documents =>', findResult);
  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());