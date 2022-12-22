import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Pressable,
  Button,
  Alert,
} from "react-native";
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from "react-native-calendars";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [fileUri, setFileUri] = useState(null);
  console.log("File Uri in state =>",fileUri)
  async function uploadDoc(){
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      if (result.type === "success"){
        setFileUri(result.uri);
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const fileSave = async() => {
    if (!fileUri){
      Alert.alert(`Sorry no file to save!`);
      return;
    }
    const fileName = fileUri.split("/").pop();
    const newPath = FileSystem.documentDirectory+ Math.random(4) + fileName 
    console.log(`new path is ${newPath}`)

    try {
      await FileSystem.moveAsync({
        from: fileUri,
        to: newPath
      });
      console.log('File saved to', newPath);
    } catch (error) {
      console.log(error)
      
    }
  };

  LocaleConfig.locales["np"] = {
    monthNames: [
      "Baisakh",
      "Jestha",
      "Ashad",
      "Shrawan",
      "Bhadra",
      "Ashoj",
      "Kartik",
      "Mangsir",
      "Poush",
      "Magh",
      "Falgun",
      "Chaitra",
    ],
    monthNamesShort: [
      "Bai",
      "Jes",
      "Ash",
      "Shra",
      "Bha",
      "Asj",
      "Kar",
      "Man",
      "Pou",
      "Mag",
      "Fal",
      "Chai",
    ],
    dayNames: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    today: "Aaja",
  };
  LocaleConfig.defaultLocale = "np";

  return (
    <View style={styles.container}>
      <Text>HELLO INTERNET</Text>
      <StatusBar style="auto" />
      <Calendar
        initialDate={"2022-03-20"}
        minDate={"1995-10-16"}
        maxDate={"2030-10-05"}
        onDayPress={() => setModalVisible(true)}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Event Name</Text>
            <TextInput style={styles.textInput}></TextInput>
            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.btn}>Cancel Event</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Button onPress={uploadDoc} title="Upload"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    borderColor: "red",
    backgroundColor: "red",
    marginTop: 10,
    padding: 8,
    color: "white",
    width: 100,
    borderRadius: 50,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    backgroundColor: "black",
    color: "white",
    width: 200,
    borderRadius: 50,
    padding: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
