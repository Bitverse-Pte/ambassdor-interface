import { BACKFILLABLE_WALLETS, networkConnection } from '@/config'
import { getConnection } from '@/utils'
import { Connector } from '@web3-react/types'
import { useEffect } from 'react'
import { useModel } from 'umi'

async function connect(connector: Connector) {
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly()
    } else {
      await connector.activate()
    }
  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`)
  }
}

export default function useEagerlyConnect() {
  const { wallet: {selectedWalletBackfilled, selectedWallet} } = useModel('wallet')

  useEffect(() => {
    connect(networkConnection.connector)

    if (selectedWallet) {
      connect(getConnection(selectedWallet).connector)
    } else if (!selectedWalletBackfilled) {
      BACKFILLABLE_WALLETS.map(getConnection)
        .map((connection) => connection.connector)
        .forEach(connect)
    }
    // The dependency list is empty so this is only run once on mount
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}