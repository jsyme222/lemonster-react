import { Chip, Icon } from "@material-ui/core";
import { LocalOffer } from "@material-ui/icons";
import { useAtom } from "jotai";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import slugify from "slugify";

import { background, blogPosts, viewingPost } from "../../../data/Atoms";
import { blogPath } from "../../routes";
import CustomToolbar from "../appbar/toolbar";

export default function Post({ post, ...rest }) {
  const [allPosts, setAllPosts] = useAtom(blogPosts);
  const [viewPost, setViewPost] = useAtom(viewingPost);
  // eslint-disable-next-line
  const [bg, setBg] = useAtom(background);
  const { title, createdOn, tags, content } = post;

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
    return () => setBg(null);
  }, [setBg]);

  return (
    <div className="post" id={slugify(title, "-")}>
      <CustomToolbar actions={toolbarActions} />
      <div className="header">
        <span>
          <Icon>
            <LocalOffer />
          </Icon>
          {tags.map((p, i) => (
            <Chip key={i} className="tag" label={p} />
          ))}
        </span>
        <b>
          <p>{createdOn}</p>
        </b>
      </div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}