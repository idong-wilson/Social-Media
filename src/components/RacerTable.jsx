import React from 'react'

export default function RacerTable(props) {

    let tableHeaders = ['#', 'First', 'Last', 'Points', 'Wins', 'Nationality', 'Constructor']
    return (
        <table className='table table-primary table-striped my-3'>
            <thead>
                <tr>
                    {tableHeaders.map((th, i) => <th key={i}>{th}</th>)}
                </tr>
            </thead>
            <tbody>
                {props.racers.map(racer => {return (
                    <tr key={racer.position}>
                        <th>{racer.position}</th>
                        <td>{racer.Driver.givenName}</td>
                        <td>{racer.Driver.familyName}</td>
                        <td>{racer.points}</td>
                        <td>{racer.wins}</td>
                        <td>{racer.Driver.nationality}</td>
                        <td>{racer.Constructors[0].name}</td>
                    </tr>
                )})}
            </tbody>
        </table>
    )
}