import { useEffect, useState } from "react"
import styled, { css, keyframes } from "styled-components"

const loadingProgress = keyframes`
    from, to{
        transform: translate(0, 0);
    }
    50%{
        transform: translate(-100%, 0);
    }

`

const Progress = styled.div<{precent: number; duration?: string, loading?: boolean }>`
    width: 100%;
    background: #3E3E3E;
    border-radius: 6px;
    position: relative;
    min-height: 6px;
    overflow: hidden;

    &::after{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        background: #00DBC9;
        border-radius: 6px;
        width: 100%;
        height: 100%; 
    }


    ${({loading, duration, precent})=> loading ? css`
        &::after{
            transition: none;
            transform: none;
            animation: ${loadingProgress} linear .8s infinite forwards;
        }
    ` : css`
        &::after{
            transition: all ease-in ${duration?duration:'.2s'};
            transform: translate(${(-100 + precent)+'%'}, 0);
            animation: none;
        }
    `}


`

export default ({precent, duration, loading}: {precent: number, duration?: string, loading: boolean})=>{
    const [tempPercent, setTempPercent] = useState(0)

    useEffect(()=>{
        if(precent){
            setTempPercent(precent)
        }
    }, [precent])


    return <Progress loading={!!loading} duration={duration} precent={tempPercent}/>
}