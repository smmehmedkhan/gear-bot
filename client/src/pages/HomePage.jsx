import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product.js';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW={'container.xl'} py={16}>
      <VStack spacing={8}>
        <Text
          fontSize={{
            base: '2xl',
            md: '3xl',
            lg: '4xl',
          }}
          fontWeight={'bold'}
          mb={8}
          textAlign={'center'}
          textTransform={'capitalize'}
          bgGradient="to-r"
          gradientFrom="blue.500"
          gradientTo="cyan.400"
          bgClip={'text'}
        >
          Current Products 🚀
        </Text>

        <SimpleGrid columns={{ lg: 3, md: 2, sm: 1 }} gap="2.5rem" w={'full'}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontSize={{ base: 'xl', md: '2xl' }}
            fontWeight={'bold'}
            textAlign={'center'}
            color={'gray.500'}
          >
            No products found😿{' '}
            <Link to={'/create'}>
              <Text
                as={'span'}
                color={'blue.500'}
                _hover={{ textDecoration: 'underline' }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
}
