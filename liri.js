require("dotenv").config();

var keys = require('./keys.js');
var Twitter = require('twitter')
var inquirer = require('inquirer')
var Spotify = require('node-spotify-api')

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var greetings = [
    {
        type: 'list',
        choices: ['Twitter', 'Spotify', 'OMDb'],
        name: 'choice',
        message: "Hi I'm LIRI, What would you like to use?"
    }
]

var twitterOptions = [
    {
        type: 'list',
        choices: [
                    {
                        name: 'Check out my Tweets',
                        value: 'getTweets'
                            },
                    // {
                    //         name: 'Post a new Tweet',
                    //         value: 'postTweet'
                    //         },
                    // {
                    //     name: 'back',
                    //     value: 'greetings'
                    // }        
                ],
        name: 'choice',
        message: "What would you like to do?"
    }
]

var spotifyOptions = [
    {
        type: 'list',
        choices: [
            {
                name: 'by Title',
                value: 'songTitle'
            }
        ],
        name: 'choice',
        message: 'How would you like to look up a song?'
    }
]

var songTitle = [
    {
        type: 'input',
        message: "Enter the title of the song you'd like some info on.",
        name: 'input'
    }    

]

var prompt = inquirer.createPromptModule();

prompt(greetings).then(answer => {
    let choice = answer.choice
    let options = choice.toLowerCase() + 'Options'
    console.log(options);
   
    if (options == 'twitterOptions'){
        prompt(twitterOptions).then( response => {
           if (response.choice == 'getTweets'){
               getTweets()
           }
        })
    }
    
    else if (options == 'spotifyOptions'){
        prompt(spotifyOptions).then( response => {
            
            if (response.choice == 'songTitle'){
               prompt(songTitle).then(response =>{
                   let song = response.input
                   let type = 'track'
                   getSong(type, song)
               })      
            }
        })
    }
   
})

function getTweets() {
    let params = { screen_name: 'DuckMelvyn'}
    client.get('statuses/user_timeline', params, function (err, tweets, response) {
        if (!err){
            tweets.forEach(element => {
                console.log('-------------')
                console.log(element.text)
                console.log('-------------')
            });
        }
    })
 } 

 function getSong(searchType, songQuery) {
     let kind = searchType
     let search = songQuery
     spotify.search({
         type: kind,
         query: search,
         limit: 1,
        }, function(err,data){
          if(err){
              return console.log('Error occured: ' + err)
          }
          console.log('-------------')
          console.log('Title: ' + data.tracks.items[0].name)
          console.log('Artist: ' + data.tracks.items[0].artists[0].name) 
          console.log('Album Name: ' + data.tracks.items[0].album.name)   
          console.log('Preview URL' + data.tracks.items[0].preview_url)
          console.log('-------------') 
        })
 }