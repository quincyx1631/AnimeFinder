import React from "react";
import { Link } from "react-router-dom";
import { AnimeCharacter } from "./anime";

interface CharacterCardProps {
  character: AnimeCharacter;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => (
  <div className="col-md-4">
    <Link
      to={`/character/${character.character.mal_id}`}
      className="text-decoration-none"
    >
      <div className="card h-100 shadow-sm mx-2">
        <img
          src={character.character.images?.jpg.image_url}
          alt={character.character.name}
          className="card-img-top"
          style={{ height: "450px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <h5 className="card-title text-dark">{character.character.name}</h5>
          <p className="card-text text-muted">{character.role}</p>
        </div>
      </div>
    </Link>
  </div>
);
