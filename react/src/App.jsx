import { useState } from 'react'
import './App.css'

function App() {
  const [answer, setAnswer] = useState('')
  const [isAnswer, setIsAnswer] = useState(false)
  const [error, setError] = useState('')
  const [isError, setIsError] = useState(false)

  const onSubmitHandler = async () => {
    
    try {
        const res = await fetch(import.meta.env.VITE_BACK_URL)
    console.log(res);
        if(res.ok) {
            setIsError(false)
            const data = await res.json();
            console.log(data);
            setIsAnswer(true)
            setAnswer(data.msg)
        }
    } catch (err) {
        setIsAnswer(false)
        setIsError(true)
        console.log(err.message);
        setError(err.message)
    }
  }

  const onClearHandler = () => {
    setIsAnswer(false)
    setAnswer('')
    setIsError(false)
    setError('')
    // 50e026acc55f.vps.myjino.ru
  }

  return (
    <>
        <h1>Тестовый интерфейс</h1>
        <div className='inputs'>
            <input type="button" value={"запрос к серверу"} onClick={onSubmitHandler}/>
            <input type="button" value={"очистить данные запроса"} onClick={onClearHandler}/>
        </div>
        <div className='answer'>
            {isAnswer &&
                <div>Сообщение сервера: {answer}</div>
            }
            {isError &&
                <div>Сообщение ошибки: {error}</div>
            }
        </div>
    </>
  )
}

export default App
