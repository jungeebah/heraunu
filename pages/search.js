import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useRouter } from 'next/router';
import DisplayCard from '../src/components/DisplayCard/DisplayCard';
import Typography from '@material-ui/core/Typography'
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
    search: {
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(2)
        },
        [theme.breakpoints.up('xs')]: {
            marginLeft: theme.spacing(3) - 4
        },
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(9) - 2,
        },
        marginTop: theme.spacing(9) - 2
    },
    result: {
        marginTop: theme.spacing(2)
    }
}))

const search = () => {
    const classes = useStyles();
    const router = useRouter();
    const { type } = router.query
    return (
        < div className={classes.search} >
            <Grid container >
                <Grid item xs={12}>
                    <Typography variant="h5">
                        Result
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box className={classes.result}>
                        <DisplayCard movie={router.query} individual={type} />
                    </Box>
                </Grid>
            </Grid>

        </div >
    )
}

export default search