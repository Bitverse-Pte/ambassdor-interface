import {
  filterActionList,
  getActionList, getQuestList,
} from "@/server";
import { useBoolean, useRequest } from "ahooks";
import { useState } from "react";

export default () => {
  const [actions, setActions] = useState(null)

    const { run, data, loading, error } = useRequest(async (props)=>{
    const res = await getQuestList({...props})
    const quest = res?.data?.result?.records ? res?.data?.result?.records[0] : null
    if(quest){
      const actions = await filterActionList({questKey: quest?.questKey})
      setActions(actions?.data?.result)
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

  const questModal = {
    run,
    data,
    actions,
    loading,
    error,
    questKey,
    updateQuestKey,
    questModalState,
    questModalToggle,
    questModalSetTrue,
    questModalSetFalse,
    
  };

  return { questModal };
};
