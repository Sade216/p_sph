import { NavLink } from 'react-router'


function ErrorPage() {
  return (
    <div className='flex flex-col justify-center items-center my-5'>
        <div className='text-7xl'>Error 404</div>
        <div className='mt-5 text-2xl'>Такая страница не найдена</div>
        <NavLink 
            to='/' 
            className='text-purple-600 hover:text-purple-400 mt-10 text-l'
        >
            Вернуться на главную
        </NavLink>
    </div>
  )
}

export default ErrorPage