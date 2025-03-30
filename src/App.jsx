import React, {useState} from 'react';
import Search from "./components/Search.jsx";

const App = () => {

    const [SearchTerm, setSearchTerm] = useState('');
    return (
        <main>
        <div className="pattern">
            <div className="wrapper">
            <header>
                <img src="hero.png" alt="hero banner" />
                <h1> Find <span className="text-gradient">Movies</span> which you will enjoy without Hassle</h1>

            </header>

            <Search SearchTerm={SearchTerm} setSearchTerm={setSearchTerm}/>
            <h1 className="text-white">{SearchTerm}</h1>
            </div>



        </div>


            </main>
    );/*//props are like inputs which are passed into components as arguments*/
};

export default App;