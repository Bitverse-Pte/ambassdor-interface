import { getAmbassadorLevel, getContributorLevel } from "@/server";
import { useLocalStorageState, useRequest } from "ahooks";
import { useEffect, useMemo } from "react";
import { useModel } from "umi";

export default () => {
  const [contributor, updateContributor] = useLocalStorageState('contributor', {
    defaultValue: ''
  })  
  const [ambassador, updateAmbassador] = useLocalStorageState('ambassador', {
    defaultValue: ''
  })  

  const {run, data, loading, error} = useRequest(()=>Promise.all([getAmbassadorLevel(), getContributorLevel()]), {manual: true})

  // @ts-ignore
  const { user: {auth} } = useModel('userInfo')
  
  const ambassadorState = useMemo(()=>!data ? '' :data[0]?.data?.result?.records, [data])
  const contributorState = useMemo(()=>!data ? '' : data[0]?.data?.result?.records, [data])

  useEffect(()=>{
    if(auth){
        run()
    }
  }, [auth])

  useEffect(()=>{
    if(ambassadorState){
        updateAmbassador(ambassadorState)
    }
  }, [ambassadorState])

  useEffect(()=>{
    if(contributorState){
        updateContributor(contributorState)
    }
  }, [contributorState])

    const config = {
      run,
      contributor,
      ambassador,
      loading, 
      error
    };
   
    return { config };
  };