import React, { useState } from 'react';

class Animal {
  constructor(name, lifeExpectancy) {
    this.name = name;
    this.lifeExpectancy = lifeExpectancy;
  }
}

class Zoo {
  constructor() {
    this.animals = []; // creates an array
  }

  inputAnimals() {
    const numberOfAnimals = parseInt(prompt('Enter the number of animals:'));

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

function ZooWidget({ onClose }) {
  const [years, setYears] = useState(0);
  const [animalsAlive, setAnimalsAlive] = useState(0);
  const zoo = new Zoo();

  const handleInputAnimals = () => {
    zoo.inputAnimals();
  };

  const handleShowAnimalsAfterYears = () => {
    const animalsAlive = zoo.getAnimalsAliveAfterYears(years);
    setAnimalsAlive(animalsAlive);
  };

  return (
    <div>
      <h1>Welcome to the Zoo Widget</h1>
      <button onClick={handleInputAnimals}>Input Animals</button>
      <div>
        <label>Enter the number of years:</label>
        <input type="number" value={years} onChange={(e) => setYears(parseInt(e.target.value))} />
      </div>
      <button onClick={handleShowAnimalsAfterYears}>Show Animals Alive</button>
      <p>Number of animals alive after {years} years: {animalsAlive}</p>
      <button onClick={onClose}>Close Widget</button>
    </div>
  );
}

function Scene() {
  const [widgetVisible, setWidgetVisible] = useState(false);

  const handleOpenWidget = () => {
    setWidgetVisible(true);
  };

  const handleCloseWidget = () => {
    setWidgetVisible(false);
  };

  return (
    <div>
      <h1>Welcome to the Scene</h1>
      <button onClick={handleOpenWidget}>Open Widget</button>
      {widgetVisible && <ZooWidget onClose={handleCloseWidget} />}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Scene />
    </div>
  );
}

export default App;
