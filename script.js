function searchChar() {
  const charName = document.getElementById('charName').value.trim().toLowerCase();
  const charInfoDiv = document.getElementById('charInfo');
  

  charInfoDiv.innerHTML = '';

  fetch('https://hp-api.herokuapp.com/api/characters')
    .then(response => response.json())
    .then(data => {
      const charName = data.find(char => {
        const [firstName, ...lastNameParts] = char.name.toLowerCase().split(' ');
        const lastName = lastNameParts.join(' ');
        const fullName = char.name.toLowerCase();

        return firstName === charName || lastName === charName || fullName === charName;
      });

      if (charName) {
        const charDetails = `
          <h2>${charName.name}</h2>
          <p>House: ${charName.house || 'Unknown'}</p>
          <p>Actor: ${charName.actor || 'Unknown'}</p>
          <p>Ancestry: ${charName.ancestry || 'Unknown'}</p>
          <p>Species: ${charName.species || 'Unknown'}</p>
          <img src="${charName.image}" alt="${charName.name}" width="150px">
        `;
        charInfoDiv.innerHTML = charDetails;
      } else {

        charInfoDiv.textContent = 'Character not found :(';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      charInfoDiv.textContent = 'Data not found :).';
    });

  return false; 
}
