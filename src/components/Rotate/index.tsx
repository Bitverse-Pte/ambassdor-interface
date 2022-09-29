import styled from "styled-components"

const Container = styled.div`
transform: rotate(180deg);

`

const Rotate = ({children, ...props}: any)=>{
    return (
        <Container {...props}>{children}</Container>
    )
}

export default Rotate