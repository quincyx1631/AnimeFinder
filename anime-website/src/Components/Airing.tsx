import { useGlobalContext } from "../context/global";
import { Link } from "react-router-dom";

// Add this interface for the props
interface AiringProps {
  rendered: string;
}

// Add the prop type to the component
function Airing({ rendered }: AiringProps) {
  const { airingAnime, isSearch, searchResult } = useGlobalContext();

  const conditionalRender = () => {
    if (!isSearch && rendered === "airing") {
      return (
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
          {airingAnime.map((anime) => (
            <div key={anime.mal_id} className="col">
              <Link
                to={`/anime/${anime.mal_id}`}
                className="text-decoration-none text-center d-block"
              >
                <div className="card border-0 h-100">
                  <img
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    className="img-fluid rounded"
                    style={{
                      height: "450px",
                      width: "85%",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body p-2">
                    <h6 className="text-dark anime-title mb-0">
                      {anime.title.length > 25
                        ? `${anime.title.substring(0, 25)}...`
                        : anime.title}
                    </h6>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
          {searchResult.map((anime) => (
            <div key={anime.mal_id} className="col">
              <Link
                to={`/anime/${anime.mal_id}`}
                className="text-decoration-none text-center d-block"
              >
                <div className="card border-0 h-100">
                  <img
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    className="img-fluid rounded"
                    style={{
                      height: "450px",
                      width: "85%",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body p-2">
                    <h6 className="text-dark anime-title mb-0">
                      {anime.title.length > 25
                        ? `${anime.title.substring(0, 25)}...`
                        : anime.title}
                    </h6>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return <div className="container-fluid px-4 py-4">{conditionalRender()}</div>;
}

export default Airing;
