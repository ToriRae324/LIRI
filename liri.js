// node read/write
var fs = require("fs");

// Grab the request package...
var request = require("request");

// Twitter package
var Twitter = require('twitter');

// Spotify package
var Spotify = require('node-spotify-api');



// add code to read and set any environment variables with the dotenv package
require("dotenv").config();

// link keys
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);



var expr = process.argv[2];

var rawValue = process.argv;
var value = rawValue.slice(3).join(" ");


// switch ~~~~~~~~~~~
switch (expr) {

    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifySong(value);
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        var dataArr = ""
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }

            // split string
            dataArr = data.split(",");

            // // arrange string
            // var newData = dataArr[0] + "," + dataArr[1];
            // console.log(newData);

            switch (dataArr[0]) {
                case "my-tweets":
                    myTweets();
                    break;

                case "spotify-this-song":
                    spotifySong(dataArr[1]);
                    break;

                case "movie-this":
                    movieThis();
                    break;
            }
        });


}

// functions ~~~~~~~~~
function myTweets() {
    // shows last 20 tweets
    var params = { screen_name: 'Tori77246682' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error && response.statusCode === 200) {

            console.log("\n~~~~~~~~~~~~~~~~~~~~~");
            console.log("\nTweets: \n");
            
            tweets.forEach(function (tweet) {

                console.log("Tweet: " + tweet.text);
                console.log("Created at: " + tweet.created_at + "\n");
            });
            console.log("~~~~~~~~~~~~~~~~~~~~~");

        }
    });
}



function spotifySong(value) {
    // API Request for song track requested

    if (!value) {
        // If no song is provided then your program will default to "The Sign" by Ace of Base. 
        spotify
            .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
            .then(function (data) {


                console.log("\n~~~~~~~~~~~~~~~~~~~~~\n");
                // Artist(s)
                console.log("Artist(s): " + data.album.artists[0].name);
                // The song's name
                console.log("Song Title: " + data.name);
                // A preview link of the song from Spotify
                console.log("Preview Link: " + data.preview_url);
                // The album that the song is from
                console.log("Album: " + data.album.name);
                console.log("\n~~~~~~~~~~~~~~~~~~~~~\n");
            })

            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });


    } else {
        spotify.search({ type: 'track', query: value }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var newData = data.tracks.items;

            console.log("\n~~~~~~~~~~~~~~~~~~~~~");
            console.log("\n'" + value + "' Songs: \n");

            newData.forEach(function (newData) {

                console.log("\n*");
                // Artist(s)
                console.log("Artist(s): " + newData.album.artists[0].name);
                // The song's name
                console.log("Song Title: " + newData.name);
                // A preview link of the song from Spotify
                console.log("Preview Link: " + newData.preview_url);
                // The album that the song is from
                console.log("Album: " + newData.album.name);
                console.log("*\n");
            });
            console.log("~~~~~~~~~~~~~~~~~~~~~\n");
        });
    }
}



function movieThis() {
    if (!value) {
        // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
        
        var URL = "http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy"
        request(URL, function (error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {

                console.log("\n~~~~~~~~~~~~~~~~~~~~~");
                console.log("\n" + '"Mr. Nobody"' + " Movie: \n");

                var info = JSON.parse(body);


                // * Title of the movie.
                console.log("Title: " + info.Title);
                // * Year the movie came out.
                console.log("Year: " + info.Year);
                // * IMDB Rating of the movie.
                console.log("IMDB Rating: " + info.imdbRating);
                // * Rotten Tomatoes Rating of the movie.
                console.log("Rotten Tomatoes Rating: " + info.Ratings[1].Value);
                // * Country where the movie was produced.
                console.log("Country: " + info.Country);
                // * Language of the movie.
                console.log("Language: " + info.Language);
                // * Short Plot of the movie.
                console.log("Plot: " + info.Plot);
                // * Actors in the movie.
                console.log("Actors: " + info.Actors);


                console.log("\n~~~~~~~~~~~~~~~~~~~~~\n");

            }
        });

    } else {
        var URL = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy"
        request(URL, function (error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {

                console.log("\n~~~~~~~~~~~~~~~~~~~~~");
                console.log("\n" + '"' + value + '"' + " Movie: \n");

                var info = JSON.parse(body);

                // * Title of the movie.
                console.log("Title: " + info.Title);
                // * Year the movie came out.
                console.log("Year: " + info.Year);
                // * IMDB Rating of the movie.
                console.log("IMDB Rating: " + info.imdbRating);
                // * Rotten Tomatoes Rating of the movie.
                console.log("Rotten Tomatoes Rating: " + info.Ratings[1].Value);
                // * Country where the movie was produced.
                console.log("Country: " + info.Country);
                // * Language of the movie.
                console.log("Language: " + info.Language);
                // * Short Plot of the movie.
                console.log("Plot: " + info.Plot);
                // * Actors in the movie.
                console.log("Actors: " + info.Actors);
                console.log("\n~~~~~~~~~~~~~~~~~~~~~\n");
            }
        });

    }

}
