import { useMemo } from "react";
import { useModel } from "umi";

const useNextLevel = () => {
  const {
    user: { user, isAmbassador, isContributor },
  } = useModel("userInfo");

  const {
    config: { contributor, ambassador },
  }: any = useModel("config");

  const curLevel = useMemo(() => user?.level, [user]);
  const nextLevel = useMemo(() => {
    if (!ambassador || !contributor || !curLevel) return "";

    const curLevelList = isAmbassador ? ambassador : contributor

    const len = curLevelList?.length
    const cur = curLevelList.findIndex((i) => i?.name === curLevel);
    const _c = cur + 1 >= len - 1 ? len - 1 : cur + 1
    return curLevelList[_c];
  }, [curLevel, contributor, isContributor, isAmbassador, user]);

  return nextLevel
};

export default useNextLevel;
