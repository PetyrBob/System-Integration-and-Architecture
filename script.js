function searchChar() {
  const charName = document.getElementById('charName').value.trim().toLowerCase();
  const charInfoDiv = document.getElementById('charInfo');
  

  charInfoDiv.innerHTML = '';

  fetch('https://hp-api.herokuapp.com/api/characters')
    .then(response => response.json())
    .then(data => {
      const character = data.find(char => {
        const [firstName, ...lastNameParts] = char.name.toLowerCase().split(' ');
        const lastName = lastNameParts.join(' ');
        const fullName = char.name.toLowerCase();

        return firstName === charName || lastName === charName || fullName === charName;
      });

      if (character) {
        const charDetails = `
          <h2>${character.name}</h2>
          <p>House: ${character.house || 'Unknown'}</p>
          <p>Actor: ${character.actor || 'Unknown'}</p>
          <p>Ancestry: ${character.ancestry || 'Unknown'}</p>
          <p>Species: ${character.species || 'Unknown'}</p>
          <img src="${character.image}" alt="${character.name}" width="150px">
        `;
        charInfoDiv.innerHTML = charDetails;
      } else {

        charInfoDiv.textContent = 'Character not found :(';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      charInfoDiv.textContent = 'Errorr fetching character datas. Please try again later! :).';
    });

  return false; 
}
