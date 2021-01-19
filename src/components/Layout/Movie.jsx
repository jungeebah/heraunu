const Layout = (props) => {
    const { children, posts } = props

    return (

        <div>
            {posts ?
                <ul>
                    {posts['results'].map((post) => (
                        <li>{post.name}</li>
                    ))}

                </ul> : <div></div>
            }
            {children}
        </div>
    )
}

export default Layout