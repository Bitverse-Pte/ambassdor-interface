import { BACKFILLABLE_WALLETS, ConnectionType } from '@/config'
import { getConnection } from '@/utils'
import { useMemo } from 'react'
import { useModel } from 'umi'

const SELECTABLE_WALLETS = [...BACKFILLABLE_WALLETS]

export default function useOrderedConnections() {
  const { wallet: {selectedWallet} } = useModel('wallet')


  return useMemo(() => {
    const orderedConnectionTypes: ConnectionType[] = []

    // Always attempt to use to Gnosis Safe first, as we can't know if we're in a SafeContext.

    // Add the `selectedWallet` to the top so it's prioritized, then add the other selectable wallets.
    if (selectedWallet) {
      orderedConnectionTypes.push(selectedWallet)
    }
    orderedConnectionTypes.push(...SELECTABLE_WALLETS.filter((wallet) => wallet !== selectedWallet))

    // Add network connection last as it should be the fallback.
    orderedConnectionTypes.push(ConnectionType.NETWORK)

    return orderedConnectionTypes.map(getConnection)
  }, [selectedWallet])
}