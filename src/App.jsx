import { Toaster } from "@/components/ui/sonner"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import Home from './pages/Home';
import { I18nProvider } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const basename = import.meta.env.VITE_BASE_PATH ?? '/';

function App() {
  return (
    <I18nProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router basename={basename}>
          <LanguageSwitcher />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </I18nProvider>
  )
}

export default App