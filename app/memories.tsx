import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import MemoryCard from '../components/MemoryCard';

interface Memory {
  id: string;
  text: string;
  date: string;
  category?: string;
  emotion?: string;
}

// Sample data for demonstration
const sampleMemories: Memory[] = [
  {
    id: '1',
    text: 'I remember the smell of my grandmother\'s apple pie filling the entire house every Sunday. She would let me help roll out the dough, and I always made such a mess with the flour.',
    date: '2024-01-15',
    category: 'Family',
    emotion: 'Joy'
  },
  {
    id: '2',
    text: 'The first time I rode my bicycle without training wheels, I was so proud. My father ran alongside me for what felt like miles, cheering me on.',
    date: '2024-01-14',
    category: 'Childhood',
    emotion: 'Pride'
  }
];

export default function Memories() {
  const [memories, setMemories] = useState<Memory[]>(sampleMemories);

  const handleEditMemory = (memory: Memory) => {
    Alert.alert(
      'Edit Memory',
      'Memory editing feature will be available soon!',
      [{ text: 'OK' }]
    );
  };

  const renderMemory = ({ item }: { item: Memory }) => (
    <MemoryCard memory={item} onEdit={handleEditMemory} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.title}>My Memories</Text>
        <View style={styles.placeholder} />
      </View>

      {memories.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="heart-outline" size={64} color="#BDC3C7" />
          <Text style={styles.emptyTitle}>No memories yet</Text>
          <Text style={styles.emptySubtitle}>Start a conversation to create your first memory</Text>
        </View>
      ) : (
        <FlatList
          data={memories}
          renderItem={renderMemory}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  placeholder: {
    width: 40,
  },
  listContainer: {
    paddingVertical: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 24,
  },
});