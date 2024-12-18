import React, { useEffect, useState } from 'react';
import Pack from '../components/Pack';
import CoinPack from '../components/CoinPack';
import '../scss/Shop.scss';
import { getCharacters } from '../apis/marvelApi';
import { getUserInfo } from '../apis/backendApi';
import CoinIcon from '../assets/icons/coin.png';
import { useSnackbar } from './../components/AlertContext';
import CircularProgress from '@mui/material/CircularProgress';

function Shop() {

    const [totalCards, setTotalCards] = useState(null);
    const [coins, setCoins] = useState(null);
    const { showSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true)
                const res = await getCharacters(1,0)
                if (setTotalCards(res.total)) {
                    showSnackbar("Error loading total cards", 'error');
                }
                const response = await getUserInfo();
                setCoins(response.coins)
                setIsLoading(false)
            } catch (error) {
                showSnackbar(error.response.data.message, 'error');
            }
        }

        loadData();
    }, []);

    return (
        <>
        {
            !isLoading ? (
                <div className='shop-container'>
                    <div className='shop-header'>
                        <h2 className='shop-title'>Buy Packs</h2>
                        <div className='shop-row tr-position'>
                            <label className='shop-coin'>{coins} </label>
                            <img
                                alt=""
                                src={CoinIcon}
                                className ='shop-icon'
                            />
                        </div>
                    </div>
        
                    <div className='shop-row'>
                        <Pack amount="100" desc="random cards" price="50" color="#FFD700" totalCards={totalCards} setCoins={setCoins}/>
                        <Pack amount="50" desc="random cards" price="30" color="#9370DB" totalCards={totalCards} setCoins={setCoins}/>
                        <Pack amount="20" desc="random cards"price="15" color="#FFB6C1" totalCards={totalCards} setCoins={setCoins}/>
                        <Pack amount="5" desc="random cards"price="5" color="#D3D3D3" totalCards={totalCards} setCoins={setCoins}/>
                    </div>
                    <h2 className='shop-title mt'>Buy Coins</h2>
                    {/* se nel parametro "desc" viene passato il vlaore coin il compnente pack verrà visualizzato in modo differente */}
                    <div className='shop-row'>
                        <CoinPack amount="100" desc="coin" price="50" color="#FFD700" setCoins={setCoins}/>
                        <CoinPack amount="50" desc="coin" price="30" color="#9370DB" setCoins={setCoins}/>
                        <CoinPack amount="20" desc="coin"price="15" color="#FFB6C1" setCoins={setCoins}/>
                        <CoinPack amount="5" desc="coin" price="5" color="#D3D3D3" setCoins={setCoins}/>
                    </div>
                </div>
            ) : (
                <div className='album-spinner'>
                    <CircularProgress color="error" size="100px"/>
                </div>
            )
        }
        </>
    );
}

export default Shop;