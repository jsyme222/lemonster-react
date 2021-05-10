import {
  Button,
  ButtonBase,
  ButtonGroup,
  Chip,
  Grid,
  Paper,
} from "@material-ui/core";
import { Close, EmojiObjects, GitHub } from "@material-ui/icons";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import { background } from "../../../data/Atoms";
import CustomToolbar from "../appbar/toolbar";

import "../../../css/projects.scss";
import ReactMarkdown from "react-markdown";

export default function Projects({ ...rest }) {
  const projects = require("./data/projects.json");
  const [selectedProject, setSelectedProject] = useState(null);
  // eslint-disable-next-line
  const [bg, setBg] = useAtom(background);

  const selectProject = (p) => {
    setBg(p.backgroundImage);
    setSelectedProject(p);
  };

  function Project({ project, ...rest }) {
    const toolBarMenu = {
      share: {
        func: () => alert(`Share ${project.title | "Project"}`),
      },
    };
    const toolbarActions = {
      back: () => setSelectedProject(),
      backTitle: "Project List",
      menu: toolBarMenu,
    };

    useEffect(() => {
      return () => setBg(null);
    }, []);

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
        <h4 className="description">{project.description}</h4>
        {project.content && <ReactMarkdown>{project.content}</ReactMarkdown>}
        <Grid container>
          {project.coreDeps && (
            <Grid item>
              <h5 style={{ marginBottom: 5, textDecoration: "underline" }}>
                Core Dependencies
              </h5>
              {project.coreDeps.map((d) => (
                <Chip style={{ marginLeft: 5 }} label={d} color="secondary" />
              ))}
            </Grid>
          )}
        </Grid>
      </div>
    );
  }

  const projectList = Array.isArray(projects) ? (
    <Grid
      container
      spacing={2}
      wrap="wrap"
      justify="center"
      className="project-list-root"
    >
      {projects.map((p, i) => (
        <Grid item key={i}>
          <ButtonBase onClick={() => selectProject(p)} className="project-card">
            <Paper>
              <h3>{p.title}</h3>
              <img src={p.backgroundImage} alt={p.title} />
            </Paper>
          </ButtonBase>
        </Grid>
      ))}
    </Grid>
  ) : (
    <h2>No Projects</h2>
  );

  const project = <Project project={selectedProject} />;

  useEffect(() => {
    return () => {
      setBg(null);
      setSelectedProject(null);
    };
  }, [setBg]);

  return !selectedProject ? projectList : project;
}
