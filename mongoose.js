const prompt = require('prompt-sync')();
const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: String,
  lifeExpectancy: Number
});

const Animal = mongoose.model('Animal', animalSchema);

class Zoo {
  constructor() {
    this.animals = [];
  }

  async connectToDatabase() {
    const uri = 'mongodb+srv://mouryakbsc22:1234@cluster0.hccnmwz.mongodb.net/zoo'; // Update with your MongoDB connection string
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to the database');
  }

  async disconnectFromDatabase() {
    await mongoose.disconnect();
    console.log('Disconnected from the database');
  }

  async inputAnimals() {
    const numberOfAnimals = parseInt(prompt('Enter the number of animals:'));

    for (let i = 0; i < numberOfAnimals; i++) {
      const name = prompt(`Enter the name of animal ${i + 1}:`);
      const lifeExpectancy = parseInt(prompt(`Enter the life expectancy of ${name}:`));
      const animal = new Animal({ name, lifeExpectancy });
      this.animals.push(animal);

      // Save the animal to the database
      await animal.save();
    }
  }

  async getAnimalsAliveAfterYears(n) {
    const currentYear = new Date().getFullYear();
    const aliveAnimals = await Animal.find({ lifeExpectancy: { $gt: currentYear + n } }).exec();
    return aliveAnimals.length;
  }
}

async function main() {
  const zoo = new Zoo();

  await zoo.connectToDatabase();

  await zoo.inputAnimals();

  const years = parseInt(prompt('Enter the number of years:'));
  const animalsAlive = await zoo.getAnimalsAliveAfterYears(years);
  console.log(`Number of animals alive after ${years} years: ${animalsAlive}`);

  await zoo.disconnectFromDatabase();
}

main();
