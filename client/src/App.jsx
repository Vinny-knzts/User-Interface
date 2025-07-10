import { useState } from 'react'
import './App.css'
import View from './components/View'
import Form from './components/Form'

function App() {

  const [page, setPage] = useState('view')

  const [savedPicture, setSavedPicture] = useState('default_user.jpg')
  const [savedName, setSavedName] = useState('')
  const [savedAge, setSavedAge] = useState('')
  const [savedStreet, setSavedStreet] = useState('')
  const [savedNeighborhood, setSavedNeighborhood] = useState('')
  const [savedUF, setSavedUF] = useState('')
  const [savedBiography, setSavedBiography] = useState('')

  const [picture, setPicture] = useState('default_user.jpg')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [street, setStreet] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [UF, setUF] = useState('')
  const [biography, setBiography] = useState('')

  const savedAttributes = {
    picture: savedPicture,
    name: savedName,
    age: savedAge,
    street: savedStreet,
    neighborhood: savedNeighborhood,
    UF: savedUF,
    biography: savedBiography
  }

  const setSavedAttributes = {
    picture: setSavedPicture,
    name: setSavedName,
    age: setSavedAge,
    street: setSavedStreet,
    neighborhood: setSavedNeighborhood,
    UF: setSavedUF,
    biography: setSavedBiography
  }

  const attributes = {
    picture,
    name,
    age,
    street,
    neighborhood,
    UF,
    biography
  }

  const setAttributes = {
    picture: setPicture,
    name: setName,
    age: setAge,
    street: setStreet,
    neighborhood: setNeighborhood,
    UF: setUF,
    biography: setBiography
  }

  function changePage() {
    if (page == 'view') {
      setPage('form')
    } else {
      setPage('view')
    }
  }

  return (
    <div className='main'>

      {page == 'view' &&
        <View savedAttributes={savedAttributes} setSavedAttributes={setSavedAttributes} setAttributes={setAttributes}
          changePage={changePage} />
      }

      {page == 'form' &&
        <Form savedAttributes={savedAttributes} attributes={attributes} setAttributes={setAttributes}
          changePage={changePage} />
      }

    </div>
  )
}

export default App
