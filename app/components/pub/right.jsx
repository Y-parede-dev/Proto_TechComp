import Image from "next/image";
import PUBIMG from "@/public/images/leftrightpub.jpg";

export const BannerAdsRight = () => {
    return(
// link https://clk.tradedoubler.com/click?p=320984&a=3342379&g=25082228
        <Image 
            src={PUBIMG}
            width={160}
            height={600}
            alt="baniere pub right"/>
    )
}