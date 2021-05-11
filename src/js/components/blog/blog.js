import { ButtonBase, Chip, Grid, Icon } from "@material-ui/core";
import { DateRange, Description, LocalOffer } from "@material-ui/icons";
import { useAtom } from "jotai";
import { useEffect } from "react";

import Post from "./post";
import { background, blogPosts, viewingPost } from "../../../data/Atoms";
import { HashLink } from "react-router-hash-link";
import { blogPath } from "../../routes";
import { slugTitle } from "../../utils/utils";

import "../../../css/blog.scss";

export default function Blog({ viewPostProps, postProps, ...rest }) {
  const [posts, setPosts] = useAtom(blogPosts);
  // eslint-disable-next-line
  const [postBg, setPostBg] = useAtom(background);
  const [viewPost, setViewPost] = useAtom(viewingPost);

  const selectPost = (p) => {
    setViewPost(p);
    if (p.background) {
      setPostBg(p.background);
    }
  };

  useEffect(() => {
    if (!viewPostProps) {
      if (postProps) {
        setPosts(postProps);
      } else {
        let p = require("./data/posts.json");
        setPosts(p);
      }
    } else {
      let pJSON = require("./data/posts.json");
      let p = pJSON.find((i) => slugTitle(i.title) === viewPostProps.postTitle);
      setViewPost(p);
    }
    return () => setViewPost();
  }, [postProps, setPosts, setViewPost, viewPostProps]);

  return (
    <Grid container spacing={2} justify="center" className="blog-root">
      {!viewPost ? (
        Array.isArray(posts) &&
        posts.map((p, i) => (
          <Grid item key={i}>
            <ButtonBase
              className="post-link"
              onClick={() => selectPost(p)}
              component={HashLink}
              to={blogPath + "/" + slugTitle(p.title)}
            >
              <div>
                <span>
                  <Icon>
                    <Description />
                  </Icon>
                  <p className="post-title">{p.title}</p>
                </span>
                {Array.isArray(p.tags) && (
                  <span>
                    <Icon>
                      <LocalOffer />
                    </Icon>
                    {p.tags.map((p, i) => (
                      <Chip key={i} className="tag" label={p} />
                    ))}
                  </span>
                )}
                <span>
                  <Icon>
                    <DateRange />
                  </Icon>
                  <p className="dark-content">{p.createdOn}</p>
                </span>
              </div>
            </ButtonBase>
          </Grid>
        ))
      ) : (
        <Post post={viewPost} />
      )}
    </Grid>
  );
}
