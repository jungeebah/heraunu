import Home from '../src/components/Home/Home';
import React from 'react';
import Head from 'next/head'


function Index(props) {
  const { allMovies, allPersons, youtube } = props
  return (
    <div>
      <Head>
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" key="ogtype" />
        <meta property="og:title" content="Complete Nepali movie Engine" key="ogtitle" />
        <meta property="og:description" content="Complete Nepali movie Database for information and viewing" key="ogdesc" />
        <meta property="og:url" content='https://herauna.com' key="ogurl" />
        <meta property="og:site_name" content="Herauna" key="ogsitename" />
        <meta property="article:publisher" content="https://www.facebook.com/heraunasite/" />

        <meta property="og:image" content="https://herauna.com/favicon.ico" key="ogimage" />
        <meta property="og:image:width" content="1098" />
        <meta property="og:image:height" content="659" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:description" content="Complete Nepali movie Database for information and viewing" />
        <meta name="twitter:title" content="Complete Nepali movie Engine - Herauna" />
        <meta name="twitter:site" content="@herauuna" />
        <meta name="twitter:image" content="https://herauna.com/favicon.ico" />
        <meta name="twitter:creator" content="@herauuna" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        <title>A Complete Nepali Movie Engine - Herauna</title>
        <meta
          name="description"
          content="Herauna is a movie engine to provide complete information on Nepali Movie."
        />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width user-scalable=no" />
        {/* <script async defer data-pin-hover="true" data-pin-round="true" src="//assets.pinterest.com/js/pinit.js"></script> */}
      </Head>
      <Home movies={allMovies} persons={allPersons} youtube={youtube} />
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
  const personRes = await fetch('https://api.heraunu.com/api/allPerso/', requestOptions)
  const youtubeRes = await fetch('https://api.heraunu.com/api/allYoutube/', requestOptions)
  const youtube = await youtubeRes.json()
  const allPersons = await personRes.json()
  const allMovies = await res.json()
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time

  return {

    props: {
      allMovies,
      allPersons,
      youtube,
    },
  }
}

export default Index;