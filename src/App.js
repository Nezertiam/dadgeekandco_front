// Dependencies
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

// Middleware
import ApiHandler from "./middleware/api/ApiHandler";



const App = () => {

  const uri = "http://localhost:5000/api/article/Article-1"

  const [article, setArticle] = useState(null);

  useEffect(() => {
    const getArticle = async () => {
      const response = await ApiHandler.get(uri);
      // console.log(response.data.article)
      setArticle(response.data.article);
    }

    getArticle();
  }, [])

  return (
    <div>
      {
        article &&
        article.blocks.map((block) => {
          return (
            <ReactMarkdown>
              {block.content}
            </ReactMarkdown>
          );
        })
      }
    </div>
  );
}

export default App;
