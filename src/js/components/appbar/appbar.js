import { ButtonBase, IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { useAtom } from "jotai";
import { useState } from "react";
import { HashLink } from "react-router-hash-link";

import { menuAtom } from "../../../data/Atoms";
import { homePath } from "../../routes";
import NavMenu from "../nav-menu/nav-menu";

import "../../../css/app-bar.scss";

export default function AppBar({ ...rest }) {
  const [menuState, setMenuState] = useAtom(menuAtom);
  const [anchorEl, setAnchorEl] = useState(null);

  const menuClick = (e) => {
    setAnchorEl(e.currentTarget);
    setMenuState(!menuState);
  };

  return (
    <>
      <div className={`app-bar-root`} {...rest}>
        <ButtonBase component={HashLink} to={homePath + "#"} smooth>
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
