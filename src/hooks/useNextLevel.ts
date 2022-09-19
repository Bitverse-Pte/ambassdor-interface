import { useMemo } from "react";
import { useModel } from "umi";

const useNextLevel = () => {
  const {
    user: { user },
  } = useModel("userInfo");

  const {
    config: { contributor },
  }: any = useModel("config");

  const curLevel = useMemo(() => user?.level, [user]);
  const nextLevel = useMemo(() => {
    if (contributor === "contributor" || !curLevel) return "";
    const len = contributor.length
    const cur = contributor.findIndex((i) => i?.name === curLevel);
    const _c = cur + 1 >= len - 1 ? len - 1 : cur + 1
    return contributor[_c];
  }, [curLevel, contributor]);

  return nextLevel
};

export default useNextLevel;
