import React, { useEffect, useState } from 'react';
import api from '../../services/api'

export default function HomeAdm(props) {

    const [systemData, setSystemData] = useState([])


    useEffect(() => {
        api.get('api/StartPageAdm')
        .then(resp => setSystemData(resp.data.QtdEntidades))
    }, [])


    return (
    <>
        <div className="card">
            <div className="card-header">
                Informações
            </div>
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    {systemData && systemData.map((data, index) => 
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <p className="text-secondary">Temos {data.Quantidade} {data.Entidade} cadastrados.</p>
                    </li>
                    )}
                </ul>
            </div>
        </div>
    </>);
}
