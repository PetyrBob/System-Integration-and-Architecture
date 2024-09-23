//Petern Bobs

function searchChar() {
  const charName = document.getElementById('charName').value.toLowerCase();

  fetch('https://hp-api.herokuapp.com/api/characters')
    .then(response => response.json())
    .then(data => {
      const charInfo = document.getElementById('charInfo');
      charInfo.innerHTML = ''; 

      const foundCharacter = data.find(character => {
        const [firstName, ...lastNameParts] = character.name.toLowerCase().split(' ');
        const lastName = lastNameParts.join(' ');
        const fullName = character.name.toLowerCase();

        return firstName === charName || lastName === charName || fullName === charName;
      });

      if (foundCharacter) {
        const characterDiv = document.createElement('div');
        const name = document.createElement('h3');
        name.textContent = `Name: ${foundCharacter.name}`;
        const house = document.createElement('p');
        house.textContent = `House: ${foundCharacter.house}`;
        const ancestry = document.createElement('p');
        ancestry.textContent = `Ancestry: ${foundCharacter.ancestry || 'Unknown'}`;
        const patronus = document.createElement('p');
        patronus.textContent = `Patronus: ${foundCharacter.patronus || 'None'}`;
        const dateOfBirth = document.createElement('p');
        dateOfBirth.textContent = `Date of Birth: ${foundCharacter.dateOfBirth || 'Unknown'}`;
        const species = document.createElement('p');
        species.textContent = `Species: ${foundCharacter.species || 'Human'}`;
        const gender = document.createElement('p');
        gender.textContent = `Gender: ${foundCharacter.gender || 'Unknown'}`;
        const hairColour = document.createElement('p');
        hairColour.textContent = `Hair Color: ${foundCharacter.hairColour || 'Unknown'}`;
        const eyeColour = document.createElement('p');
        eyeColour.textContent = `Eye Color: ${foundCharacter.eyeColour || 'Unknown'}`;

        const image = document.createElement('img');
        image.src = foundCharacter.image;
        image.alt = foundCharacter.name;
        image.style.width = '150px';

        characterDiv.appendChild(name);
        characterDiv.appendChild(house);
        characterDiv.appendChild(ancestry);
        characterDiv.appendChild(patronus);
        characterDiv.appendChild(dateOfBirth);
        characterDiv.appendChild(species);
        characterDiv.appendChild(gender);
        characterDiv.appendChild(hairColour);
        characterDiv.appendChild(eyeColour);
        characterDiv.appendChild(image);
        charInfo.appendChild(characterDiv);
      } else {
        charInfo.textContent = 'Character not found.';
      }
    })
    .catch(error => console.error('Error fetching data:', error));

  return false;
}
