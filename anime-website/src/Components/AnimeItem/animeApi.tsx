const API_BASE_URL = "https://api.jikan.moe/v4";

export const fetchAnime = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/anime/${id}/full`);
  return response.json();
};

export const fetchCharacters = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/anime/${id}/characters`);
  return response.json();
};

export const fetchRecommendations = async (genreId: number) => {
  const response = await fetch(
    `${API_BASE_URL}/anime?genres=${genreId}&order_by=score&sort=desc&limit=9`
  );
  return response.json();
};
