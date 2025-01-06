import React from "react";
import { AnimeDetails } from "./anime";

interface InfoListProps {
  anime: AnimeDetails;
}

export const InfoList: React.FC<InfoListProps> = ({ anime }) => (
  <ul className="list-group">
    <li className="list-group-item py-3">
      <strong>Aired:</strong> {anime.aired?.string}
    </li>
    <li className="list-group-item py-3">
      <strong>Rating:</strong> {anime.rating}
    </li>
    <li className="list-group-item py-3">
      <strong>Rank:</strong> {anime.rank}
    </li>
    <li className="list-group-item py-3">
      <strong>Score:</strong> {anime.score}
    </li>
    <li className="list-group-item py-3">
      <strong>Scored By:</strong> {anime.scored_by}
    </li>
    <li className="list-group-item py-3">
      <strong>Popularity:</strong> {anime.popularity}
    </li>
    <li className="list-group-item py-3">
      <strong>Status:</strong> {anime.status}
    </li>
    <li className="list-group-item py-3">
      <strong>Source:</strong> {anime.source}
    </li>
    <li className="list-group-item py-3">
      <strong>Season:</strong> {anime.season}
    </li>
    <li className="list-group-item py-3">
      <strong>Duration:</strong> {anime.duration}
    </li>
  </ul>
);
