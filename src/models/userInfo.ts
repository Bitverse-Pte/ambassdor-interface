import {
  ambassador_basic_info_nfts,
  contributor_basic_info_nfts,
} from "@/config/ipfs";
import { ROLE } from "@/interface";
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

  const isContributor = useMemo(() => profile?.role !== ROLE.ambassador, [
    profile?.role,
  ]);
  const isAmbassador = useMemo(() => profile?.role === ROLE.ambassador, [
    profile?.role,
  ]);

  const currentRole = useMemo(
    () =>
      profile?.role === ROLE.ambassador ? ROLE.ambassador : ROLE.contributor,
    [profile?.role]
  );

  const curRoleNft = useMemo(() => {
    if (isAmbassador) {
      return ambassador_basic_info_nfts;
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
    currentRole,
    loading,
    error,
    isContributor,
    isAmbassador,
    curRoleNft,
    contributorNFT: contributor_basic_info_nfts,
    ambassadorNFT: ambassador_basic_info_nfts,
  };

  return { user };
};
