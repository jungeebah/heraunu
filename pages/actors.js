import { getAllActor, allPersonSelector } from '../lib/slice/allPerson';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonDisplay from '../src/components/SkeletonDisplay/SkeletonDisplay';
import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles";
import DisplayCard from '../src/components/DisplayCard/DisplayCard';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { updatePageNumber, personDataSelector } from '../lib/slice/personUserSlice';
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
    },
    title: {
        marginBottom: theme.spacing(1)
    }
}))

const actors = () => {
    const skeletonItem = [...Array(10).keys()]
    const person = useSelector(allPersonSelector);
    const userData = useSelector(personDataSelector)
    const dispatch = useDispatch();
    const classes = useStyles();
    const [personList, setPersonList] = useState(person.allActors)
    const [displayData, setDisplayData] = useState(personList.slice((userData.pageNumber - 1) * 10, userData.pageNumber * 10))
    const [totalPerson, setTotalPerson] = useState(personList.length)
    const nextPage = (e, v) => {
        dispatch(updatePageNumber(v))
        setDisplayData(personList.slice((v - 1) * 10, v * 10))
    }
    React.useEffect(() => {
        if (!person.allActors?.length) {
            dispatch(getAllActor())
        }
    }, [])
    React.useEffect(() => {
        setPersonList(person.allActors)
    }, [person])

    React.useEffect(() => {
        setDisplayData(personList.slice((userData.pageNumber - 1) * 10, userData.pageNumber * 10))
        setTotalPerson(personList.length)
    }, [personList])

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
                                <DisplayCard movie={items} individual={`/actors/${items.key}`} />
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
                    count={totalPerson % 10 === 0 ? totalPerson / 10 : Math.floor(totalPerson / 10) + 1}
                    variant="outlined"
                    shape="rounded"
                    size="small"
                    page={userData.pageNumber}
                    onChange={nextPage} />
            </Box>
        </div >
    )
}
export default actors
