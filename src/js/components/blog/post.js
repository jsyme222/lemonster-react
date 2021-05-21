import { Icon } from "@material-ui/core";
import { LocalOffer } from "@material-ui/icons";
import { useAtom } from "jotai";
import { useEffect } from "react";

import { background, blogPosts, viewingPost } from "../../../data/Atoms";
import { blogPath } from "../../routes";
import { makeDate, slugTitle } from "../../utils/utils";
import CustomToolbar from "../appbar/toolbar";
import { MarkdownContent } from "../markdown-components/markdown-rendering";

export default function Post({ post, ...rest }) {
  const [allPosts, setAllPosts] = useAtom(blogPosts);
  const [viewPost, setViewPost] = useAtom(viewingPost);
  // eslint-disable-next-line
  const [bg, setBg] = useAtom(background);

  const deletePost = () => {
    setAllPosts(allPosts.filter((p) => p !== viewPost));
    setViewPost();
  };

  const toolBarMenu = {
    delete: {
      func: deletePost,
      className: "danger",
    },
  };

  const toolbarActions = {
    back: { link: blogPath + "#" },
    backTitle: "Posts",
    menu: toolBarMenu,
  };

  useEffect(() => {
    post && post.background && setBg(post.background);
    return () => setBg(null);
  }, [post.background, setBg, post]);

  return (
    <div className="post" id={slugTitle(post.title)} {...rest}>
      <CustomToolbar actions={toolbarActions} />
      <div className="header">
        <span>
          <Icon color="secondary">
            <LocalOffer />
          </Icon>
          {post.tags.map((p, i) => (
            <span key={i} className="tag">
              {p.title}
            </span>
          ))}
        </span>
        <b>
          <p className="dark-content">{makeDate(post.created_on)}</p>
        </b>
      </div>
      <MarkdownContent>{post.content}</MarkdownContent>
    </div>
  );
}
