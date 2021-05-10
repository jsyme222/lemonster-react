import { Route } from "react-router";
import Views, { views } from "./views/views";

export const projects = "projects";
export const blog = "blog";
export const blockchain = "blockchain";
export const contact = "contact";

export const homePath = "/";
export const blogPath = "/" + blog;
export const projectsPath = "/" + projects;
export const blockchainPath = "/" + blockchain;
export const contactPath = "/" + contact;

export const paths = {
  home: homePath,
  blog: blogPath,
  projects: projectsPath,
  blockchain: blockchainPath,
  contact: contactPath,
};

export default function Routes() {
  return [
    <Route exact key={homePath} path={homePath} render={() => <Views />} />,
    <Route
      exact
      key={blogPath}
      path={blogPath}
      render={() => views.blog[0]({ opened: true })}
    />,
    <Route
      path={blogPath + "/:postTitle"}
      key={"blog-post-path"}
      render={(match) =>
        views.blog[0]({ opened: true, match: match.match.params })
      }
    />,
    <Route
      exact
      key={projectsPath}
      path={projectsPath}
      render={() => views.projects[0]({ opened: true })}
    />,
    <Route
      exact
      key={blockchainPath}
      path={blockchainPath}
      render={() => views.blockchain[0]({ opened: true })}
    />,
    <Route
      exact
      key={contactPath}
      path={contactPath}
      render={() => views.contact[0]({ opened: true })}
    />,
  ];
}
