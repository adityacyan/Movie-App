const MovieCard = ({
                       movie: {title, vote_average, poster_path, release_date, original_language, genre_ids},
                       GenreList
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
            <img
                src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : "/no-movie.png"}
                alt={title}
            />

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
                    <p className="year">
                        {release_date ? release_date.split('-')[0] : "NA"}
                    </p>

                </div>
                <div>
                    <p className="genre"><strong>Genres:</strong> {genreNames.join(' • ') || "Unknown"}</p>
                </div>


            </div>
        </div>
    );
};

export default MovieCard;
