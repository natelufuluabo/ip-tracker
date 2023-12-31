import '../styles.css';
import { useState } from 'react';
import { getDataWithDomain, getDataWithIP, ValidateIPaddress } from '../utils/utils';
import { dataAtom } from '../utils/recoilStore';
import { useRecoilState } from 'recoil';

export default function AbsoluteContainer() {
    const [userInput, setUserInput] = useState('');
    const [data, setData] = useRecoilState(dataAtom);
    const location = `${data.location.city}, ${data.location.region}`;
    const handleChange = (e) => {
        setUserInput(e.target.value);
    }
    const handleSubmit = async () => {
        if (ValidateIPaddress(userInput)) {
            const response = await getDataWithIP(userInput);
            setData(response);
            setUserInput('');
            return 
        }
        const response = await getDataWithDomain(userInput);
        setData(response);
        setUserInput('');
    }
    return (
        <div className="absoluteContainer">
            <h1>IP Address Tracker</h1>
            <div className="ipInputCotainer">
                <input value={userInput} onChange={handleChange} type='text' className='ipInput' placeholder='Search for IP address ou domain' />
                <button onClick={handleSubmit}><i className="fa-solid fa-chevron-right"></i></button>
            </div>
            <div className='infosContainer'>
                <div className='infoContainer'>
                    <h3 className='title'>IP ADDRESS</h3>
                    <h3 className='info'>{data.ip || '---'}</h3>
                </div>
                <button>|</button>
                <div className='infoContainer'>
                    <h3 className='title'>LOCATION</h3>
                    <h3 className='info'>{location || '---'}</h3>
                </div>
                <button>|</button>
                <div className='infoContainer'>
                    <h3 className='title'>TIMEZONE</h3>
                    <h3 className='info'>{data.location.timezone || '---'}</h3>
                </div>
                <button>|</button>
                <div className='infoContainer'>
                    <h3 className='title'>ISP</h3>
                    <h3 className='info'>{data.isp || '---'}</h3>
                </div>
            </div>
        </div>
    )
}
