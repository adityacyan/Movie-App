import React from 'react';
//we better destructure from here only rather than writing it . bar bar as we know na kya kuya pass horra hai
const Search = ({SearchTerm,setSearchTerm}) => {

    //dont re declare any prop here its not intended you can doent mean u should
    return (
        <div className="search">
            <div>
                <img src="search.svg" alt="search" />
                <input
                    type = 'text'
                    placeholder = 'Search...'
                    value = {SearchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    />

            </div>

        </div>
    );//input has a handler which does changes it
};

export default Search;


//these shits are rendered