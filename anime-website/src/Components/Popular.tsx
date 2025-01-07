import { useGlobalContext } from "../context/global";
import { Link } from "react-router-dom";

interface PopularProps {
  rendered: string;
}

function Popular({ rendered }: PopularProps) {
  const { popularAnime, isSearch, searchResult } = useGlobalContext();

  const conditionalRender = () => {
    if (!isSearch && rendered === "popular") {
      return (
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
          {popularAnime.map((anime) => (
            <div key={anime.mal_id} className="col">
              <Link
                to={`/anime/${anime.mal_id}`}
                className="text-decoration-none text-center d-block"
              >
                <div className="card border-0 h-100 d-flex flex-column align-items-center">
                  <div className="text-center mt-3" style={{ width: "100%" }}>
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
                  </div>
                  <div
                    className="card-body p-2 d-flex justify-content-center"
                    style={{ width: "85%" }}
                  >
                    <h6 className="text-dark anime-title mb-0 text-center">
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
    } else if (searchResult.length > 0) {
      return (
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
          {searchResult.map((anime) => (
            <div key={anime.mal_id} className="col">
              <Link
                to={`/anime/${anime.mal_id}`}
                className="text-decoration-none text-center d-block"
              >
                <div className="card border-0 h-100 d-flex flex-column align-items-center">
                  <div className="text-center mt-3" style={{ width: "100%" }}>
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
                  </div>
                  <div
                    className="card-body p-2 d-flex justify-content-center"
                    style={{ width: "85%" }}
                  >
                    <h6 className="text-dark anime-title mb-0 text-center">
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

export default Popular;
