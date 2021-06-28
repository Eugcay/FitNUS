import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { Divider, RadioButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const JioStart = (props) => {
  const [img, setImg] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [type, setType] = useState("Static");
  const [galleryPermission, setGalleryPermission] = useState(null);

  useEffect(() => {
    const jioData = props.route.params?.jioData
    if (jioData) {
      setImg(jioData?.img)
      setName(jioData.name)
      setDescription(jioData.description)
      setLocation(jioData?.location)
      setTime(jioData.time)
      setDescription(jioData.duration)
      setType(jioData.type)
    }
  }, [props.route.params?.jioData])

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        setGalleryPermission(status === "granted");
      }
    })();
  }, []);

  const setPhoto = () => {
    if (galleryPermission) {
      openPicker();
    } else {
      Alert.alert("no access to gallery!");
    }
  };

  const openPicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImg(result.uri);
    }
  };

  const submitJio = () => {

  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {img ? (
          <TouchableOpacity style={styles.addImage}>
            <Image
              source={{ uri: img }}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.addImage} onPress={() => setPhoto()}>
            <Ionicons name="camera-outline" size={18} color="blue" />
            <Text style={{ fontSize: 15 }}> Add Image (optional)</Text>
          </TouchableOpacity>
        )}

        <View style={{ flex: 1, width: "90%", marginVertical: 10 }}>
          <View style={styles.formItem}>
            <Text style={styles.labels}>Workout Name</Text>
            <TextInput
              onChangeText={(text) => setName(text)}
              placeholder="Title"
              textContentType='name'
            />
            <Divider />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.labels}>Location</Text>
            <TextInput
              onChangeText={(text) => setLocation(text)}
              placeholder="Location"
              textContentType='location'
            />
            <Divider />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.labels}>{Date & Time}</Text>
            <TextInput
              onChangeText={(text) => setTime(text)}
              placeholder="DDMMYY"
            />
            <Divider />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.labels}>Estimated Time</Text>
            <TextInput
              onChangeText={(text) => setDuration(text)}
              placeholder="Duration"
              
            />
            <Divider />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.labels}>Description</Text>
            <TextInput
              onChangeText={(text) => setDescription(text)}
              placeholder="Description"
              multiline={true}
            />
            <Divider />
          </View>

          <RadioButton.Group
            onValueChange={(value) => setType(value)}
            value={type}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ width: "10%" }}>Static</Text>
              <RadioButton value="Static" />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ width: "10%" }}>Run</Text>
              <RadioButton value="Run" uncheckedColor="black" />
            </View>
          </RadioButton.Group>
          <Divider />
          {type === "Run" && (
            <View style={styles.formItem}>
              <Text style={styles.labels}>Workout Type</Text>
              <TextInput
                onChangeText={(text) => setDescription(text)}
                placeholder="Description"
                multiline={true}
              />
              <Divider />
            </View>
          )}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() =>
              type === "Run"
                ? submitJio()
                : props.navigation.navigate("Details", {
                    img,
                    name,
                    description,
                    location,
                    time,
                    duration,
                    type,
                  })
            }
          >
            <Text
              style={{
                alignSelf: "center",
                marginVertical: 15,
                fontSize: 16,
                fontWeight: "bold",
                color: "blue",
              }}
            >
              Workout Details{" "}
            </Text>
            <Ionicons name="arrow-forward" size={17} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default JioStart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  addImage: {
    flexDirection: "row",
    height: "20%",
    minHeight: 150,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "blue",
    marginTop: 10,
  },
  formItem: {
    marginVertical: 10,
  },

  labels: {
    marginBottom: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
});
