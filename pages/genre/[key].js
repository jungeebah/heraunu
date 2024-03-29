import { useDispatch, useSelector } from 'react-redux';
import SkeletonDisplay from '../../src/components/SkeletonDisplay/SkeletonActor';
import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles";
import DisplayCard from '../../src/components/DisplayCard/DisplayCard';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { updatePageNumber, genreDataSelector } from '../../lib/slice/genreDataSlice';
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


const Genre = ({ genre }) => {
    const totalMovies = genre.movies ? genre.movies.length : 0
    const genreList = genre.movies ? genre.movies : []
    const skeletonItem = [...Array(10).keys()]
    const userData = useSelector(genreDataSelector)
    const dispatch = useDispatch();
    const classes = useStyles();
    const [displayData, setDisplayData] = useState(genreList ? genreList.slice((userData.pageNumber - 1) * 10, userData.pageNumber * 10) : [])

    const nextPage = (e, v) => {
        dispatch(updatePageNumber(v))
        setDisplayData(genreList.slice((v - 1) * 10, v * 10))
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
                    {genre.name}
                </Typography>
                <Grid container>
                    {genre.movies ? displayData ?
                        displayData.map(items => (
                            <Grid item xs={3} sm={2} md={3} lg={2} key={items.movie_id} >
                                <DisplayCard movie={items} individual={`/movie/${items.movie_id}`} />
                            </Grid>
                        ))
                        :
                        skeleton :
                        <div></div>}
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

export async function getStaticProps(context) {
    // Call an external API endpoint to get posts
    const { key } = context.params
    const res = await fetch(`https://api.herauna.com/api/genres/${key}`, requestOptions)
    const genre = await res.json()
    return {
        props: {
            genre,
        },
    }
}

export async function getStaticPaths() {
    const response = await fetch('https://api.herauna.com/api/allGenres/', requestOptions)
    const data = await response.json()
    const genre = Object.values(data['results']).map(x => x.key).filter(n => n)
    return {
        paths: genre.map(key => ({
            params: { key: key.toString() },
        })),
        fallback: false,
    }
}

export default Genre