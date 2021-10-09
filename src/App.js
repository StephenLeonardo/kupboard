import "./App.css";
import Clothings from "./components/Clothing/Clothings";
import AddClothing from "./components/Clothing/AddClothing";
import AddOutfit from "./components/Outfit/AddOutfit";
import Outfits from "./components/Outfit/Outfits";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import Login from "./components/Login/Login";
import ClothingDetail from "./components/Clothing/ClothingDetail";
import OutfitDetail from "./components/Outfit/OutfitDetail";
import Schedule from "./components/Schedule/Schedule";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
function App() {
	return (
		<Layout>
			<Switch>
				<Route path='/clothings' exact>
					<Clothings />
				</Route>
				<Route path='/add-clothing' exact>
					<AddClothing />
				</Route>

				<Route path='/outfits' exact>
					<Outfits />
				</Route>
				<Route path='/add-outfit' exact>
					<AddOutfit />
				</Route>

				<Route path='/' exact>
					<Home />
				</Route>

				<Route path='/clothings/:id'>
					<ClothingDetail />
				</Route>

				<Route path='/outfits/:id'>
					<OutfitDetail />
				</Route>

				<Route path='/schedule/'>
					<Schedule />
				</Route>
				<Route path='/login' exact>
					<Login />
				</Route>

				<Route path='/profile' exact>
					<Profile />
				</Route>
			</Switch>
		</Layout>
	);
}

export default App;
