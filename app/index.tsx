import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from "@react-native-material/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router';

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    AsyncStorage.getItem('user').then((user) => {
      if (user) {
        router.push('./home');
      }
    });
  }, []);

  const onSubmit = async () => {
    const accountsStr = await AsyncStorage.getItem('accounts') ?? '[]';
    const accounts = JSON.parse(accountsStr);

    const account = accounts.find((account: { email: string; }) => account.email === email);

    if (!account) {
      alert('Conta não encontrada');
      return;
    }

    if (account.password !== password) {
      alert('Senha incorreta');
      return;
    }

    AsyncStorage.setItem('user', JSON.stringify(account));

    router.push('./home');
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
        secureTextEntry={true}
        value={password}
        onChangeText={(text: string) => setPassword(text)}
        style={styles.item}
      />
      <Button
        title="Entrar"
        onPress={() => onSubmit()}
        style={styles.item}>
        Login
      </Button>
      <Link href="/signUp" style={styles.link}>
        <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
      </Link>
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
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    alignSelf: 'center',
  },
  linkText: {
    color: '#1F51FF',
  },
});
