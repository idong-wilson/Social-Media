import React from 'react'

export default function RacerForm(props) {

    function handleFormSubmit(e){
        e.preventDefault();
        console.log(e);
        let season = e.target.season.value;
        let round = e.target.round.value;
        props.updateSeasonRound(season, round);
    }

    return (
        <form className='row my-3' onSubmit={handleFormSubmit}>
            <div className="col-12 col-sm-5">
                <input type="text" name="season" placeholder="Enter Season" className="form-control" />
            </div>
            <div className="col-12 col-sm-5">
                <input type="text" name="round" placeholder="Enter Round" className="form-control" />
            </div>
            <div className="col">
                <input type="submit" value="Search" className="btn btn-success w-100" />
            </div>
        </form>
    )
}