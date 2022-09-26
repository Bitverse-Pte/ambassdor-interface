import { getPublicNFTList } from "@/server";
import { useRequest } from "ahooks";
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

  const { run, data: publicNft, loading: publicNftLoading } = useRequest(getPublicNFTList);

  const levelList = useMemo(() => {
    let _contributor = contributor;
    if (contributor === "contributor" || !contributor.length) {
      if (!publicNft) return null

      const clvIndex = publicNft?.data?.result?.records?.findIndex(i=>i.name === 'ALV1')
      const finalArr = publicNft?.data?.result?.records?.slice(0, clvIndex)
      _contributor = finalArr
    };
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
  }, [contributor, publicNft]);

  return levelList;
};

export default useLevelList;
