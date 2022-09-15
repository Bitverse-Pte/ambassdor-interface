import { ReactNode } from "react"
import { Link } from "umi"

export default ({to, children, className, ...props}: {to: string, children: ReactNode, className?: string,  props?: any})=>{
    const ifUseLink = !to.startsWith('http')

    if(ifUseLink) return (<Link to={to} className={className} {...props}>{children}</Link>)

    return <a href={to} className={className} {...props} target="_blank">{children}</a>
}