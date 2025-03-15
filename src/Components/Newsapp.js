import React, { useState, useEffect } from 'react';
import logo from "./AMtoPM_logo.png";
import toplogo from "./TopNews_logo.png";
import Card from './Card';

const Newsapp = () => {
    const [search, setSearch] = useState("india");
    const [newsData, setNewsData] = useState([]);
    const API_KEY = "16646cc6d1fa49a2abe5c61b2c9c2a0b"; 

    
    const getData = async (query) => {
        try {
            const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`);
            const jsonData = await response.json();
            console.log("Fetched News:", jsonData.articles);
            setNewsData(jsonData.articles || []);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    
    useEffect(() => {
        getData(search);
    }, []); 


    const handleInput = (e) => {
        setSearch(e.target.value);
    };

  
    const handleSearch = () => {
        getData(search);
    };

 
    const handleCategoryClick = (event) => {
        const category = event.target.value;
        setSearch(category);
        getData(category);
    };

    return (
        <div>
            <nav>
                <div>
                    <h1>
                        <a href="/">
                            <img src={logo} alt="Logo" width="200" />
                        </a>
                    </h1>
                </div>
                <ul>
                    <a className='navCenterText'>Get all trending news here!</a>
                </ul>
                <div className='searchBar'>
                    <input 
                        type='text' 
                        placeholder='Search News' 
                        className='search-input' 
                        value={search} 
                        onChange={handleInput} 
                    />
                    <button className='searchButton' onClick={handleSearch}>Search</button>
                </div>
            </nav>
            <div className='categoryBtn'>
                <button onClick={handleCategoryClick} value="sports">Sports</button>
                <button onClick={handleCategoryClick} value="politics">Politics</button>
                <button onClick={handleCategoryClick} value="entertainment">Entertainment</button>
                <button onClick={handleCategoryClick} value="science">Science</button>
                <button onClick={handleCategoryClick} value="health">Health</button>
            </div>
            <div>
                <p className='topNews'>
                    <img src={toplogo} alt="topLogo" width="200" />
                </p>
            </div>
            <div>
                <Card data={newsData} />
            </div>
        </div>
    );
};

export default Newsapp;
