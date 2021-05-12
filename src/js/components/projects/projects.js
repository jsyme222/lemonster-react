import {
  GridList,
  GridListTile,
  GridListTileBar,
  Icon,
} from "@material-ui/core";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import { projectsPath } from "../../routes";
import Project from "./project";
import { background, projectListAtom } from "../../../data/Atoms";
import { handle, slugTitle } from "../../utils/utils";

import "../../../css/projects.scss";
import { useHistory } from "react-router";
import { Label } from "@material-ui/icons";

export default function Projects({ projectProps }) {
  const [projects, setProjects] = useAtom(projectListAtom);
  const [selectedProject, setSelectedProject] = useState(null);
  const history = useHistory();
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
    <GridList cellHeight={220} spacing={2} className="project-list">
      <GridListTile key="Subheader" cols={2} style={{ height: "auto" }} />
      {projects.map((p, i) => (
        <GridListTile
          key={i}
          onClick={() => history.push(projectsPath + "/" + slugTitle(p.title))}
          className="project-link"
          style={{ padding: "0.2em" }}
        >
          {p.backgroundImage && <img src={p.backgroundImage} alt={p.title} />}
          <GridListTileBar
            title={p.title}
            titlePosition="bottom"
            subtitle={
              <div className="techs">
                <Icon color="primary">
                  <Label />
                </Icon>
                {p.core_deps.map((t) => (
                  <span className="tech">{t.title}</span>
                ))}
              </div>
            }
          />
        </GridListTile>
      ))}
    </GridList>
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
