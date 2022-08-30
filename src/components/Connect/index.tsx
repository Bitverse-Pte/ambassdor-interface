import { useWeb3React } from '@web3-react/core'
import { useModel } from 'umi'
import WalletModal from '../WalletModal'

const Connect = ({children}: {children: any})=>{
    const {account} = useWeb3React()
    const {
      walletModal: { walletModalStatus, displayModal, hiddenModal },
    } = useModel("walletModal");

    const handleConnect = ()=>{
      displayModal();
    }
    
    if(account) return <>{children}</>
    return ( <>
    <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={handleConnect}>Connect Wallet</div>
    <WalletModal />
    </>)
}

export default Connect