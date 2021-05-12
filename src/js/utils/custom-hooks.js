import { useAtom } from "jotai";
import { useEffect } from "react";
import { viewBackgroundAtom } from "../../data/Atoms";
import { handle } from "./utils";

export function SetViewBackgroundState(props) {
  const [backgrounds, setBackgrounds] = useAtom(viewBackgroundAtom);

  useEffect(() => {
    if (
      !backgrounds.projects ||
      !backgrounds.blog ||
      !backgrounds.contact ||
      !backgrounds.blockchain
    ) {
      handle("/projects/backgrounds/").then((bg) => setBackgrounds(bg));
    }
    return () =>
      setBackgrounds({
        blog: null,
        projects: null,
        blockchain: null,
        contact: null,
      });
  });
}
