import styled from "styled-components"

const Container = styled.div`
    transform: rotate(0);
    transition: all linear .2s;
    display: inline-block;
    transform-origin: center;
    height: 32px;
    width: 32px;
    &.active{
        transform: rotate(180deg);
    }
    cursor: pointer;

`

export default ({children, state, ...props}: any)=>{
    return <Container className={state?`active`:''} {...props}>{children}</Container>
}