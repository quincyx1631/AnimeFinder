import React from "react";
import Popular from "./Popular";
import { useGlobalContext } from "../context/global";
import Upcoming from "./Upcoming";
import Airing from "./Airing";
import { Link } from "react-router-dom";

function Homepage() {
  const [rendered, setRendered] = React.useState("popular");
  const {
    handleSubmit,
    handleChange,
    search,
    getUpcomingAnime,
    getPopularAnime,
    getAiringAnime,
  } = useGlobalContext();

  const switchComponent = () => {
    switch (rendered) {
      case "popular":
        return <Popular rendered={rendered} />;
      case "airing":
        return <Airing rendered={rendered} />;
      case "upcoming":
        return <Upcoming rendered={rendered} />;
      default:
        return <Popular rendered={rendered} />;
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
        <div className="container-fluid">
          {/* AnimeFinder (Left) */}
          {/* AnimeFinder logo with Link component */}
          <Link to="/" className="navbar-brand fw-bold text-primary">
            AnimeFinder
          </Link>

          {/* Toggle button for mobile view */}
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

          {/* Navbar Content */}
          <div className="collapse navbar-collapse px-3" id="navbarNav">
            {/* Filter Buttons */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  className={`btn ${
                    rendered === "popular"
                      ? "btn-primary text-white"
                      : "btn-outline-primary"
                  } mx-2`}
                  onClick={() => {
                    setRendered("popular");
                    getPopularAnime();
                  }}
                >
                  Popular
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`btn ${
                    rendered === "airing"
                      ? "btn-primary text-white"
                      : "btn-outline-primary"
                  } mx-2`}
                  onClick={() => {
                    setRendered("airing");
                    getAiringAnime();
                  }}
                >
                  Airing
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`btn ${
                    rendered === "upcoming"
                      ? "btn-primary text-white"
                      : "btn-outline-primary"
                  } mx-2`}
                  onClick={() => {
                    setRendered("upcoming");
                    getUpcomingAnime();
                  }}
                >
                  Upcoming
                </button>
              </li>
            </ul>

            {/* TitleText (Centered) */}
            <div className="mx-auto">
              <span className="navbar-text fw-bold text-primary h3 px-4">
                {rendered === "popular"
                  ? "Popular Anime"
                  : rendered === "airing"
                  ? "Airing Anime"
                  : "Upcoming Anime"}
              </span>
            </div>

            {/* Search Bar (Right) */}
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
      <main className="container-fluid py-4">{switchComponent()}</main>
    </div>
  );
}

export default Homepage;
