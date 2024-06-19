import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export default function SelectedCharacter() {
    const { id } = useParams();
    const [character, setCharacter] = useState([])

    useEffect(() => {

        axios.get(`https://rickandmortyapi.com/api/character/${id}`)
            .then(response => {
                setCharacter(response.data);
                console.log(response.data)
            })
    }, [])



    return (
        <div>
            < div className="select-main-div" >
                <img className="select-image" src={character.image} alt="aaa" />
                <div className="select-info-div">
                    <div className="select-unknown"
                        style={{ background: character.status === 'Dead' ? 'red' : character.status === 'Alive' ? "green" : "gray" }}
                    >{character.status}</div>
                    <div className="select-info-div-character">
                        <p className="select-info"><span className="select-info-name">Gender:</span> Male</p>
                        <p className="select-info"><span className="select-info-name">Location:</span> Citadel of Ricks</p>
                        <p className="select-info"><span className="select-info-name">Origin:</span> unknown</p>
                        <p className="select-info"><span className="select-info-name">Species:</span> Alien</p>

                    </div>
                </div>
            </div>
        </div>)
}