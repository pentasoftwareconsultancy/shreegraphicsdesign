import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFavorite } from '../context/FavoriteContext'; // ✅ import context

const ProductCard = ({ item, onPress }) => {
    const { favorites, toggleFavorite } = useFavorite(); // ✅ use context

    const isFavorite = favorites.some(fav => fav.id === item.id); // ✅ check if liked

    return (
        <TouchableOpacity style={styles.productCard} onPress={() => onPress(item)}>
            <Image source={item.image} style={styles.productImage} />
            <TouchableOpacity
                style={styles.favIcon}
                onPress={() => toggleFavorite(item)}
            >
                <MaterialIcons
                    name={isFavorite ? 'favorite' : 'favorite-border'}
                    size={18}
                    color={isFavorite ? 'orange' : '#000'}
                />
            </TouchableOpacity>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productSubtitle}>{item.subtitle}</Text>
            <View style={styles.priceRow}>
                <Text style={styles.price}>{item.price}</Text>
                <View style={styles.star}>
                    <Text style={styles.rating}>{item.rating}</Text>
                    <MaterialIcons name="star" size={14} color="gold" />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    productCard: { width: '48%', marginBottom: 20 },
    productImage: { width: '100%', height: 150, borderRadius: 10 },
    favIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 5,
        zIndex: 1,
    },
    productTitle: { fontWeight: '600', fontSize: 14 },
    productSubtitle: { fontSize: 11, color: '#999' },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: { fontWeight: '600', fontSize: 14 },
    rating: { fontSize: 12, marginRight: 3 },
    star: { flexDirection: 'row', alignItems: 'center' },
});

export default ProductCard;
