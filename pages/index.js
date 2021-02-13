import Home from '../src/components/Home/Home'


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
  const token = process.env.NEXT_PUBLIC_Token
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${token}`);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };
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