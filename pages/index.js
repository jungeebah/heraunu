import Home from '../src/components/Home/Home'

const token = process.env.REACT_APP_Token


var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
};

function Index(props) {
  const { movies, persons, youtube } = props
  return (
    <div>
      <Home movies={movies} persons={persons} youtube={youtube} />
    </div>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://api.heraunu.com/api/allMovie/', requestOptions)
  const personRes = await fetch('https://api.heraunu.com/api/allPerson/', requestOptions)
  const youtubeRes = await fetch('https://api.heraunu.com/api/allYoutube/', requestOptions)
  const youtube = await youtubeRes.json()
  const persons = await personRes.json()
  const movies = await res.json()
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      movies,
      persons,
      youtube,
    },
  }
}

export default Index;