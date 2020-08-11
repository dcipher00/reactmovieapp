import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { withFirebaseHOC } from "../config/Firebase";
import Movie from './ApiCalling/Movie';

function Home({ navigation, firebase }) {
  async function handleSignout() {
    try {
      await firebase.signOut();
      navigation.navigate("Auth");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 40 }}>
        <Button
          title="Signout"
          onPress={handleSignout}
          titleStyle={{
            color: "#F57C00"
          }}
          type="clear"
        />
      </View>
      <View>
        <Movie />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default withFirebaseHOC(Home);
