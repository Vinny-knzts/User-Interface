import api from '../services/api'
import './Form.css'
import editPencilIcon from '../icons/edit_pencil.png'
import closeIcon from '../icons/close.png'
import baseURL from '../services/baseURL'

function Form(props) {

  const UFs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS',
    'RO', 'RR', 'SC', 'SP', 'SE', 'TO']

  function deletePictures() {
    const savedPictureFileName = props.attributes.picture || '/default_user.jpg'
    api.put('/user/image', { savedPictureFileName })
  }

  async function save() {
    const pictureFileName = props.attributes.picture
    const name = props.attributes.name
    const age = Number(props.attributes.age)
    const street = props.attributes.street
    const neighborhood = props.attributes.neighborhood
    const UF = props.attributes.UF
    const biography = props.attributes.biography

    const { data } = await api.get('/user')

    if (data == '') {
      await api.post('/user', {
        pictureFileName, name, age, street, neighborhood, UF, biography
      })
    } else {
      await api.put('/user', {
        pictureFileName, name, age, street, neighborhood, UF, biography
      })
    }

    deletePictures()

    props.changePage()
  }
  return (
    <form className='profileBox' action={save}>
      <div className='profilePictureContainer'>
        <img className='profilePicture' src={baseURL + '/' + props.attributes.picture} alt='Imagem de perfil' />
        <label id='pictureSelectButtonContainer' className='pictureButtonContainer' htmlFor='pictureInput' >
          <img className='pictureButton' src={editPencilIcon} alt='Carregar foto de perfil' />
        </label>
        <input id='pictureInput' name='picture' type='file' accept='image/jpeg, image/jpg, image/png'
          onChange={async (e) => {
            props.setAttributes.picture(URL.createObjectURL(e.target.files[0]))

            const formData = new FormData()
            formData.append('picture', e.target.files[0])

            const { data } = await api.post('/user/image', formData, {
              header: { "Content-Type": "multipart/form-data" }
            });

            props.setAttributes.picture(data)
          }}
        />
        <div id='pictureRemoveButtonContainer' className='pictureButtonContainer'>
          <img className='pictureButton' src={closeIcon} alt='Remover foto de perfil' onClick={() => {
            props.setAttributes.picture(baseURL + '/default_user.jpg')

            props.setAttributes.picture('default_user.jpg')
          }}
          />
        </div>
        <div className='buttonsContainer'>
          <input className='optionsButton' type='submit' value='Salvar' />
          <button className='optionsButton' type='button' onClick={() => {
            api.put('/user/image', { savedPictureFileName: props.savedAttributes.picture })

            props.changePage()
          }}
          >Cancelar</button>
        </div>
      </div>
      <div className='attributesBox'>
        <div className='attributeContainer'>
          <label htmlFor='nameInput' className='attributeName'>Nome completo</label>
          <input id='nameInput' className='attributeValue' type='text' value={props.attributes.name} pattern="[A-zÁ-úÀ-ùÃ-ôÂ-ûç' ]+"
            onChange={(e) => props.setAttributes.name(e.target.value)} />
        </div>
        <div className='attributeContainer'>
          <label htmlFor='ageInput' className='attributeName'>Idade</label>
          <input id='ageInput' className='attributeValue' type='number' min={0} max={100} value={props.attributes.age}
            onChange={(e) => props.setAttributes.age(e.target.value)} />
        </div>
        <div className='attributeContainer'>
          <label htmlFor='streetInput' className='attributeName'>Rua</label>
          <input id='streetInput' className='attributeValue' type='text' value={props.attributes.street}
            onChange={(e) => props.setAttributes.street(e.target.value)} />
        </div>
        <div className='attributeContainer'>
          <label htmlFor='neighborhoodInput' className='attributeName'>Bairro</label>
          <input id='neighborhoodInput' className='attributeValue' type='text' value={props.attributes.neighborhood}
            onChange={(e) => props.setAttributes.neighborhood(e.target.value)} />
        </div>
        <div className='attributeContainer'>
          <label htmlFor='ufInput' className='attributeName'>Estado</label>
          <select id='ufInput' onChange={(e) => props.setAttributes.UF(e.target.value)}>
            <option value={props.savedAttributes.UF}>Selecione:</option>
            {UFs.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
          </select>
        </div>
        <div className='biographyContainer'>
          <label htmlFor='biographyInput' className='attributeName'>Biografia</label>
          <textarea id='biographyInput' className='attributeValue' type='text' value={props.attributes.biography}
            onChange={(e) => props.setAttributes.biography(e.target.value)}
            cols='38' rows='5'
          />
        </div>
      </div>
    </form>
  )
}

export default Form
