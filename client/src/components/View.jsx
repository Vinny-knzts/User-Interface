import { useEffect } from 'react'
import api from '../services/api'
import baseURL from '../services/baseURL'

function View(props) {

  function setAttributes(data) {

    let {
      pictureFileName,
      name,
      age,
      street,
      neighborhood,
      UF,
      biography
    } = data

    props.setSavedAttributes.picture(pictureFileName || 'default_user.jpg')
    props.setSavedAttributes.name(name || '')
    props.setSavedAttributes.age(age || '')
    props.setSavedAttributes.street(street || '')
    props.setSavedAttributes.neighborhood(neighborhood || '')
    props.setSavedAttributes.UF(UF || '')
    props.setSavedAttributes.biography(biography || '')
  }

  function edit() {
    props.setAttributes.picture(props.savedAttributes.picture)
    props.setAttributes.name(props.savedAttributes.name)
    props.setAttributes.age(props.savedAttributes.age)
    props.setAttributes.street(props.savedAttributes.street)
    props.setAttributes.neighborhood(props.savedAttributes.neighborhood)
    props.setAttributes.UF(props.savedAttributes.UF)
    props.setAttributes.biography(props.savedAttributes.biography)

    props.changePage()
  }

  async function clear() {
    api.delete('/user')
    api.put('/user/image', { savedPictureFileName: 'default_user.jpg' })

    setAttributes({})
  }

  async function getUser() {
    const { data } = await api.get('/user')
    setAttributes(data)
  }

  useEffect(() => {
    getUser()
  })

  return (
    <div className='profileBox'>
      <div className='profilePictureContainer'>
        <img className='profilePicture' src={baseURL + '/' + props.savedAttributes.picture} alt='Imagem de perfil' />
        <div className='buttonsContainer'>
          <button className='optionsButton' onClick={edit}>Editar</button>
          <button className='optionsButton' onClick={clear} >Limpar</button>
        </div>
      </div>
      <div className='attributesBox'>
        <div className='attributeContainer'>
          <p className='attributeName'>Nome completo</p>
          <p className='attributeValue'>{props.savedAttributes.name}</p>
        </div>
        <div className='attributeContainer'>
          <p className='attributeName'>Idade</p>
          <p className='attributeValue'>{props.savedAttributes.age}</p>
        </div>
        <div className='attributeContainer'>
          <p className='attributeName'>Rua</p>
          <p className='attributeValue'>{props.savedAttributes.street}</p>
        </div>
        <div className='attributeContainer'>
          <p className='attributeName'>Bairro</p>
          <p className='attributeValue'>{props.savedAttributes.neighborhood}</p>
        </div>
        <div className='attributeContainer'>
          <p className='attributeName'>Estado</p>
          <p className='attributeValue'>{props.savedAttributes.UF}</p>
        </div>
        <div className='biographyContainer'>
          <p className='attributeName'>Biografia</p>
          <p className='attributeValue'>{props.savedAttributes.biography}</p>
        </div>
      </div>
    </div>
  )
}

export default View
