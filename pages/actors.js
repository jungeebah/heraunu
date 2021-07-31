import { useDispatch, useSelector } from 'react-redux';
import SkeletonDisplay from '../src/components/SkeletonDisplay/SkeletonActor';
import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles";
import DisplayCard from '../src/components/DisplayCard/DisplayCard';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { updatePageNumber, personDataSelector } from '../lib/slice/personUserSlice';
import Box from '@material-ui/core/Box';

const token = process.env.NEXT_PUBLIC_Token

var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

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
    },
    title: {
        marginBottom: theme.spacing(1)
    }
}))

const actors = ({ allPersons }) => {
    const totalMovies = allPersons.count
    const personsList = allPersons.results
    const skeletonItem = [...Array(10).keys()]
    const userData = useSelector(personDataSelector)
    const dispatch = useDispatch();
    const classes = useStyles();
    const [displayData, setDisplayData] = useState(personsList.slice((userData.pageNumber - 1) * 10, userData.pageNumber * 10))

    const nextPage = (e, v) => {
        dispatch(updatePageNumber(v))
        setDisplayData(personsList.slice((v - 1) * 10, v * 10))
    }
    

    const skeleton = <div>
        {skeletonItem.map((item) => (
            <Grid item xs={4} sm={2} md={3} xl={2} key={item}>
                <SkeletonDisplay />
            </Grid>

        ))}
    </div>

    return (
        <div className={classes.persons}>
            <div >
                <Typography variant='h6' color="secondary" className={classes.title}>
                    Actors
                </Typography>
                <Grid container>
                    {displayData ?
                        displayData.map(items => (
                            <Grid item xs={3} sm={2} md={3} lg={2} key={items.key} >
                                <DisplayCard movie={items} individual={`/actor/${items.key}`} />
                            </Grid>
                        ))
                        :
                        skeleton}
                </Grid>
            </div>
            <Box className={classes.pagination}
                justifyContent="center"
                display="flex">
                <Pagination
                    count={totalMovies % 10 === 0 ? totalMovies / 10 : Math.floor(totalMovies / 10) + 1}
                    variant="outlined"
                    shape="rounded"
                    size="small"
                    page={userData.pageNumber}
                    onChange={nextPage} />
            </Box>
        </div >
    )
}

export async function getStaticProps() {
    const resultAllMovies = await fetch(`https://api.heraunu.com/api/allMov/`, requestOptions)
    const allMovies = await resultAllMovies.json()
    const resultAllPersons = await fetch(`https://api.heraunu.com/api/allPerso/`, requestOptions)
    const allPersons = await resultAllPersons.json()
    return {
        revalidate: 36000,
        props: {
            allMovies,
            allPersons,
        },
    }
}
export default actors
