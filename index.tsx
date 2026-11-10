import React, { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const stylesList = ['Modern', 'Scandinavian', 'Luxury', 'Farmhouse', 'Minimalist', 'Industrial'];

export default function HomeScreen() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [styleChoice, setStyleChoice] = useState('Modern');
  const [busy, setBusy] = useState(false);

  async function choosePhoto() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Photo access needed', 'Please allow photo access to choose a room picture.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.85 });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  }

  async function redesign() {
    if (!photo) {
      Alert.alert('Choose a room photo', 'Upload a photo of your room first.');
      return;
    }
    setBusy(true);
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      if (!apiUrl) throw new Error('The AI redesign service has not been connected yet.');
      const body = new FormData();
      body.append('image', { uri: photo, name: 'room.jpg', type: 'image/jpeg' } as any);
      body.append('style', styleChoice);
      const response = await fetch(`${apiUrl}/redesign`, { method: 'POST', body });
      if (!response.ok) throw new Error('The redesign service returned an error.');
      const data = await response.json();
      if (data.imageUrl) Alert.alert('Design ready', `Your redesigned image is ready: ${data.imageUrl}`);
      else throw new Error('No redesigned image was returned.');
    } catch (error) {
      Alert.alert('Not connected yet', error instanceof Error ? error.message : 'Please try again later.');
    } finally { setBusy(false); }
  }

  return (
    <ScrollView style={s.page} contentContainerStyle={s.content}>
      <Text style={s.brand}>Reno<Text style={s.brandAccent}>Right</Text></Text>
      <Text style={s.tagline}>See the potential in your space.</Text>
      <Text style={s.heading}>Redesign your room</Text>
      <Text style={s.copy}>Upload a photo, choose a style and imagine a fresh new look.</Text>
      <Pressable style={s.photoBox} onPress={choosePhoto}>
        {photo ? <Image source={{ uri: photo }} style={s.photo} /> : <><Text style={s.plus}>＋</Text><Text style={s.photoTitle}>Add a room photo</Text><Text style={s.muted}>Choose an image from your library</Text></>}
      </Pressable>
      {photo && <Pressable onPress={choosePhoto}><Text style={s.changePhoto}>Change photo</Text></Pressable>}
      <Text style={s.sectionTitle}>Choose your style</Text>
      <View style={s.styles}>{stylesList.map(item => <Pressable key={item} onPress={() => setStyleChoice(item)} style={[s.chip, styleChoice === item && s.chipActive]}><Text style={[s.chipText, styleChoice === item && s.chipTextActive]}>{item}</Text></Pressable>)}</View>
      <Pressable style={s.button} onPress={redesign} disabled={busy}>{busy ? <ActivityIndicator color="#fff" /> : <Text style={s.buttonText}>Redesign my room</Text>}</Pressable>
      <View style={s.plan}><Text style={s.planTitle}>Start with 1 free AI design</Text><Text style={s.planCopy}>Want more inspiration? RenoRight Premium is planned at £2.99 per month.</Text></View>
      <Text style={s.disclaimer}>AI redesign and subscription features are not connected in this starter version.</Text>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F6F3ED' }, content: { padding: 24, paddingTop: 62, paddingBottom: 40 },
  brand: { fontSize: 32, fontWeight: '800', color: '#263D32', letterSpacing: -1 }, brandAccent: { color: '#B87951' }, tagline: { color: '#77766F', marginTop: 4, marginBottom: 34, fontSize: 14 },
  heading: { fontSize: 25, fontWeight: '700', color: '#28372F' }, copy: { color: '#77766F', lineHeight: 21, marginTop: 8, marginBottom: 20 },
  photoBox: { height: 230, borderWidth: 1.5, borderColor: '#C9C4B8', borderStyle: 'dashed', borderRadius: 18, backgroundColor: '#EFEBE2', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, photo: { width: '100%', height: '100%' }, plus: { fontSize: 38, color: '#718174' }, photoTitle: { color: '#34483B', fontSize: 17, fontWeight: '700', marginTop: 8 }, muted: { color: '#89877F', marginTop: 6, fontSize: 13 }, changePhoto: { textAlign: 'right', color: '#55705D', marginTop: 8, fontWeight: '600' },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#28372F', marginTop: 27, marginBottom: 12 }, styles: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 }, chip: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 22, backgroundColor: '#E9E5DC', borderWidth: 1, borderColor: '#E9E5DC' }, chipActive: { backgroundColor: '#344B3D', borderColor: '#344B3D' }, chipText: { color: '#50564F', fontWeight: '600' }, chipTextActive: { color: '#FFFFFF' },
  button: { backgroundColor: '#344B3D', borderRadius: 14, padding: 17, alignItems: 'center', marginTop: 28 }, buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' }, plan: { marginTop: 25, padding: 18, borderRadius: 16, backgroundColor: '#EAE6DC' }, planTitle: { color: '#34483B', fontSize: 16, fontWeight: '700' }, planCopy: { color: '#6D7068', lineHeight: 20, marginTop: 6 }, disclaimer: { color: '#99958B', fontSize: 11, textAlign: 'center', marginTop: 18 }
});
