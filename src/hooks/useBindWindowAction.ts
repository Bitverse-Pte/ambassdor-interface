import { useEffect } from "react";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const useBindWindowAction = ()=>{

    // 初次加载向window注入方法
    // 方便后续方法调用
    useEffect(()=>{
        // @ts-ignore
        window.__toast = toast
    }, [])

}

export default useBindWindowAction;