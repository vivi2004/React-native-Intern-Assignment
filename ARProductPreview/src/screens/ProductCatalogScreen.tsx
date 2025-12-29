import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { modelsAPI, favoritesAPI } from '../services/api';
import { Model } from '../types';

const ProductCatalogScreen = ({ navigation }: any) => {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    loadModels();
  }, [selectedCategory]);

  const loadModels = async () => {
    try {
      const response = await modelsAPI.getAll(selectedCategory || undefined);
      setModels(response.data);
    } catch (error) {
      console.error('Load models error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadModels();
  };

  const categories = ['All', 'Furniture', 'Electronics', 'Toys', 'Home Decor'];

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
        <Text style={styles.headerTitle}>Product Catalog</Text>
      </View>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryChip,
              selectedCategory === (item === 'All' ? null : item) && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(item === 'All' ? null : item)}>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === (item === 'All' ? null : item) && styles.categoryTextActive,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        style={styles.categoriesList}
        showsHorizontalScrollIndicator={false}
      />

      <FlatList
        data={models}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>No products found</Text>
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
  categoriesList: {
    maxHeight: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
  },
  categoryChipActive: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
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
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default ProductCatalogScreen;

