import React, { useState, useEffect } from 'react'
import { InputForm, Button } from '../../components'
import { useLocation, useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const Login = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAdmin, msg, update,} = useSelector(state => state.admin)
    const [invalidFields, setInvalidFields] = useState([])
    const [payload, setPayload] = useState({
        phone: '',
        password: '',
    })
    console.log(isAdmin)
    useEffect(() => {
      isAdmin && navigate('/admin')
    }, [isAdmin])

    useEffect(() => {
        if (msg) {
            Swal.fire('Oops!', msg, 'error');
        }
    }, [msg, update])
    const handleSubmit = async () => {
        let invalids = validate(payload)
        if (invalids === 0) await  dispatch(actions.loginadmin(payload))
    }
    const validate = (payload) => {
        let invalids = 0
        let fields = Object.entries(payload)
        fields.forEach(item => {
            if (item[1] === '') {
                setInvalidFields(prev => [...prev, {
                    name: item[0],
                    message: 'Bạn không được bỏ trống trường này.'
                }])
                invalids++
            }
        })
        fields.forEach(item => {
            switch (item[0]) {
                case 'password':
                    if (item[1].length < 6) {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Mật khẩu phải có tối thiểu 6 kí tự.'
                        }])
                        invalids++
                    }
                    break;
                case 'phone':
                    if (!+item[1]) {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Số điện thoại không hợp lệ.'
                        }])
                        invalids++
                    }
                    break

                default:
                    break;
            }
        })
        return invalids
    }


    return (
        <div className='w-full flex items-center justify-center'>
            <div className='bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm'>
                <h3 className='font-semibold text-2xl mb-3'>Đăng nhập</h3>
                <div className='w-full flex flex-col gap-5'>
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'SỐ ĐIỆN THOẠI'}
                        value={payload.phone}
                        setValue={setPayload}
                        keyPayload={'phone'}
                    />
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'MẬT KHÂU'}
                        value={payload.password}
                        setValue={setPayload}
                        keyPayload={'password'}
                        type='password'
                    />
                    <Button
                        text='Đăng nhập'
                        bgColor='bg-secondary1'
                        textColor='text-white'
                        fullWidth
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    )
}

export default Login