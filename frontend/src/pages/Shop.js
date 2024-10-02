import React, { useEffect, useState } from 'react';
import Pack from '../components/Pack';
import CoinPack from '../components/CoinPack';
import '../scss/Shop.scss';
import { getCharacters  } from '../apis/marvelApi';

function Shop() {

    const [totalCards, setTotalCards] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const res = await getCharacters(1,0)
            if (setTotalCards(res.total)) {
                console.error("Error loading total cards")
            }
        }

        loadData();
    }, []);

    return (
        <>
        <div className='shop-container'>
            <h2 className='shop-title'>Buy Packs</h2>
            <div className='shop-row'>
                <Pack amount="100" desc="random cards" price="50" color="#FFD700" totalCards={totalCards}/>
                <Pack amount="50" desc="random cards" price="30" color="#9370DB" totalCards={totalCards}/>
                <Pack amount="20" desc="random cards"price="15" color="#FFB6C1" totalCards={totalCards}/>
                <Pack amount="5" desc="random cards"price="5" color="#D3D3D3" totalCards={totalCards}/>
            </div>
            <h2 className='shop-title mt'>Buy Coins</h2>
            
            {/* se nel parametro "desc" viene passato il vlaore coin il compnente pack verrà visualizzato in modo differente */}
            <div className='shop-row'>
                <CoinPack amount="100" desc="coin" price="50" color="#FFD700"/>
                <CoinPack amount="50" desc="coin" price="30" color="#9370DB"/>
                <CoinPack amount="20" desc="coin"price="15" color="#FFB6C1"/>
                <CoinPack amount="5" desc="coin" price="5" color="#D3D3D3"/>
            </div>
        </div>
        </>
    );
}

export default Shop;