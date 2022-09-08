import { getAmbassadorLevel, getContributorLevel } from "@/server";
import { useLocalStorageState, useRequest } from "ahooks";
import { useEffect, useMemo, useState } from "react";
import { useModel } from "umi";

export default () => {
  const [contributor, updateContributor] = useState("contributor");
  const [ambassador, updateAmbassador] = useState("ambassador");

  const { run, data, loading, error } = useRequest(
    (role: string) => {
      console.log(role);
      if (role === "ambassador") {
        return getAmbassadorLevel();
      }
      if (role === "contributor") {
        return getContributorLevel();
      }
      return Promise.reject("Invalid Role");
    },
    { manual: true }
  );

  // @ts-ignore
  const {
    user: { isContributor, isAmbassador },
  } = useModel("userInfo");

  const ambassadorState = useMemo(
    () => (!data ? "" : data?.data?.result?.records),
    [data]
  );
  const contributorState = useMemo(
    () => (!data ? "" : data?.data?.result?.records),
    [data]
  );

  useEffect(() => {
    if (isAmbassador) {
      run(isAmbassador);
    }
    if (isContributor) {
      run(isContributor);
    }
  }, [isContributor, isAmbassador]);

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
    run,
    contributor,
    ambassador,
    loading,
    error,
  };

  return { config };
};
