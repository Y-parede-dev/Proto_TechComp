import Image from "next/image";
import PUBIMG from "@/public/images/pubLarge.jpg";
import Link from "next/link";

export const AdsLarge = () => {
    return(
        <Link rel='nofollow' target="blank" href={`https://clk.tradedoubler.com/click?p=320984&a=3342379&g=25082228`}>
            <Image 
                src={PUBIMG}
                width={750}
                height="auto"
                style={{margin:'auto', width:'750px', display:'block'}}
                alt="baniere pub large"/>
        </Link>
    )
}