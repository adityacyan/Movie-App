import React from 'react';

const MovieList = ({selectedMovie, similarMovieList, onSelectMovie, onClose}) => {
    console.log(selectedMovie)
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center p-4">
            <div
                className="w-[90vw] sm:w-[80vw] md:w-[70vw] bg-[#0f0a1e] p-8 rounded-xl shadow-xl relative text-white flex flex-col gap-6">
                {/* Close Button */}
                <button className="absolute top-6 right-6 text-gray-300 hover:text-white z-10" onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M18 6L6 18M6 6L18 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                {/* Movie Details Section */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                    {/* Movie Poster */}
                    {selectedMovie && (
                        <div className="w-full sm:w-1/3 flex-shrink-0">
                            <img
                                src={selectedMovie.img || "/placeholder.svg"}
                                alt={selectedMovie.title}
                                className="w-full rounded-lg shadow-lg"
                            />
                        </div>
                    )}

                    {/* Movie Details */}
                    <div className="w-full sm:w-2/3 flex flex-col gap-4">
                        <h2 className="text-4xl font-bold">{selectedMovie?.title || "Squid Game 2"}</h2>
                        <div className="flex items-center gap-2 text-lg">
                <span className="text-yellow-400 flex items-center">
                  <svg
                      className="w-5 h-5 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                    {(selectedMovie?.score && selectedMovie.score.toFixed(1)) || "0.0"}
                </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-400">
                  {selectedMovie?.lang ? selectedMovie.lang.toUpperCase() : ""}
                                {selectedMovie?.year ? ` • ${selectedMovie.year.split("-")[0]}` : ""}
                </span>
                        </div>
                        <p className="text-gray-300 text-md leading-relaxed">
                            {selectedMovie?.overview ||
                                "Loading..."}
                        </p>
                    </div>
                </div>

                {/* Similar Movies Section */}
                <div className="mt-2">
                    <h3 className="text-xl font-semibold mb-4">Movies Similar
                        to {selectedMovie?.title || "Squid Game 2"}</h3>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {similarMovieList && similarMovieList.length > 0 ? (
                            similarMovieList.slice(0, 5).map((movie, index) => (
                                <div
                                    key={movie.id || index}
                                    className="cursor-pointer w-[140px] flex-shrink-0 transition-transform hover:scale-105"
                                    onClick={() => onSelectMovie(movie)}
                                >
                                    <img
                                        src={movie.img || `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="rounded-lg shadow-md w-full h-auto"
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">No similar movies available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieList;
