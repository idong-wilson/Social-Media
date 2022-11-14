import React, { Component } from 'react';
import RacerForm from './RacerForm';
import RacerTable from './RacerTable';

export default class RacerClassDisplay extends Component {
    constructor(props){
        console.log('Component Constructed')
        super(props); // Always call super(props) on the constructor
        this.state = {
            season: "2022",
            round: "1",
            racers: []
        };
    }

    componentDidMount(){
        console.log('Component Mounted');
        fetch(`https://ergast.com/api/f1/${this.state.season}/${this.state.round}/driverStandings.json`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const racerStandings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                this.setState({
                    racers: racerStandings
                });
            })
    }

    componentDidUpdate(prevProps, prevState){
        console.log('Component Did Update');
        console.log(prevState, this.state);
        if (prevState.round !== this.state.round || prevState.season !== this.state.season){
            if (!this.state.season || !this.state.round){
                this.setState({
                    racers: []
                })
            } else {
                fetch(`https://ergast.com/api/f1/${this.state.season}/${this.state.round}/driverStandings.json`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    const racerStandings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                    this.setState({
                        racers: racerStandings
                    });
                })
            }
        }
    }

    updateSeasonRound = (inputSeason, inputRound) => {
        this.setState({
            season: inputSeason,
            round: inputRound
        })
    }

    render() {
        console.log('Component Rendered');
        return (
            <div>
                <h1 className="text-center my-3">F1 Racer Standings</h1>
                <RacerForm updateSeasonRound={this.updateSeasonRound} />
                <RacerTable racers={this.state.racers} />
            </div>
        )
    }
}