import { ButtonBase, Grid, Paper } from "@material-ui/core";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";

import { projectsPath } from "../../routes";
import Project from "./project";
import { apiUrl, background } from "../../../data/Atoms";

import "../../../css/projects.scss";
import { slugTitle } from "../../utils/utils";

export default function Projects({ projectProps }) {
  const projects = require("./data/projects.json");
  const [selectedProject, setSelectedProject] = useState(null);
  // eslint-disable-next-line
  const [bg, setBg] = useAtom(background);
  // eslint-disable-next-line
  const [url, setUrl] = useAtom(apiUrl);

  const selectProject = (p) => {
    setBg(p.backgroundImage);
    setSelectedProject(p);
  };

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed && projectProps) {
      let p = projects.find(
        (proj) => slugTitle(proj.title) === projectProps.projectTitle
      );
      selectProject(p);
    }
    console.log(url);
    return () => (isSubscribed = false);
    // eslint-disable-next-line
  }, [projectProps, projects]);

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
          <ButtonBase
            component={HashLink}
            to={projectsPath + "/" + slugTitle(p.title)}
            // onClick={() => selectProject(p)}
            className="secondary-hover project-card"
          >
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
