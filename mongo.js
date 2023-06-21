const prompt = require('prompt-sync')();
const { MongoClient } = require('mongodb');

class Animal {
  constructor(name, lifeExpectancy) {
    this.name = name;
    this.lifeExpectancy = lifeExpectancy;
  }
}

class Zoo {
  constructor() {
    this.animals = [];
    this.db = null;
  }

  async connectToDatabase() {
    const uri = 'mongodb+srv://mouryakbsc22:1234@cluster0.hccnmwz.mongodb.net/?retryWrites=true&w=majority'; // Update with your MongoDB connection string
    const client = new MongoClient(uri);
    await client.connect();
    this.db = client.db('zoo'); // Update with your database name
  }

  async inputAnimals() {
    const numberOfAnimals = parseInt(prompt("Enter the number of animals:"));

    for (let i = 0; i < numberOfAnimals; i++) {
      const name = prompt(`Enter the name of animal ${i + 1}:`);
      const lifeExpectancy = parseInt(prompt(`Enter the life expectancy of ${name}:`));
      const animal = new Animal(name, lifeExpectancy);
      this.animals.push(animal);

      // Save the animal to the database
      await this.db.collection('animals').insertOne(animal);
    }
  }

  async getAnimalsAliveAfterYears(n) {
    const currentYear = new Date().getFullYear();
    const filter = { lifeExpectancy: { $gt: currentYear + n } };
    const aliveAnimals = await this.db.collection('animals').find(filter).toArray();
    return aliveAnimals.length;
  }
}

async function main() {
  const zoo = new Zoo();

  await zoo.connectToDatabase();

  zoo.inputAnimals();

  const years = parseInt(prompt("Enter the number of years:"));
  const animalsAlive = await zoo.getAnimalsAliveAfterYears(years);
  console.log(`Number of animals alive after ${years} years: ${animalsAlive}`);
}

main();
