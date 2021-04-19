import Head from 'next/head'

const HeadMovie = ({ person, actor_key }) => {

    const movieObject = person.movies ?
        person.movies.map(movie => [{
            "@type": "Movie",
            "name": movie.name,
            "image": movie.image
        }]) : [];
    const movie = movieObject ? Object.keys(movieObject).map(key => movieObject[key]).flat(1) : ""


    const structure_data = {
        "@context": "http://schema.org/",
        "@type": "Person",
        "name": person.name,
        "@reverse": { "actor": movie }
    }

    return (
        <Head>
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="video:actor:role" />
            <meta property="og:title" content={`${person.name} - Heraunu`} key="ogtitle" />
            <meta property="og:description" content={`Nepali Movie Personal ${person.name}`} key="ogdesc" />
            <meta property="og:url" content={`https://heraunu.com/actor/${actor_key}`} key="ogurl" />
            <meta property="og:site_name" content="Heraunu" key="ogsitename" />
            <meta property="article:publisher" content="https://www.facebook.com/heraunasite/" />

            <meta property="og:image" content={person.image} key="ogimage" />
            <meta property="og:image:width" content="1098" />
            <meta property="og:image:height" content="659" />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:description" content={person.name} />
            <meta name="twitter:title" content={`Nepali movie personal - ${person.name}`} />
            <meta name="twitter:site" content="@herauuna" />
            <meta name="twitter:image" content={person.image} />
            <meta name="twitter:creator" content="@herauuna" />

            <title>{person.name + '- Heraunu'}</title>
            <meta name="description" content={`Nepali movie personal ${person.name}`}></meta>
            <meta name="keywords" content={`${person.name},Nepali Actor`}></meta>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />

            <link rel="icon" type="image/png" href="image/png" />

            <link rel="canonical" href={`https://heraunu.com/actor/${actor_key}`} />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structure_data)
                }}
            />
        </Head>
    )
}

export default HeadMovie