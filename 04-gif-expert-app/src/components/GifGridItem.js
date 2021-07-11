export const GifGridItem = ({id, title, url}) => {

    return (
        <div>
            <img src={url} alt={title}/>
            <p>{title}</p>
        </div>
    )
}