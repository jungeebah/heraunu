
import React from 'react';
import HeadActor from '../../src/components/Head/HeadActor'
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Image from 'next/image';
import SimpleTabs from '../../src/components/Tabs/Tabs'
import useMediaQuery from "@material-ui/core/useMediaQuery";


const token = process.env.NEXT_PUBLIC_Token

var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

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
const Person = (props) => {
    const { actor_key, person } = props
    const roles = person.role?.length > 0 ? person.role : []
    if (roles) { roles.sort((a, b) => (a.movie_role[0].weighted_point < b.movie_role[0].weighted_point) ? 1 : -1) }
    const roles_movies = roles ? roles.map(a => {
        a.movie_role[0].role = a.name
        return a.movie_role[0]
    }
    ) : []
    const classes = useStyles()
    const theme = useTheme();
    const image = person.image === 'None' ? '/image.jpg' : person.image
    const large = useMediaQuery(theme.breakpoints.up("lg"));


    const renderPerson =
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
                                itemProp="image"
                                className={classes.image}
                                key={actor_key}
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
                                <Typography variant='h6' itemScope itemType="http://schema.org/Person">
                                    <span itemProp="name"> {person.name}</span>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                {roles ?
                    <Box className={classes.actorMovie} elevation={0}>
                        <Grid container
                            direction="row"
                            alignItems="flex-end"
                        >
                            <Grid item xs={12}>
                                <SimpleTabs movies={roles_movies} />
                            </Grid>
                        </Grid>
                    </Box> : <div></div>
                }
            </Grid>
        </Grid>

    return (
        <div>
            <HeadActor person={person} actor_key={actor_key} />
            <div className={classes.person} itemScope itemType="http://schema.org/actor">
                {renderPerson}
            </div>
        </div >
    )
}

export async function getStaticProps(context) {
    // Call an external API endpoint to get posts
    const { key } = context.params
    const res = await fetch(`https://api.herauna.com/api/persons/${key}/`, requestOptions)
    const person = await res.json()
    const actor_key = key
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {

        props: {
            person,
            actor_key,
        },
    }
}

export async function getStaticPaths() {
    const response = await fetch('https://api.herauna.com/api/allPerso/', requestOptions)
    const data = await response.json()
    const movies = Object.values(data['results']).map(x => x.key).filter(n => n)
    return {
        paths: movies.map(key => ({
            params: { key: key.toString() },
        })),
        fallback: false,
    }
}

export default Person