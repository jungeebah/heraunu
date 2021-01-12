const token = process.env.REACT_APP_Token


var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

export default function movie({ movieInfo }) {
    // const result = movieInfo['results']
    return (
        <div>
            {movieInfo.name}
        </div>
    )
}

export async function getStaticProps({ params }) {
    // Call an external API endpoint to get posts
    const res = await fetch(`https://api.heraunu.com/api/movies/${params.key}/?release_date=&genre=&streaming=`, requestOptions)
    const movieInfo = await res.json()
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            movieInfo
        },
    }
}

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://api.heraunu.com/api/allMovie/', requestOptions)
    const movies = await res.json()
    // Get the paths we want to pre-render based on posts
    const paths = movies['results'].map((movie) => `/movies/${movie.key}`)

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}