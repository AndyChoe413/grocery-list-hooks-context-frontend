import React, {useState, useContext} from 'react'
import GroceryList from './GroceryList'

import {GroceryInputContext} from '../../context/context'

import './Grocery.css'

function GroceryInputs() {

    const {
        handleSubmit,
        groceryListInput,
        handleGroceryListInput,
        sortByDate,
        sortByPurchased,
     
    } = useContext(GroceryInputContext)


    return (
        <div>
            <div className="form-div">
                <form onSubmit={handleSubmit}>
                    <input
                        value={groceryListInput}
                        placeholder='Add Grocery'
                        type="text"
                        onChange={(e) => handleGroceryListInput(e.target.value)}
                    />
                    <button style={{fontWeight: 600}}>Submit</button>
                    <br />
                    <span style={{ color: "red" }}></span>
                </form>
            </div>

            <div className="sorting">
                <ul>
                    <li>
                        <button onClick={() => sortByDate('desc')}>Sort by date - Newest to oldest</button>
                    </li>
                    <li>
                        <button  onClick={() => sortByDate('desc')}>Sort by date - Oldest to newest</button>
                    </li>
                    <li>
                        <button onClick={() => sortByPurchased('true')}>Sort by purchased</button>
                    </li>
                    <li>
                        <button onClick={() => sortByPurchased('false')}>Sort by not purchased</button>
                    </li>
                </ul>
            </div>

        </div>        
    )
}

export default GroceryInputs
