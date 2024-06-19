import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import axios from "axios";

export default function Episode() {
    const [id, setId] = useState(1);
    const [info, setInfo] = useState({});
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEpisodeData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
                setInfo(response.data);

                const characterPromises = response.data.characters.map(url =>
                    fetch(url).then(res => res.json())
                );
                const charactersData = await Promise.all(characterPromises);
                setResults(charactersData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEpisodeData();
    }, [id]);

    const handleEpisodeChange = (e) => {
        setId(e.target.value);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className="header">
                <h1>Episode name: <span className="h1-span">{info.name}</span></h1>
                <p >Air Date: <span className="h1-span">{info.air_date}</span></p>
            </div>
            <div className="main-div">
                <div className="filter-div">
                    <form>
                        <label className="episode-label" htmlFor="episode">Pick Episode</label>
                        <select className="episode-select" name="episode" id="episode" onChange={handleEpisodeChange} value={id}>
                            {Array.from({ length: 51 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>Episode - {i + 1}</option>
                            ))}
                        </select>
                    </form>
                </div>
                <div className="filtered-div">
                    {results.map(n => (
                        <div className="filtered-character" key={n.id}>
                            <img className="image" src={n.image} alt="img" />
                            <div style={{ background: n.status === 'Dead' ? 'red' : n.status === 'Alive' ? "green" : "gray" }} className="status">{n.status}</div>
                            <div className="about-characters">
                                <p className="character-name">{n.name}</p>
                                <p className="location-description">Last Location</p>
                                <p className="location">{n.location.name}</p>
                                <Link to={'/selectedCharacters/' + n.id}><button className="get-info">Get info</button></Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}