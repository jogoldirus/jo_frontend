import React, { useEffect } from 'react'

function CreditCard({ setterOnChange, data, setterIsValid }) {

  const handleChangeDateValidity = (e) => {
    let value = e.target.value;
    const maxLength = 5; // 'MM/AA' a au total 5 caractères

    // Empêche l'ajout de caractères supplémentaires
    if (value.length > maxLength) {
      value = value.slice(0, maxLength);
      e.target.value = value;
    }

    // Ajoute automatiquement un slash après MM
    if (value.length === 2 && e.nativeEvent.inputType === 'insertText') {
      value += '/';
      e.target.value = value;
    }

    // Gère la suppression du slash si l'utilisateur efface le caractère après 'MM/'
    if (value.length === 2 && e.nativeEvent.inputType === 'deleteContentBackward') {
      value = value.slice(0, 1); // Supprime le dernier chiffre avant le slash
      e.target.value = value;
    }

    // Met à jour l'état avec la nouvelle valeur
    setterOnChange({ ...data, expirationDate: value });
  }
  const handleChangeCardNumber = (e) => {
    let value = e.target.value;
    const maxLength = 19; // 16 chiffres + 3 espaces

    // Supprimer tous les caractères non numériques
    value = value.replace(/\D/g, '');

    // Limiter à 16 chiffres max
    value = value.slice(0, 16);

    // Ajouter des espaces après chaque groupe de 4 chiffres
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');

    e.target.value = value; // Met à jour la valeur dans l'input

    // Met à jour l'état avec la nouvelle valeur
    setterOnChange({ ...data, cardNumber: value });
  }
  const handleChangeCardholderName = (e) => {
    let value = e.target.value;

    // Permettre uniquement les lettres, espaces, tirets et apostrophes
    value = value.replace(/[^a-zA-Z\s'-]/g, '');

    // Met à jour la valeur dans l'input
    e.target.value = value;

    // Met à jour l'état avec la nouvelle valeur
    setterOnChange({ ...data, cardHolder: value });
  }
  const handleChangeCardCVC = (e) => {
    let value = e.target.value;
    const maxLength = 3; // 3 chiffres max

    // Supprimer tous les caractères non numériques
    value = value.replace(/\D/g, '');

    // Limiter à 3 chiffres max
    value = value.slice(0, 3);

    e.target.value = value; // Met à jour la valeur dans l'input

    // Met à jour l'état avec la nouvelle valeur
    setterOnChange({ ...data, cvc: value });
  }
  useEffect(() => {
    if (data.cardNumber.length === 19 && data.cardHolder.length > 0 && data.expirationDate.length === 5 && data.cvc.length === 3) setterIsValid(true);
    else setterIsValid(false);
  }, [data])
  return (
    <div class="mx-auto max-w-lg">
      <div class="bg-white rounded-lg overflow-hidden shadow-lg border">
        <div class="px-6 py-4">
          <div class="flex justify-between items-center">
            <img class="h-8" src="https://www.svgrepo.com/show/499847/company.svg" alt="Workflow logo" />
            <input onChange={handleChangeDateValidity} type='text' class="text-center font-medium text-gray-600 border px-1 rounded w-14" placeholder='05/24' />
          </div>
          <div class="mt-4">
            <input onChange={handleChangeCardNumber} type="text" class="font-bold text-gray-800 text-base border px-1 rounded w-[170px]" placeholder='**** **** **** 1234' />
            <div class="flex justify-between items-center mt-2">
              <input onChange={handleChangeCardholderName} class=" text-gray-600 text-sm border px-1 rounded w-[170px]" placeholder='CARDHOLDER NAME' />
              <img class="h-10 w-10" src="https://www.svgrepo.com/show/362011/mastercard.svg" alt="Mastercard logo" />
            </div>
          </div>
        </div>
        <div class="bg-gray-100 px-6 py-4">
          <div class="font-medium text-gray-600">CARD VERIFICATION VALUE</div>
          <input onChange={handleChangeCardCVC} class="text-lg font-bold text-gray-800 mt-2 w-10 border text-center rounded px-1" placeholder='***' />
        </div>
      </div>
    </div>
  )
}

export default CreditCard