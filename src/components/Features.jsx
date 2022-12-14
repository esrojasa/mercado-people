const Features = ({ features })=> {
    return(
        <div className="">
            <p><strong>Características:</strong></p>
            <ul className="list-grou">
                {
                    features.map((features,i)=> {
                        return(
                            <li className="list-group-item" key={i}>{ features }</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Features