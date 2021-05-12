import { Menu, Button, IconButton, MenuItem } from "@material-ui/core";
import { ArrowBack, MoreHoriz } from "@material-ui/icons";
import { useAtom } from "jotai";
import { useState } from "react";

import { background } from "../../../data/Atoms";
// import { viewBackgrounds } from "../../views/views";

import "../../../css/app-bar.scss";
import { HashLink } from "react-router-hash-link";

export default function CustomToolbar({ actions, ...rest }) {
  const [anchorEl, setAnchorEl] = useState(false);
  // eslint-disable-next-line
  const [bg, setBg] = useAtom(background);

  const goBack = () => {
    // setBg(viewBackgrounds.blog);
    actions.back();
  };

  return (
    <div className="menu-bar">
      <Button
        onClick={!actions.back.link ? goBack : null}
        component={!actions.back.link ? Button : HashLink}
        to={actions.back.link ? actions.back.link : null}
        startIcon={<ArrowBack />}
      >
        {actions.backTitle}
      </Button>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreHoriz />
      </IconButton>
      <Menu
        open={anchorEl !== false}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(false)}
      >
        {Object.keys(actions.menu).map((k) => (
          <MenuItem
            key={k}
            className={actions.menu[k].className}
            onClick={actions.menu[k].func}
          >
            {k.toString().toUpperCase()}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
