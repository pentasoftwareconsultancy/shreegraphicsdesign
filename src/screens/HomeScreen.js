import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import SearchBarWithFilter from '../components/SearchBarWithFilter';
import OfferBanner from '../components/OfferBanner';
import ToggleButtons from '../components/ToggleButtons';
import ProductList from '../components/ProductList';
import FilterModal from '../components/FilterModal';
import products from '../data/Products'; // ✅ default import
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import PremadeItemCard from '../components/PremadeItemCard';
import { premadeItems } from '../data/PremadeItemsData';

const HomeScreen = () => {
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [price, setPrice] = useState(1000);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeToggle, setActiveToggle] = useState('premade');

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
            <ToggleButtons
                activeToggle={activeToggle}
                setActiveToggle={setActiveToggle}
            />

            {/* 👇 Use the toggle condition here */}
            {activeToggle === 'premade' ? (
                <>
                    <Text style={{ fontWeight: '700', fontSize: 16, margin: 10 }}>All items</Text>
                    <ProductList
                        data={filteredProducts}
                        onProductPress={(item) => {
                            navigation.navigate('ProductDetail', { product: item });
                        }}
                    />
                </>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#888', fontSize: 16 }}>No custom design items available.</Text>
                </View>

                // <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
                //     <Text style={{ fontWeight: '700', fontSize: 18, marginBottom: 10 }}>
                //         Our Clients <Text style={{ color: '#888' }}>(Premade design)</Text>
                //     </Text>

                //     <FlatList
                //         horizontal
                //         showsHorizontalScrollIndicator={false}
                //         data={premadeItems}
                //         keyExtractor={(item) => item.id.toString()}
                //         renderItem={({ item }) => <PremadeItemCard item={item} />}
                //         contentContainerStyle={{ gap: 12 }}
                //     />
                // </View>

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
