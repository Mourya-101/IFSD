const express = require('express');
const prompt = require('prompt-sync')();

const app = express();
const PORT = 3000;

class Animal {
  constructor(name, lifeExpectancy) {
    this.name = name;
    this.lifeExpectancy = lifeExpectancy;
  }
}

class Zoo {
  constructor() {
    this.animals = [];
  }

  inputAnimals(numberOfAnimals) {
    for (let i = 0; i < numberOfAnimals; i++) {
      const name = prompt(`Enter the name of animal ${i + 1}:`);
      const lifeExpectancy = parseInt(prompt(`Enter the life expectancy of ${name}:`));
      const animal = new Animal(name, lifeExpectancy);
      this.animals.push(animal);
    }            
  }

  getAnimalsAliveAfterYears(n) {
    let aliveCount = 0;
    for (let i = 0; i < this.animals.length; i++) {
      const animal = this.animals[i];
      const remainingYears = animal.lifeExpectancy - n;
      if (remainingYears > 0) {
        aliveCount++;
      }
    }
    return aliveCount;
  }
}

app.use(express.json());

app.post('/animals', (req, res) => {
  const numberOfAnimals = req.body.numberOfAnimals;
  const years = req.body.years;

  const zoo = new Zoo();
  zoo.inputAnimals(numberOfAnimals);
  const animalsAlive = zoo.getAnimalsAliveAfterYears(years);

  res.json({ animalsAlive });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
