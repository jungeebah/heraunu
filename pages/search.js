import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useRouter } from 'next/router';
import React from 'react';
import DisplayCard from '../src/components/DisplayCard/DisplayCard';
import Typography from '@material-ui/core/Typography'
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box'
import { allSearchSelection } from '../lib/slice/search';
import { searchResultSelector } from '../lib/slice/searchResult';
import { useSelector } from 'react-redux';

const token = process.env.NEXT_PUBLIC_Token

var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

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

const searchComponent=()=>{
    
}

const Search = () => {
    const classes = useStyles();
    const router = useRouter();
    const result = useSelector(allSearchSelection)
    const searchResults = useSelector(searchResultSelector)
    const [searchResult, setSearchResult] = React.useState([])
    const [type, setType] = React.useState(null)
    const movie = router.query

    React.useEffect(() => {
        if (router.query.type) {
            setType(router.query.type)
        } else {
            setSearchResult(searchResults.results)
        }
    }, [router, searchResults])

    React.useEffect(() => {
        if (router.query.type) {
            setType(router.query.type)
        }
    }, [router.query])

    React.useEffect(() => {
        setSearchResult(searchResults.results)
    }, [searchResults])

    const optionSelect = movie ? (
        <DisplayCard movie={movie} individual={movie.type} />
    ) : <div></div>

    const apiSearchResult = searchResult ? (
        <Grid container >
            {searchResult.map((item) => (
                <Grid item xs={3} sm={2} md={2} lg={2} xl={1} key={item.key}>
                    <DisplayCard movie={item}
                        individual={item.item === 'Actor' ? `/actor/${item.key}` : `/movie/${item.key}`}
                        key={item.item} />
                </Grid>
            ))}
        </Grid>
    ) :
        <div></div>

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
                        {movie.type ?
                            optionSelect
                            :
                            apiSearchResult
                        }

                    </Box>
                </Grid>
            </Grid>

        </div >
    )
}
export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const resultAllMovies = await fetch(`https://api.heraunu.com/api/allMovie/`, requestOptions)
    const allMovies = await resultAllMovies.json()
    const resultAllPersons = await fetch(`https://api.heraunu.com/api/allPerso/`, requestOptions)
    const allPersons = await resultAllPersons.json()
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {

        props: {
            allMovies,
            allPersons,
        },
    }
}

export default Search