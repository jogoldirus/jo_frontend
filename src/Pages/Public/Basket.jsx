import { useBasket } from '../../Providers/BasketContext'
import { Link } from 'react-router-dom'
import Button from '../../Composants/Reusable/Button'
import { useAuth } from '../../Providers/AuthContext'
import InputTextSaveOnChange from '../../Composants/Reusable/InputTextSaveOnChange'
import { useState } from 'react'

function Basket() {
  const { basketSize, getBasketList, removeFromBasket } = useBasket()
  const { isLoged, login, signup } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [haveAccount, setHaveAccount] = useState(false)
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
        isLoged && <Button color="red" mode="contained" text="Payer" />
      }
      {
        (!isLoged && !haveAccount) && <div className='bg-slate-200 rounded p-4'>
          <p className='text-red-500 text-center font-semibold py-2'>Vous devez avoir un compte pour payer</p>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-4 flex-wrap'>
              <h1 className='text-2xl text-red-500'>Inscription</h1>
              <div>
                <Button onClick={async () => setHaveAccount(true)} color="red" mode="contained" text="J'ai déjà un compte" />
              </div>
            </div>
            <InputTextSaveOnChange value={email} settterState={setEmail} label="Email" needToSave={false} />
            <InputTextSaveOnChange value={password} settterState={setPassword} label="Mot de passe" needToSave={false} />
            <InputTextSaveOnChange value={confirmpassword} settterState={setConfirmpassword} label="Confirmer le mot de passe" needToSave={false} />
            <Button onClick={async () => signup(email, password, confirmpassword)} color="red" mode="contained" text="S'inscrire" />
          </div>
        </div>
      }
      {
        (!isLoged && haveAccount) && <div className='bg-slate-200 rounded p-4'>
          <p className='text-red-500 text-center font-semibold py-2'>Si vous avez déjà un compte, connectez-vous</p>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-4 flex-wrap'>
              <h1 className='text-2xl text-red-500'>Connexion</h1>
              <div>
                <Button onClick={async () => setHaveAccount(false)} color="red" mode="contained" text="Je n'ai pas de compte" />
              </div>
            </div>
            <InputTextSaveOnChange value={loginEmail} settterState={setLoginEmail} label="Email" needToSave={false} />
            <InputTextSaveOnChange value={loginPassword} settterState={setLoginPassword} label="Mot de passe" needToSave={false} />
            <Button onClick={async () => login(loginEmail, loginPassword)} color="red" mode="contained" text="Se connecter" />
          </div>
        </div>
      }
    </div>
  )
}

export default Basket