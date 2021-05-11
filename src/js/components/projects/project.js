import { Button, ButtonGroup, Grid, Chip } from "@material-ui/core";
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
    share: {
      func: () => alert(`Share ${project.title | "Project"}`),
    },
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
    <div className="project-root">
      <CustomToolbar actions={toolbarActions} />
      <div className="project-header">
        <h1>{project.title}</h1>
        <img
          src={project.backgroundImage}
          alt={project.title}
          style={{ maxWidth: "75%", maxHeight: 200 }}
        />
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
      <Grid container className="info-boxes">
        {project.coreDeps && (
          <Grid item>
            <h5 style={{ marginBottom: 5, textDecoration: "underline" }}>
              Core Technologies
            </h5>
            {project.coreDeps.map((d) => (
              <Chip
                key={d}
                style={{ marginLeft: 5 }}
                label={d}
                color="secondary"
              />
            ))}
          </Grid>
        )}
      </Grid>
      <div className="content">
        <h4 className="description">{project.description}</h4>
        {project.content && (
          <MarkdownContent>{project.content}</MarkdownContent>
        )}
      </div>
    </div>
  );
}
