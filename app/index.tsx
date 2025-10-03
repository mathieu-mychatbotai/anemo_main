import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from './contexts/AuthContext';
import RecordButton from '../components/RecordButton';
import ConversationPrompt from '../components/ConversationPrompt';
import StatusIndicator from '../components/StatusIndicator';

const conversationPrompts = [
  "Tell me about a meaningful moment from your childhood.",
  "What was your favorite family tradition growing up?",
  "Describe a place that holds special memories for you.",
  "Tell me about someone who made a big impact on your life.",
  "What's a skill or hobby you enjoyed when you were younger?"
];

export default function Index() {
  const { user, signOut } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [status, setStatus] = useState<'idle' | 'listening' | 'processing' | 'speaking'>('idle');
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (!user) {
      router.replace('/auth');
    }
  }, [user]);

  const handleRecordPress = () => {
    if (!isRecording) {
      const randomPrompt = conversationPrompts[Math.floor(Math.random() * conversationPrompts.length)];
      setCurrentPrompt(randomPrompt);
      setShowPrompt(true);
      setIsRecording(true);
      setStatus('listening');
    } else {
      setIsRecording(false);
      setStatus('processing');
      setShowPrompt(false);
      setTimeout(() => {
        setStatus('idle');
        Alert.alert('Memory Saved', 'Your memory has been recorded and saved successfully!');
      }, 2000);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace('/auth');
  };

  if (!user) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Anemo</Text>
        <Text style={styles.subtitle}>Your Memory Companion</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={24} color="#E74C3C" />
          </TouchableOpacity>
        </View>

      </View>
      <View style={styles.content}>
        <StatusIndicator status={status} />
        <ConversationPrompt prompt={currentPrompt} isVisible={showPrompt} />
        <View style={styles.buttonContainer}>
          <RecordButton isRecording={isRecording} onPress={handleRecordPress} />
          <Text style={styles.instruction}>
            {isRecording ? 'Speak naturally about your memory' : 'Tap to start a conversation'}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.memoriesBanner} 
          onPress={() => router.push('/memories')}
          activeOpacity={0.8}
        >
          <Ionicons name="library" size={32} color="#4A90E2" />
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>View My Memories</Text>
            <Text style={styles.bannerSubtitle}>Browse and edit your saved stories</Text>
          </View>
          <Ionicons name="chevron-forward" size={28} color="#4A90E2" />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { alignItems: 'center', paddingTop: 40, paddingBottom: 20, position: 'relative' },
  title: { fontSize: 36, fontWeight: 'bold', color: '#2C3E50', marginBottom: 8 },
  subtitle: { fontSize: 18, color: '#7F8C8D', fontWeight: '500' },
  headerButtons: { position: 'absolute', top: 40, right: 20, flexDirection: 'row', gap: 10 },
  memoriesButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F4FD', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
  signOutButton: { backgroundColor: '#FFEBEE', padding: 8, borderRadius: 20 },
  buttonText: { color: '#4A90E2', fontSize: 14, fontWeight: '600', marginLeft: 6 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  buttonContainer: { marginVertical: 40, alignItems: 'center' },
  instruction: { fontSize: 16, color: '#7F8C8D', textAlign: 'center', marginTop: 20, paddingHorizontal: 40 },
  memoriesBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    borderWidth: 2,
    borderColor: '#4A90E2',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginTop: 30,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bannerTextContainer: { flex: 1, marginLeft: 16 },
  bannerTitle: { fontSize: 20, fontWeight: 'bold', color: '#2C3E50', marginBottom: 4 },
  bannerSubtitle: { fontSize: 14, color: '#7F8C8D' },
});

