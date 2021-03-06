import { Button, ButtonGroup, Grid } from "@material-ui/core";
import { GitHub, EmojiObjects, Close } from "@material-ui/icons";
import { useAtom } from "jotai";
import { useEffect } from "react";

import { background } from "../../../data/Atoms";
import { projectsPath } from "../../routes";
import CustomToolbar from "../appbar/toolbar";
import { MarkdownContent } from "../markdown-components/markdown-rendering";

export default function Project({ project, ...rest }) {
  // eslint-disable-next-line
  const [bg, setBg] = useAtom(background);

  const toolBarMenu = {
    // share: {
    //   func: () => alert(`Share ${project.title | "Project"}`),
    // },
  };
  const toolbarActions = {
    back: { link: projectsPath + "#" },
    backTitle: "Project List",
    menu: toolBarMenu,
  };

  useEffect(() => {
    return () => setBg(null);
  }, [setBg]);

  return (
    <div className="project-list opened" {...rest}>
      <CustomToolbar actions={toolbarActions} />
      <div className="project-header">
        <h1>{project.title}</h1>
        <ButtonGroup>
          {project.url ? (
            <Button
              startIcon={<EmojiObjects />}
              component="a"
              href={project.url}
              className="live-app"
            >
              LIVE
            </Button>
          ) : (
            <Button startIcon={<Close />} disabled>
              Not Live
            </Button>
          )}
          {project.repo && (
            <Button component="a" href={project.repo} startIcon={<GitHub />}>
              Code
            </Button>
          )}
        </ButtonGroup>
      </div>
      <Grid container className="info-boxes"></Grid>
      <div className="content">
        <div className="dark-content">
          <h4 className="description">{project.description}</h4>
          <h5 style={{ marginBottom: 5, textDecoration: "underline" }}>
            Core Technologies
          </h5>
          {project.core_deps.map((d) => (
            <span className="tech" key={d.title} style={{ marginLeft: 5 }}>
              {d.title}
            </span>
          ))}
          <br />
        </div>
        {project.content && (
          <MarkdownContent>{project.content}</MarkdownContent>
        )}
      </div>
    </div>
  );
}
