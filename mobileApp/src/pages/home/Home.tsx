import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";

// interface
interface DepartamentResponse {
  descripcion: string;
}

interface ProvinciaResponse {
  descripcion: string;
}

const Home = () => {
  const [uf, setUf] = useState("");
  const [city, setCity] = useState("");

  const [departaments, setDepartaments] = useState<String[]>([]);
  const [provinces, setProvinces] = useState<String[]>([]);

  const navigation = useNavigation();

  const handlerNavigationToPoints = () => {
    navigation.navigate("Point", {
      uf,
      city,
    });
  };

  useEffect(() => {
    axios
      .get<DepartamentResponse[]>(
        "http://webinei.inei.gob.pe:8080/sisconcode/ubigeo/buscarDepartamentosPorVersion.htm?llaveProyectoPK=5-1"
      )
      .then((res) => {
        let departament = res.data.map((dep) => dep.descripcion);
        setDepartaments(departament);
      });
  }, []);

  useEffect(() => {
    console.log(uf);
    if (uf === "0") {
      return setProvinces([]);
    }

    axios
      .get<ProvinciaResponse[]>(
        `http://webinei.inei.gob.pe:8080/sisconcode/ubigeo/buscarProvinciasPorVersion.htm?llaveProyectoPK=5-1&departamentoId=${uf}`
      )
      .then((res) => {
        const province = res.data.map((prov) => prov.descripcion);
        setProvinces(province);
      });
  }, [uf]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ImageBackground
        source={require("../../assets/home-background.png")}
        style={styles.container}
        imageStyle={{
          width: 274,
          height: 368,
        }}
      >
        <View style={styles.main}>
          <Image source={require("../../assets/logo.png")} />
          <View>
            <Text style={styles.title}>
              Su marketplace de recolección de residuos
            </Text>
            <Text style={styles.description}>
              Ayudamos a personas a encontrar puntos de recolección de forma
              eficiente
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <RNPickerSelect
            onValueChange={(value) => {
              setUf(value);
            }}
            placeholder={{
              label: "Seleccione un departamento",
              value: "0",
              color: "#9EA0A4",
            }}
            items={departaments.map((dep) => ({
              key: String(dep.split(" ").slice(1).join(" ")),
              label: String(dep.split(" ").slice(1).join(" ")),
              value: dep.split(" ").shift(),
            }))}
            style={styleSelect}
          />

          <RNPickerSelect
            onValueChange={(value) => {
              setCity(value);
            }}
            placeholder={{
              label: "Seleccione una provincia",
              value: "0",
              color: "#9EA0A4",
            }}
            items={provinces.map((prov) => ({
              key: String(prov.split(" ").slice(1).join(" ")),
              label: String(prov.split(" ").slice(1).join(" ")),
              value: String(prov.split(" ").slice(1).join(" ")),
            }))}
            style={styleSelect}
          />

          <RectButton style={styles.button} onPress={handlerNavigationToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#fff" size={24} />
              </Text>
            </View>

            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styleSelect = StyleSheet.create({
  inputAndroid: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  inputIOS: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: "#322153",
    fontSize: 25,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
    marginTop: 48,
  },

  description: {
    color: "#6C6C80",
    fontSize: 13,
    marginTop: 8,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  button: {
    backgroundColor: "#34CB79",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});
export default Home;
