import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useColorMode, useColorModeValue } from './ui/color-mode';
import { LuSun } from 'react-icons/lu';
import { IoMoon } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa6';

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={'1440px'} px={'8px'}>
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDir={{ base: 'column', sm: 'row' }}
        gap={{ base: 4, sm: 0 }}
      >
        <Text
          fontSize={{ base: '2xl', sm: '3xl' }}
          fontWeight={'bold'}
          textTransform={'uppercase'}
          textAlign={'center'}
          bgGradient="to-r"
          gradientFrom="blue.500"
          gradientTo="cyan.400"
          bgClip={'text'}
        >
          <Link to={'/'}>GearBot 🛒</Link>
        </Text>
        <HStack spacing={2} alignItems={'center'}>
          <Link to={'/create'}>
            <Button
              color={useColorModeValue('gray.800', 'gray.200')}
              bgColor={useColorModeValue('gray.200', 'gray.700')}
              _hover={{
                bgColor: useColorModeValue('gray.300', 'gray.600'),
              }}
            >
              <FaPlus fontSize={20} />
            </Button>
          </Link>
          <Button
            color={useColorModeValue('gray.800', 'gray.200')}
            bgColor={useColorModeValue('gray.200', 'gray.700')}
            _hover={{
              bgColor: useColorModeValue('gray.300', 'gray.600'),
            }}
            onClick={toggleColorMode}
          >
            {colorMode === 'dark' ? (
              <IoMoon fontSize={20} />
            ) : (
              <LuSun fontSize={20} />
            )}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}
