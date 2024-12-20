import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  Button,
  Flex,
  Icon,
  VStack,
  Input,
} from '@chakra-ui/react';
import { BiSolidEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { useColorModeValue } from '../components/ui/color-mode';
import { toaster } from './ui/toaster';
import { useProductStore } from '../store/product.js';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const [open, setOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { deleteProduct, updateProduct } = useProductStore();
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const inputTextColor = useColorModeValue('gray.800', 'White');
  const inputBgColor = useColorModeValue('White', 'gray.800');

  const handleProductDelete = async (productId) => {
    const { success, message } = await deleteProduct(productId);
    if (success) {
      toaster.success({
        title: 'Success',
        description: message,
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      });
    } else {
      toaster.error({
        title: 'Error',
        description: message,
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      });
    }
  };

  const handleProductUpdate = async (productId, updatedProduct) => {
    const { success, message } = await updateProduct(productId, updatedProduct);
    setOpen(false);
    if (success) {
      toaster.success({
        title: 'Success',
        description: message,
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      });
    } else {
      toaster.error({
        title: 'Error',
        description: message,
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      });
    }
  };

  return (
    <>
      <Box
        shadow={'lg'}
        rounded={'lg'}
        overflow={'hidden'}
        transition={'all 0.3s ease-in-out'}
        _hover={{
          transform: 'translateY(-5px)',
          shadow: 'xl',
        }}
        bg={bgColor}
      >
        <Image
          src={product.image}
          alt={product.name}
          h={48}
          w={'full'}
          objectFit={'cover'}
        />

        <Box p={4}>
          <Heading as={'h3'} size={'md'} mb={2}>
            {product.name}
          </Heading>
          <Text fontSize={'xl'} fontWeight={'bold'} color={textColor} mb={4}>
            ${product.price}
          </Text>
          <HStack spacing={'2'}>
            <IconButton
              aria-label="Edit Product"
              fontSize={20}
              bgColor={'blue.500'}
              onClick={() => setOpen(true)}
            >
              <BiSolidEdit />
            </IconButton>
            <IconButton
              aria-label="Delete Product"
              color={'white'}
              bgColor={'red.600'}
              onClick={() => handleProductDelete(product._id)}
            >
              <MdDelete />
            </IconButton>
          </HStack>
        </Box>
      </Box>
      {open && (
        <Flex
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          justifyContent="center"
          alignItems="center"
          zIndex="9999"
          cursor={'not-allowed'}
          pageScrollLock={false}
        >
          <Box
            w={{
              base: '95%',
              sm: '90%',
              md: '80%',
              lg: '70%',
              xl: '60%',
              '2xl': '50%',
            }}
            maxW="600px"
            h="auto"
            p={{ base: 4, sm: 6, lg: 8 }}
            rounded={'lg'}
            bgColor={bgColor}
            shadow={'md'}
            cursor={'default'}
          >
            <VStack gap={4}>
              <Input
                name="name"
                color={inputTextColor}
                bg={inputBgColor}
                placeholder="Product Name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    name: e.target.value,
                  })
                }
              />
              <Input
                name="price"
                type="number"
                color={inputTextColor}
                bg={inputBgColor}
                placeholder="Product Price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                name="url"
                bg={inputBgColor}
                color={inputTextColor}
                placeholder="Product Image URL"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
            <HStack
              justifyContent="flex-end"
              spacing="4"
              mt="4"
              position="relative"
            >
              <Button
                color={'white'}
                bgColor={'blue.500'}
                _hover={{
                  bgColor: 'blue.600',
                }}
                size="sm"
                onClick={() => handleProductUpdate(product._id, updatedProduct)}
              >
                Update
              </Button>
              <Button
                colorScheme="red"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </HStack>
          </Box>
          <Button
            position="absolute"
            top="5%"
            right="5%"
            size="sm"
            color={inputTextColor}
            backgroundColor="transparent"
            onClick={() => setOpen(false)}
          >
            &#x2716;
          </Button>
        </Flex>
      )}
    </>
  );
}
