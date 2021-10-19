import React, {useEffect, useState} from "react";
import DogButton from "./DogButton";
import DogInfo from "./DogInfo";

function App() {
  const [dogList, setDogList] = useState([]);
  const [dogToDisplay, setDogToDisplay] = useState('');
  const [isFilterOn, setIsFilterOn] = useState(false);
  
  useEffect(() => {
    fetch('http://localhost:3001/pups')
      .then(resp => resp.json())
      .then(json => {
        setDogList(json);
      })
  }, []);

  function handleDogClick(dog) {
    setDogToDisplay(dog);
  }

  function handleGoodDogButtonClick() {
    fetch(`http://localhost:3001/pups/${dogToDisplay.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...dogToDisplay, isGoodDog: !dogToDisplay.isGoodDog})
    })
      .then(resp => resp.json())
      .then(json => {
        setDogToDisplay(json)
        if (isFilterOn) {
          if (json.isGoodDog) {
            setDogList([...dogList, json])
          } else {
            setDogList(dogList.filter(dog => {
              return dog.id !== json.id;
            }))
          }
        } else {
          setDogList(dogList.map(dog => {
            if (dog.id === json.id) {
              return json;
            } else {
              return dog;
            }
          }))
        }
        
      })
      .catch(error => {
        console.log(`Error: ${error}`)
      })
  }

  function handleFilterButtonClick() {
    if (isFilterOn) {
      setIsFilterOn(!isFilterOn)
      fetch('http://localhost:3001/pups')
        .then(resp => resp.json())
        .then(json => {
          setDogList(json);
        })
    } else {
      setIsFilterOn(!isFilterOn)
      setDogList(dogList.filter(dog => {
        return dog.isGoodDog === true;
      }))
    }
  }
  
  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter" onClick={handleFilterButtonClick}>Filter good dogs: {isFilterOn ? 'ON' : 'OFF'}</button>
      </div>
      <div id="dog-bar">
        {dogList.map(dog => {
          return (
            <DogButton key={dog.id} name={dog.name} dog={dog} handleDogClick={handleDogClick}/>
          )
        })}
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          {dogToDisplay === '' ? '' : <DogInfo name={dogToDisplay.name} image={dogToDisplay.image} isGoodDog={dogToDisplay.isGoodDog} handleGoodDogButtonClick={handleGoodDogButtonClick}/>}
        </div>
      </div>
    </div>
  );
}

export default App;