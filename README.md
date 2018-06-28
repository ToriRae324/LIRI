# LIRI
 LIRI is a command line node app that takes in specific parameters from the command line and gives you back data in the terminal/bash window.

 ### LIRI accepts these commands:
* `my-tweets`

* `spotify-this-song`

* `movie-this`

* `do-what-it-says`


### What Each Command Does

1. `node liri.js my-tweets`

   * This will show your last 20 tweets and when they were created.

2. `node liri.js spotify-this-song <song name here>`

   * This will show the following information about the song:

    ``` 
     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from
     ```

   * If no song is provided then your program will default to "The Sign" by Ace of Base.
   

3. `node liri.js movie-this <movie name here>'\`

   * This will output the following information:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```
   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
     

4. `node liri.js do-what-it-says`
   
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
     * It will run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.



     
The API's used in this program include Twitter, Spotify and OMDB.
The Node Packages include:
* [Twitter](https://www.npmjs.com/package/twitter)
* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
* [Request](https://www.npmjs.com/package/request)
* [DotEnv](https://www.npmjs.com/package/dotenv)



In order to run this program node modules will need to be installed from the `package.json` file, and a `.env` file with Twitter and Spotify keys will need to be added.