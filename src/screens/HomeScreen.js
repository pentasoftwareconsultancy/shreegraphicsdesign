// HomeScreen.js
import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import SearchBarWithFilter from '../components/SearchBarWithFilter';
import OfferBanner from '../components/OfferBanner';
import ToggleButtons from '../components/ToggleButtons';
import ProductList from '../components/ProductList';
import FilterModal from '../components/FilterModal';
import products from '../data/Products';
import customProducts from '../data/CustomProducts';
import { useNavigation } from '@react-navigation/native';
import CustomProductList from '../components/CustomProductList';

const HomeScreen = () => {
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [price, setPrice] = useState(1000);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeToggle, setActiveToggle] = useState('premade');
    const navigation = useNavigation();

    const filterItems = (items) =>
        items?.filter((item) => {
            const priceNumber = parseFloat(item.price.replace('₹', ''));
            const matchCategory =
                selectedCategories.length === 0 || selectedCategories.includes(item.category);
            const matchPrice = priceNumber <= price;
            const matchSearch =
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
            return matchCategory && matchPrice && matchSearch;
        });

    const filteredPremade = filterItems(products);
    const filteredCustom = filterItems(customProducts);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <HeaderBar />
            <SearchBarWithFilter
                onFilterPress={() => setFilterVisible(true)}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <OfferBanner />
            <ToggleButtons
                activeToggle={activeToggle}
                setActiveToggle={setActiveToggle}
            />

            {activeToggle === 'premade' ? (
                <>
                    <Text style={{ fontWeight: '700', fontSize: 16, margin: 10 }}>All Premade Items</Text>
                    <ProductList
                        data={filteredPremade}
                        onProductPress={(item) => {
                            navigation.navigate('ProductDetail', { product: { ...item, isCustom: false } });
                        }}
                    />
                </>
            ) : (
                <>
                    <Text style={{ fontWeight: '700', fontSize: 16, margin: 10 }}>All Custom Products</Text>
                    <CustomProductList
                        data={filteredCustom}
                        onProductPress={(item) => {
                            navigation.navigate('ProductDetail', { product: { ...item, isCustom: true } });
                        }}
                    />
                </>
            )}

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
