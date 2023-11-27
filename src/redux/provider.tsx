'use client';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import { Provider } from 'react-redux';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<PersistGate
				loading={null}
				persistor={persistor}
			>
				{children}
				<ProgressBar
					height='4px'
					color='#2B5A36'
					options={{ showSpinner: false }}
					shallowRouting
				/>
			</PersistGate>
		</Provider>
	);
}
