import "../css/Image.css"

function Image({ src, alt }) {
    return (
        <img className="postImage" src={src} alt={alt} />
    )
}

export default Image
