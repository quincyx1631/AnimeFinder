import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InfoList } from "./AnimeItem/InfoList";
import { Synopsis } from "./AnimeItem/Synopsis";
import { Trailer } from "./AnimeItem/Trailer";
import { CharacterCard } from "./AnimeItem/CharacterCard";
import { RecommendationCard } from "./AnimeItem/RecommendationCard";

import {
  fetchAnime,
  fetchCharacters,
  fetchRecommendations,
} from "./AnimeItem/animeApi";
import { AnimeDetails, AnimeCharacter } from "./AnimeItem/anime";

function AnimeItem() {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<AnimeDetails>({} as AnimeDetails);
  const [characters, setCharacters] = useState<AnimeCharacter[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAnimeData = async () => {
      if (id) {
        const animeData = await fetchAnime(id);
        setAnime(animeData.data);

        const charactersData = await fetchCharacters(id);
        setCharacters(charactersData.data);

        if (animeData.data.genres?.length > 0) {
          const randomGenre =
            animeData.data.genres[
              Math.floor(Math.random() * animeData.data.genres.length)
            ];
          const recommendationsData = await fetchRecommendations(
            randomGenre.mal_id
          );
          setRecommendations(
            recommendationsData.data
              .filter((a: any) => a.mal_id !== Number(id))
              .slice(0, 6)
          );
        }

        setIsLoading(false);
      }
    };

    loadAnimeData();
  }, [id]);

  return (
    <div className="container-fluid my-5">
      <h1 className="display-4 mb-4 text-center">{anime.title}</h1>

      <div className="row g-5 justify-content-center">
        <div className="col-md-8 border p-4 rounded shadow">
          <div className="row g-4">
            <div className="col-md-4">
              <img
                src={anime.images?.jpg.large_image_url}
                alt={anime.title}
                className="img-fluid rounded shadow"
                style={{ height: "575px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-8">
              <InfoList anime={anime} />
              <Synopsis
                synopsis={anime.synopsis || ""}
                showMore={showMore}
                setShowMore={setShowMore}
              />
            </div>
          </div>
        </div>
      </div>

      <h3 className="mt-5 text-center">Trailer</h3>
      <Trailer embedUrl={anime.trailer?.embed_url || ""} />

      {/* Characters Section */}
      <div className="container my-5">
        <h3 className="text-center mb-4">Characters</h3>
        <div className="row">
          {characters.slice(0, 6).map((character) => (
            <CharacterCard
              key={character.character.mal_id}
              character={character}
            />
          ))}
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="container my-5">
        <h3 className="text-center mb-4">Recommendations</h3>
        {isLoading ? (
          <div className="text-center">
            <p>Loading recommendations...</p>
          </div>
        ) : recommendations.length > 0 ? (
          <div className="row">
            {recommendations.map((anime) => (
              <RecommendationCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p>No recommendations available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnimeItem;
