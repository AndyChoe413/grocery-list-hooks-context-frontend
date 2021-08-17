import React, { useState, useContext } from 'react'
import {ListsContext} from '../../context/context'

function ListItems({item}) {

    const {
        groceryListArray,
        purchasedById,
        deleteById,
        editById,
        setCanEdit,
        canEdit,
        handleEdit
 } = useContext(ListsContext)
    
    const [canEditInput, setCanEditInput] = useState(false)
    const [listInput, setListInput] = useState(item.grocery)

    function handleSubmitFunc() {
        // console.log(listInput)
        handleEdit(item._id, listInput)
        setCanEditInput(!canEditInput)
    }

    return (
     
        <li
            
            className={`li-style ${item.purchased ? 'li-style-purchased' : ""}`}
        >
            {canEditInput ? (
                    <input 
                    value={listInput}
                    onChange={(e) => setListInput(e.target.value)}
                />
                
            ) : (
                item.grocery
                )
            }

            {canEditInput ? (
                <button onClick={()=> handleSubmitFunc()}>Submit</button>
            ): (
                <button onClick={()=> setCanEditInput(!canEditInput)}>Edit</button>
            )}
            
            <button onClick={()=> purchasedById(item._id, item.purchased)} >Purchased</button>
            <button onClick={() => deleteById(item._id)}>Delete</button>
        </li>
    )
}

export default ListItems
