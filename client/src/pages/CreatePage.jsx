import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useColorModeValue } from '../components/ui/color-mode';
import { useProductStore } from '../store/product';
import { toaster } from '../components/ui/toaster';

export default function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });

  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);

    if (success) {
      toaster.success({
        title: 'Success',
        description: message,
        duration: 5000,
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      });
    } else {
      toaster.error({
        title: 'Error',
        description: message,
        duration: 5000,
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      });
    }
    setNewProduct({ name: '', price: '', image: '' });
  };

  return (
    <Container
      w="100%"
      minH={{ base: '100vh', sm: '100vh', md: '100vh', lg: '100%' }}
    >
      <VStack gap={2} m={'auto'} mt={8}>
        <Heading
          as="h1"
          size={{ base: 'lg', sm: 'xl', md: '2xl', lg: '3xl' }}
          textAlign={'center'}
          mb={8}
        >
          Create New Product
        </Heading>

        <Box
          w={{
            base: '100%',
            sm: '90%',
            md: '80%',
            lg: '70%',
            xl: '60%',
            '2xl': '50%',
          }}
          h="auto"
          p={{ base: 4, sm: 6, md: 8, lg: 12 }}
          rounded={'lg'}
          bg={useColorModeValue('White', 'gray.700')}
          shadow={'md'}
        >
          <VStack gap={4}>
            <Input
              name="name"
              type="text"
              value={newProduct.name}
              color={useColorModeValue('gray.800', 'White')}
              bg={useColorModeValue('White', 'gray.800')}
              placeholder="Product Name"
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              name="price"
              type="number"
              value={newProduct.price}
              color={useColorModeValue('gray.800', 'White')}
              bg={useColorModeValue('White', 'gray.800')}
              placeholder="Product Price"
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              name="url"
              type="text"
              value={newProduct.image}
              bg={useColorModeValue('White', 'gray.800')}
              color={useColorModeValue('gray.800', 'White')}
              placeholder="Product Image URL"
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button
              width={'full'}
              mt={4}
              color={'white'}
              fontSize={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}
              fontWeight={'bold'}
              textTransform={'uppercase'}
              textAlign={'center'}
              bgGradient="to-r"
              gradientFrom="blue.600"
              gradientTo="cyan.500"
              transition={'all 0.3s ease-in'}
              onClick={handleAddProduct}
              _hover={{
                bgGradient: 'to-r',
                gradientFrom: 'blue.500',
                gradientTo: 'cyan.400',
              }}
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
