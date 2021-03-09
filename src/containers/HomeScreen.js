import { useEffect, useState, Fragment } from "react";
import { toast } from "react-toastify";
import apiCall from "../utils/apiCall";
import SubscribeArticle from "../components/SubscribeArticle";
import FeedList from "../components/FeedList";
import ArticleList from "../components/Articles";
import Nav from "../components/Nav";

const HomeScreen = () => {
  const [articles, setArticles] = useState([]);
  const [feeds, setFeeds] = useState([]);
  const [article, setArticle] = useState({});

  const { summary, title } = article;

  const asyncFetchFeeds = async () => {
    var response = await apiCall({
      url: "feeds",
      method: "GET",
    });

    setFeeds(response);
  };

  useEffect(() => {
    asyncFetchFeeds();
  }, []);

  const handleAddSubscrite = async (data) => {
    var response = await apiCall({
      url: "feeds/add",
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response?.error) toast.warn(response.error);
    else {
      toast.success("Subscripte Added");
      asyncFetchFeeds();
    }
  };
  const getFeeds = async (feed) => {
    var response = await apiCall({
      url: `feeds/${feed.id}/articles`,
      method: "GET",
    });
    setArticles([]);
    setArticle({});
    setArticles(response.articles);
  };

  const readArticle = (article) => {
    setArticle(article);
  };

  return (
    <Fragment key="homeFragment">
      <Nav />
      <div style={{ display: "flex", padding: "20px" }}>
        <SubscribeArticle {...{ onSave: handleAddSubscrite }} />
        <FeedList {...{ feeds, getFeeds }} />
      </div>
      <div style={{ padding: "20px" }}>
        {(articles || []).length > 0 && (
          <>
            <div style={{ display: "flex" }}>
              <ArticleList {...{ articles, readArticle }} />
              <div style={{ textAlign: "center", width: "100%" }}>
                <h3 style={{ textAlign: "center" }}>Summary</h3>
                <div>{summary}</div>
                <h3 style={{ textAlign: "center" }}>Title</h3>
                <div>{title}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </Fragment>
  );
};

export default HomeScreen;
