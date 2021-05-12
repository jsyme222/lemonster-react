import { Fragment, useEffect, useState } from "react";
import { ButtonBase, Icon, Paper } from "@material-ui/core";
import { useAtom } from "jotai";

import { background, viewingPost } from "../../data/Atoms";
import Blog from "../components/blog/blog";
import { blockchain, blog, contact, paths, projects } from "../routes";
import Projects from "../components/projects/projects";
import { NavHashLink } from "react-router-hash-link";

import "../../css/views.scss";
import {
  AccountTree,
  AllInclusive,
  ArrowUpward,
  Contacts,
  LocalLibrary,
} from "@material-ui/icons";
import Contact from "../components/contact/contact";

const viewBackgrounds = {
  blog: "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  contact:
    "https://images.unsplash.com/photo-1614792221813-49ba4b35cc3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2024&q=80",
  blockchain:
    "https://images.unsplash.com/photo-1496989981497-27d69cdad83e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2044&q=80",
  projects:
    "https://images.unsplash.com/photo-1456428746267-a1756408f782?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
};

function View({ title, children, opened, backgroundImage, ...rest }) {
  const [bg, setBg] = useAtom(background);
  // eslint-disable-next-line
  const [post, setViewingPost] = useAtom(viewingPost);
  const [viewBackground, setViewBackground] = useState();

  useEffect(() => {
    if (bg) {
      setViewBackground(bg);
    } else {
      setViewBackground(backgroundImage);
    }
    return () => setViewBackground(null);
  }, [backgroundImage, bg, setBg]);

  return (
    <section
      className={`view-root ${opened && "opened"} ${post && " post"}`}
      {...rest}
      id={title.toLowerCase()}
      style={{
        backgroundImage: viewBackground
          ? `linear-gradient(to bottom, rgba(109, 26, 67, 0.2), rgba(55, 212, 55, 0.3)), url(${viewBackground})`
          : "initial",
      }}
    >
      {post && post.background && (
        <Icon color="secondary" className="up-arrow">
          <ArrowUpward />
        </Icon>
      )}
      <Paper className={`view-content`}>
        {!opened ? (
          <ButtonBase
            component={NavHashLink}
            to={paths[title.toLowerCase()] + "#"}
            className="unopened-view"
          >
            <h1>{title}</h1>
          </ButtonBase>
        ) : (
          <>
            <h1>{post ? post.title : title}</h1>
            {children}
          </>
        )}
      </Paper>
    </section>
  );
}

const ProjectView = ({ match, opened, bgImg }) => (
  <View
    title={projects.toUpperCase()}
    opened={opened}
    backgroundImage={bgImg || viewBackgrounds.projects}
  >
    <Projects projectProps={match} />
  </View>
);

const BlogView = ({ match, opened, bgImg }) => {
  return (
    <View
      title={blog.toUpperCase()}
      opened={opened}
      backgroundImage={bgImg || viewBackgrounds.blog}
    >
      <Blog viewPostProps={match} />
    </View>
  );
};

const BlockchainView = ({ opened, bgImg }) => (
  <View
    title={blockchain.toUpperCase()}
    backgroundImage={bgImg || viewBackgrounds.blockchain}
    opened={opened}
  >
    <h1>BlockChain</h1>
  </View>
);

const ContactView = ({ opened, bgImg }) => (
  <View
    title={contact.toUpperCase()}
    backgroundImage={bgImg || viewBackgrounds.contact}
    opened={opened}
  >
    <Contact />
  </View>
);

export const views = {
  projects: [ProjectView, <AccountTree />],
  blog: [BlogView, <LocalLibrary />],
  blockchain: [BlockchainView, <AllInclusive />],
  contact: [ContactView, <Contacts />],
};

export default function Views({ ...rest }) {
  return (
    <div className="views" {...rest}>
      {Object.keys(views).map((k, i) => (
        <Fragment key={i}>
          {views[k][0]({ opened: false, bgImg: viewBackgrounds[k] })}
        </Fragment>
      ))}
    </div>
  );
}
