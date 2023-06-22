import React, { useState } from 'react';

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

function ZooWidget() {
  const [numberOfAnimals, setNumberOfAnimals] = useState(0);
  const [years, setYears] = useState(0);
  const [animalsAlive, setAnimalsAlive] = useState(0);

  const handleNumberOfAnimalsChange = (event) => {
    setNumberOfAnimals(parseInt(event.target.value));
  };

  const handleYearsChange = (event) => {
    setYears(parseInt(event.target.value));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const zoo = new Zoo();
    zoo.inputAnimals(numberOfAnimals);
    const animalsAlive = zoo.getAnimalsAliveAfterYears(years);
    setAnimalsAlive(animalsAlive);
  };

  return (
    <div>
      <h1>Zoo Widget</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="numberOfAnimals">Number of Animals:</label>
        <input
          type="number"
          id="numberOfAnimals"
          value={numberOfAnimals}
          onChange={handleNumberOfAnimalsChange}
        />
        <br />
        <label htmlFor="years">Number of Years:</label>
        <input
          type="number"
          id="years"
          value={years}
          onChange={handleYearsChange}
        />
        <br />
        <button type="submit">Calculate</button>
      </form>
      <p>Number of animals alive after {years} years: {animalsAlive}</p>
    </div>
  );
}

export default ZooWidget;
