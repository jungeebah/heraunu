import Home from '../src/components/Home/Home';
import React from 'react';
import Head from 'next/head'
import { getallMovie, allmovieSelector } from '../lib/slice/allMovies';
import { getAllActor } from '../lib/slice/allPerson'
import { useDispatch, useSelector } from 'react-redux';


function Index(props) {
  const dispatch = useDispatch();
  const movie = useSelector(allmovieSelector);
  React.useEffect(() => {
    if (!movie.allmovies?.length) {
      dispatch(getallMovie())
      dispatch(getAllActor())
    }
  }, [])
  const { movies, persons, youtube } = props
  return (
    <div>
      <Head>
        <title>Complete Nepali Movie Database for viewing Nepali Movies - Heraunu</title>
        <meta
          name="description"
          content="Heraunu is a site for Nepali Movie lovers to come and find viewing locations."
        />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width user-scalable=no" />
        {/* <script async defer data-pin-hover="true" data-pin-round="true" src="//assets.pinterest.com/js/pinit.js"></script> */}
      </Head>
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
    revalidate: 36000,
    props: {
      movies,
      persons,
      youtube,
    },
  }
}

export default Index;