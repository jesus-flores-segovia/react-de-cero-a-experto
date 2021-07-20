import PropTypes from "prop-types";

export const GifGridItem = ({id, title, url}) => {

    return (
        <div className="card animate__animated animate__fadeInLeft">
            <img src={url} alt={title}/>
            <p>{title}</p>
        </div>
    )
};

GifGridItem.PropTypes = {
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
};