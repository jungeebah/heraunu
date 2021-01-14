const token = process.env.NEXT_PUBLIC_Token
var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

const Person = ({ personInfo }) => {
    return (
        <div>
            test
            {personInfo.name}
        </div>
    )
}

export async function getServerSideProps({ query }) {
    const { key } = query
    console.log(token)
    // Call an external API endpoint to get posts
    const res = await fetch(`https://api.heraunu.com/api/persons/${key}/`, requestOptions)
    const personInfo = await res.json()
    // console.log(personInfo)
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            personInfo
        }
    }
}



export default Person