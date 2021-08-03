import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ContactForm from '../src/components/ContactForm/ContactForm';

const token = process.env.NEXT_PUBLIC_Token

var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

const useStyles = makeStyles((theme) => ({
    about: {
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
    image: {
        background: 'url(/about.png)',
        [theme.breakpoints.down('md')]: {
            height: '400px',
            width: '400px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '300px',
            height: '358px',
        },
        height: '600px',
        width: '600px',
        backgroundSize: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: "no-repeat",
    },
    des: {
        fontWeight: '500',
        textAlign: 'justify',
        paddingRight: '16px'
    }
}))

const About = () => {
    const theme = useTheme()
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));
    const large = useMediaQuery(theme.breakpoints.up("lg"));

    const classes = useStyles();
    return (
        <div className={classes.about}>
            <Grid container

                justify="space-between"
                alignItems="flex-start">
                <Grid item xs={6}>
                    <Paper
                        elevation={0}
                        className={classes.image}
                        color='primary'>

                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container
                        direction="column"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid item xs={12}>
                            <Typography variant={mobile ? "h3" : "h1"} edge="center" >
                                <Box fontWeight='500'>

                                    About
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={large ? 'h6' : 'body1'} className={classes.des}>
                                A web app born out of covid and love for Nepali movies. Heraunu is designed to be a one stop center for
                                viewing information on Nepali movies. We collect data from different sites and aggregated them to this website
                                for viewing ease. As of now it's just a side project therefore many things are whacky, some stuff are hacked in place and
                                the data needs a lot more care and love. If the platform survives than we intend to slowly work on creating a better nepali movie consuming site.
                    </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <ContactForm />
                    </Grid>
                </Grid>
            </Grid>
        </div >
    )
}
export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const resultAllMovies = await fetch(`https://api.heraunu.com/api/allMov/`, requestOptions)
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

export default About