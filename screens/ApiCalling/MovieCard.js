import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity, Button } from 'react-native'
import moment from "moment"

const { width, height } = Dimensions.get('window')

const MovieCard = ({ item }) => {
    // console.log(item)
    // var arr = item.voted
    // var voteCount = 0;
    // arr.forEach((element) => {
    //     console.log(element.upVoted.length - element.downVoted.length);
    //     voteCount = element.upVoted.length - element.downVoted.length;
    // })
    // console.log(arr);
    var newDate = moment(item.releasedDate * 1000).format("DD MMM YYYY")
    return (
        <View style={styles.cardView}>
            <View style={{ flexDirection: "row" }}>
                <View>
                    <TouchableOpacity style={styles.triangleUp}></TouchableOpacity>
                    <Text style={styles.totalVoteCount}>
                        {item.voting}
                    </Text>
                    <TouchableOpacity style={styles.triangleDown}></TouchableOpacity>
                    <Text style={styles.votesText}>
                        Votes
                    </Text>
                </View>
                <View>
                    <Image style={styles.image} source={item.poster ? { uri: item.poster } : null} />
                </View>
                <View style={{ flexShrink: 1 }}>
                    <Text style={styles.title}> {item.title}</Text>
                    <Text style={styles.labels}>Genre:<Text style={{ color: "black" }}>{item.genre}</Text></Text>
                    <Text style={styles.labels}>Director:<Text style={{ color: "black" }}>{item.director}</Text></Text>
                    <Text style={styles.labels}>Starring:<Text style={{ color: "black" }}>{item.stars}</Text></Text>
                    <Text style={{ fontWeight: "bold" }}>{item.runTime ? item.runTime : "null"} Mins | {item.language} | {newDate} </Text>
                    <Text style={{ color: "#089dd4" }}>{item.pageViews} views | Voted by {item.totalVoted} people</Text>
                </View>
            </View>
            <Button title="Watch Trailer"></Button>
        </View >
    )
}

const styles = StyleSheet.create({
    cardView: {
        backgroundColor: '#e6dfdf',
        margin: width * 0.01,
        borderRadius: width * 0.03,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3
    },
    title: {
        marginTop: 10,
        marginLeft: -5,
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    },
    image: {
        height: height / 6,
        borderRadius: 10,
        width: 90,
        marginLeft: width * 0.02,
        marginRight: width * 0.02,
        marginVertical: height * 0.02
    },
    labels: {
        color: '#756e6e',
        fontWeight: "bold"
    },
    triangleUp: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        marginTop: 20,
        marginLeft: 5,
        borderStyle: 'solid',
        borderLeftWidth: 20,
        borderRightWidth: 20,
        borderBottomWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'black'
    },
    triangleDown: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        marginLeft: 5,
        borderStyle: 'solid',
        borderLeftWidth: 20,
        borderRightWidth: 20,
        borderBottomWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'black',
        transform: [
            { rotate: '180deg' }
        ]
    },
    totalVoteCount: {
        fontSize: 35,
        fontWeight: "bold",
        marginLeft: 5,
        alignItems: "center",
        textAlign: 'center',
    },
    votesText: {
        fontSize: 15,
        marginTop: 20,
        marginLeft: 5,
        alignItems: "center",
        textAlign: 'center',
    }

})



export default MovieCard