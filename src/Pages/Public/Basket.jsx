import { useBasket } from '../../Providers/BasketContext'
import { Link } from 'react-router-dom'
import Button from '../../Composants/Reusable/Button'
import { useAuth } from '../../Providers/AuthContext'
import InputTextSaveOnChange from '../../Composants/Reusable/InputTextSaveOnChange'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CreditCard from '../../Composants/Reusable/CreditCard'
import { fetchWithAuth } from '../../Functions'
function Basket() {
  const navigate = useNavigate()
  const { basketSize, getBasketList, removeFromBasket, clearBasket } = useBasket()
  const { isLogged, login, signup } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')
  const [name, setName] = useState('')
  const [forename, setForename] = useState('')

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [haveAccount, setHaveAccount] = useState(false)
  const [isSuccessBuy, setIsSuccessBuy] = useState(false)

  const [creditCardData, setCreditCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expirationDate: '',
    cvc: ''
  })
  const [creditCardDataIsValid, setCreditCardDataIsValid] = useState(false)
  const handleClickPay = async () => {
    const basket = getBasketList()
    fetchWithAuth('/api/user/basket/pay', {
      method: 'POST',
      body: { basket, creditCardData }
    })
      .then(data => {
        console.log(data)
        setIsSuccessBuy(true)
        clearBasket()
      })
      .catch(err => {
        console.error(err)
      })
  }
  if (isSuccessBuy) return (
    <div className='flex flex-col px-2 py-1 md:px-20 md:py-10 gap-4'>
      <h1 className='text-2xl text-red-500'>Votre panier</h1>
      <div className='flex flex-row gap-5 justify-center'>
        <div className=' bg-red-500 text-white shadow w-1/12 rounded-full'>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-full text-dc2626" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className='flex flex-col justify-evenly text-red-500'>
          <p className='text-3xl'>Votre paiement a été effectué avec succès</p>
        </div>

      </div>
      <p className='text-center'>Vos billets sont disponibles dans votre espace personnel sous format digital.</p>
      <div className='flex w-1/3 self-center mt-8'>
        <Button to="/dashboard" color='red' mode='contained' >Consulter mes places</Button>
      </div>
    </div>
  )
  if (basketSize === 0) return (
    <div className='flex flex-col px-2 py-1 md:px-20 md:py-10 gap-4'>
      <h1 className='text-2xl text-red-500'>Votre panier</h1>
      <p className='flex  flex-row gap-1'>Votre panier est vide, selectionnez une ou plusieurs offres depuis <Link to="/offers" className='text-red-500 cursor-pointer'>la boutique</Link></p>
    </div>
  )
  return (
    <div className='flex flex-col  px-2 py-1 md:px-20 md:py-10'>
      <h1 className='text-2xl text-red-500'>Votre panier</h1>
      <div className='flex flex-col gap-4 pt-4'>
        {
          getBasketList().map((item, i) => <div key={i + 'basketkey'} className='flex flex-row justify-between items-center border-b-2 border-slate-100 py-2'>
            <p>{item.name} - {item.description}</p>
            <div>
              <Button color="red" mode="contained" onClick={() => removeFromBasket(item)}>Supprimer</Button>
            </div>
          </div>)
        }
      </div>
      {
        isLogged && <>
          <div className='mb-10 mt-10 w-full flex flex-col justify-center items-center'>
            <div className='w-fit bg-red-600 text-white rounded px-2 py-1 mb-4'>Entrez vos informations de paiement par paiement sécurisé</div>
            <div className='w-full'>
              <CreditCard setterOnChange={setCreditCardData} data={creditCardData} setterIsValid={setCreditCardDataIsValid} />
            </div>
            <div className='w-1/2 mt-4'>
              <Button onClick={handleClickPay} color={creditCardDataIsValid ? "red" : "gray"} mode="contained" text={creditCardDataIsValid ? "Payer" : "En attente de vos informations de paiement ..."} />
            </div>
          </div>

        </>
      }
      {
        (!isLogged && !haveAccount) && <div className='bg-slate-200 rounded p-4'>
          <p className='text-red-500 text-center font-semibold py-2'>Vous devez avoir un compte pour payer</p>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-4 flex-wrap'>
              <h1 className='text-2xl text-red-500'>Inscription</h1>
              <div>
                <Button onClick={async () => setHaveAccount(true)} color="red" mode="contained" text="J'ai déjà un compte" />
              </div>
            </div>
            <InputTextSaveOnChange value={email} settterState={setEmail} label="Email" needToSave={false} />
            <InputTextSaveOnChange value={name} settterState={setName} label="Name" needToSave={false} />
            <InputTextSaveOnChange value={forename} settterState={setForename} label="Nom" needToSave={false} />
            <InputTextSaveOnChange value={password} settterState={setPassword} label="Mot de passe" needToSave={false} />
            <InputTextSaveOnChange value={confirmpassword} settterState={setConfirmpassword} label="Confirmer le mot de passe" needToSave={false} />

            <Button onClick={async () => await signup({ email, password, confirmpassword, name, forename }).then(() => navigate("/"))} color="red" mode="contained" text="S'inscrire" />
          </div>
        </div>
      }
      {
        (!isLogged && haveAccount) && <div className='bg-slate-200 rounded p-4'>
          <p className='text-red-500 text-center font-semibold py-2'>Si vous avez déjà un compte, connectez-vous</p>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-4 flex-wrap'>
              <h1 className='text-2xl text-red-500 '>Connexion</h1>
              <div>
                <Button onClick={async () => setHaveAccount(false)} color="red" mode="contained" text="Je n'ai pas de compte" />
              </div>
            </div>
            <InputTextSaveOnChange value={loginEmail} settterState={setLoginEmail} label="Email" needToSave={false} />
            <InputTextSaveOnChange value={loginPassword} settterState={setLoginPassword} label="Mot de passe" needToSave={false} />
            <Button onClick={async () => login({ email: loginEmail, password: loginPassword })} color="red" mode="contained" text="Se connecter" />
          </div>
        </div>
      }
    </div>
  )
}

export default Basket