import {
  filterActionCategories,
  filterActionList,
  getActionList, getAllPublicQuestList, getQuestList,
} from "@/server";
import { useBoolean, useRequest } from "ahooks";
import { useState } from "react";
import { useModel } from "umi";

export default () => {
  const [actions, setActions]: any = useState(null)
  const [categories, setCategories]: any = useState(null)

  const {
    user: { isExactContributor, isAmbassador },
  } = useModel("userInfo");


    const { run, data, loading, error } = useRequest(async (props)=>{
    if(!isExactContributor && !isAmbassador) return ;
    const res = await getAllPublicQuestList({...props})
    const quest = res?.data?.result?.records ? res?.data?.result?.records[0] : null
    if(quest){
      const ac = await Promise.all([filterActionList({questKey: quest?.questKey}), filterActionCategories({questKey: quest?.questKey})])
      const actions = ac[0]
      const categories = ac[1]
      setActions(actions?.data?.result)
      setCategories(categories?.data?.result)
    }
    return Promise.resolve(res)
  }, {
    manual: true,
  });

  const [questKey, updateQuestKey] = useState('')

  const [
    questModalState,
    {
      toggle: questModalToggle,
      setTrue: questModalSetTrue,
      setFalse: questModalSetFalse,
    },
  ] = useBoolean(false);

  const _questModalSetTrue = ()=>{
    if(!isExactContributor && !isAmbassador) return ;
    questModalSetTrue()
  }



  
  const questModal = {
    run,
    data,
    actions,
    categories,
    loading,
    error,
    questKey,
    updateQuestKey,
    questModalState,
    questModalToggle,
    questModalSetTrue: _questModalSetTrue,
    questModalSetFalse,
    
  };

  return { questModal };
};
