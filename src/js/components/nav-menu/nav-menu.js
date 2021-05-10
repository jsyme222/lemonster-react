import { ListItemIcon, Menu, MenuItem } from "@material-ui/core";
import { useAtom } from "jotai";

import { menuAtom } from "../../../data/Atoms";
import { views } from "../../views/views";
import { homePath, paths } from "../../routes";
import { HashLink } from "react-router-hash-link";
import { Home } from "@material-ui/icons";

export default function NavMenu({ onClose, ...rest }) {
  // eslint-disable-next-line
  const [menuState, setMenuState] = useAtom(menuAtom);
  return (
    <Menu open={menuState} onClose={onClose} {...rest}>
      <MenuItem
        key={homePath}
        component={HashLink}
        to={paths.home + "#"}
        onClick={onClose}
        smooth
      >
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        HOME
      </MenuItem>
      {Object.keys(views).map((v, i) => (
        <MenuItem
          key={i}
          component={HashLink}
          to={paths[v] + "#"}
          onClick={onClose}
        >
          <ListItemIcon>{views[v][1]}</ListItemIcon>
          {v.toString().toUpperCase()}
        </MenuItem>
      ))}
    </Menu>
  );
}
