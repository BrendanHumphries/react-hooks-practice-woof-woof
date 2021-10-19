import React from "react";

function DogInfo({name, image, isGoodDog, handleGoodDogButtonClick}) {
    return (
        <>
            <img src={image} alt={name}></img>
            <h2>{name}</h2>
            <button onClick={handleGoodDogButtonClick}>{isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>
        </>
    )
}

export default DogInfo;