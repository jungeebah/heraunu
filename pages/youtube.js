import { allYoutubeSelector } from '../lib/slice/allYoutube';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DisplayCard from '../src/components/DisplayCard/DisplayCard';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
    youtube: {
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(2)
        },
        marginLeft: theme.spacing(9) - 2,
        marginTop: theme.spacing(9) - 2
    }
}))

const youtube = () => {
    const youtube = useSelector(allYoutubeSelector);
    const classes = useStyles();
    const youtubeList = youtube.allmovies
    const displayData = youtubeList.slice(0, 10)
    return (
        <div className={classes.youtube}>
            <div >
                <Typography variant='h6' color="secondary">
                    Youtube
                </Typography>
                <Grid container spacing={2}>
                    {displayData.map(items => (
                        <Grid item xs={4} sm={4} md={3} xl={2} key={items.key} >
                            <DisplayCard movie={items} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div >
    )
}
export default youtube