import {useSelector} from 'react-redux';


export default function Profile() {
  const {currentUser} = useSelector((state)=>state.user)
  return (
    <div>
      <h1 className='text-3xl font-semibold text-center mt-7'>Profile</h1>
      <form className='flex flex-col gap-3 max-w-lg mx-auto'>
      <img  className=' rounded-full cursor-pointer self-center h-24  w-24 ' src={currentUser.avatar} alt="profile" />
        <input type="text" placeholder='Username'  className='rounded-lg p-3 focus: outline-none border-3' />
        <input type="email" placeholder='Email'  className='rounded-lg p-3 focus: outline-none border-3' />
        <input type="password" placeholder='Password'  className='rounded-lg p-3 focus: outline-none border-3' />
      <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80'>Update</button>
      <div className='flex justify-between mt-5 font-semibold '>
        <span className='text-red-700 cursor-pointer '>Delete account</span>
        <span className='text-red-700 cursor-pointer '>Sign Out</span>
      </div>
      </form>
    </div>
  )
}
