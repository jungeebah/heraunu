
import React from 'react';
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box'
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SkeletonDisplay from '../src/components/SkeletonDisplay/SkeletonDisplay';
import { useRouter } from 'next/router';
import Image from 'next/image';
import SimpleTabs from '../src/components/Tabs/Tabs'
import { actorSelector, invalidateActor, getActor } from '../lib/slice/individualPerson';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    person: {
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
    root: {
        marginTop: theme.spacing(7) + 1,
        [theme.breakpoints.down("sm")]: {
            marginTop: theme.spacing(4),
        },
    },
    actorMovie: {
        [theme.breakpoints.down("sm")]: {
            paddingTop: theme.spacing(0),
        },
        // [theme.breakpoints.up("sm")]: {
        //     paddingTop: theme.spacing(22),
        // },
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(4, 2, 2, 2),
        },
    },
    skeletonTitle: {
        marginTop: '10px',
        marginBottom: '20px',
        position: 'relative',
    },
    image: {
        borderRadius: theme.spacing(2),
        [theme.breakpoints.up('xs')]: {
            marginBottom: theme.spacing(10)
        },
    },
}))
const Person = () => {
    const classes = useStyles()
    const theme = useTheme();
    const router = useRouter()
    const dispatch = useDispatch();
    const individualPerson = useSelector(actorSelector)

    var { key, name, image } = router.query

    if (image === 'None') {
        image = '/image.jpg'
    }
    const [person, setPerson] = React.useState(null)
    const large = useMediaQuery(theme.breakpoints.up("lg"));
    const skeletonItem = [...Array(10).keys()]

    React.useEffect(() => {
        dispatch(invalidateActor())
        setPerson(null)
    }, [])

    React.useEffect(() => {
        dispatch(invalidateActor())
        setPerson(null)
        dispatch(getActor(key))
    }, [key])

    React.useEffect(() => {
        dispatch(invalidateActor())
        setPerson(null)
        dispatch(getActor(key))
    }, [router.asPath])

    React.useEffect(() => {
        if (individualPerson) {
            setPerson(individualPerson)
        }
    }, [individualPerson])

    const renderPerson = person ? (
        <Grid container
            direction="column"
            justify="space-between"
        >
            <Grid item xs={12} >
                <Grid container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-end"
                >
                    <Grid item xs={6} sm={5} lg={4}>
                        <Box
                            height={large ? 545 : 323}
                            width={large ? 367 : 216}
                            boxShadow={3}
                            borderRadius={16}>
                            <Image
                                className={classes.image}
                                key={person.id}
                                src={image || '/image.jpg'}
                                alt={person.name}
                                height={large ? 545 : 323}
                                width={large ? 367 : 216}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={7} lg={8}>
                        <Grid
                            container
                            direction="row"
                        >
                            <Grid item xs={12}>
                                {name ? <Typography variant='h6'>
                                    {name}
                                </Typography> :
                                    <div className={classes.skeletonTitle}>
                                        <Skeleton variant="rect" height={20} width="60%" />
                                    </div>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Box className={classes.actorMovie} elevation={0}>
                    <Grid container
                        direction="row"
                        alignItems="flex-end"
                    >
                        {person.name === name && person.movies ?
                            <Grid item xs={12}>
                                <SimpleTabs movies={person.movies} />
                            </Grid>
                            :
                            skeletonItem.map((item) => (
                                <Grid item xs={3} sm={2} md={3} xl={2} key={item}>
                                    <SkeletonDisplay />
                                </Grid>

                            ))}
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    ) : <div>

        </div>
    return (
        <div className={classes.person} itemScope itemType="http://schema.org/actor">
            {renderPerson}
        </div>
    )
}

export default Person