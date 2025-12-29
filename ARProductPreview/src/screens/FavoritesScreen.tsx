import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { favoritesAPI } from '../services/api';
import { Model } from '../types';

const FavoritesScreen = ({ navigation }: any) => {
  const [favorites, setFavorites] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
    const unsubscribe = navigation.addListener('focus', loadFavorites);
    return unsubscribe;
  }, [navigation]);

  const loadFavorites = async () => {
    try {
      const response = await favoritesAPI.getAll();
      setFavorites(response.data);
    } catch (error) {
      console.error('Load favorites error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Model }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ARView', { model: item })}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardCategory}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
      </View>

      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>No favorites yet</Text>
            <Text style={styles.emptySubtext}>Browse products and add them to favorites</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  list: {
    padding: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: '100%',
    height: 150,
    backgroundColor: '#f0f0f0',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cardCategory: {
    fontSize: 12,
    color: '#666',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default FavoritesScreen;

