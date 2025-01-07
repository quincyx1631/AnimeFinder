import React from "react";
import { Link } from "react-router-dom";

interface RecommendationCardProps {
  anime: any;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  anime,
}) => (
  <div className="card h-100 shadow-sm mx-2">
    <Link
      to={`/anime/${anime.entry?.[0]?.mal_id || anime.mal_id}`}
      className="text-decoration-none"
    >
      <img
        src={
          anime.entry?.[0]?.images?.jpg?.large_image_url ||
          anime.images?.jpg?.large_image_url
        }
        alt={anime.entry?.[0]?.title || anime.title}
        className="card-img-top"
        style={{ height: "450px", objectFit: "cover" }}
      />
      <div className="card-body text-center">
        <h5 className="card-title text-dark">
          {anime.entry?.[0]?.title || anime.title}
        </h5>
        <p className="card-text text-muted">
          Score: {anime.entry?.[0]?.score || anime.score || "N/A"}
        </p>
      </div>
    </Link>
  </div>
);
