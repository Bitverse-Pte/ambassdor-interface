import { ReactNode } from "react"
import { Link } from "umi"

const tuple = <T extends string[]>(...args: T) => args

export default ({to, children, ...props}: {to: string, children: ReactNode, props?: tuple})=>{
    const ifUseLink = !to.startsWith('http')

    if(ifUseLink) return (<Link to={to} {...props}>{children}</Link>)

    return <a href={to} {...props} target="_blank">{children}</a>
}