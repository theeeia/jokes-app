import { Box, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useCallback, useEffect, useState} from 'react'
import Joke from './jokes/Joke'

const useStyles = makeStyles((theme)=>({
    jokesList:{
        display: "flex",
        width: "80%",
        height: "80%",
      
    },
    jokesListSidebar:{
        backgroundColor: "#9575cd",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "30%",
        justifyContent:"center",
        textAlign: "center",
        boxShadow:"0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1)",
        zIndex : 2,
        borderRadius: 7
    },
    jokesListTitle:{
        fontSize: "3rem",
        color: "white",
        fontWeight: 700,
        margin: 60,
        letterSpacing: 0
    },
    sidebarImage:{
        width: "50%",
        boxShadow:"0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "40%"
    },
    jokesListJokes:{
        height: "90%",
        backgroundColor: "white",
        width: "70%",
        alignSelf: "center",
        boxShadow: "0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1)",
        overflow: "scroll",
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7,
    }
}))

export default function JokesList() {
    const classes= useStyles()
    const [jokes, setJokes]= useState(null)

    async function getJokes(){
        let newJokes= []
        let id= 1
        for(var i=1; i<7;i++){
            let res = await axios.get("https://icanhazdadjoke.com/", {
                 headers: {Accept: "application/json"}
           })
           newJokes.push({id:i, text: res.data.joke, votes:0})
        }
        setJokes(newJokes)
        
    }
    useEffect(()=>{
        getJokes()
    }, [])

    const handleVotes= useCallback((id, offset)=>{
            let filteredJokes= jokes.filter((joke)=> joke.id != id)
            let joke = jokes.find((joke)=> joke.id === id)
            joke.votes+=offset
            filteredJokes.push(joke)
            filteredJokes.sort((a,b)=> b.votes - a.votes)
            setJokes(filteredJokes)
    }, [jokes, setJokes])
    if(jokes){
         return (
    <Box className={classes.jokesList} > 
        <Box className={classes.jokesListSidebar}>
            <Typography className={classes.jokesListTitle}>
                Dad <br/>  Jokes
            </Typography>
            <img className={classes.sidebarImage}  src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"></img>
        </Box>
        <Box className={classes.jokesListJokes}>
            {jokes.map((joke)=>{
                return (
                <Joke key={joke.id} jokeText={joke.text} jokeVote={joke.votes} upvote={()=>{handleVotes(joke.id, 1)}} downvote={()=>{handleVotes(joke.id, -1)}} />)
            })}

        </Box>
    </Box>
  )
    }else{
        return( <h1>Loading</h1>)
    }
 
}
