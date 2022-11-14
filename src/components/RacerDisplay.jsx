import React, { useState, useEffect } from 'react';
import RacerForm from './RacerForm';
import RacerTable from './RacerTable';

export default function RacerDisplay(props) {
    
    const [season, setSeason] = useState(2022);
    const [round, setRound] = useState(1);
    const [racers, setRacers] = useState([]);

    function updateSeasonRound(inputSeason, inputRound){
        console.log('Hello')
        setSeason(inputSeason);
        setRound(inputRound);
    }

     // Create an effect -> function to execute after every render
     useEffect(() => {
        console.log('useEffect effect callback has been called');
        fetch(`https://kekambas-blog.herokuapp.com/`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const racerStandings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                setRacers(racerStandings);
            });
    }, [season, round]);

    return (
        <div>
            <h1 className="text-center my-3">F1 Racer Standings</h1>
            <RacerForm updateSeasonRound={updateSeasonRound} />
            <RacerTable racers={racers} />
        </div>
    )
}