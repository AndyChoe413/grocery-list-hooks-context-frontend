import React, {useState, useEffect} from 'react'
import { Header, GroceryList, GroceryInputs } from './components/ComponentsIndex';
import { ListsContext, GroceryInputContext } from './context/context';
import axios from 'axios';

import './App.css';


const URL = 'http://localhost:3001'


function App() {

  const [groceryListInput, setGroceryListInput] = useState('')
  const [groceryListArray, setGroceryListArray] = useState([])
  const [error, setError] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const [canEdit, setCanEdit] = useState(false)
  // const [editInput, setEditInput] = useState()

  useEffect(() => {
   getAllGroceries()
  }, [])

  function handleGroceryListInput(value) {
    setGroceryListInput(value)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      let result = await axios.post(`${URL}/api/groceries/create-grocery`, { grocery: groceryListInput })
      // console.log(result)

      let newArray = [...groceryListArray, result.data.payload]

      setGroceryListArray(newArray)
      setGroceryListInput('')
    } catch (e) {
      console.log(e)
    }
  }

  async function getAllGroceries() {
    try {
      let result = await axios.get(`${URL}/api/groceries/get-all-groceries`)
      // console.log(result)
      setGroceryListArray(result.data.payload)
    } catch (e) {
      console.log(e);
    }
  }

  async function editById() {
    try {
      let result = await axios.put(`${URL}/api/groceries/update-groceries-by-id/:id`)


    } catch (e) {
      console.log(e)
    }
  }

  async function purchasedById(id, purchased) {
    // console.log(id)
    //   console.log(purchased)
    try {
      let result = await axios.put(`${URL}/api/groceries/purchased-by-id/${id}`,
        {
          // coming in from Schema backend
          purchased: !purchased
        }
      )
      let updatedArray = groceryListArray.map((item) => {
        if (item._id === result.data.payload._id) {
          item.purchased = result.data.payload.purchased
        }
        return item
      })
      // console.log(updatedArray)
      setGroceryListArray(updatedArray)
    } catch (e) {
      console.log(e)
    }
  }

  async function deleteById(id) {
    try {
      let result = await axios.delete(`${URL}/api/groceries/delete-groceries-by-id/${id}`)

      let filteredArray = groceryListArray.filter((item) => item._id !== result.data.payload._id)

      setGroceryListArray(filteredArray)
      // console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

  async function handleEdit(id, listInput) {
    console.log(listInput)
    try {
      let result = await axios.put(`${URL}/api/groceries/update-groceries-by-id/${id}`,
        {
          grocery: listInput
        }
      )
 console.log(result)
      let updatedArray = groceryListArray.map((item) => {
        if (item._id === id) {
          item.grocery = result.data.payload.grocery
        }

        return item
      })

       setGroceryListArray(updatedArray)
      // console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

   async function sortByDate(sortOrder) {
    try {
      let sorted = await axios.get(
        `${URL}/api/groceries/get-groceries-by-sort?sort=${sortOrder}`
      );
      setGroceryListArray(sorted)
    } catch (e) {
      console.log(e);
    }
   };
  
  async function sortByPurchased(purchased)  {
    try {
      let isPurchasedArray = await axios.get(
        `${URL}/api/groceries/get-groceries-by-purchased?purchased=${purchased}`
      );
      setGroceryListArray(isPurchasedArray)
    } catch (e) {
      console.log(e);
    }
  };




  const groceryInputContextValue = {
    handleSubmit,
    groceryListInput,
    handleGroceryListInput,
    sortByDate,
    sortByPurchased,
    purchasedById
  }

  const ListsContextValue = {
    groceryListArray,
    purchasedById,
    deleteById,
    editById,
    setCanEdit,
    canEdit,
    handleEdit
  }

  return (
    <div className="App">

        <Header />

      <GroceryInputContext.Provider value={groceryInputContextValue}>
        <GroceryInputs/>
      </GroceryInputContext.Provider>

      <ListsContext.Provider value={ListsContextValue}>
        <GroceryList/>
      </ListsContext.Provider>
      
    </div>
  );
}

export default App;
