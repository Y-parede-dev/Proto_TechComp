import Image from "next/image";
import PUBIMG from "@/public/images/pubtopasushivert.jpg";

export const BannerAdsTop = () => {
    return(
        // link https://clk.tradedoubler.com/click?p=320984&a=3342379&g=25074000
        <Image 
            src={PUBIMG}
            width={728}
            height={90}
            alt="baniere pub top"/>
    )
}