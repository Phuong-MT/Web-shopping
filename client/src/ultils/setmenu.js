import icons from './icons'

const { AiOutlineUser, AiOutlineShoppingCart, AiOutlineQuestionCircle, FaShoppingBag} = icons

const setmenu = [
    {
        id: 1,
        text: 'Thông tin tài khoản',
        path: '/he-thong/thong-tin-tai-khoan',
        icon:<AiOutlineUser />
    },
    {
        id: 2,
        text: 'Quản lý giỏ hàng ',
        path: '/he-thong/quan-ly-gio-hang',
        icon:<AiOutlineShoppingCart />
    },
    {
        id: 3,
        text: 'Hỗ trợ và hỏi đáp',
        path: '/he-thong/ho-tro-va-hoi-dap',
        icon:<AiOutlineQuestionCircle />
    },
    {
        id: 4,
        text: 'Quản lý đơn hàng',
        path:'/he-thong/quan-ly-don-hang',
        icon:<FaShoppingBag/>
    }
]

export default setmenu