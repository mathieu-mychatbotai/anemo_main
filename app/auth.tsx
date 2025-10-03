import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useAuth } from './contexts/AuthContext';
import AuthInput from '../components/AuthInput';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signIn, signUp } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, name);
      }
      router.replace('/');
    } catch (error) {
      Alert.alert('Error', 'Authentication failed. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Anemo</Text>
          <Text style={styles.subtitle}>Your Memory Companion</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>{isLogin ? 'Welcome Back' : 'Create Account'}</Text>
          
          {!isLogin && (
            <AuthInput
              label="Name"
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              autoCapitalize="words"
            />
          )}
          
          <AuthInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
          
          <AuthInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={styles.switchButton}>
            <Text style={styles.switchText}>
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24 },
  header: { alignItems: 'center', paddingTop: 60, paddingBottom: 40 },
  title: { fontSize: 48, fontWeight: 'bold', color: '#4A90E2', marginBottom: 8 },
  subtitle: { fontSize: 20, color: '#7F8C8D', fontWeight: '500' },
  form: { flex: 1 },
  formTitle: { fontSize: 28, fontWeight: 'bold', color: '#2C3E50', marginBottom: 30 },
  submitButton: { backgroundColor: '#4A90E2', padding: 18, borderRadius: 12, marginTop: 10 },
  submitButtonText: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  switchButton: { marginTop: 20, padding: 10 },
  switchText: { color: '#4A90E2', fontSize: 16, textAlign: 'center', fontWeight: '600' },
});
