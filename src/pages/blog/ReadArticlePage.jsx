import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ReadContainer from '../../components/ui/ReadContainer';
import Requests from '../../middleware/Requests';

const ReadArticlePage = () => {

    const [article, setArticle] = useState(null);
    const [error, setError] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        const fetchArticle = async () => {
            const response = await Requests.getArticle(slug);
            if (response.code === 200) {
                const formatedData = {
                    ...response.data.article,
                    comments: {
                        ...response.data.comments
                    }
                }
                setArticle(formatedData);
            } else {
                setError(response.message);
            }
        }
        fetchArticle();
    }, [slug])

    return (
        <>
            {
                error &&
                <div className="error-container">
                    <p>
                        {error}
                    </p>
                </div>
            }
            {
                (!error && article) &&
                <ReadContainer article={article} />
            }
        </>
    )
}

export default ReadArticlePage
