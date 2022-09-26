import { ROLE } from "@/interface";
import { getContributorLevelList } from "@/server";
import { useRequest } from "ahooks";
import { useEffect, useMemo } from "react";
import { useModel } from "umi";

const calReducer = (tar: any, length: any, key: string | number) => {
  const _t = JSON.parse(JSON.stringify(tar));
  _t.length = length;

  return _t.reduce(
    (prev: any, next: { [x: string]: any }) => +prev + (+next[key] || 0),
    0
  );
};

const useLevelList = ({forceRole}: any) => {
  const {
    config: { contributor, ambassador },
  }: any = useModel("config");

  const {
    user: { isAmbassador },
  } = useModel("userInfo");


  const levelList = useMemo(() => {
    if(!ambassador || !contributor) return null;

    let _contributor = (forceRole || isAmbassador) ? ambassador : contributor;
    const _copied = JSON.parse(JSON.stringify(_contributor));

    return _contributor.map((i: { points: any }, index: number) => {
      if (index === 0) {
        return {
          ...i,
          max: i?.points,
          min: 1,
        };
      }

      const min = calReducer(_copied, index, "points");
      const max = calReducer(_copied, index + 1, "points");

      return {
        ...i,
        max,
        min,
      };
    });
  }, [contributor, ambassador, forceRole, isAmbassador]);

  return levelList;
};

export default useLevelList;
