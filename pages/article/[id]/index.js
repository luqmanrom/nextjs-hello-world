import {useRouter} from 'next/router';
import {server} from '../../../config';

const Article = ({article}) => {

    const router = useRouter();
    const {id} = router.query;
    return (
        <div>
            <h1>This is article {article.title}</h1> 
            <p>{article.body}</p>
        </div>
    )
}

export default Article


export const getStaticProps = async (context) => {
    const res = await fetch(`${server}/api/articles/${context.params.id}`);

    const article = await res.json();

    console.log(article);

    return {
        props: {
            article 
        }
    }
}

// Required for dynamic SSG pages
// Will compile in build time
export const getStaticPaths = async () => {
    const res = await fetch(`${server}/api/articles`);

    const articles = await res.json();

    const paths = articles.map(article => ({
        params: {
            id: article.id.toString()
        }
    }))

    return {
        paths,
        fallback: false
    }


}


// export const getServerSideProps = async (context) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`);

//     const article = await res.json();

//     console.log(article);

//     return {
//         props: {
//             article 
//         }
//     }
// }