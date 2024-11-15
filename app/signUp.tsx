import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, TextInput } from "@react-native-material/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    const accountsStr = await AsyncStorage.getItem('accounts') ?? '[]';
    const accounts = JSON.parse(accountsStr);

    if (accounts.some((account: { email: string; }) => account.email === email)) {
      alert('Email já cadastrado');
      return;
    }

    if (!email || !password) {
      alert('Preencha todos os campos');
      return;
    }

    if (password.length < 6) {
      alert('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    if (!email.includes('@')) {
      alert('Email inválido');
      return;
    }

    accounts.push({ email, password });

    await AsyncStorage.setItem('accounts', JSON.stringify(accounts));

    router.push('./');
  }

  return (
    <SafeAreaView style={styles.container}>
       <TextInput
        label="Email"
        value={email}
        onChangeText={(text: string) => setEmail(text)}
        style={styles.item}
      />
      <TextInput
        label="Senha"
        value={password}
        onChangeText={(text: string) => setPassword(text)}
        style={styles.item}
      />
      <Button
        title="Cadastrar"
        onPress={() => onSubmit()}
        style={styles.item}>
        Login
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  item: {
    marginBottom: 12,
    marginHorizontal: 20,
  }
});
