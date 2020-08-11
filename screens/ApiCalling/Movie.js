import React, { useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import MovieCard from './MovieCard'
import axios from 'axios'

const Movie = () => {

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        getMovieFromAPI()
    }, [])


    function getMovieFromAPI() {
        axios.post("https://hoblist.com/movieList", {
            category: "movies",
            language: "telugu",
            genre: "all",
            sort: "voting"
        })
            .then(async function (response) {
                setMovie(response.data);
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    if (!movie) {
        return null
    }



    return (
        <View>
            <FlatList data={movie.result}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({ item }) => {
                    return <MovieCard item={item} />
                }}
            />
        </View>
    )
}

export default Movie