// ProductDetailScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    FlatList,
    ScrollView,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFavorite } from '../context/FavoriteContext';
import { useCart } from '../context/CartContext';
import * as ImagePicker from 'expo-image-picker';

const ProductDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { product } = route.params;
    const { favorites, toggleFavorite } = useFavorite();
    const { addToCart } = useCart();

    const isFavorite = favorites.some(f => f.id === product.id);
    const [quantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '#60a69f');
    const [descriptionText, setDescriptionText] = useState('');
    const [uploadedLogo, setUploadedLogo] = useState(null); // ✅ New

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            setUploadedLogo(result.assets[0].uri);
        }
    };

    const handleAddToCart = () => {
        addToCart({
            ...product,
            quantity,
            size: selectedSize,
            color: selectedColor,
            description: descriptionText,
            logo: uploadedLogo, // ✅
        });
        navigation.navigate('Cart');
    };

    const handleBuyNow = () => {
        navigation.navigate('OrderSummary', {
            directBuyItem: {
                ...product,
                quantity,
                size: selectedSize,
                color: selectedColor,
                description: descriptionText,
                logo: uploadedLogo, // ✅
            },
        });
    };

    const renderContent = () => (
        <View>
            <View style={styles.imageWrapper}>
                <Image source={product.image} style={styles.image} />
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleFavorite(product)} style={styles.favBtn}>
                    <MaterialIcons name={isFavorite ? 'favorite' : 'favorite-border'} size={20} color={isFavorite ? 'orange' : '#000'} />
                </TouchableOpacity>
            </View>

            <View style={styles.contentWrapper}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>{product.price}</Text>

                <View style={styles.ratingRow}>
                    <MaterialIcons name="star" size={14} color="gold" />
                    <Text style={styles.ratingText}>{product.rating} ({product.reviews} reviews)</Text>
                </View>

                <Text style={styles.description}>
                    {product.description || 'Its simple and elegant print makes it perfect for those who like minimalist clothes. Read More...'}
                </Text>

                <View style={styles.selectCombinedRow}>
                    <View style={styles.selectColumn}>
                        <Text style={styles.label}>Choose Size</Text>
                        <View style={styles.optionsRow}>
                            {['S', 'M', 'L', 'XL'].map((size) => (
                                <TouchableOpacity
                                    key={size}
                                    style={[styles.sizeBtn, selectedSize === size && styles.sizeSelected]}
                                    onPress={() => setSelectedSize(size)}
                                >
                                    <Text>{size}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.selectColumn}>
                        <Text style={styles.label}>Color</Text>
                        <View style={styles.optionsRow}>
                            {(product.colors || ['#60a69f', '#cad6d2', "#000"]).map((color, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.colorCircle,
                                        { backgroundColor: color },
                                        selectedColor === color && styles.selectedColorCircle,
                                    ]}
                                    onPress={() => setSelectedColor(color)}
                                />
                            ))}
                        </View>
                    </View>
                </View>

                {/* ✅ Only show upload if it's a custom product */}
                <Text style={styles.sectionHeader}>Description</Text>

                {product.isCustom ? (
                    <View style={styles.customRow}>
                        {/* Left: Description */}
                        <TextInput
                            style={styles.descriptionInput}
                            placeholder="Enter your description..."
                            multiline
                            // blurOnSubmit={false}
                            textAlignVertical="top"
                            value={descriptionText}
                            onChangeText={setDescriptionText}
                        />

                        {/* Right: Upload */}
                        <TouchableOpacity style={styles.logoUploadBox} onPress={pickImage}>
                            {uploadedLogo ? (
                                <Image source={{ uri: uploadedLogo }} style={styles.logoImage} />
                            ) : (
                                <>
                                    <Ionicons name="cloud-upload-outline" size={20} color="#999" />
                                    <Text style={styles.uploadText}>Upload{'\n'}Logo</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Write product description here..."
                        multiline
                        value={descriptionText}
                        onChangeText={setDescriptionText}
                    />
                )}



                <Text style={styles.sectionHeader}>Customer review</Text>
                <View style={styles.reviewBox}>
                    <Text style={styles.reviewPlaceholder}>Share your thoughts</Text>
                    <Ionicons name="arrow-forward-circle" size={20} color="#f58220" />
                </View>

                <Text style={styles.sectionHeader}>Related Products</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.relatedWrapper}>
                    {[1, 2, 3].map((_, index) => (
                        <View key={index} style={styles.relatedCard}>
                            <Image source={product.image} style={styles.relatedImage} />
                            <Text style={styles.relatedTitle}>Sample Product</Text>
                            <Text style={styles.relatedSubtitle}>Dress modern</Text>
                            <Text style={styles.relatedPrice}>$162.99</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={[]}
                ListHeaderComponent={renderContent}
                keyExtractor={() => 'empty'}
                contentContainerStyle={styles.scrollContent}
            />

            <View style={styles.bottomActionWrapper}>
                <TouchableOpacity style={styles.cartBtn} onPress={handleAddToCart}>
                    <MaterialIcons name="shopping-cart" size={16} color="#f58220" />
                    <Text style={styles.cartBtnText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyNowBtn} onPress={handleBuyNow}>
                    <Text style={styles.buyNowText}>Buy now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};



export default ProductDetailScreen;



const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    scrollContent: { paddingBottom: 120 },
    imageWrapper: { position: 'relative' },
    image: { width: '100%', height: 300 },
    backBtn: {
        position: 'absolute',
        top: 15,
        left: 15,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 20,
    },
    favBtn: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 20,
    },
    contentWrapper: { padding: 20 },
    title: { fontSize: 16, fontWeight: '700' },
    price: { fontSize: 18, fontWeight: '700', color: '#f58220', marginVertical: 4 },
    ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    ratingText: { fontSize: 12, marginLeft: 4, color: '#999' },
    description: { fontSize: 13, color: '#333', marginBottom: 10 },
    selectRow: { marginVertical: 10 },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
    optionsRow: { flexDirection: 'row', gap: 10 },
    selectCombinedRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    selectColumn: {
        width: '30%',
    },
    sizeBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginRight: 0,
    },
    sizeSelected: {
        borderColor: '#f58220',
        backgroundColor: '#fff3e6',
    },
    colorCircle: {
        top: 4,
        width: 24,
        height: 24,
        borderRadius: 15,
        marginRight: 2,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    selectedColorCircle: {
        borderWidth: 2,
        borderColor: '#f58220',
    },
    inputBox: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 10,
        fontSize: 13,
        color: '#000',
        minHeight: 80,
        marginBottom: 20,
    },
    sectionHeader: { fontSize: 14, fontWeight: '700', marginVertical: 10 },
    reviewBox: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    customRow: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 20,
    },

    descriptionInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 10,
        minHeight: 80,
        textAlignVertical: 'top',
        fontSize: 14,
        color: '#333',
    },

    logoUploadBox: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoImage: {
        width: 60,
        height: 60,
        borderRadius: 5,
    },

    uploadText: {
        fontSize: 10,
        textAlign: 'center',
        color: '#999',
    },

    reviewPlaceholder: { color: '#aaa', fontSize: 13 },
    relatedWrapper: { paddingHorizontal: 20, marginBottom: 20 },
    relatedCard: {
        width: 120,
        marginRight: 12,
    },
    relatedImage: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        marginBottom: 6,
    },
    relatedTitle: {
        fontSize: 12,
        fontWeight: '600',
    },
    relatedSubtitle: {
        fontSize: 11,
        color: '#999',
    },
    relatedPrice: {
        fontSize: 13,
        fontWeight: '700',
        marginTop: 4,
    },
    bottomActionWrapper: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#eee',
    },
    cartBtn: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#f58220',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    cartBtnText: { color: '#f58220', marginLeft: 6, fontWeight: '600' },
    buyNowBtn: {
        backgroundColor: '#f58220',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    buyNowText: {
        color: '#fff',
        fontWeight: '600',

    },
});

