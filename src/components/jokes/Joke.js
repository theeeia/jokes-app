import { Box, makeStyles, Typography } from '@material-ui/core'
import  ArrowUpwardIcon  from '@material-ui/icons/ArrowUpward'
import  ArrowDownwardIcon  from '@material-ui/icons/ArrowDownward'
import React, {useCallback} from 'react' 

const useStyles = makeStyles((theme)=>({
    joke:{
        display: "flex",
        borderBottom: "2px solid #eeeeee",
        alignItems: "center",
        justifyContent: 'center',
        fontWeight: 400,
        padding: "1rem"
    },
    jokesButtons:{
        display: "flex",
        marginRight: "1rem",
        justifyContent: "center",
        width:"15%",
        alignItems: "center",
        
    },
    arrowIcons:{
        fontSize: "2em",
        margin:10,
        cursor:"pointer"
    },
    votesLabel:{
        fontSize:20
    },
    jokeText:{
        width: "75%",
        fontSize: "1.2rem"
    },
    jokeEmoji:{
        fontSize: "3rem",
        marginLeft:"auto",
        borderRadius: "50%",
        boxShadow:"0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1)",
    }
}))


export default function Joke(props) {
    let {jokeId, jokeVote, jokeText, upvote, downvote} = props
    const classes= useStyles()

    const getEmoji = useCallback(
      (jokeVote) => {
        if (jokeVote >= 9) {
            return "em em-rolling_on_the_floor_laughing";
          } else if (jokeVote >= 6) {
            return "em em-laughing";
          } else if (jokeVote >= 3) {
            return "em em-slightly_smiling_face";
          } else if (jokeVote >= 0) {
            return "em em-neutral_face";
          } else {
            return "em em-angry";
          }
      },[])
    
  return (
    <Box className={classes.joke}> 
        <Box className={classes.jokesButtons}>
            <ArrowUpwardIcon className={classes.arrowIcons} onClick={() => {upvote()}} />
            <Typography className={classes.votesLabel}>{jokeVote}</Typography>
            <ArrowDownwardIcon className={classes.arrowIcons} onClick={() => {downvote()}} />
        </Box>
        <Box className={classes.jokeText}>
        {jokeText}
        </Box>
        <Box className={classes.jokeEmoji}>
            <i className={getEmoji(jokeVote)}></i>

        </Box>
    </Box>
  )
}
