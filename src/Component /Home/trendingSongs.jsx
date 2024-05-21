import * as React from "react";
import { useNavigate } from "react-router-dom";

const FetchTrending=()=>{
    const [trending, setTrending] = React.useState([]);

    const navigate = useNavigate();

    const fetchTrendingSong = async () => {
        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/musicx/song?featured=Trending%20songs', {
                headers: {
                    'accept': 'application/json',
                    'projectID': 'f104bi07c490'
                }
            });
            const data = await response.json();
            console.log('setTrending', data)
            setTrending(data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    React.useEffect(() => {
        fetchTrendingSong();
    },[])

    return(
        <div  className='text-white bg-black flex flex-col p-10'>
                <div className='trending '>
                    <h1 className='text-base font-bold text-neutral-300 px-3 py-2'>Trending Songs</h1>

                    <div className='flex flex-row overflow-scroll scroll-smooth transition-[scroll] duration-[0.3s] ease-[ease-in-out]' >
                        {trending.map((item) => {
                            return (
                                <div
                                    className='m-1'
                                    onClick={() => {
                                        navigate(`/song/${item._id}`)
                                    }}>
                                    <img src={item.thumbnail} alt={(item.name) + 'thumbnail'} className='h-[220px] w-[220px] max-w-none' />
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


export default FetchTrending;