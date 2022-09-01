import {
  getActionList, getQuestList,
} from "@/server";
import { useBoolean, useRequest } from "ahooks";
import { useEffect, useState } from "react";

export default () => {
  const { run, data, loading, error } = useRequest(getQuestList, {
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
