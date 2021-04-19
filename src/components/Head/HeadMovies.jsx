import Head from 'next/head'

const Head = ({ movie }) => {

    const actors = movie.actor ? Object.fromEntries(
        movie.actor.map(actor => [actor, {
            "@type": "Person",
            "name": actor.name
        }])
    ) : "";
    const structure_data = {
        "@context": "http://schema.org",
        "@type": "Movie",
        "name": movie.name,
        
        address: {
            "@type": "PostalAddress",
            addressLocality: "Seattle",
            addressRegion: "WA",
            postalCode: "98052",
            streetAddress: "20341 Whitworth Institute 405 N. Whitworth"
        },
        colleague: [
            "http://www.xyz.edu/students/alicejones.html",
            "http://www.xyz.edu/students/bobsmith.html"
        ],
        email: "mailto:jane-doe@xyz.edu",
        image: "janedoe.jpg",
        jobTitle: "Professor",
        name: "Jane Doe",
        telephone: "(425) 123-4567",
        url: "http://www.janedoe.com"
    }

    return (
        <Head>
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="video.movie" />
            <meta property="og:title" content={`${movie.name} - Heraunu`} key="ogtitle" />
            <meta property="og:description" content={`Nepali Movie  ${movie.name}`} key="ogdesc" />
            <meta property="og:url" content={`https://heraunu.com/movie/${movie_key}`} key="ogurl" />
            <meta property="og:site_name" content="Heraunu" key="ogsitename" />
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
            <title>{movie.name + '- Heraunu'}</title>
            <meta name="description" content={`Nepali movie  ${movie.name}`}></meta>
            <meta name="keywords" content={`${movie.name},Nepali Actor`}></meta>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />

            <link rel="icon" type="image/png" href="image/png" />

            <link rel="canonical" href={`https://heraunu.com/movie/${movie_key}`} />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify()
                }}
            />
        </Head>
    )
}

export default Head