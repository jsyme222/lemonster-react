import {
  GridList,
  GridListTile,
  GridListTileBar,
  Icon,
  ListSubheader,
} from "@material-ui/core";
import { Label } from "@material-ui/icons";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import Post from "./post";
import { blogPosts, viewingPost } from "../../../data/Atoms";
import { blogPath } from "../../routes";
import { handle, makeDate, slugTitle } from "../../utils/utils";

import "../../../css/blog.scss";

export default function Blog({ viewPostProps, ...rest }) {
  const [posts, setPosts] = useAtom(blogPosts);
  const [viewPost, setViewPost] = useAtom(viewingPost);
  const [filterBy, setFilterBy] = useState("redux");
  const history = useHistory();

  // const filterPosts = () => {
  //   let findTag = (tags) => {
  //     let t = tags.map((t) => t.title === filterBy && true);
  //     console.log(t);
  //     return t.length > 0;
  //   };
  //   let filteredPosts = posts.filter((p) => findTag(p.tags));
  //   console.log(filteredPosts);
  // };

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed && !posts) {
      handle("blog/").then((posts) => {
        setPosts(posts);
      });
    }
    return function () {
      isSubscribed = false;
    };
  }, [posts, setPosts]);

  useEffect(() => {
    if (viewPostProps && posts) {
      let p = posts.find((i) => slugTitle(i.title) === viewPostProps.postTitle);
      setViewPost(p);
    }
    return function () {
      setViewPost();
    };
  }, [posts, setViewPost, viewPostProps]);

  return (
    <div className="blog-root">
      {/* {filterPosts("redux")} */}
      {!viewPost ? (
        <GridList cellHeight={180} spacing={2} className="post-list">
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">{filterBy}</ListSubheader>
          </GridListTile>
          {Array.isArray(posts) &&
            posts.map((p, i) => (
              <GridListTile
                key={i}
                onClick={() =>
                  history.push(blogPath + "/" + slugTitle(p.title))
                }
                className="post-link"
              >
                {p.background && <img src={p.background} alt={p.title} />}
                <GridListTileBar
                  title={p.title}
                  titlePosition="bottom"
                  subtitle={
                    <>
                      <span className="tags">
                        <Icon>
                          <Label />
                        </Icon>
                        {p.tags && p.tags.map((t) => <span>{t.title}</span>)}
                      </span>
                      <br />
                      <span className="dark-content">
                        {makeDate(p.created_on)}
                      </span>
                    </>
                  }
                />
              </GridListTile>
            ))}
        </GridList>
      ) : (
        <Post post={viewPost} />
      )}
    </div>
  );
}
