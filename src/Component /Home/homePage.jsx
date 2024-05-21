import Header from "./header";
import Top20 from "./top20Song"
import FetchTrending from "./trendingSongs"
import Evergreen from "./Top50";
import Top50 from "./Evergreen";
import Happy from "./Happy";
import Romantic from "./Romantic";
import Excited from "./Excited"
import Sad from "./Sad";
const HomePage = () =>{
    return(
        <div>
        <Header />
        <FetchTrending />
        <Top20 />
        <Top50/>
        <Evergreen/>
        <Happy/>
        <Romantic/>
        <Excited/>
        <Sad/>

    </ div>
    )
}

export default HomePage;