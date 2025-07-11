import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import SearchBarWithFilter from '../components/SearchBarWithFilter';
import OfferBanner from '../components/OfferBanner';
import ToggleButtons from '../components/ToggleButtons';
import ProductList from '../components/ProductList';
import FilterModal from '../components/FilterModal';
import products from '../data/Products'; // ✅ default import
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [price, setPrice] = useState(1000);
    const [searchQuery, setSearchQuery] = useState('');
    
    const navigation = useNavigation(); // ✅ if not passed as prop

    const filteredProducts = products
        ?.filter((item) => {
            const priceNumber = parseFloat(item.price.replace('₹', ''));
            const matchCategory =
                selectedCategories.length === 0 || selectedCategories.includes(item.category);
            const matchPrice = priceNumber <= price;
            const matchSearch =
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

            return matchCategory && matchPrice && matchSearch;
        });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <HeaderBar />
            <SearchBarWithFilter
                onFilterPress={() => setFilterVisible(true)}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <OfferBanner />
            <ToggleButtons />
            <Text style={{ fontWeight: '700', fontSize: 16, margin: 10 }}>All items</Text>
            <ProductList
                data={filteredProducts}
                onProductPress={(item) => {
                    console.log('Pressed : ', item.title);
                    navigation.navigate('ProductDetail', { product: item });
                }}
            />
            <FilterModal
                visible={filterVisible}
                price={price}
                setPrice={setPrice}
                categories={selectedCategories}
                setCategories={setSelectedCategories}
                onClose={() => setFilterVisible(false)}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;
