import React from "react";

interface SynopsisProps {
  synopsis: string;
  showMore: boolean;
  setShowMore: (value: boolean) => void;
}

export const Synopsis: React.FC<SynopsisProps> = ({
  synopsis,
  showMore,
  setShowMore,
}) => (
  <div className="my-4 text-justify">
    <p className="text-muted">
      {showMore ? synopsis : `${synopsis?.substring(0, 450)}...`}
      <button
        className="btn btn-link text-success ps-2"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "Show Less" : "Read More"}
      </button>
    </p>
  </div>
);
