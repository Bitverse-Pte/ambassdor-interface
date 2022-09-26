import { ROLE } from "@/interface";
import {
  getAmbassadorLevelList,
  getContributorLevelList,
} from "@/server";
import { useLocalStorageState, useRequest } from "ahooks";
import { useEffect, useMemo, useState } from "react";
import { useModel } from "umi";

export default () => {
  const { data, loading, error } = useRequest(() =>
    Promise.all([getContributorLevelList(), getAmbassadorLevelList()])
  );
  console.log("data", data);

  const [contributor, updateContributor] = useState(null);
  const [ambassador, updateAmbassador] = useState(null);

  // const { run, data, loading, error } = useRequest(
  //   (role: string) => {
  //     if (role === ROLE.ambassador) {
  //       return getAmbassadorLevel();
  //     }
  //     if (role === ROLE.contributor) {
  //       return getContributorLevel();
  //     }
  //     return Promise.reject("Invalid Role");
  //   },
  //   { manual: true }
  // );

  const ambassadorState = useMemo(
    () => (!data || !data[1] ? "" : data[1]?.data?.result?.records),
    [data]
  );
  const contributorState = useMemo(
    () => (!data || !data[0] ? "" : data[0]?.data?.result?.records),
    [data]
  );

  // useEffect(() => {
  //   if (isAmbassador) {
  //     run(isAmbassador);
  //   }
  //   if (isContributor) {
  //     run(isContributor);
  //   }
  // }, [isContributor, isAmbassador]);

  useEffect(() => {
    if (ambassadorState) {
      updateAmbassador(ambassadorState);
    }
  }, [ambassadorState]);

  useEffect(() => {
    if (contributorState) {
      updateContributor(contributorState);
    }
  }, [contributorState]);

  const config = {
    // run,
    contributor,
    ambassador,
    loading,
    error,
  };

  return { config };
};
