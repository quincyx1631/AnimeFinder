import React from "react";

interface TrailerProps {
  embedUrl: string;
}

export const Trailer: React.FC<TrailerProps> = ({ embedUrl }) => (
  <div className="trailer-con d-flex justify-content-center align-items-center my-4">
    <div className="ratio ratio-16x9 w-100" style={{ maxWidth: "1300px" }}>
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title="Anime Trailer"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="border-5 border-light p-3 rounded-3"
        ></iframe>
      ) : (
        <h5 className="text-danger text-center">Trailer not available</h5>
      )}
    </div>
  </div>
);
