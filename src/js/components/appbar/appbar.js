import { ButtonBase, IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";

import { activeView, menuAtom } from "../../../data/Atoms";
import { homePath } from "../../routes";
import NavMenu from "../nav-menu/nav-menu";

import "../../../css/app-bar.scss";

export default function AppBar({ ...rest }) {
  // eslint-disable-next-line
  const [active, setActive] = useAtom(activeView);
  const [scrolled, setScrolled] = useState(false);
  // eslint-disable-next-line
  const [menuState, setMenuState] = useAtom(menuAtom);
  const [anchorEl, setAnchorEl] = useState(null);

  const hasScrolled = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setScrolled(true);
    }, 50);
    setTimeout(() => {
      setScrolled(false);
    }, 1200);
  };

  const menuClick = (e) => {
    setAnchorEl(e.currentTarget);
    setMenuState(!menuState);
  };

  useEffect(() => {
    window.addEventListener("scroll", hasScrolled);
    return () => window.removeEventListener("scroll", hasScrolled);
  }, []);

  return (
    <>
      <div className={`app-bar-root ${scrolled && "scrolled"}`} {...rest}>
        <ButtonBase
          onClick={() => setActive(null)}
          component={HashLink}
          to={homePath + "#"}
          smooth
        >
          <h1>
            Le<span>Monster</span>
          </h1>
        </ButtonBase>
        <IconButton onClick={menuClick}>
          <Menu color={"primary"} />
        </IconButton>
        <NavMenu anchorEl={anchorEl} onClose={() => setMenuState(false)} />
      </div>
    </>
  );
}
