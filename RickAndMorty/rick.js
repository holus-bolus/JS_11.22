fetch('https://rickandmortyapi.com/api/character')
  .then((response) => response.json())
  .then((data) => logData(data.results));

function logData(characters, name, episode) {
  characters.forEach((character) => {
    console.log(character.name, character.episode);
  });
}

class RickAndMorty {
  async getCharacter(character, id) {
    if (isFinite(id) || isFinite(character)) {
      throw new Error();
    }
    if (!id || !character) {
      return null;
    }
    return character.id === id;
  }

  async getEpisode(episodeId, character) {
    if (isFinite(episodeId)) {
      throw new Error();
    }
    character.episode.filter((item) => item.episode);
  }
}
