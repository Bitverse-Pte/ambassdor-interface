import { getProfile } from "@/server";
import { useLocalStorageState, useRequest } from "ahooks";
import { useMemo, useState } from "react";
import { useModel } from "umi";

export default () => {
  const [auth, updateUser] = useLocalStorageState('auth', {
    defaultValue: ''
  })  

  const [curRole, updateCurRole] = useState('')

  const {run, loading, data, error} = useRequest(getProfile, {manual: true})
  const profile = useMemo(()=>data?.data?.result?.user, [data])

    const user = {
      auth,
      curRole,
      user: profile,
      fetchUser: run,
      updateUser,
      updateCurRole,
      loading,
      error
    };
   
    return { user };
  };