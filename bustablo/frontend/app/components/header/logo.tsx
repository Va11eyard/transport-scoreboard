import Image from "next/image"
import AituLogo from "../../logos/Aitu.png"
import iQadamLogo from "../../logos/iQadam.png"
import CTSLogo from "../../logos/CTS.png"

interface LogoProps {
  showCTS?: boolean
  showiQadam?: boolean
  showAitu?: boolean
}

export function Logo({ showCTS = true, showiQadam = false, showAitu = false }: LogoProps) {
  return (
    <div className="w-full flex items-center justify-between bg-white py-3 px-8">
      <div className={showCTS ? "" : "invisible"}>
        <Image src={CTSLogo || "/placeholder.svg"} alt="CTS Logo" width={96} height={48} objectFit="contain" />
      </div>
      <div className={showiQadam ? "" : "invisible"}>
        <Image src={iQadamLogo || "/placeholder.svg"} alt="iQadam Logo" width={168} height={48} objectFit="contain" />
      </div>
      <div className={showAitu ? "" : "invisible"}>
        <Image src={AituLogo || "/placeholder.svg"} alt="Aitu Logo" width={96} height={48} objectFit="contain" />
      </div>
    </div>
  )
}

