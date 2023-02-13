import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/style.scss'
import { MarvelApp } from './components/marvelApp'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
			refetchOnWindowFocus: false
		}
	}
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<QueryClientProvider client={queryClient}>
		<Router>
			<MarvelApp />
		</Router>
		<ReactQueryDevtools initialIsOpen={false} position={'bottom-right'} />
	</QueryClientProvider>
)
