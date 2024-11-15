import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FlatList } from "react-native-gesture-handler";

const data = [
  {
    id: "1",
    name: "Convento da Penha",
    img: "https://cdn.conventodapenha.org.br/wp-content/uploads/2020/08/29012454/convento_p13.jpg",
  },
  {
    id: "2",
    name: "Morro do Moreno",
    img: "https://es360.com.br/wp-content/uploads/2023/02/Captura-de-Tela-2023-02-15-a%CC%80s-15.53.19.png",
  },
  {
    id: "3",
    name: "Praia da Costa",
    img: "https://www.livialimongi.com.br/wp-content/uploads/2020/12/praia-da-costa.jpg",
  },
  {
    id: "4",
    name: "Praia de Camburi",
    img: "https://www.hotelcamburi.com.br/wp-content/uploads/2021/07/Conhe%C3%A7a-a-historia-da-Praia-do-Camburi-blog.png",
  },
  {
    id: "5",
    name: "Praia de Setiba",
    img: "https://img.freepik.com/fotos-premium/vista-aerea-da-praia-de-setiba-em-setiba-na-cidade-de-guarapari-espirito-santo-brasil_794048-207.jpg",
  },
];

export default function SignUp() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        // <Ionicons size={310} name="wine" style={styles.headerImage} />
        <Image
          style={styles.headerImage}
          source={{ uri: "https://www.vidadeturista.com/wp-content/uploads/2020/07/ponte-vitoria-espirito-santo.jpg" }}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explorar</ThemedText>
      </ThemedView>
      <ThemedText>Explore pontos turísticos do Espírito Santo</ThemedText>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedView style={styles.item}>
            <ThemedText>{item.name}</ThemedText>
            <Image style={styles.image} source={{ uri: item.img }} />
          </ThemedView>
        )}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
    width: "150%",
    height: "150%",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  image: {
    width: 350,
    height: 200,
  },
  item: {
    marginVertical: 16,
  },
});
