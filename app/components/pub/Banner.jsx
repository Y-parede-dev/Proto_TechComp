import Image from "next/image";
import PUBIMG from "@/public/images/banner.jpg";
import Link from "next/link";

export const BannerAds = () => {
    return(
// link https://clk.tradedoubler.com/click?p=320984&a=3342379&g=25082228
        <Link rel="nofollow" target="blank" href={"https://clk.tradedoubler.com/click?p=320984&a=3342379&g=25074000"}>
            <Image 
                src={PUBIMG}
                width={1626}
                height={1300}
                style={{margin:"auto", maxWidth:"100%"}}
                alt="baniere pub Habillage"/>
        </Link>
    )
}