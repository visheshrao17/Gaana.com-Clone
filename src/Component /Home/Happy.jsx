import * as React from "react";
import { useNavigate } from "react-router-dom";

const Happy=()=>{
    const [ happy , setHappy] = React.useState([]);

    const navigate = useNavigate();

    const fetchHappy = async () => {
        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/musicx/song?mood=happy', {
                headers: {
                    'accept': 'application/json',
                    'projectID': 'f104bi07c490'
                }
            });
            const data = await response.json();
            console.log('setHappy', data)
            setHappy(data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    React.useEffect(()=>{
        fetchHappy();
    },[])

    return(
        <div className='bg-black text-white '>
                <div className='container mx-auto px-4 py-8'>
                    <h1 className='text-2xl font-bold text-neutral-300 px-3 py-2'>Happy</h1>

                    <div className='flex overflow-x-auto gap-4 bg-opacity-0' >
                        {happy.map((item) => {
                            return (
                                <div
                                    className='m-1 p-1.5'
                                    onClick={() => {
                                        navigate(`/song/${item._id}`)
                                    }}>
                                    <img src={item.thumbnail} alt={(item.name) + 'thumbnail'} className='h-[220px] w-[220px] max-w-none rounded-lg' />
                                    <h2 className=' font-[500]'>{item.title}</h2>
                                    {item.artist.map((items) => {
                                        return (
                                            <span className='text-smtext-slate-400'>{items.name}, </span>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
    )
}


export default Happy;