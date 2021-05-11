import { Fragment } from "react";
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

export const viewBackgrounds = {
  blog:
    "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  contact:
    "https://images.unsplash.com/photo-1614792221813-49ba4b35cc3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2024&q=80",
  blockchain:
    "https://images.unsplash.com/photo-1496989981497-27d69cdad83e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2044&q=80",
  projects:
    "https://images.unsplash.com/photo-1456428746267-a1756408f782?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
};

function View({ title, children, opened, backgroundImage, ...rest }) {
  // eslint-disable-next-line
  const [bg, setBg] = useAtom(background);
  // eslint-disable-next-line
  const [post, setViewingPost] = useAtom(viewingPost);

  return (
    <section
      className={`view-root ${opened && "opened"} ${post && " post"}`}
      {...rest}
      id={title.toLowerCase()}
      style={{
        backgroundImage: bg
          ? `linear-gradient(to bottom, rgba(109, 26, 67, 0.2), rgba(55, 212, 55, 0.3)), url(${bg})`
          : backgroundImage
          ? `linear-gradient(to bottom, rgba(55, 212, 55, 0.19), rgba(109, 26, 67, 0.2)), url(${backgroundImage})`
          : "white",
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

const ProjectView = ({ match, opened }) => (
  <View
    title={projects.toUpperCase()}
    key={projects}
    opened={opened}
    backgroundImage={viewBackgrounds.projects}
  >
    <Projects projectProps={match} />
  </View>
);

const BlogView = ({ match, opened }) => {
  return (
    <View
      title={blog.toUpperCase()}
      key={blog}
      opened={opened}
      backgroundImage={viewBackgrounds.blog}
    >
      <Blog viewPostProps={match} />
    </View>
  );
};

const BlockchainView = ({ opened }) => (
  <View
    title={blockchain.toUpperCase()}
    key={blockchain}
    backgroundImage={viewBackgrounds.blockchain}
    opened={opened}
  >
    <h1>BlockChain</h1>
  </View>
);

const ContactView = ({ opened }) => (
  <View
    title={contact.toUpperCase()}
    key={blockchain}
    backgroundImage={viewBackgrounds.contact}
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
      {Object.values(views).map((v, i) => (
        <Fragment key={i}>{v[0]({ opened: false })}</Fragment>
      ))}
    </div>
  );
}
