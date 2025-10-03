import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ConversationPromptProps {
  prompt: string;
  isVisible: boolean;
}

export default function ConversationPrompt({ prompt, isVisible }: ConversationPromptProps) {
  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.promptText}>{prompt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    padding: 24,
    margin: 16,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  promptText: {
    fontSize: 20,
    lineHeight: 28,
    color: '#2C3E50',
    textAlign: 'center',
    fontWeight: '500',
  },
});