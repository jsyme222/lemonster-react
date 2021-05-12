import { ButtonBase, Grid, Paper } from "@material-ui/core";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";

import { projectsPath } from "../../routes";
import Project from "./project";
import { background, projectListAtom } from "../../../data/Atoms";
import { handle, slugTitle } from "../../utils/utils";

import "../../../css/projects.scss";

export default function Projects({ projectProps }) {
  const [projects, setProjects] = useAtom(projectListAtom);
  const [selectedProject, setSelectedProject] = useState(null);
  // eslint-disable-next-line
  const [bg, setBg] = useAtom(background);

  const selectProject = (p) => {
    setBg(p.backgroundImage);
    setSelectedProject(p);
  };

  useEffect(() => {
    if (!projects) {
      handle("projects/").then((pList) => setProjects(pList));
    }
  }, [projects, setProjects]);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed && projectProps && projects) {
      let p = projects.find(
        (proj) => slugTitle(proj.title) === projectProps.projectTitle
      );
      selectProject(p);
    }
    return () => (isSubscribed = false);
    // eslint-disable-next-line
  }, [projectProps, projects]);

  const projectList = Array.isArray(projects) ? (
    <Grid
      container
      spacing={1}
      wrap="wrap"
      justify="center"
      className="project-list-root"
    >
      {projects.map((p, i) => (
        <Grid item key={i}>
          <ButtonBase
            component={HashLink}
            to={projectsPath + "/" + slugTitle(p.title)}
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
