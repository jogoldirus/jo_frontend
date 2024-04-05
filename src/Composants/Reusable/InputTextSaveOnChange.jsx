import { useState } from "react"
import Button from "./Button"
const colorClasses = {
  red: 'outline-none border-1 border-red-100 focus:border-red-300 focus:border-2',
  yellow: 'outline-none border-1 border-yellow-100 focus:border-yellow-300 focus:border-2',
  blue: 'outline-none border-1 border-blue-100 focus:border-blue-300 focus:border-2',
  green: 'outline-none border-1 border-green-100 focus:border-green-300 focus:border-2',
  purple: 'outline-none border-1 border-purple-100 focus:border-purple-300 focus:border-2',
  indigo: 'outline-none border-1 border-indigo-100 focus:border-indigo-300 focus:border-2',
  pink: 'outline-none border-1 border-pink-100 focus:border-pink-300 focus:border-2',
  orange: 'outline-none border-1 border-orange-100 focus:border-orange-300 focus:border-2',
  gray: 'outline-none border-1 border-gray-100 focus:border-gray-300 focus:border-2',
  teal: 'outline-none border-1 border-teal-100 focus:border-teal-300 focus:border-2',
  lime: 'outline-none border-1 border-lime-100 focus:border-lime-300 focus:border-2',
  cyan: 'outline-none border-1 border-cyan-100 focus:border-cyan-300 focus:border-2',
  black: 'outline-none border-1 border-black focus:border-gray-900 focus:border-2',
  white: 'outline-none border-1 border-gray-100 focus:border-gray-200 focus:border-2', // Ici, j'ai utilisé gray-100 pour la bordure de base car white sur white ne serait pas visible
  brown: 'outline-none border-1 border-brown-100 focus:border-brown-300 focus:border-2',
  amber: 'outline-none border-1 border-amber-100 focus:border-amber-300 focus:border-2',
  deepOrange: 'outline-none border-1 border-deep-orange-100 focus:border-deep-orange-300 focus:border-2',
  lightBlue: 'outline-none border-1 border-light-blue-100 focus:border-light-blue-300 focus:border-2',
  deepPurple: 'outline-none border-1 border-deep-purple-100 focus:border-deep-purple-300 focus:border-2',
};


export default function InputTextSaveOnChange({ type = "text", value, settterState, clickHandler = async () => { }, label = "Label", placeholder = "Enter value", className, color = "blue", children, needToSave = true }) {

  const [defaultValue, setDefaultValue] = useState(value)

  const handleOnChange = (e) => {
    settterState(e.target.value)
  }
  const WrapperClickHandler = async () => {
    await clickHandler()
      .then(() => {
        setDefaultValue(value)
        return Promise.resolve()
      })
      .catch(err => {
        console.log(err);
        console.log('Error during saving, value set to' + defaultValue);
        settterState(defaultValue)
        return Promise.reject()
      })

  }

  // Textarea si type = textarea

  if (type === "textarea") return <div className='flex flex-row w-full'>
    <label className='flex flex-col gap-2 select-none  w-full  fill-none whitespace-nowrap'>
      {label}
      <textarea onChange={handleOnChange} value={value} defaultValue={value} placeholder={placeholder} className={"px-4 py-2 border border-slate-200 rounded-md w-full " + colorClasses[color] + " " + className} />
      {
        (defaultValue !== value && needToSave) &&
        <div>
          <Button text='Save' color={color} mode="text" onClick={WrapperClickHandler} />
        </div>
      }
    </label>
  </div>

  // Input select si childrens

  if (children) return <div className='flex flex-row w-full'>
    <label className='flex flex-row items-center gap-2 select-none  w-full fill-none whitespace-nowrap'>
      {label}
      <select value={value} onChange={handleOnChange} className={"px-4 py-2 border border-slate-200 rounded-md w-full " + className}>
        {children}
      </select>
      {
        (defaultValue !== value && needToSave) &&
        <div>
          <Button text='Save' color={color} mode="text" onClick={WrapperClickHandler} />
        </div>
      }
    </label>
  </div>


  // Input text
  return <div className='flex flex-row w-full'>
    <label className='flex flex-row items-center gap-2 select-none  w-full fill-none whitespace-nowrap'>
      {label}
      <input type={type} lang="en" onChange={handleOnChange} value={value} defaultValue={value} placeholder={placeholder} className={"px-4 py-2 border border-slate-200 rounded-md w-full " + colorClasses[color] + " " + className} />
      {
        (String(defaultValue) !== String(value) && needToSave) &&
        <div>
          <Button text='Save' color={color} mode="text" onClick={WrapperClickHandler} />
        </div>
      }
    </label>
  </div>
}