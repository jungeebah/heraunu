const token = process.env.REACT_APP_Token
var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

const Movie = ({ movieInfo }) => {

    return (
        <div>
            test
            {movieInfo.name}
        </div>
    )
}

export async function getServerSideProps({ query }) {
    const { key } = query
    // Call an external API endpoint to get posts
    const res = await fetch(`https://api.heraunu.com/api/movies/${key}/?release_date=&genre=&streaming=`, requestOptions)
    const movieInfo = await res.json()
    // console.log(movieInfo)
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            movieInfo
        }
    }
}



export default Movie

