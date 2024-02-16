import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faPlus
} from '@fortawesome/free-solid-svg-icons';

const icons = [
	faPlus
]

library.add.apply(library, icons);

import App from './components/App';
import Home from './components/Home';
import Game from './components/Game';

const root = createRoot(
	document.getElementById('main') as HTMLElement
);

const colors = ['danger', 'succes', 'warning', 'primary']

export interface ColorPaletteProps {
	colors: string[]
}

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App />}>
					<Route path='' element={<Home colors={colors} />} />
					<Route path='quiz/:id' element={<Game colors={colors} />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
