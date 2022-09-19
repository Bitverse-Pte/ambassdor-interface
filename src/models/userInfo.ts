import {
  ambassdor_basic_info_nfts,
  contributor_basic_info_nfts,
} from "@/config/ipfs";
import { getProfile } from "@/server";
import { useLocalStorageState, useRequest } from "ahooks";
import { useMemo, useState } from "react";

export default () => {
  const [auth, updateAuth] = useLocalStorageState("auth", {
    defaultValue: "",
  });

  const [curRole, updateCurRole] = useState("");

  const { run, loading, data, error } = useRequest(getProfile, {
    manual: true,
  });
  const profile = useMemo(() => data?.data?.result?.user, [data]);
  const isContributor = useMemo(
    () => (profile?.role === "contributor" ? profile?.role : ""),
    [profile?.role]
  );
  const isAmbassador = useMemo(
    () => (profile?.role === "ambassador" ? profile?.role : ""),
    [profile?.role]
  );

  const curRoleNft = useMemo(() => {
    if (isAmbassador) {
      return ambassdor_basic_info_nfts;
    }
    return contributor_basic_info_nfts;
  }, [isContributor, isAmbassador]);

  const user = {
    auth,
    curRole,
    user: profile,
    fetchUser: run,
    updateAuth,
    updateCurRole,
    loading,
    error,
    isContributor,
    isAmbassador,
    curRoleNft,
  };

  return { user };
};
