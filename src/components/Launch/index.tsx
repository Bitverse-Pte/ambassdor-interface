import { fuzzAddress } from "@/utils"
import { useWeb3React } from "@web3-react/core"
import styled from "styled-components"

const ButtonContainer = styled.div`
    background: #0ACBE4;
    border-radius: 5px;
    padding: 4px 29px;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: #000;
    cursor: pointer;
    transition: all 0.2s linear;
    &:hover{
        background: linear-gradient(180deg, #009EFD 0%, #12EFCF 100%), #0ACBE4;
    }
`

const LaunchApp = ()=>{

    const {account} = useWeb3React()
    if(account){
        return <ButtonContainer>{fuzzAddress(account)}</ButtonContainer>
    }
    return <ButtonContainer>Launch App</ButtonContainer>
}

export default LaunchApp