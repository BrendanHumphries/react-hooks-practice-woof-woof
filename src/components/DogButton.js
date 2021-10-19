import React from "react";

function DogButton({name, dog, handleDogClick}) {
    return (
        <>
            <span onClick={() => handleDogClick(dog)}>{name}</span>
        </>
    )
}

export default DogButton;