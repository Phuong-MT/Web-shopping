import { Routes, Route } from 'react-router-dom'
import { Home, Login, Nam, Nu, Sale, Homepage, Glamour, Signature, Sapphire, DetailProduct,DetailSreach, LuckyModa} from './container/public'
import { Step_1 } from './components'
import {path} from './ultils/constant'
import {System, AccountManagement,Contact, ShoppingCart} from './container/system'
import {admin } from './container/admin'
function App() {
  return (
    <div className=" bg-primary p-4" >
    	<Routes>
			<Route path={path.HOME} element= {<Home/>}>
				<Route path= '*' element= {<Homepage/>}/>
				<Route path={path.LOGIN} element= {<Login/>}/>
				<Route path={path.NAM} element= {<Nam/>}/>
				<Route path={path.NU} element= {<Nu/>}/>
				{/* <Route path={path.TRE_EM} element= {<Tre_em/>}/> */}
				<Route path={'tim-kiem/*'} element = {<DetailSreach/>}/>
				<Route path={path.SALE} element= {<Sale/>}/>
				<Route path={path.GLAMOUR} element= {<Glamour/>}/>
				<Route path={path.HER_SIGNATRUE} element= {<Signature/>}/>
				<Route path={path.SAPPHIRE_CHIC} element= {<Sapphire/>}/>
				<Route path={path.LUCKYMODA} element={<LuckyModa/>}/>
				<Route path={path.DETAL_POST__TITLE__POSTID} element={<DetailProduct/>} />
				{/* <Route path={'chi-tiet/*'} element={<DetailProduct/>} /> */}
			</Route>
			<Route path={path.SYSTEM} element={<System />}>
				<Route path={path.ACCOUNT} element= {<AccountManagement/>}/>
				<Route path={path.CONTACT} element= {<Contact/>}/>
				<Route path={path.SHOPPINGCART} element={<ShoppingCart/>}/>
				<Route path={path.STEP} element = {<Step_1/>}/>
			</Route>
			<Route path={path.ADMIN} element={<admin/>}>
				<Route path={path.LOGIN} element={<Login/>}/>
			</Route>
    	</Routes>
    </div>
  );
}

export default App;
