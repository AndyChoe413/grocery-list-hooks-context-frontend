import React, {useState, useContext} from 'react'
import ListItems from './ListItems'
import './GroceryList.css'

import {ListsContext} from '../../context/context'

function GroceryList() {

    const {
        groceryListArray,
    } = useContext(ListsContext)
    
  

    // console.log(groceryListArray)
    return (
        <div>
            <ul>
                {groceryListArray.map((item) => {
                    // console.log(item.purchased)
                    return (
                        <ListItems
                        key={item._id}
                        item={item}
                        />
                    )
                })}
            </ul>
        </div>
    )
}

export default GroceryList
