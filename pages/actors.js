import { allPersonSelector } from '../lib/slice/allPerson';
import { useSelector } from 'react-redux';
import { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DisplayCard from '../src/components/DisplayCard/DisplayCard';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
    persons: {
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(2)
        },
        [theme.breakpoints.up('xs')]: {
            marginLeft: theme.spacing(3) - 4
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(9) - 2,
        },

        marginTop: theme.spacing(9) - 2
    },
    pagination: {
        marginTop: theme.spacing(1)
    }
}))

const actors = () => {
    const person = useSelector(allPersonSelector);
    const classes = useStyles();
    const personList = person.allActors
    const [displayData, setDisplayData] = useState(personList.slice(0, 10))
    const totalPerson = personList.length
    const nextPage = (e, v) => {
        setDisplayData(personList.slice((v - 1) * 10, v * 10))
    }
    return (
        <div className={classes.persons}>
            <div >
                <Typography variant='h6' color="secondary">
                    Actors
                </Typography>
                <Grid container spacing={2}>
                    {displayData.map(items => (
                        <Grid item xs={4} sm={4} md={3} xl={2} key={items.key} >
                            <DisplayCard movie={items} />
                        </Grid>
                    ))}
                </Grid>
            </div>
            <Box className={classes.pagination}
                justifyContent="center"
                display="flex">
                <Pagination
                    count={totalPerson}
                    variant="outlined"
                    shape="rounded"
                    size="small"
                    onChange={nextPage} />
            </Box>
        </div >
    )
}
export default actors
