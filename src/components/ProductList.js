import React from 'react';
import { FlatList, View } from 'react-native';
import ProductCard from './ProductCard';

const ProductList = ({ data, onProductPress }) => (
    <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 100 }}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
        renderItem={({ item }) => <ProductCard item={item} onPress={onProductPress} />}
    />
);

export default ProductList;
