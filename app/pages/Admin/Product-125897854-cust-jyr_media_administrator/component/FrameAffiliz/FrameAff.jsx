export const FrameAffiliate = () => {
    const url = `${process.env.HOST}/api/Admin/FrameAffiliz`
    return (
        <iframe
            src= {url}
            title="Frame Affilizz"
            width="600"
            height="600"
            sandbox="allow-scripts allow-popups allow-forms"
            >
        </iframe>
    )
}