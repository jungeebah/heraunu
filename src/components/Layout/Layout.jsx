
import { useDispatch, useSelector } from 'react-redux';
import { getallMovie, allmovieSelector } from '../../lib/allMovies';


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