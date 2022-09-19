import { useMemo } from "react";
import { useModel } from "umi";

const calReducer = (tar: any, length: any, key: string | number) => {
  const _t = JSON.parse(JSON.stringify(tar));
  _t.length = length;

  return _t.reduce(
    (prev: any, next: { [x: string]: any }) => +prev + (+next[key] || 0),
    0
  );
};

const useLevelList = () => {
  const {
    config: { contributor },
  }: any = useModel("config");


  const levelList = useMemo(() => {
    if (contributor === 'contributor' || !contributor.length) return null;
    const _copied = JSON.parse(JSON.stringify(contributor));

    return contributor.map((i: { points: any }, index: number) => {
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
  }, [contributor]);

  return levelList;
};

export default useLevelList;
