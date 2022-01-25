import React from 'react'
import { useGames } from '../useHooks/useGames'
import './Home.css'
import AliceCarousel from 'react-alice-carousel';



const Home = () => {


    const { imageBackground, gamesCarrousel } = useGames()

    const responsive = {
        0: { items: 3 },
        512: { items: 8 }
    }

    //console.log(imageBackground, gamesCarrousel)

    const items = gamesCarrousel.map(image => {
        return (<img className='carrousel-it' src={image} height={100} width={150} />)
    })


    return (
        <div>
            <div className='home-background' style={{
                backgroundImage: `url(${imageBackground})`
            }}>
                <div className="home-gradient"></div>
               
                <div className="home-main">
                    <h1 className="home-title">Game Backlog</h1>
                    <p>For videogame lovers</p>
                </div>
                <div className='home-banner'>
                    <div className="home-banner-text">  <h2 className='home-banner-title'>GameBack</h2>
                        <p className="home-banner-subtitle">Create your own videogame backlog, register your own experience, rate and comment your favourite videogames.</p>
                    </div>
                    <div className='container home-carrousel'>
                        <AliceCarousel  infinite autoPlayInterval={400}
                            animationDuration={20000} disableDotsControls
                            responsive={responsive} autoPlay
                            disableButtonsControls items={items.slice(0,19)}
                            autoPlayDirection='rtl'
                            animationEasingFunction='linear'  />
                    </div>
                    <div className='container home-carrousel'>
                        <AliceCarousel infinite autoPlayInterval={400}
                            animationDuration={5000} disableDotsControls
                            responsive={responsive} autoPlay
                            disableButtonsControls items={items.slice(19,40)}
                            autoPlayDirection='ltr'
                            animationEasingFunction='linear' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
