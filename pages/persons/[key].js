const token = process.env.REACT_APP_Token


var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

export default function person({ personInfo }) {
    return (
        <div>
            {personInfo.name}
        </div>
    )
}

export async function getStaticProps({ params }) {
    // Call an external API endpoint to get posts
    const res = await fetch(`https://api.heraunu.com/api/persons/${params.key}/`, requestOptions)
    const personInfo = await res.json()
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            personInfo
        },
    }
}

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://api.heraunu.com/api/allPerson/', requestOptions)
    const persons = await res.json()
    // Get the paths we want to pre-render based on posts
    const paths = persons['results'].map((person) => `/persons/${person.key}`)

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}