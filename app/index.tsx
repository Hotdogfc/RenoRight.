import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const stylesList = [
  'Modern',
  'Scandinavian',
  'Luxury',
  'Farmhouse',
  'Minimalist',
  'Industrial',
];

export default function HomeScreen() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState('Modern');

  const choosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const redesign = () => {
    if (!photo) {
      Alert.alert('Add a photo', 'Please choose a room photo first.');
      return;
    }

    Alert.alert(
      'Coming soon',
      'AI room redesign will be connected in the next development stage.'
    );
  };

  return (
    <ScrollView style={s.container}>
      <View style={s.header}>
        <Text style={s.logo}>Reno<Text style={s.logoLight}>Right</Text></Text>
        <Text style={s.tagline}>Imagine your dream space.</Text>
      </View>

      <Text style={s.heading}>Redesign your room</Text>
      <Text style={s.description}>
        Upload a photo and discover a whole new look for your home.
      </Text>

      <TouchableOpacity style={s.upload} onPress={choosePhoto}>
        {photo ? (
          <Image source={{ uri: photo }} style={s.preview} />
        ) : (
          <>
            <Text style={s.camera}>＋</Text>
            <Text style={s.uploadTitle}>Upload your room photo</Text>
            <Text style={s.small}>Choose a photo from your library</Text>
          </>
        )}
      </TouchableOpacity>

      <Text style={s.section}>Choose your design style</Text>

      <View style={s.styles}>
        {stylesList.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              s.styleButton,
              selectedStyle === item && s.selected,
            ]}
            onPress={() => setSelectedStyle(item)}
          >
            <Text style={[
              s.styleText,
              selectedStyle === item && s.selectedText,
            ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={s.redesign} onPress={redesign}>
        <Text style={s.redesignText}>Redesign my room →</Text>
      </TouchableOpacity>

      <View style={s.premium}>
        <Text style={s.premiumTitle}>Make your home amazing</Text>
        <Text style={s.premiumText}>
          Enjoy 1 free AI design. Upgrade to Premium for £2.99 per month.
        </Text>
      </View>

      <Text style={s.footer}>RenoRight · Your home, reimagined.</Text>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F4EE', padding: 22 },
  header: { paddingTop: 35, paddingBottom: 30 },
  logo: { fontSize: 34, fontWeight: '800', color: '#34483A' },
  logoLight: { color: '#B18B62' },
  tagline: { color: '#777', marginTop: 5, fontSize: 15 },
  heading: { fontSize: 27, fontWeight: '700', color: '#303B32' },
  description: { fontSize: 15, color: '#777', marginTop: 8, marginBottom: 22 },
  upload: {
    height: 220, backgroundColor: '#E9E5DC', borderRadius: 18,
    justifyContent: 'center', alignItems: 'center', overflow: 'hidden',
    borderWidth: 1, borderColor: '#D8D0C2',
  },
  camera: { fontSize: 40, color: '#657663' },
  uploadTitle: { fontSize: 17, fontWeight: '600', color: '#34483A', marginTop: 8 },
  small: { color: '#777', marginTop: 6 },
  preview: { width: '100%', height: '100%' },
  section: { fontSize: 18, fontWeight: '700', marginTop: 28, marginBottom: 14, color: '#303B32' },
  styles: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  styleButton: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 22, backgroundColor: '#E9E5DC' },
  selected: { backgroundColor: '#34483A' },
  styleText: { color: '#444' },
  selectedText: { color: '#fff' },
  redesign: { backgroundColor: '#34483A', padding: 18, borderRadius: 14, alignItems: 'center', marginTop: 28 },
  redesignText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  premium: { backgroundColor: '#E9E2D5', padding: 20, borderRadius: 16, marginTop: 25 },
  premiumTitle: { fontSize: 18, fontWeight: '700', color: '#34483A' },
  premiumText: { color: '#666', marginTop: 8, lineHeight: 21 },
  footer: { textAlign: 'center', color: '#999', marginVertical: 30 },
});
