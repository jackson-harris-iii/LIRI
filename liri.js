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

var prompt = inquirer.createPromptModule();

prompt(greetings).then(answer => {
    let choice = answer.choice
    let options = choice.toLowerCase() + 'Options'
    console.log(options);
   
    if (options == 'twitterOptions'){
        prompt(twitterOptions).then( response => {
            console.log(response)
        })
    }    
   
})

function getTweets() {
     
 } 