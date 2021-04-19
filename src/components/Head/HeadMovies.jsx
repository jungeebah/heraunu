import Head from 'next/head'

const HeadMovie = ({ movie, movie_key }) => {

    const actorsObject = movie.actor ?
        movie.actor.map(actor => [{
            "@type": "Person",
            "name": actor.name
        }]) : [];
    const actors = actorsObject ? Object.keys(actorsObject).map(key => actorsObject[key]).flat(1) : ""

    const directorObject = movie.director.length > 0 ?
        movie.director.map(director => [{
            "@type": "Person",
            "name": director.name
        }]) : []

    const directors = directorObject ? Object.keys(directorObject).map(key => directorObject[key]).flat(1) : ""
    const structure_data = {
        "@context": "http://schema.org",
        "@type": "Movie",
        "name": movie.name,
        "actor": actors,
        "director": directors,
        "image": movie.image,
        "description": movie.description
    }

    return (
        <Head>
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="video.movie" />
            <meta property="og:title" content={`${movie.name} - Herauna`} key="ogtitle" />
            <meta property="og:description" content={`Nepali Movie  ${movie.name}`} key="ogdesc" />
            <meta property="og:url" content={`https://herauna.com/movie/${movie_key}`} key="ogurl" />
            <meta property="og:site_name" content="Herauna" key="ogsitename" />
            <meta property="article:publisher" content="https://www.facebook.com/heraunasite/" />

            <meta property="og:image" content={movie.image} key="ogimage" />
            <meta property="og:image:width" content="1098" />
            <meta property="og:image:height" content="659" />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:description" content={movie.name} />
            <meta name="twitter:title" content={`Nepali movie - ${movie.name}`} />
            <meta name="twitter:site" content="@herauuna" />
            <meta name="twitter:image" content={movie.image} />
            <meta name="twitter:creator" content="@herauuna" />
            <title>{movie.name + '- Herauna'}</title>
            <meta name="description" content={`Nepali movie  ${movie.name}`}></meta>
            <meta name="keywords" content={`${movie.name},Nepali movies,Nepali full movies, nepali Imdb`}></meta>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />

            <link rel="icon" type="image/png" href="image/png" />

            <link rel="canonical" href={`https://herauna.com/movie/${movie_key}`} />

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