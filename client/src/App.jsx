import { Box } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import { useColorModeValue } from './components/ui/color-mode';
import { Toaster } from './components/ui/toaster';

export default function App() {
  return (
    <Box
      w="100%"
      minH={'100dvh'}
      bg={useColorModeValue('gary.100', 'gray.900')}
      scrollBehavior={'smooth'}
    >
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
      <Toaster />
    </Box>
  );
}
