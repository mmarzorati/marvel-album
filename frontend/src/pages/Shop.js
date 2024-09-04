import React from 'react';
import Pack from '../components/Pack';
import '../scss/Shop.scss';

function Shop() {
    return (
        <>
        <div className='shop-container'>
            <h2 className='shop-title'>Buy Packs</h2>
            <div className='shop-row'>
                <Pack amount="100" desc="random cards" price="50" color="#FFD700"/>
                <Pack amount="50" desc="random cards" price="30" color="#9370DB"/>
                <Pack amount="20" desc="random cards"price="15" color="#FFB6C1"/>
                <Pack amount="5" desc="random cards"price="5" color="#D3D3D3"/>
            </div>
            <h2 className='shop-title mt'>Buy Coins</h2>
            
            {/* se nel parametro "desc" viene passato il vlaore coin il compnente pack verrà visualizzato in modo differente */}
            <div className='shop-row'>
                <Pack amount="100" desc="coin" price="50" color="#FFD700"/>
                <Pack amount="50" desc="coin" price="30" color="#9370DB"/>
                <Pack amount="20" desc="coin"price="15" color="#FFB6C1"/>
                <Pack amount="5" desc="coin" price="5" color="#D3D3D3"/>
            </div>
        </div>
        </>
    );
}

export default Shop;