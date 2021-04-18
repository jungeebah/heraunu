
import React from 'react';
import Head from 'next/head';
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
                                <Typography variant='h6'>
                                    {person.name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                {person.movies ?
                    <Box className={classes.actorMovie} elevation={0}>
                        <Grid container
                            direction="row"
                            alignItems="flex-end"
                        >
                            <Grid item xs={12}>
                                <SimpleTabs movies={person.movies} />
                            </Grid>
                        </Grid>
                    </Box> : <div></div>
                }
            </Grid>
        </Grid>

    return (
        <div>
            <Head>
                <title>{person.name + '- Heraunu'}</title>
                <meta name="description" content={`Nepali movie personal ${person.name}`}></meta>
                <meta name="keywords" content={`${person.name},Nepali Actor`}></meta>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />

                <link rel="icon" type="image/png" href="image/png" />

                <link rel="canonical" href={`https://heraunu.com/actors/${actor_key}`} />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="video:actor:role" />
                <meta property="og:title" content={`${person.name} - Heraunu`} />
                <meta property="og:description" content={`Nepali Movie Personal ${person.name}`} />
                <meta property="og:url" content={`https://heraunu.com/actors/${actor_key}`} />
                <meta property="og:site_name" content="Heraunu" />
                <meta property="article:publisher" content="https://www.facebook.com/heraunasite/" />

                <meta property="og:image" content={person.image} />
                <meta property="og:image:width" content="1098" />
                <meta property="og:image:height" content="659" />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:description" content={person.name} />
                <meta name="twitter:title" content={`Nepali movie personal - ${person.name}`} />
                <meta name="twitter:site" content="@herauuna" />
                <meta name="twitter:image" content={person.image} />
                <meta name="twitter:creator" content="@herauuna" />
            </Head>
            <div className={classes.person} itemScope itemType="http://schema.org/actor">
                {renderPerson}
            </div>
        </div>
    )
}

export async function getStaticProps(context) {
    // Call an external API endpoint to get posts
    const { key } = context.params
    const res = await fetch(`https://api.heraunu.com/api/persons/${key}/`, requestOptions)
    const person = await res.json()
    const actor_key = key
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            person,
            actor_key,
        },
        revalidate: 1,
    }
}

export async function getStaticPaths() {
    const response = await fetch('https://api.heraunu.com/api/allPerson/', requestOptions)
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