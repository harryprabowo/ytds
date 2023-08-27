import "styles/map.scss"

const Map = ({ location }) => {
    const { link, embed } = location

    return (
        <div className="google-map-code">
            <iframe
                src={embed}
                width="100%"
                style={{ border: "0" }}
                allowFullScreen="true"
                loading="lazy"
            />
        </div>
    )
}

export default Map