import { Routes, Route } from 'react-router-dom'
import { Home, Login, Nam, Nu, Tre_em, Sale, Homepage,  } from './container/public'
import {path} from './ultils/constant'
import {System} from './container/system'
function App() {
  return (
    <div className=" bg-primary p-4" >
    	<Routes>
			<Route path={path.HOME} element= {<Home/>}>
				<Route path= '*' element= {<Homepage/>}/>
				<Route path={path.LOGIN} element= {<Login/>}/>
				<Route path={path.NAM} element= {<Nam/>}/>
				<Route path={path.NU} element= {<Nu/>}/>
				<Route path={path.TRE_EM} element= {<Tre_em/>}/>
				<Route path={path.SALE} element= {<Sale/>}/>

			</Route>
			<Route path={path.SYSTEM} element={<System />}>
				
			</Route>
    	</Routes>
    </div>
  );
}

export default App;
