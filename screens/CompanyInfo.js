import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from 'react-native-shadow-cards';
import { Button } from "react-native-elements";
import { withFirebaseHOC } from "../config/Firebase";

function CompanyInfo({ navigation, firebase }) {
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
            <Card style={{ padding: 10, margin: 10 }}>
                <Text style={styles.text}>Company: Geeksynergy Technologies Pvt Ltd</Text>
                <Text style={styles.text}>Address: Sanjayanagar, Bengaluru-56</Text>
                <Text style={styles.text}>Phone:XXXXXXXXX09</Text>
                <Text style={styles.text}>Email: XXXXXX@gmail.com</Text>
            </Card>
            <Button
                title="Signout"
                onPress={handleSignout}
                titleStyle={{
                    color: "#F57C00"
                }}
                type="clear"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 18
    }
});

export default withFirebaseHOC(CompanyInfo);
