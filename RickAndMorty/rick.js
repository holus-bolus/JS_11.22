const HOST = 'https://rickandmortyapi.com/api/';

function request(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => {
        reject(error);
      });
  });
}

class RickAndMorty {
  getCharacter(characterId) {
    if (!isFinite(characterId)) {
      throw new Error();
    }
    return new Promise((resolve, reject) => {
      request(`${HOST}character/${characterId}`)
        .then((character) => {
          if (character.error) {
            resolve(null);
          } else {
            resolve(character);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getEpisode(episodeId) {
    if (!isFinite(episodeId)) {
      throw new Error();
    }
    const episode = await request(`${HOST}episode/${episodeId}`);
    if (episode.error) {
      return null;
    }
    return episode;
  }
}
