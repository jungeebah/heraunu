import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useRouter } from 'next/router';
import React from 'react';
import DisplayCard from '../src/components/DisplayCard/DisplayCard';
import Typography from '@material-ui/core/Typography'
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box'
import { allSearchSelection } from '../lib/slice/search';
import { useSelector } from 'react-redux';

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
    const result = useSelector(allSearchSelection)
    const [apiSearch, setApiSearch] = React.useState(true)
    const [searchResult, setSearchResult] = React.useState([])
    const [type, setType] = React.useState(null)

    React.useEffect(() => {
        if (router.query.type) {
            setApiSearch(true)
            setType(router.query.type)
        } else {
            setApiSearch(false)
            setSearchResult(result.allResult)
        }
    }, [])

    React.useEffect(() => {
        if (router.query.type) {
            setApiSearch(true)
            setType(router.query.type)
        }
    }, [router.query])

    React.useEffect(() => {
        setApiSearch(false)
        setSearchResult(result.allResult)
    }, [result])

    const apiSearchResult = searchResult ? (
        <Grid container spacing={2}>
            {searchResult.map((item) => (
                <Grid item xs={4} sm={3} lg={3} key={item.key}>
                    <DisplayCard movie={item}
                        individual={item.item === 'Actor' ? '/person' : '/movie'}
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
                        {apiSearch ?
                            <div>
                                < DisplayCard movie={router.query} individual={type} />
                            </div> :
                            apiSearchResult
                        }

                    </Box>
                </Grid>
            </Grid>

        </div >
    )
}

export default search