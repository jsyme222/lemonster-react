import {
  FormControl,
  GridList,
  GridListTile,
  GridListTileBar,
  Icon,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Label } from "@material-ui/icons";
import { useAtom } from "jotai";
import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";

import Post from "./post";
import { blogPosts, viewingPost } from "../../../data/Atoms";
import { blogPath } from "../../routes";
import { handle, makeDate, slugTitle } from "../../utils/utils";

import "../../../css/blog.scss";

export default function Blog({ viewPostProps, ...rest }) {
  const [posts, setPosts] = useAtom(blogPosts);
  const [viewPost, setViewPost] = useAtom(viewingPost);
  const [filter, setFilterState] = useState({ title: "all posts" });
  const [tags, setTags] = useState();
  const history = useHistory();

  const filterPosts = (tag) => {
    let findTag = (tags) => {
      let t = tags.filter((t) => t.title === tag);
      return t.length > 0;
    };
    let filteredPosts = posts.filter((p) => findTag(p.tags));
    setFilterState({ title: tag, posts: filteredPosts });
  };

  const setFilter = (term) => {
    term !== "all posts"
      ? filterPosts(term)
      : setFilterState({ title: "all posts" });
  };

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed && !tags) {
      handle("projects/tags/").then((t) => setTags(t));
    }
    return function () {
      isSubscribed = false;
    };
  });

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed && !posts) {
      handle("blog/").then((posts) => {
        posts ? setPosts(posts) : setPosts([]);
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
      {!viewPost ? (
        <Fragment>
          <div className="filters">
            <FormControl variant="outlined" className="">
              <InputLabel id="filters">Topics</InputLabel>
              <Select
                labelId="filters-selector"
                id="filters-selector"
                value={filter.title}
                onChange={(e) => setFilter(e.target.value)}
                label="Topics"
              >
                <MenuItem value="all posts">
                  <em>ALL</em>
                </MenuItem>
                {Array.isArray(tags) &&
                  tags.map((t) => (
                    <MenuItem key={t.title} value={t.title}>
                      {t.title.toUpperCase()}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <GridList cellHeight={200} spacing={2} className="post-list">
            <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
              <ListSubheader component="div">
                {filter.title.toUpperCase()}
              </ListSubheader>
            </GridListTile>
            {Array.isArray(filter.posts || posts) &&
            ((filter.posts && filter.posts.length >= 1) ||
              posts.length >= 1) ? (
              (filter.posts || posts).map((p) => (
                <GridListTile
                  key={p.title}
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
                          <Icon color="primary">
                            <Label />
                          </Icon>
                          {p.tags &&
                            p.tags.map((t) => (
                              <span key={t.title}>{t.title}</span>
                            ))}
                        </span>
                        <br />
                        <span>{makeDate(p.created_on)}</span>
                      </>
                    }
                  />
                </GridListTile>
              ))
            ) : (
              <p>No Posts</p>
            )}
          </GridList>
        </Fragment>
      ) : (
        <Post post={viewPost} />
      )}
    </div>
  );
}
