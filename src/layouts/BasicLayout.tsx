import Header from "@/components/Header";
import styled from "styled-components";

import Web3Provider from "@/components/WalletProvider";
import Login from "@/components/Update/Login";
import QuestTitleModal from "@/components/QuestTItleModal";

const Container = styled.div`
  background-color: #05050e;
  color: #fff;
`;

const Content = styled.div`
  background-color: #05050e;
  min-width: 100vw;
  min-height: calc(100vh - 60px);
`

export default function Layout({ children }: { children: any }) {
  
  return (
    <Web3Provider>
      <Login/>
      <QuestTitleModal/>
      <Container>
        <Header />
        <Content>
          {children}
        </Content>
      </Container>
    </Web3Provider>
  );
}
