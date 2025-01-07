import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { InfoList } from "./AnimeItem/InfoList";
import { Synopsis } from "./AnimeItem/Synopsis";
import { Trailer } from "./AnimeItem/Trailer";
import { CharacterCard } from "./AnimeItem/CharacterCard";
import { RecommendationCard } from "./AnimeItem/RecommendationCard";
import { useGlobalContext } from "../context/global";

import {
  fetchAnime,
  fetchCharacters,
  fetchRecommendations,
} from "./AnimeItem/animeApi";
import { AnimeDetails, AnimeCharacter } from "./AnimeItem/anime";

interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  score?: number;
}

export interface AnimeCharacterBox {
  mal_id: number;
  name: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  role: string;
}

function AnimeItem() {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<AnimeDetails>({} as AnimeDetails);
  const [characters, setCharacters] = useState<AnimeCharacter[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {
    handleSubmit,
    handleChange,
    search,
    getPopularAnime,
    getAiringAnime,
    getUpcomingAnime,
  } = useGlobalContext();

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
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
        <div className="container-fluid">
          {/* AnimeFinder logo */}
          <Link to="/" className="navbar-brand fw-bold text-primary">
            AnimeFinder
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse px-3" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/"
                  className="btn btn-outline-primary mx-2"
                  onClick={getPopularAnime}
                >
                  Popular
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/"
                  className="btn btn-outline-primary mx-2"
                  onClick={getAiringAnime}
                >
                  Airing
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/"
                  className="btn btn-outline-primary mx-2"
                  onClick={getUpcomingAnime}
                >
                  Upcoming
                </Link>
              </li>
            </ul>

            {/* Title Text (Centered) */}
            <div className="mx-auto">
              <span className="navbar-text fw-bold text-primary h3 px-4">
                Anime Details
              </span>
            </div>

            {/* Search Bar */}
            <form
              onSubmit={handleSubmit}
              className="d-flex align-items-center ms-auto"
            >
              <input
                type="text"
                placeholder="Search anime..."
                value={search}
                onChange={handleChange}
                className="form-control me-2"
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

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
          {characters.length > 0 ? (
            <div
              id="charactersCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {characters
                  .reduce((result: AnimeCharacterBox[][], character, index) => {
                    const chunkIndex = Math.floor(index / 3);
                    if (!result[chunkIndex]) result[chunkIndex] = [];
                    result[chunkIndex].push({
                      mal_id: character.character.mal_id,
                      name: character.character.name,
                      images: {
                        jpg: {
                          large_image_url:
                            character.character.images.jpg.image_url,
                        },
                      },
                      role: character.role,
                    });
                    return result;
                  }, [])
                  .map((slide, index) => (
                    <div
                      key={index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                      <div className="row">
                        {slide.map((character) => (
                          <CharacterCard
                            key={character.mal_id}
                            character={character}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#charactersCarousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#charactersCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p>No characters available</p>
            </div>
          )}
        </div>

        {/* Recommendations Section */}
        <div className="container my-5">
          <h3 className="text-center mb-4">Recommendations</h3>
          {isLoading ? (
            <div className="text-center">
              <p>Loading recommendations...</p>
            </div>
          ) : recommendations.length > 0 ? (
            <div
              id="recommendationsCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {recommendations
                  .reduce((result: Anime[][], anime, index) => {
                    const chunkIndex = Math.floor(index / 3);
                    if (!result[chunkIndex]) result[chunkIndex] = [];
                    result[chunkIndex].push(anime);
                    return result;
                  }, [])
                  .map((slide: Anime[], index: number) => (
                    <div
                      key={index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                      <div className="row">
                        {slide.map((anime) => (
                          <div className="col-md-4" key={anime.mal_id}>
                            <RecommendationCard anime={anime} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#recommendationsCarousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#recommendationsCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p>No recommendations available</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AnimeItem;
