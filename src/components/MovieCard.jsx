import React from "react";

const MovieCard = ({
                       movie: {id, title, vote_average, poster_path, release_date, original_language, genre_ids},
                       GenreList,
                       onShowSimilar, // New prop to trigger fetching similar movies
                   }) => {
    const getGenreNames = (genreIds) => {
        if (!GenreList || GenreList.length === 0) return [];
        return genreIds.map((ID) => {
            const genre = GenreList.find((genre) => genre.id === ID);
            return genre ? genre.name : "Unknown";
        });
    };

    const genreNames = getGenreNames(genre_ids);

    return (
        <div className="movie-card">
            {/* Movie Poster */}
            <img
                src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : "/no-movie.png"}
                alt={title}
            />

            {/* Movie Details */}
            <div className="mt-4">
                <h3>{title}</h3>
                <div className="content">
                    <div className="rating">
                        <img src="star.svg" alt="star_icon"/>
                        <p>{vote_average ? vote_average.toFixed(1) : "NA"}</p>
                    </div>
                    <span>●</span>
                    <p className="lang">{original_language}</p>
                    <span>●</span>
                    <p className="year">{release_date ? release_date.split("-")[0] : "NA"}</p>
                </div>

                <div>
                    <p className="genre"><strong>Genres:</strong> {genreNames.join(" • ") || "Unknown"}</p>
                </div>

                {/* Show Similar Movies Button */}
                <button
                    onClick={() => onShowSimilar({id, title, poster_path})}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition"
                >
                    Show Similar Movies
                </button>
            </div>
        </div>
    );
};

export default MovieCard;
