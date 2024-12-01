import React, {useCallback,useEffect, useRef, useState} from 'react'
import logo from '../../assets/logo.png'
import logo1 from '../../assets/soict_25_years.png'
import { Button, User } from '../../components'
import icons from '../../ultils/icons'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { path } from '../../ultils/constant'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import setmenu from '../../ultils/setmenu'


const { IoLogIn,IoPersonAddOutline } = icons

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const headerRef = useRef()
    const { isLoggedIn } = useSelector(state => state.auth)
    const [isShowMenu, setIsShowMenu] = useState(false)
    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: { flag } })
    }, [])
    useEffect(() => {
        headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [searchParams.get('page')])

    return (
        <div ref={headerRef} className='w-full'>
            <div className='w-full flex items-center justify-between  border-b-2 border-b-gray-950'>
            
                <img 
                    src={logo1}
                    alt="logo1"
                    className='w-[200px] h-[80px] items-center object-contain'
                />
                <Link to={'/'}>
                    <img 
                        src={logo}
                        alt="logo"
                        className='w-[200px] h-[80px] items-center object-contain'
                    />
                </Link>
                <div className='flex items-center gap-3'>
                    {
                        !isLoggedIn && <div className='flex items-center gap-1'>
                        <span >Luckystart xin chào !</span>
    
                        <button onClick={() => window.location.href = '/admin'}>Go to Admin</button>
                        
                        <Button 
                            text={'Đăng nhập'} 
                            textColor={'text-white'} 
                            bgColor={'bg-blue-500'}
                            IcBefore= {IoPersonAddOutline} 
                            onClick={() => goLogin(false)}
                            />
                        <Button 
                            text={'Đăng ký'} 
                            textColor={'text-white'} 
                            bgColor={'bg-blue-500'} 
                            IcBefore= {IoLogIn}
                            onClick={() => goLogin(true)}
                            />
                        </div>
                    }
                    {
                        isLoggedIn && <div className='flex items-center gap-1 relative'>
                        <User/>
                        <Button 
                            text={'Thông tin tài khoản'} 
                            textColor={'text-white'} 
                            bgColor={'bg-blue-500'}
                            IcBefore= {IoPersonAddOutline} 
                            onClick={() => setIsShowMenu(prev => !prev)}
                            />
                        {isShowMenu && <div className='absolute min-w-200 top-full bg-white shadow-md rounded-md p-4 right-20 flex flex-col'>
                            {setmenu.map(item => {
                                return (
                                    <Link
                                        className='hover:text-orange-500 flex items-center gap-2 text-blue-600 border-b border-gray-200 py-2'
                                        key={item.id}
                                        to={item?.path}
                                    >
                                        {item?.icon}
                                        {item.text}
                                    </Link>
                                )
                            })}
                        </div>}
                        <Button 
                            text={'Đăng xuất'} 
                            textColor={'text-white'} 
                            bgColor={'bg-blue-500'} 
                            IcBefore= {IoLogIn}
                            onClick={() => dispatch(actions.logout())}
                            />
                        </div>
                    }
                </div>
            
        </div>
    </div>       
    )
}

export default Header